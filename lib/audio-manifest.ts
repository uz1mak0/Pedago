// Loads /audio/manifest.json, written by `npm run audio:generate`.
// It maps a phrase's speechKey() to the recorded clip's file id.

export interface ClipManifest {
  size: number;
  /** File id for this key, or undefined when no clip was generated for it. */
  get(key: string): string | undefined;
}

const EMPTY: ClipManifest = { size: 0, get: () => undefined };

let cached: Promise<ClipManifest> | null = null;

export function loadClipManifest(forceReload = false): Promise<ClipManifest> {
  if (typeof window === 'undefined') return Promise.resolve(EMPTY);

  if (forceReload) {
    cached = null;
  }

  if (!cached) {
    cached = fetch('/audio/manifest.json', { cache: 'no-cache' })
      .then(async (res) => {
        if (!res.ok) throw new Error(`manifest HTTP ${res.status}`);
        const data = (await res.json()) as { clips?: Record<string, string> };
        const clips = new Map(Object.entries(data.clips ?? {}));
        return { size: clips.size, get: (key: string) => clips.get(key) } as ClipManifest;
      })
      .catch((err) => {
        // Do not cache a failure: the next tap retries (e.g. flaky first load).
        cached = null;
        console.warn('Audio manifest unavailable, using fallbacks:', err);
        return EMPTY;
      });
  }
  return cached;
}

export const clipUrl = (fileId: string): string => `/audio/tts/${fileId}.mp3`;
