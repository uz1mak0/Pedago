/**
 * Records EVERY Tagalog phrase in the app with one consistent voice and writes
 *   public/audio/tts/<fileId>.mp3
 *   public/audio/manifest.json   (phrase key -> file id; read by lib/audio-manifest.ts)
 *
 * Uses Google Cloud Text-to-Speech with a Gemini TTS model, language fil-PH.
 *
 *   npm run audio:generate              record whatever is missing or changed
 *   npm run audio:generate -- --force   re-record everything
 *   npm run audio:generate -- --dry-run list what would be recorded (no network)
 *   npm run audio:check                 exit 1 if any phrase has no up-to-date clip (no network)
 *
 * Auth (any one):
 *   GOOGLE_ACCESS_TOKEN=...   or just be logged in with the gcloud CLI
 *   (Google Cloud Shell already is). Project: GOOGLE_CLOUD_PROJECT or gcloud's default.
 *
 * Optional env: TTS_VOICE (default Kore), TTS_MODEL (default gemini-2.5-flash-tts),
 *               TTS_LANGUAGE (default fil-PH), TTS_ENDPOINT, TTS_CONCURRENCY.
 *
 * Re-running is safe and cheap: file ids are a hash of (voice + model + prompt +
 * text), so unchanged phrases are skipped and changed ones get a new file.
 */

import { execSync } from 'node:child_process';
import { existsSync, mkdirSync, readFileSync, readdirSync, renameSync, statSync, unlinkSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { collectSpeechItems, SpeechItem } from '../lib/speech-texts';
import { hashString, prepareForSynthesis } from '../lib/speech-key';

const args = new Set(process.argv.slice(2));
const DRY_RUN = args.has('--dry-run');
const CHECK = args.has('--check');
const FORCE = args.has('--force');

const VOICE = process.env.TTS_VOICE ?? 'Kore';
const MODEL = process.env.TTS_MODEL ?? 'gemini-2.5-flash-tts';
const LANGUAGE = process.env.TTS_LANGUAGE ?? 'fil-PH';
const ENDPOINT = process.env.TTS_ENDPOINT ?? 'https://texttospeech.googleapis.com/v1/text:synthesize';
const CONCURRENCY = Number(process.env.TTS_CONCURRENCY ?? 3);

const PROMPTS = {
  normal:
    'Speak as a native Filipino (Tagalog) speaker from Manila teaching a beginner. ' +
    'Pronounce every Tagalog word correctly, with the right vowels, glottal stops and syllable stress. ' +
    'Use a warm, clear, natural voice at a steady conversational pace.',
  slow:
    'Speak as a native Filipino (Tagalog) speaker from Manila teaching a beginner. ' +
    'Pronounce every Tagalog word correctly, with the right vowels, glottal stops and syllable stress. ' +
    'Speak slowly and distinctly, about 70% of normal speed, with a tiny pause between words, ' +
    'so a learner can hear every syllable.',
} as const;

const ROOT = process.cwd();
const AUDIO_DIR = resolve(ROOT, 'public/audio');
const CLIP_DIR = resolve(AUDIO_DIR, 'tts');
const MANIFEST_PATH = resolve(AUDIO_DIR, 'manifest.json');
const OVERRIDES_PATH = resolve(ROOT, 'scripts/speech-overrides.json');

if (!existsSync(resolve(ROOT, 'package.json'))) {
  console.error('Run this from the project root (the folder with package.json).');
  process.exit(2);
}

// ---------------------------------------------------------------------------
// Pronunciation overrides
// ---------------------------------------------------------------------------

interface Overrides {
  phrases?: Record<string, string>;
  words?: Record<string, string>;
}

function loadOverrides(): Required<Overrides> {
  if (!existsSync(OVERRIDES_PATH)) return { phrases: {}, words: {} };
  const raw = JSON.parse(readFileSync(OVERRIDES_PATH, 'utf8')) as Overrides;
  const strip = (o: Record<string, string> = {}) =>
    Object.fromEntries(Object.entries(o).filter(([k]) => !k.startsWith('_example')));
  return { phrases: strip(raw.phrases), words: strip(raw.words) };
}

const overrides = loadOverrides();
const escapeRegExp = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

function synthesisText(item: SpeechItem): string {
  const phraseKey = Object.keys(overrides.phrases).find((k) => k.toLowerCase() === item.text.toLowerCase());
  if (phraseKey) return overrides.phrases[phraseKey];

  let text = prepareForSynthesis(item.text);
  for (const [word, respelling] of Object.entries(overrides.words)) {
    text = text.replace(new RegExp(`(?<![\\w'-])${escapeRegExp(word)}(?![\\w'-])`, 'gi'), respelling);
  }
  return text;
}

// ---------------------------------------------------------------------------
// Plan
// ---------------------------------------------------------------------------

interface PlanEntry {
  item: SpeechItem;
  synth: string;
  fileId: string;
  file: string;
}

function buildPlan(): PlanEntry[] {
  return collectSpeechItems().map((item) => {
    const synth = synthesisText(item);
    const signature = [MODEL, VOICE, LANGUAGE, PROMPTS[item.variant], synth].join('|');
    const fileId = hashString(signature);
    return { item, synth, fileId, file: resolve(CLIP_DIR, `${fileId}.mp3`) };
  });
}

const isGoodClip = (file: string) => existsSync(file) && statSync(file).size > 1500;

// ---------------------------------------------------------------------------
// Synthesis
// ---------------------------------------------------------------------------

function getAuth(): { token: string; project?: string } {
  const sh = (cmd: string) => execSync(cmd, { stdio: ['ignore', 'pipe', 'ignore'] }).toString().trim();
  let token = process.env.GOOGLE_ACCESS_TOKEN;
  let project = process.env.GOOGLE_CLOUD_PROJECT;
  try {
    token ??= sh('gcloud auth print-access-token');
    project ??= sh('gcloud config get-value project') || undefined;
  } catch {
    // handled below
  }
  if (!token) {
    console.error(
      'No credentials. Set GOOGLE_ACCESS_TOKEN, or log in with gcloud (Google Cloud Shell is already logged in):\n' +
        '  gcloud auth login'
    );
    process.exit(2);
  }
  return { token, project };
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

function looksLikeMp3(buf: Buffer): boolean {
  const id3 = buf[0] === 0x49 && buf[1] === 0x44 && buf[2] === 0x33;
  const frame = buf[0] === 0xff && (buf[1] & 0xe0) === 0xe0;
  return id3 || frame;
}

async function synthesize(entry: PlanEntry, auth: { token: string; project?: string }): Promise<Buffer> {
  const body = {
    input: { text: entry.synth, prompt: PROMPTS[entry.item.variant] },
    voice: { languageCode: LANGUAGE, name: VOICE, modelName: MODEL },
    audioConfig: { audioEncoding: 'MP3' },
  };

  let lastError = '';
  for (let attempt = 1; attempt <= 4; attempt++) {
    try {
      const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${auth.token}`,
          'Content-Type': 'application/json',
          ...(auth.project ? { 'x-goog-user-project': auth.project } : {}),
        },
        body: JSON.stringify(body),
      });

      if (res.status === 429 || res.status >= 500) {
        lastError = `HTTP ${res.status}`;
      } else if (!res.ok) {
        // 4xx other than 429 will not get better by retrying.
        throw new Error(`HTTP ${res.status}: ${(await res.text()).slice(0, 400)}`);
      } else {
        const json = (await res.json()) as { audioContent?: string };
        const audio = Buffer.from(json.audioContent ?? '', 'base64');
        if (audio.length < 1500 || !looksLikeMp3(audio)) {
          lastError = `response was not a valid MP3 (${audio.length} bytes)`;
        } else {
          return audio;
        }
      }
    } catch (err) {
      if (err instanceof Error && err.message.startsWith('HTTP 4')) throw err;
      lastError = err instanceof Error ? err.message : String(err);
    }
    await sleep(800 * 2 ** (attempt - 1));
  }
  throw new Error(`gave up after retries: ${lastError}`);
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

function writeManifest(plan: PlanEntry[]) {
  const clips: Record<string, string> = {};
  for (const e of plan) if (isGoodClip(e.file)) clips[e.item.key] = e.fileId;

  const tmp = `${MANIFEST_PATH}.tmp`;
  writeFileSync(
    tmp,
    JSON.stringify({ version: 1, voice: { model: MODEL, name: VOICE, language: LANGUAGE }, clips }, null, 2) + '\n'
  );
  renameSync(tmp, MANIFEST_PATH);
}

function pruneOrphans(plan: PlanEntry[]) {
  const wanted = new Set(plan.map((e) => `${e.fileId}.mp3`));
  let removed = 0;
  for (const name of readdirSync(CLIP_DIR)) {
    if (name.endsWith('.mp3') && !wanted.has(name)) {
      unlinkSync(resolve(CLIP_DIR, name));
      removed++;
    }
  }
  if (removed) console.log(`Removed ${removed} outdated clip(s).`);
}

async function main() {
  mkdirSync(CLIP_DIR, { recursive: true });

  const plan = buildPlan();
  // Different on-screen phrases can share one recording (e.g. the scenario openers
  // differ only by an English caption), so record each distinct file once.
  const seenFiles = new Set<string>();
  const todo = plan.filter((e) => {
    if (seenFiles.has(e.fileId)) return false;
    seenFiles.add(e.fileId);
    return FORCE || !isGoodClip(e.file);
  });
  const slow = plan.filter((e) => e.item.variant === 'slow').length;
  console.log(
    `${plan.length} phrases (${plan.length - slow} normal + ${slow} slow) | voice ${VOICE} | model ${MODEL} | ${LANGUAGE}`
  );
  console.log(`${seenFiles.size} distinct recordings: ${seenFiles.size - todo.length} already done, ${todo.length} to record.`);

  if (CHECK) {
    const missing = plan.filter((e) => !isGoodClip(e.file));
    if (missing.length) {
      console.error(`\n${missing.length} phrase(s) have no up-to-date recording, e.g.:`);
      missing.slice(0, 8).forEach((e) => console.error(`  - ${e.item.text}`));
      console.error('\nRun: npm run audio:generate');
      process.exit(1);
    }
    console.log('All phrases have recordings.');
    return;
  }

  if (DRY_RUN) {
    todo.forEach((e) => console.log(`  [${e.item.variant}] ${e.item.text}${e.synth !== e.item.text ? `  ->  ${e.synth}` : ''}`));
    return;
  }

  if (todo.length) {
    const auth = getAuth();
    const failures: { text: string; error: string }[] = [];
    let done = 0;
    let next = 0;

    const worker = async () => {
      while (next < todo.length) {
        const entry = todo[next++];
        try {
          const audio = await synthesize(entry, auth);
          writeFileSync(entry.file, audio);
          console.log(`[${++done}/${todo.length}] ${entry.item.variant === 'slow' ? '(slow) ' : ''}${entry.item.text}`);
        } catch (err) {
          const error = err instanceof Error ? err.message : String(err);
          failures.push({ text: entry.item.text, error });
          console.error(`FAILED: ${entry.item.text}\n        ${error}`);
          // A bad request (wrong voice/model/permissions) fails every phrase: stop early.
          if (/^HTTP (400|401|403|404)/.test(error) && done === 0 && failures.length >= 3) {
            console.error('\nThe first requests were all rejected, so something is misconfigured. Stopping.');
            next = todo.length;
          }
        }
      }
    };
    await Promise.all(Array.from({ length: Math.max(1, CONCURRENCY) }, worker));

    writeManifest(plan);
    pruneOrphans(plan);

    if (failures.length) {
      console.error(`\n${failures.length} phrase(s) failed. Re-run the same command to retry only those.`);
      process.exit(1);
    }
  } else {
    writeManifest(plan);
    pruneOrphans(plan);
  }

  console.log(`\nDone. Manifest: ${MANIFEST_PATH}`);
  console.log('Next: listen to a few clips, then `npm run build` and `npx cap sync android`.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
