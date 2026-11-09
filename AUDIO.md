# Pedago voice: how it works and how to regenerate it

Every Tagalog phrase in the app (flashcard words and sentences, grammar examples,
scenario dialogue and replies, tutorial phrases) is recorded ahead of time with
**one voice** and bundled in the app (`public/audio/tts`). Same sound on every
phone, works offline, no server.

Playback order (`lib/audio-player.ts`): recorded clip -> old single-word clip ->
device voice, but only if it is a real Filipino voice (never an English one).

## Generate / refresh the recordings

Needs a Google Cloud project with billing enabled and the Text-to-Speech API on.
Easiest from a phone: open https://shell.cloud.google.com (already logged in, has Node + gcloud).

```bash
gcloud services enable texttospeech.googleapis.com
git clone <your-repo-url> && cd Pedago
npm install
npm run audio:generate -- --dry-run   # lists what will be recorded, no network
npm run audio:generate                # records ~250 clips
git add public/audio && git commit -m "Regenerate voice" && git push
```

Then in Termux: `git pull`, `npm run build`, `npx cap sync android`, rebuild the APK.

- Re-running only records new or changed phrases. `-- --force` re-records everything.
- `npm run audio:check` fails if any phrase in the app has no recording (good before a release).
- Other voices / better model: `TTS_VOICE=Aoede` or `TTS_MODEL=gemini-2.5-pro-tts npm run audio:generate -- --force`.
- Added or edited lessons? Just run `npm run audio:generate` again.

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

- Generated with Google Cloud TTS (Gemini TTS, `fil-PH`). Google lists Filipino for
  these models as **Preview**, so listen to a sample after generating.
- `scripts/generate_native_audio.py` (old Google Translate downloader) is replaced by
  this pipeline and can be deleted, as can `public/audio/vocab` once clips are generated.
