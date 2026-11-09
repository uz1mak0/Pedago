/**
 * Tagalog voice entry point used by every screen (Flashcards, Grammar,
 * Scenarios, Tutorial).
 *
 * Playback order (implemented in audio-player.ts):
 *   1. recorded clip from one consistent voice, bundled in /public/audio/tts
 *   2. legacy single-word recordings
 *   3. device voice, only if it is a real Filipino voice
 *
 * Pronunciation fixes live in speech-key.ts (respelling rules) and
 * scripts/speech-overrides.json (per-phrase / per-word fixes for the recordings).
 */

import { audioEngine } from './audio-player';
import { normalizeTagalogForSpeech } from './speech-key';

export { normalizeTagalogForSpeech };

/**
 * Speaks a Tagalog phrase. Always calls onEnd exactly once if the phrase did not
 * finish normally (failed or interrupted), so callers can reset their UI state.
 * Resolves true if the phrase played to the end.
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
): Promise<boolean> {
  if (!rawText || typeof window === 'undefined') return false;

  const speed = options?.speed ?? (options?.rate && options.rate < 0.85 ? 'slow' : 'normal');

  try {
    // Pass the text exactly as displayed: the engine uses it to find the recording
    // and only respells it for the device-voice fallback.
    const ok = await audioEngine.speak(rawText, {
      speed,
      onStart: options?.onStart,
      onEnd: options?.onEnd,
    });
    if (!ok) options?.onEnd?.();
    return ok;
  } catch (err) {
    console.warn('Audio playback error, handled gracefully:', err);
    options?.onEnd?.();
    return false;
  }
}

/** Stops any currently playing audio immediately. */
export function stopTagalogSpeech(): void {
  audioEngine.stop();
}

export { audioEngine };
