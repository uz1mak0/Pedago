// Tagalog Audio Pronunciation Engine
// Order of playback:
//   1. Pre-recorded native speaker audio (/public/audio/vocab/) - bundled inside the app
//   2. Device text-to-speech (Capacitor native TTS in the Android app, Web Speech in the browser)
// Also includes a Web Audio syllable beat guide.
// No server (/api/tts) is needed, so this works with Next.js static export + Capacitor.

import { Capacitor } from '@capacitor/core';

export interface AudioPlayOptions {
  speed?: 'normal' | 'slow';
  onStart?: () => void;
  onEnd?: () => void;
  onError?: (err: Error) => void;
}

// Known mapping of flashcard terms to pre-rendered authentic native recordings
const VOCAB_MAP: Record<string, string> = {
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

class TagalogAudioEngine {
  private audioCtx: AudioContext | null = null;
  private currentAudioElement: HTMLAudioElement | null = null;
  private isSpeaking = false;
  private audioCache = new Map<string, HTMLAudioElement>();

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

  /**
   * Play pre-rendered native Filipino speaker audio for a specific flashcard.
   */
  public playFlashcardAudio(
    cardId: string,
    type: 'word' | 'example',
    options: AudioPlayOptions = {}
  ): Promise<boolean> {
    const filename = type === 'example' ? `${cardId}-example.mp3` : `${cardId}.mp3`;
    const audioUrl = `/audio/vocab/${filename}`;
    return this.playAudioUrl(audioUrl, options);
  }

  /**
   * Plays audio by URL with playback rate control.
   * Resolves true if it played to the end, false if it failed.
   */
  public playAudioUrl(url: string, options: AudioPlayOptions = {}): Promise<boolean> {
    return new Promise((resolve) => {
      if (typeof window === 'undefined') {
        resolve(false);
        return;
      }

      this.stop();

      let audio = this.audioCache.get(url);
      if (!audio) {
        audio = new Audio(url);
        this.audioCache.set(url, audio);
      } else {
        audio.currentTime = 0;
      }

      this.currentAudioElement = audio;
      this.isSpeaking = true;
      audio.playbackRate = options.speed === 'slow' ? 0.75 : 1.0;

      options.onStart?.();

      audio.onended = () => {
        this.isSpeaking = false;
        options.onEnd?.();
        resolve(true);
      };

      audio.onerror = () => {
        this.isSpeaking = false;
        resolve(false);
      };

      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          console.warn('Audio play error, falling back:', err);
          this.isSpeaking = false;
          resolve(false);
        });
      }
    });
  }

  /**
   * General speech method.
   * 1. Pre-rendered native recording (if the word is in VOCAB_MAP)
   * 2. Device text-to-speech
   */
  public async speak(text: string, options: AudioPlayOptions = {}): Promise<boolean> {
    if (!text || typeof window === 'undefined') return false;

    const normalized = text.trim().toLowerCase().replace(/[.,!?:;'"“”]/g, '');

    // 1. Pre-rendered native recording
    const vocabId = VOCAB_MAP[normalized];
    if (vocabId) {
      const ok = await this.playFlashcardAudio(vocabId, 'word', options);
      if (ok) return true;
    }

    // 2. Device voice (native Android TTS in the app, Web Speech in the browser)
    return this.speakDevice(text.trim(), options);
  }

  /**
   * Uses Capacitor native TTS inside the Android app,
   * and the browser's Web Speech API on the web.
   */
  private async speakDevice(text: string, options: AudioPlayOptions = {}): Promise<boolean> {
    if (Capacitor.isNativePlatform()) {
      try {
        this.stop();
        this.isSpeaking = true;
        options.onStart?.();

        const { TextToSpeech } = await import('@capacitor-community/text-to-speech');
        await TextToSpeech.speak({
          text,
          lang: 'fil-PH',
          rate: options.speed === 'slow' ? 0.7 : 0.95,
          pitch: 1.0,
          volume: 1.0,
        });

        this.isSpeaking = false;
        options.onEnd?.();
        return true;
      } catch (err) {
        console.warn('Native TTS error:', err);
        this.isSpeaking = false;
        options.onError?.(err instanceof Error ? err : new Error(String(err)));
        return false;
      }
    }

    return this.speakWebSpeech(text, options);
  }

  private speakWebSpeech(text: string, options: AudioPlayOptions = {}): Promise<boolean> {
    return new Promise((resolve) => {
      if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
        resolve(false);
        return;
      }

      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = options.speed === 'slow' ? 0.75 : 0.95;
      utterance.pitch = 1.0;

      const voices = window.speechSynthesis.getVoices();
      const tagalogVoice = voices.find((v) => {
        const lang = v.lang.toLowerCase().replace('_', '-');
        const name = v.name.toLowerCase();
        return (
          lang.startsWith('fil') ||
          lang.startsWith('tl') ||
          name.includes('tagalog') ||
          name.includes('filipino')
        );
      });

      if (!tagalogVoice) {
        // Do NOT speak with an English voice: it distorts Tagalog vowels and glottal stops.
        console.warn('No Tagalog voice available in this browser; skipping speech.');
        this.isSpeaking = false;
        resolve(false);
        return;
      }

      utterance.voice = tagalogVoice;
      utterance.lang = tagalogVoice.lang;

      utterance.onstart = () => {
        this.isSpeaking = true;
        options.onStart?.();
      };
      utterance.onend = () => {
        this.isSpeaking = false;
        options.onEnd?.();
        resolve(true);
      };
      utterance.onerror = () => {
        this.isSpeaking = false;
        resolve(false);
      };

      window.speechSynthesis.speak(utterance);
    });
  }

  /**
   * Plays a rhythmic syllable guide using Web Audio API oscillators.
   */
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

  public stop(): void {
    if (this.currentAudioElement) {
      this.currentAudioElement.pause();
      this.currentAudioElement.currentTime = 0;
      this.currentAudioElement = null;
    }
    if (Capacitor.isNativePlatform()) {
      import('@capacitor-community/text-to-speech')
        .then(({ TextToSpeech }) => TextToSpeech.stop())
        .catch(() => { });
    }
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    this.isSpeaking = false;
  }

  public getSpeakingState(): boolean {
    return this.isSpeaking;
  }
}

export const audioEngine = new TagalogAudioEngine();