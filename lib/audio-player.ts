// Authentic Filipino Native Voice & Audio Pronunciation Engine for Tagalog
// Uses high-quality authentic native speaker audio recordings (/public/audio/vocab/),
// dynamic Filipino TTS proxy (/api/tts), and Web Audio acoustic syllable guide.

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
   * Play pre-rendered authentic native Filipino speaker audio for a specific flashcard.
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
   * Plays authentic native audio by URL with playback rate control.
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
        options.onEnd?.();
        resolve(false);
      };

      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          console.warn('Native audio play error, falling back:', err);
          this.isSpeaking = false;
          options.onEnd?.();
          resolve(false);
        });
      }
    });
  }

  /**
   * General speech method: Checks pre-rendered native audio first,
   * then dynamic native TTS API (/api/tts), with Web Speech as last-resort fallback.
   */
  public async speak(text: string, options: AudioPlayOptions = {}): Promise<boolean> {
    if (!text || typeof window === 'undefined') return false;

    const normalized = text.trim().toLowerCase().replace(/[.,!?:;'"“”]/g, '');

    // 1. Check if this is one of our pre-rendered native flashcards
    const vocabId = VOCAB_MAP[normalized];
    if (vocabId) {
      const ok = await this.playFlashcardAudio(vocabId, 'word', options);
      if (ok) return true;
    }

    // 2. Play via dynamic authentic Tagalog TTS API endpoint
    try {
      const dynamicUrl = `/api/tts?text=${encodeURIComponent(text.trim())}`;
      const ok = await this.playAudioUrl(dynamicUrl, options);
      if (ok) return true;
    } catch {
      // Continue to fallback
    }

    // 3. Last-resort fallback: Web Speech API with Tagalog voice prioritization
    return this.speakWebSpeech(text, options);
  }

  private speakWebSpeech(text: string, options: AudioPlayOptions = {}): Promise<boolean> {
    return new Promise((resolve) => {
      if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
        options.onEnd?.();
        resolve(false);
        return;
      }

      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = options.speed === 'slow' ? 0.75 : 0.95;
      utterance.pitch = 1.0;

      const voices = window.speechSynthesis.getVoices();
      const tagalogVoice = voices.find(
        (v) =>
          v.lang.toLowerCase().includes('fil') ||
          v.lang.toLowerCase().includes('tl') ||
          v.name.toLowerCase().includes('tagalog') ||
          v.name.toLowerCase().includes('filipino')
      );

      if (tagalogVoice) {
        utterance.voice = tagalogVoice;
        utterance.lang = tagalogVoice.lang;
        window.speechSynthesis.speak(utterance);
      } else {
        // Critical: Do NOT speak with an English voice that distorts Tagalog vowels and glottal stops!
        console.warn('No native Tagalog TTS voice installed in browser; avoided robotic English fallback.');
        this.isSpeaking = false;
        options.onEnd?.();
        resolve(false);
      }
    });
  }

  /**
   * Plays rhythmic acoustic syllable guide using Web Audio API oscillator.
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
