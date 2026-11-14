// Single source of truth for "every Tagalog phrase the app can speak".
// Used by the generator script (what to record) and by tests (coverage).
// NOT imported by the app UI, so it does not ship in the bundle.

import { initialFlashcards, grammarExercises, conversationScenarios } from './tagalog-data';
import pedagoData from './pedago_100_schema_matched.json';
import { tutorialPhrases } from './tutorial-phrases';
import { cleanSpeechText, speechKey, SpeechVariant } from './speech-key';

export interface SpeechItem {
  key: string;
  text: string; // display text (cleaned)
  variant: SpeechVariant;
  sources: string[];
}

export function collectSpeechItems(): SpeechItem[] {
  const items = new Map<string, SpeechItem>();

  const add = (raw: string | undefined, source: string, variant: SpeechVariant = 'normal') => {
    if (!raw) return;
    const text = cleanSpeechText(raw);
    if (!text) return;
    const key = speechKey(text, variant);
    const existing = items.get(key);
    if (existing) {
      if (existing.text.toLowerCase() !== text.toLowerCase()) {
        throw new Error(`Speech key collision: "${existing.text}" vs "${text}"`);
      }
      existing.sources.push(source);
      return;
    }
    items.set(key, { key, text, variant, sources: [source] });
  };

  // Flashcards have a speed toggle, so they also get a natively-slow recording.
  for (const card of initialFlashcards) {
    for (const variant of ['normal', 'slow'] as const) {
      add(card.tagalog, `flashcard:${card.id}:word`, variant);
      add(card.exampleSentenceTagalog, `flashcard:${card.id}:example`, variant);
    }
  }

  for (const topic of grammarExercises) {
    topic.examples.forEach((ex, i) => add(ex.tagalog, `grammar:${topic.id}:example-${i}`));
  }

  for (const topic of pedagoData.grammarExercises) {
    topic.examples.forEach((ex, i) => add(ex.tagalog, `pedago-grammar:${topic.id}:example-${i}`));
  }

  // ScenariosView plays node.tagalog for every line, including the learner's own
  // chosen replies (built from choice.textTagalog).
  for (const scenario of conversationScenarios) {
    for (const node of scenario.dialogue) {
      add(node.tagalog, `scenario:${scenario.id}:${node.id}`);
      node.choices?.forEach((c, i) => add(c.textTagalog, `scenario:${scenario.id}:${node.id}:choice-${i}`));
    }
  }

  for (const scenario of pedagoData.scenarios) {
    for (const node of scenario.dialogue) {
      add(node.tagalog, `pedago-scenario:${scenario.id}:${node.id}`);
      if ('choices' in node && Array.isArray(node.choices)) {
        node.choices.forEach((c, i) =>
          add(c.textTagalog, `pedago-scenario:${scenario.id}:${node.id}:choice-${i}`)
        );
      }
    }
  }

  tutorialPhrases.forEach((p, i) => add(p.tagalog, `tutorial:${i}`));

  return [...items.values()];
}
