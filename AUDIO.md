# Pedago voice: how it works and how to regenerate it

Every Tagalog phrase in the app (flashcard words and sentences, grammar examples,
scenario dialogue and replies, tutorial phrases) is recorded ahead of time with
**one voice** and bundled in the app (`public/audio/tts`). Same sound on every
phone, works offline, no server.

Playback order (`lib/audio-player.ts`): recorded clip -> old single-word clip ->
device voice, but only if it is a real Filipino voice (never an English one).

## Generate / refresh the recordings (free)

Uses Microsoft's neural Filipino voices through the free `edge-tts` tool. No account,
no billing. Easiest from a phone: https://shell.cloud.google.com (free, has Node + Python).

```bash
git clone <your-repo-url> && cd Pedago     # or: git pull
pip install -U edge-tts
export PATH="$PATH:$HOME/.local/bin"
npm install
npm run audio:generate -- --dry-run         # lists what will be recorded, no network
npm run audio:generate                      # records ~250 clips
git add public/audio && git commit -m "Regenerate voice" && git push
```

Then in Termux: `git pull`, `npm run build`, `npx cap sync android`, rebuild the APK.

- Re-running only records new or changed phrases. `-- --force` re-records everything.
- `npm run audio:check` fails if any phrase in the app has no recording.
- Male voice: `TTS_VOICE=fil-PH-AngeloNeural npm run audio:generate -- --force`
- Added or edited lessons? Just run `npm run audio:generate` again.
- Paid alternative (Google Gemini TTS): `TTS_PROVIDER=google npm run audio:generate`.

## Fixing one phrase that sounds wrong

Edit `scripts/speech-overrides.json`, then run `npm run audio:generate`:

```json
{
  "phrases": { "Pasalubong": "pasalubóng" },
  "words":   { "mrt": "em ar ti" }
}
```

`phrases` replaces the text for one exact on-screen phrase; `words` respells a word
everywhere. Only the affected clips are re-recorded.

## Notes

- `edge-tts` uses Microsoft's Edge "Read Aloud" service. It is free but unofficial, so
  check the terms before publishing commercially. If it starts failing, run `pip install -U edge-tts`.
- Listen to a sample after generating (ng sounds, po, Pasalubong, Makisuyo).
- `scripts/generate_native_audio.py` (old Google Translate downloader) is replaced by
  this pipeline and can be deleted, as can `public/audio/vocab` once clips are generated.
