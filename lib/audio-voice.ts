/**
 * Authentic Female Filipino Voice & Speech Engine
 * Powered by high-fidelity native recordings (/public/audio/vocab/)
 * and the dynamic female Filipino TTS endpoint (/api/tts?tl=tl).
 * Guarantees accurate Tagalog pronunciation, proper vowel qualities,
 * natural stress accents, and respectful cadence.
 */

import { audioEngine, AudioPlayOptions } from './audio-player';

// Phonetic pre-processing for Tagalog words to avoid robotic pronunciation
export function normalizeTagalogForSpeech(text: string): string {
  if (!text) return '';

  return text
    // Replace standalone "mga" with phonetic "manga"
    .replace(/\bmga\b/gi, 'manga')
    // Replace standalone "ng" with phonetic "nang"
    .replace(/\bng\b/gi, 'nang')
    // Clean multiple whitespace
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Plays authentic female native Tagalog speech.
 * Prioritizes pre-rendered native recordings, then the authentic female Filipino TTS API (/api/tts).
 */
export async function playTagalogSpeech(
  rawText: string,
  options?: {
    rate?: number;
    speed?: 'normal' | 'slow';
    pitch?: number;
    onStart?: () => void;
    onEnd?: () => void;
  }
): Promise<void> {
  if (!rawText || typeof window === 'undefined') return;

  const textToSpeak = normalizeTagalogForSpeech(rawText);
  const speed = options?.speed ?? (options?.rate && options.rate < 0.85 ? 'slow' : 'normal');

  const playOpts: AudioPlayOptions = {
    speed,
    onStart: options?.onStart,
    onEnd: options?.onEnd,
  };

  try {
    const success = await audioEngine.speak(textToSpeak, playOpts);
    if (!success) {
      options?.onEnd?.();
    }
  } catch (err) {
    console.warn('Audio playback error, handled gracefully:', err);
    options?.onEnd?.();
  }
}

/**
 * Stops any currently playing audio immediately.
 */
export function stopTagalogSpeech(): void {
  audioEngine.stop();
}

export { audioEngine };
