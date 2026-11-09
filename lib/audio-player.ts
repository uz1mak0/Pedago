// Tagalog audio engine. Playback order for every phrase in the app:
//
//   1. Recorded clip  - one consistent studio-quality voice, generated ahead of
//                       time for EVERY phrase (see scripts/generate-audio.ts) and
//                       bundled in /public/audio/tts. Works offline, identical on
//                       every device.
//   2. Legacy clip    - the old single-word recordings in /public/audio/vocab.
//                       Only used for words with no tier-1 clip (i.e. before the
//                       generator has been run). Safe to delete afterwards.
//   3. Device voice   - Capacitor native TTS (Android app) / Web Speech (browser).
//                       Only used if the device really has a Filipino voice.
//                       It NEVER falls back to an English voice, because that
//                       mispronounces Tagalog vowels and stress.
//
// No server (/api/tts) is needed: this works with Next.js static export + Capacitor.

import { Capacitor } from '@capacitor/core';
import { clipUrl, loadClipManifest } from './audio-manifest';
import { cleanSpeechText, normalizeTagalogForSpeech, prepareForSynthesis, speechKey } from './speech-key';

export interface AudioPlayOptions {
  speed?: 'normal' | 'slow';
  /** Fires when sound actually starts (not when loading begins). */
  onStart?: () => void;
  /** Fires when playback finishes normally. */
  onEnd?: () => void;
  /** Fires when no tier could speak the phrase. */
  onError?: (err: Error) => void;
}

// Old single-word recordings (Google Translate voice). Keyed by lowercase word.
const LEGACY_WORD_CLIPS: Record<string, string> = {
  salamat: 'vocab-1',
  'magandang umaga': 'vocab-2',
  kumusta: 'vocab-3',
  'po at opo': 'vocab-4',
  'bayad po': 'vocab-5',
  'para po': 'vocab-6',
  masarap: 'vocab-7',
  'kain tayo': 'vocab-8',
  magkano: 'vocab-9',
  tawad: 'vocab-10',
  'mano po': 'vocab-11',
  kilig: 'vocab-12',
  gigil: 'vocab-13',
  bayanihan: 'vocab-14',
  pala: 'vocab-15',
  kasi: 'vocab-16',
  naman: 'vocab-17',
  ingat: 'vocab-18',
  tara: 'vocab-19',
  busog: 'vocab-20',
  tampo: 'vocab-21',
  kumain: 'vocab-22',
  kinain: 'vocab-23',
  saan: 'vocab-24',
  bakit: 'vocab-25',
};

type PlayResult = 'ended' | 'failed' | 'interrupted';

const SLOW_RATE = 0.85; // only used when no natively-slow recording exists
const START_TIMEOUT_MS = 6000; // a clip that has not started by then is treated as failed
const MAX_CACHED_CLIPS = 30;
const VOICE_WAIT_MS = 1500;

const isFilipinoLang = (lang: string) => /^(fil|tl)([-_]|$)/i.test(lang);

interface NativeVoice {
  lang: string;
  index?: number;
}

class TagalogAudioEngine {
  private audioCtx: AudioContext | null = null;
  private current: HTMLAudioElement | null = null;
  private audioCache = new Map<string, HTMLAudioElement>();
  private speaking = false;
  private deviceVoiceActive = false; // native TTS / Web Speech currently in use

  // Every speak() call owns a session number. stop() bumps it, which invalidates
  // anything still in flight and resolves the pending promise as 'interrupted'.
  private session = 0;
  private settle: ((result: PlayResult) => void) | null = null;

  private nativeVoice: NativeVoice | null | undefined; // undefined = not probed yet

  private getAudioContext(): AudioContext {
    if (!this.audioCtx && typeof window !== 'undefined') {
      const AudioContextClass =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.audioCtx = new AudioContextClass();
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
    return this.audioCtx!;
  }

  // ---------------------------------------------------------------------------
  // Public API
  // ---------------------------------------------------------------------------

  /**
   * Speak a Tagalog phrase. Resolves true only if it was played to the end;
   * false if it failed OR was interrupted by stop()/another speak().
   */
  public async speak(text: string, options: AudioPlayOptions = {}): Promise<boolean> {
    if (!text || typeof window === 'undefined') return false;

    const session = this.begin();
    const clean = cleanSpeechText(text);
    const slow = options.speed === 'slow';

    // Tier 1: recorded clip (same voice everywhere)
    const manifest = await loadClipManifest();
    if (this.session !== session) return false;

    const slowId = slow ? manifest.get(speechKey(clean, 'slow')) : undefined;
    const normalId = manifest.get(speechKey(clean));
    const fileId = slowId ?? normalId;

    if (fileId) {
      // Prefer the natively-slow recording; slowing a normal one is a fallback.
      const rate = slow && !slowId ? SLOW_RATE : 1;
      const result = await this.playUrl(session, clipUrl(fileId), rate, options);
      if (result === 'ended') return this.finishOk(options);
      if (result === 'interrupted') return false;
    } else if (process.env.NODE_ENV !== 'production' && manifest.size > 0) {
      console.warn(`[audio] No recorded clip for "${clean}". Re-run: npm run audio:generate`);
    }

    // Tier 2: legacy single-word recording
    const legacyId = LEGACY_WORD_CLIPS[clean.toLowerCase().replace(/[.,!?:;'"]/g, '')];
    if (legacyId) {
      const rate = slow ? SLOW_RATE : 1;
      const result = await this.playUrl(session, `/audio/vocab/${legacyId}.mp3`, rate, options);
      if (result === 'ended') return this.finishOk(options);
      if (result === 'interrupted') return false;
    }

    // Tier 3: device voice, only if it is genuinely Filipino
    const spoken = prepareForSynthesis(clean);
    const result = Capacitor.isNativePlatform()
      ? await this.speakNative(session, spoken, slow, options)
      : await this.speakWebSpeech(session, spoken, slow, options);
    if (result === 'ended') return this.finishOk(options);
    if (result === 'failed') {
      options.onError?.(new Error('No Filipino voice is available on this device.'));
    }
    return false;
  }

  /** Plays one audio file. Resolves true if it played to the end. */
  public async playAudioUrl(url: string, options: AudioPlayOptions = {}): Promise<boolean> {
    if (typeof window === 'undefined') return false;
    const session = this.begin();
    const result = await this.playUrl(session, url, options.speed === 'slow' ? SLOW_RATE : 1, options);
    return result === 'ended' ? this.finishOk(options) : false;
  }

  /** Rhythmic syllable guide using Web Audio oscillators. */
  public playPhoneticBeats(
    syllables: string[],
    stressedIndex: number,
    speed: 'normal' | 'slow' = 'normal'
  ): void {
    if (typeof window === 'undefined') return;

    try {
      const ctx = this.getAudioContext();
      const startTime = ctx.currentTime + 0.05;
      const beatDuration = speed === 'slow' ? 0.35 : 0.24;

      syllables.forEach((_, idx) => {
        const isStressed = idx === stressedIndex;
        const noteTime = startTime + idx * beatDuration;

        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.frequency.setValueAtTime(isStressed ? 520 : 380, noteTime);
        osc.type = isStressed ? 'triangle' : 'sine';

        gain.gain.setValueAtTime(0.01, noteTime);
        gain.gain.exponentialRampToValueAtTime(isStressed ? 0.3 : 0.15, noteTime + 0.04);
        gain.gain.exponentialRampToValueAtTime(0.001, noteTime + beatDuration - 0.02);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(noteTime);
        osc.stop(noteTime + beatDuration);
      });
    } catch {
      // Audio context error ignored safely
    }
  }

  /** Stops whatever is playing. Any awaiting speak() resolves false immediately. */
  public stop(): void {
    this.session++;

    const settle = this.settle;
    this.settle = null;

    if (this.current) {
      try {
        this.current.pause();
        this.current.currentTime = 0;
      } catch {
        // element may be in an error state
      }
      this.current = null;
    }
    if (this.deviceVoiceActive) {
      this.deviceVoiceActive = false;
      if (Capacitor.isNativePlatform()) {
        import('@capacitor-community/text-to-speech')
          .then(({ TextToSpeech }) => TextToSpeech.stop())
          .catch(() => {});
      } else if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    }
    this.speaking = false;

    // Unblock the caller that was awaiting the audio we just cut off.
    settle?.('interrupted');
  }

  public getSpeakingState(): boolean {
    return this.speaking;
  }

  // ---------------------------------------------------------------------------
  // Internals
  // ---------------------------------------------------------------------------

  /** Cancels anything playing and returns the id that identifies this request. */
  private begin(): number {
    this.stop();
    return this.session;
  }

  private finishOk(options: AudioPlayOptions): true {
    options.onEnd?.();
    return true;
  }

  private getAudio(url: string): HTMLAudioElement {
    let audio = this.audioCache.get(url);
    if (audio) {
      this.audioCache.delete(url); // re-insert so the newest use is last
      this.audioCache.set(url, audio);
      try {
        audio.currentTime = 0;
      } catch {
        // not loaded yet
      }
      return audio;
    }

    audio = new Audio(url);
    audio.preload = 'auto';
    // Slowing a clip must not change its pitch (old Safari needs the prefixed flag).
    audio.preservesPitch = true;
    (audio as HTMLAudioElement & { webkitPreservesPitch?: boolean }).webkitPreservesPitch = true;
    this.audioCache.set(url, audio);

    if (this.audioCache.size > MAX_CACHED_CLIPS) {
      for (const [key, el] of this.audioCache) {
        if (el !== this.current && el !== audio) {
          this.audioCache.delete(key);
          break;
        }
      }
    }
    return audio;
  }

  private playUrl(
    session: number,
    url: string,
    rate: number,
    options: AudioPlayOptions
  ): Promise<PlayResult> {
    return new Promise<PlayResult>((resolve) => {
      if (this.session !== session) {
        resolve('interrupted');
        return;
      }

      const audio = this.getAudio(url);
      let done = false;
      let started = false;
      let timer: ReturnType<typeof setTimeout> | undefined;

      const finish = (result: PlayResult, evict = false) => {
        if (done) return;
        done = true;
        if (timer) clearTimeout(timer);
        audio.onplaying = audio.onended = audio.onerror = null;
        if (result !== 'ended') {
          try {
            audio.pause();
          } catch {
            // ignore
          }
        }
        // A clip that errored stays broken forever if it is cached.
        if (evict) this.audioCache.delete(url);
        if (this.session === session) {
          this.settle = null;
          this.current = null;
          this.speaking = false;
        }
        resolve(result);
      };

      this.settle = (r) => finish(r);
      this.current = audio;
      this.speaking = true;

      audio.playbackRate = rate;
      audio.onplaying = () => {
        if (started) return;
        started = true;
        if (timer) clearTimeout(timer);
        options.onStart?.();
      };
      audio.onended = () => finish('ended');
      audio.onerror = () => finish('failed', true);

      timer = setTimeout(() => finish('failed', true), START_TIMEOUT_MS);

      audio.play().catch((err) => {
        console.warn('Audio play error:', err);
        finish('failed', true);
      });
    });
  }

  // --- Device voice: Capacitor native TTS (Android app) ----------------------

  private async resolveNativeVoice(): Promise<NativeVoice | null> {
    if (this.nativeVoice !== undefined) return this.nativeVoice;

    try {
      const { TextToSpeech } = await import('@capacitor-community/text-to-speech');

      const { voices } = await TextToSpeech.getSupportedVoices();
      const index = voices.findIndex((v) => isFilipinoLang(v.lang));
      if (index >= 0) {
        this.nativeVoice = { lang: voices[index].lang, index };
        return this.nativeVoice;
      }

      for (const lang of ['fil-PH', 'tl-PH']) {
        const { supported } = await TextToSpeech.isLanguageSupported({ lang });
        if (supported) {
          this.nativeVoice = { lang };
          return this.nativeVoice;
        }
      }

      this.nativeVoice = null; // definitive: this phone has no Filipino voice
      return null;
    } catch (err) {
      console.warn('Could not query native TTS voices:', err);
      return null; // not cached, so a later tap retries
    }
  }

  private speakNative(
    session: number,
    text: string,
    slow: boolean,
    options: AudioPlayOptions
  ): Promise<PlayResult> {
    return new Promise<PlayResult>((resolve) => {
      let done = false;
      const finish = (result: PlayResult) => {
        if (done) return;
        done = true;
        if (this.session === session) {
          this.settle = null;
          this.speaking = false;
        }
        resolve(result);
      };
      this.settle = finish;

      (async () => {
        const voice = await this.resolveNativeVoice();
        if (this.session !== session) return finish('interrupted');
        if (!voice) {
          console.warn('No Filipino text-to-speech voice installed; not speaking with a wrong-language voice.');
          return finish('failed');
        }

        const { TextToSpeech, QueueStrategy } = await import('@capacitor-community/text-to-speech');
        this.speaking = true;
        this.deviceVoiceActive = true;
        options.onStart?.();

        await TextToSpeech.speak({
          text,
          lang: voice.lang,
          voice: voice.index,
          rate: slow ? 0.7 : 0.95,
          pitch: 1.0,
          volume: 1.0,
          queueStrategy: QueueStrategy.Flush,
        });

        finish(this.session === session ? 'ended' : 'interrupted');
      })().catch((err) => {
        console.warn('Native TTS error:', err);
        finish(this.session === session ? 'failed' : 'interrupted');
      });
    });
  }

  // --- Device voice: Web Speech API (browser) --------------------------------

  /** getVoices() is empty on first call in Chrome/Safari until "voiceschanged" fires. */
  private findWebVoice(): Promise<SpeechSynthesisVoice | null> {
    const synth = window.speechSynthesis;
    const pick = () =>
      synth
        .getVoices()
        .find((v) => isFilipinoLang(v.lang) || /tagalog|filipino/i.test(v.name)) ?? null;

    const now = pick();
    if (now) return Promise.resolve(now);
    if (synth.getVoices().length > 0) return Promise.resolve(null); // list loaded, none Filipino

    return new Promise((resolve) => {
      let timer: ReturnType<typeof setTimeout>;
      const done = () => {
        synth.removeEventListener('voiceschanged', done);
        clearTimeout(timer);
        resolve(pick());
      };
      timer = setTimeout(done, VOICE_WAIT_MS);
      synth.addEventListener('voiceschanged', done, { once: true });
    });
  }

  private async speakWebSpeech(
    session: number,
    text: string,
    slow: boolean,
    options: AudioPlayOptions
  ): Promise<PlayResult> {
    if (!('speechSynthesis' in window)) return 'failed';

    const voice = await this.findWebVoice();
    if (this.session !== session) return 'interrupted';
    if (!voice) {
      console.warn('No Filipino voice in this browser; not speaking with a wrong-language voice.');
      return 'failed';
    }

    return new Promise<PlayResult>((resolve) => {
      let done = false;
      const finish = (result: PlayResult) => {
        if (done) return;
        done = true;
        if (this.session === session) {
          this.settle = null;
          this.speaking = false;
        }
        resolve(result);
      };
      this.settle = finish;

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.voice = voice;
      utterance.lang = voice.lang;
      utterance.rate = slow ? 0.75 : 0.95;
      utterance.pitch = 1.0;

      utterance.onstart = () => {
        this.speaking = true;
        options.onStart?.();
      };
      utterance.onend = () => finish(this.session === session ? 'ended' : 'interrupted');
      utterance.onerror = () => finish(this.session === session ? 'failed' : 'interrupted');

      this.deviceVoiceActive = true;
      window.speechSynthesis.speak(utterance);
    });
  }
}

export const audioEngine = new TagalogAudioEngine();

// Re-exported so existing imports keep working.
export { normalizeTagalogForSpeech };
