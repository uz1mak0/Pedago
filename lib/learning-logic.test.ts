import test from 'node:test';
import assert from 'node:assert/strict';
import { grammarExercises } from './data/grammar-topics';
import { conversationScenarios } from './data/scenarios-data';
import { initialFlashcards } from './tagalog-data';
import { normalizeTagalogForSpeech } from './audio-voice';

test('Grammar exercises has exactly 50 authentic topics', () => {
  assert.equal(grammarExercises.length, 50, 'Must have 50 grammar topics');

  grammarExercises.forEach((exercise, idx) => {
    assert.ok(exercise.title, `Topic #${idx + 1} must have a title`);
    assert.ok(exercise.formula, `Topic #${idx + 1} must have a formula`);
    assert.ok(exercise.detailedExplanation, `Topic #${idx + 1} must have detailed explanation`);
    assert.ok(exercise.examples.length >= 2, `Topic #${idx + 1} must have at least 2 examples`);
    assert.ok(exercise.quiz.length >= 1, `Topic #${idx + 1} must have at least 1 quiz question`);
  });
});

test('Conversation scenarios has exactly 50 authentic Philippine scenarios', () => {
  assert.equal(conversationScenarios.length, 50, 'Must have 50 conversation scenarios');

  conversationScenarios.forEach((scen, idx) => {
    assert.ok(scen.title, `Scenario #${idx + 1} must have a title`);
    assert.ok(scen.dialogue.length >= 2, `Scenario #${idx + 1} must have multi-node dialogue`);
    const hasTerminal = scen.dialogue.some(node => node.isTerminal);
    assert.ok(hasTerminal, `Scenario #${idx + 1} must have at least one terminal node`);
  });
});

test('Flashcards set is populated with 25 authentic cards', () => {
  assert.equal(initialFlashcards.length, 25);
  initialFlashcards.forEach((card) => {
    assert.ok(card.tagalog);
    assert.ok(card.english);
    assert.ok(card.pronunciationGuide);
  });
});

test('Tagalog speech normalizer expands "ng" and "mga"', () => {
  const normalized = normalizeTagalogForSpeech('Salamat sa mga kaibigan ng kapatid ko.');
  assert.ok(normalized.includes('manga'), 'Must expand mga to manga');
  assert.ok(normalized.includes('nang'), 'Must expand standalone ng to nang');
});
