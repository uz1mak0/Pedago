// Pure text helpers shared by the app (browser / Capacitor) and the audio
// generator script (Node). No DOM or Node APIs here on purpose.
//
// Two different strings matter for every spoken phrase:
//   - the DISPLAY text   -> what the learner sees on screen. Its `speechKey()` is
//                           how the player finds the recorded clip.
//   - the SYNTHESIS text -> what is actually sent to the voice model
//                           (`prepareForSynthesis()`), e.g. "mga" respelled so the
//                           voice stresses it correctly.

export type SpeechVariant = 'normal' | 'slow';

/** Unicode/whitespace/quote clean-up. Punctuation is kept: "?" changes intonation. */
export function cleanSpeechText(text: string): string {
  return text
    .normalize('NFC')
    .replace(/[\u2018\u2019]/g, "'")
    .replace(/[\u201C\u201D]/g, '"')
    .replace(/\s+/g, ' ')
    .trim();
}

/** 53-bit string hash (cyrb53). Plenty for a few thousand phrases, and sync. */
export function hashString(input: string): string {
  let h1 = 0xdeadbeef;
  let h2 = 0x41c6ce57;
  for (let i = 0; i < input.length; i++) {
    const ch = input.charCodeAt(i);
    h1 = Math.imul(h1 ^ ch, 2654435761);
    h2 = Math.imul(h2 ^ ch, 1597334677);
  }
  h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909);
  h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909);
  return (4294967296 * (2097151 & h2) + (h1 >>> 0)).toString(16).padStart(14, '0');
}

/**
 * Stable lookup key for a display text. Case-insensitive, whitespace- and
 * curly-quote-insensitive, but punctuation-sensitive.
 */
export function speechKey(text: string, variant: SpeechVariant = 'normal'): string {
  const base = hashString(cleanSpeechText(text).toLowerCase());
  return variant === 'slow' ? `${base}.slow` : base;
}

/**
 * Tagalog spelling quirks that trip up voices. Used for the text sent to the
 * recording voice AND for the device-voice fallback.
 *  - "mga"  -> "manga" (the actual sound is /maˈŋa/, voices often spell it out)
 *  - "ng"   -> "nang"  (the particle is pronounced /naŋ/)
 *  - "&"    -> "at", " / " -> ", " (symbols get read literally otherwise)
 * Contractions like "ano'ng" / "-ng" ligatures are left alone.
 */
export function normalizeTagalogForSpeech(text: string): string {
  if (!text) return '';

  return cleanSpeechText(text)
    .replace(/(?<![\w'-])mga(?![\w'-])/gi, 'manga')
    .replace(/(?<![\w'-])ng(?![\w'-])/gi, 'nang')
    .replace(/\s*&\s*/g, ' at ')
    .replace(/\s+\/\s+/g, ', ')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * The NPC opener used across many scenarios ends with an English topic label
 * ("... sa inyo ukol sa commuting on the mrt / lrt?"). That tail is a UI caption,
 * not Tagalog, and a Filipino voice mangles it. Speak only the Tagalog part.
 */
const SCENARIO_TOPIC_TAIL = /^(.*?\bsa inyo)\s+ukol sa\s+.+?([?!.])$/i;

export function prepareForSynthesis(text: string): string {
  const cleaned = cleanSpeechText(text);
  const withoutTopic = cleaned.replace(SCENARIO_TOPIC_TAIL, '$1$2');
  return normalizeTagalogForSpeech(withoutTopic);
}
