import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { initialFlashcards, conversationScenarios } from './tagalog-data';
import { tutorialPhrases } from './tutorial-phrases';
import { collectSpeechItems } from './speech-texts';
import { normalizeTagalogForSpeech, prepareForSynthesis, speechKey } from './speech-key';

// ---------------------------------------------------------------------------
// Keys & respelling
// ---------------------------------------------------------------------------

test('speechKey ignores case, spacing and curly quotes but not punctuation', () => {
  assert.equal(speechKey('Salamat  po.'), speechKey(' salamat po. '));
  assert.equal(speechKey('Ano’ng pangalan mo?'), speechKey("ano'ng pangalan mo?"));
  assert.notEqual(speechKey('Kumusta ka?'), speechKey('Kumusta ka.'), '? and . sound different');
  assert.notEqual(speechKey('Salamat'), speechKey('Salamat', 'slow'));
});

test('respelling fixes mga/ng/& but leaves contractions and ligatures alone', () => {
  assert.equal(normalizeTagalogForSpeech('Ang mga bata ng bayan'), 'Ang manga bata nang bayan');
  assert.equal(normalizeTagalogForSpeech("Ano'ng oras na?"), "Ano'ng oras na?");
  assert.equal(normalizeTagalogForSpeech('Magandang umaga'), 'Magandang umaga');
  assert.equal(normalizeTagalogForSpeech('fishballs & kwek-kwek'), 'fishballs at kwek-kwek');
});

test('scenario opener drops its English topic caption before synthesis', () => {
  assert.equal(
    prepareForSynthesis('Magandang araw po! May maipaglilingkod po ba ako sa inyo ukol sa commuting on the mrt / lrt?'),
    'Magandang araw po! May maipaglilingkod po ba ako sa inyo?'
  );
});

// ---------------------------------------------------------------------------
// Coverage: everything the UI can speak is in the list the generator records
// ---------------------------------------------------------------------------

test('every phrase the UI plays is collected for recording', () => {
  const keys = new Set(collectSpeechItems().map((i) => i.key));

  for (const card of initialFlashcards) {
    for (const variant of ['normal', 'slow'] as const) {
      assert.ok(keys.has(speechKey(card.tagalog, variant)), `flashcard word ${card.tagalog} (${variant})`);
      assert.ok(keys.has(speechKey(card.exampleSentenceTagalog, variant)), `flashcard example ${card.id} (${variant})`);
    }
  }
  for (const scenario of conversationScenarios) {
    for (const node of scenario.dialogue) {
      assert.ok(keys.has(speechKey(node.tagalog)), `${scenario.id}/${node.id}`);
      node.choices?.forEach((c) => assert.ok(keys.has(speechKey(c.textTagalog)), `${scenario.id}/${node.id} choice`));
    }
  }
  for (const p of tutorialPhrases) assert.ok(keys.has(speechKey(p.tagalog)), `tutorial ${p.tagalog}`);
});

test('if recordings have been generated, the manifest covers every phrase', (t) => {
  const manifest = JSON.parse(readFileSync(resolve(process.cwd(), 'public/audio/manifest.json'), 'utf8')) as {
    clips: Record<string, string>;
  };
  if (Object.keys(manifest.clips).length === 0) {
    t.skip('no recordings generated yet (run: npm run audio:generate)');
    return;
  }
  const missing = collectSpeechItems().filter((i) => !manifest.clips[i.key]);
  assert.deepEqual(missing.map((m) => m.text), [], 'phrases without a recording; re-run npm run audio:generate');
});

// ---------------------------------------------------------------------------
// Player behaviour (browser APIs faked)
// ---------------------------------------------------------------------------

interface FakeAudio {
  url: string;
  playbackRate: number;
  currentTime: number;
  onplaying: (() => void) | null;
  onended: (() => void) | null;
  onerror: (() => void) | null;
}
const created: FakeAudio[] = [];
let behaviour: 'finish' | 'hang' | 'error' = 'finish';
const spoken: string[] = [];
let webVoices: { lang: string; name: string }[] = [];

class FakeAudioElement implements FakeAudio {
  playbackRate = 1;
  currentTime = 0;
  preload = '';
  preservesPitch = false;
  onplaying: (() => void) | null = null;
  onended: (() => void) | null = null;
  onerror: (() => void) | null = null;
  constructor(public url: string) {
    created.push(this);
  }
  pause() {}
  play() {
    if (behaviour === 'error') setTimeout(() => this.onerror?.(), 1);
    if (behaviour === 'finish') {
      setTimeout(() => this.onplaying?.(), 1);
      setTimeout(() => this.onended?.(), 3);
    }
    if (behaviour === 'hang') setTimeout(() => this.onplaying?.(), 1);
    return Promise.resolve();
  }
}

const g = globalThis as unknown as Record<string, unknown>;
g.window = globalThis;
g.Audio = FakeAudioElement;
g.speechSynthesis = {
  getVoices: () => webVoices,
  speak: (u: { text: string }) => spoken.push(u.text),
  cancel: () => {},
  addEventListener: () => {},
  removeEventListener: () => {},
};
g.SpeechSynthesisUtterance = class {
  constructor(public text: string) {}
};
g.fetch = async () => ({
  ok: true,
  json: async () => ({
    clips: {
      [speechKey('Salamat')]: 'normal-id',
      [speechKey('Salamat', 'slow')]: 'slow-id',
      [speechKey('Kumusta')]: 'kumusta-id', // no slow recording
    },
  }),
});

test('plays the recorded clip, firing onStart/onEnd once', async () => {
  const { audioEngine } = await import('./audio-player');
  behaviour = 'finish';
  let starts = 0;
  let ends = 0;
  const ok = await audioEngine.speak('Salamat', { onStart: () => starts++, onEnd: () => ends++ });
  assert.equal(ok, true);
  assert.equal(created.at(-1)?.url, '/audio/tts/normal-id.mp3');
  assert.deepEqual([starts, ends], [1, 1]);
});

test('slow speed uses the natively slow recording, or slows the normal one as a fallback', async () => {
  const { audioEngine } = await import('./audio-player');
  behaviour = 'finish';

  await audioEngine.speak('Salamat', { speed: 'slow' });
  assert.equal(created.at(-1)?.url, '/audio/tts/slow-id.mp3');
  assert.equal(created.at(-1)?.playbackRate, 1);

  await audioEngine.speak('Kumusta', { speed: 'slow' });
  assert.equal(created.at(-1)?.url, '/audio/tts/kumusta-id.mp3');
  assert.equal(created.at(-1)?.playbackRate, 0.85);
});

test('stop() releases an awaiting speak() and does not fall back to a device voice', async () => {
  const { audioEngine } = await import('./audio-player');
  behaviour = 'hang';
  spoken.length = 0;
  webVoices = [{ lang: 'fil-PH', name: 'Filipino' }];

  const pending = audioEngine.speak('Salamat');
  await new Promise((r) => setTimeout(r, 10));
  audioEngine.stop();

  const ok = await Promise.race([pending, new Promise<string>((r) => setTimeout(() => r('HUNG'), 200))]);
  assert.equal(ok, false);
  assert.deepEqual(spoken, [], 'must not start device speech after an interruption');
});

test('a newer speak() interrupts the older one instead of leaving it hanging', async () => {
  const { audioEngine } = await import('./audio-player');
  behaviour = 'hang';
  const first = audioEngine.speak('Salamat');
  await new Promise((r) => setTimeout(r, 10));
  behaviour = 'finish';
  const second = audioEngine.speak('Kumusta');
  assert.equal(await first, false);
  assert.equal(await second, true);
});

test('never speaks Tagalog with a non-Filipino device voice', async () => {
  const { audioEngine } = await import('./audio-player');
  spoken.length = 0;
  webVoices = [{ lang: 'en-US', name: 'Samantha' }];
  let error: Error | undefined;

  const ok = await audioEngine.speak('Isang hindi nakarekord na pangungusap.', { onError: (e) => (error = e) });
  assert.equal(ok, false);
  assert.deepEqual(spoken, []);
  assert.ok(error, 'caller is told no Filipino voice was available');
});

test('uses a real Filipino device voice when there is no recording', async () => {
  const { audioEngine } = await import('./audio-player');
  spoken.length = 0;
  webVoices = [{ lang: 'en-US', name: 'Samantha' }, { lang: 'fil-PH', name: 'Google Filipino' }];
  // fake the utterance finishing as soon as it is queued
  (g.speechSynthesis as { speak: (u: { text: string; voice?: unknown; onstart?: () => void; onend?: () => void }) => void }).speak = (u) => {
    spoken.push(u.text);
    setTimeout(() => {
      u.onstart?.();
      u.onend?.();
    }, 1);
  };
  const ok = await audioEngine.speak('Ang mga bata ng bayan.');
  assert.equal(ok, true);
  assert.deepEqual(spoken, ['Ang manga bata nang bayan.']);
});

test('a clip that fails to load falls through to the next tier and is not cached', async () => {
  const { audioEngine } = await import('./audio-player');
  webVoices = [];
  spoken.length = 0;
  behaviour = 'error';
  const before = created.length;
  assert.equal(await audioEngine.speak('Salamat'), false); // no legacy/device voice either here
  behaviour = 'finish';
  assert.equal(await audioEngine.speak('Salamat'), true, 'retries with a fresh element after the failure');
  assert.ok(created.length > before + 1, 'a new Audio element was created after the error');
});
