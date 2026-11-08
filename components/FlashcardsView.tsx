'use client';

import React, { useState } from 'react';
import { Volume2, RotateCcw, CheckCircle2, ChevronLeft, ChevronRight, Sparkles, Filter, BookmarkCheck, Gauge } from 'lucide-react';
import { Flashcard } from '../lib/types';
import { playTagalogSpeech } from '../lib/audio-voice';

interface FlashcardsViewProps {
  cards: Flashcard[];
  masteredIds: string[];
  onToggleMastered: (id: string) => void;
  onAddXp: (amount: number) => void;
}

export function FlashcardsView({ cards, masteredIds, onToggleMastered, onAddXp }: FlashcardsViewProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [playingTarget, setPlayingTarget] = useState<'word' | 'example' | null>(null);
  const [filterDifficulty, setFilterDifficulty] = useState<string>('All');
  const [speed, setSpeed] = useState<'normal' | 'slow'>('normal');

  const filteredCards = cards.filter((card) => {
    if (filterDifficulty === 'All') return true;
    return card.difficulty === filterDifficulty;
  });

  const currentCard = filteredCards[currentIndex] || cards[0];

  const handleNext = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev + 1) % filteredCards.length);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev - 1 + filteredCards.length) % filteredCards.length);
  };

  const handlePlayWord = async (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (!currentCard || playingTarget !== null) return;

    setPlayingTarget('word');
    await playTagalogSpeech(currentCard.tagalog, { speed });
    setPlayingTarget(null);
  };

  const handlePlayExample = async (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (!currentCard || playingTarget !== null) return;

    setPlayingTarget('example');
    await playTagalogSpeech(currentCard.exampleSentenceTagalog, { speed });
    setPlayingTarget(null);
  };

  const handleMarkMastered = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!currentCard) return;

    const isAlreadyMastered = masteredIds.includes(currentCard.id);
    onToggleMastered(currentCard.id);

    if (!isAlreadyMastered) {
      onAddXp(15);
    }
  };

  const isCurrentMastered = currentCard && masteredIds.includes(currentCard.id);

  return (
    <div className="space-y-6 max-w-3xl mx-auto pb-12">
      {/* Top Header & Voice Badge */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Vocabulary Flashcards</h1>
            <span className="rounded-full bg-sky-500/10 border border-sky-500/20 px-2.5 py-0.5 text-xs font-semibold text-sky-400">
              {filteredCards.length} Cards
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-2 mt-1">
            <span className="inline-flex items-center gap-1 rounded-full bg-rose-500/10 border border-rose-500/25 px-2.5 py-0.5 text-[11px] font-semibold text-rose-300">
              <Sparkles className="h-3 w-3 text-rose-400" />
              Authentic Female Filipino Voice
            </span>
            <span className="text-xs text-slate-400">
              Tap card to flip for English meaning and example usage.
            </span>
          </div>
        </div>

        {/* Speed & Difficulty Filters */}
        <div className="flex flex-wrap items-center gap-2 self-start sm:self-auto">
          {/* Speed Toggle */}
          <div className="flex items-center rounded-2xl bg-white/[0.04] p-1 border border-white/10">
            <button
              onClick={() => setSpeed('normal')}
              className={`rounded-xl px-2.5 py-1 text-xs font-semibold transition-all ${
                speed === 'normal'
                  ? 'bg-amber-400 text-slate-950 font-bold shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              1.0x
            </button>
            <button
              onClick={() => setSpeed('slow')}
              className={`rounded-xl px-2.5 py-1 text-xs font-semibold transition-all ${
                speed === 'slow'
                  ? 'bg-amber-400 text-slate-950 font-bold shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              0.75x Slow
            </button>
          </div>

          {/* Difficulty Filter */}
          <div className="flex items-center gap-1 rounded-2xl bg-white/[0.04] p-1 border border-white/10">
            {['All', 'Beginner', 'Intermediate'].map((diff) => (
              <button
                key={diff}
                onClick={() => {
                  setFilterDifficulty(diff);
                  setCurrentIndex(0);
                  setIsFlipped(false);
                }}
                className={`rounded-xl px-2.5 py-1 text-xs font-semibold transition-all ${
                  filterDifficulty === diff
                    ? 'bg-sky-500/20 text-sky-300 border border-sky-400/30'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {diff}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Progress tracker */}
      <div className="flex items-center justify-between text-xs text-slate-400">
        <span>
          Card {currentIndex + 1} of {filteredCards.length}
        </span>
        <span className="flex items-center gap-1 text-emerald-400 font-medium">
          <BookmarkCheck className="h-3.5 w-3.5" />
          {masteredIds.length} Mastered
        </span>
      </div>

      {/* 3D Glassmorphic Flip Card */}
      <div
        onClick={() => setIsFlipped(!isFlipped)}
        className="group relative cursor-pointer min-h-[360px] sm:min-h-[400px] w-full rounded-3xl border border-white/15 bg-gradient-to-br from-white/[0.08] via-white/[0.03] to-slate-900/60 p-6 sm:p-10 shadow-2xl backdrop-blur-2xl transition-all duration-300 hover:border-sky-400/40 hover:shadow-sky-500/10"
      >
        {/* Ambient Gloss effect */}
        <div className="absolute inset-0 bg-gradient-to-tr from-sky-500/5 via-transparent to-amber-500/5 pointer-events-none rounded-3xl" />

        {!isFlipped ? (
          /* FRONT SIDE */
          <div className="flex flex-col justify-between h-full min-h-[320px] sm:min-h-[360px]">
            <div className="flex items-center justify-between">
              <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-slate-300 border border-white/10 uppercase tracking-wider">
                {currentCard.partOfSpeech}
              </span>

              <button
                onClick={handlePlayWord}
                className={`flex h-11 w-11 items-center justify-center rounded-2xl border transition-all ${
                  playingTarget === 'word'
                    ? 'bg-amber-400 text-slate-950 border-amber-300 shadow-lg shadow-amber-400/30 scale-105 animate-pulse'
                    : 'bg-white/10 text-white border-white/20 hover:bg-sky-500 hover:border-sky-400 shadow-md'
                }`}
                title="Listen to authentic female Filipino pronunciation"
              >
                <Volume2 className="h-5 w-5" />
              </button>
            </div>

            {/* Central Word Presentation */}
            <div className="text-center my-auto py-6">
              <div className="text-4xl sm:text-6xl font-black text-white tracking-tight">
                {currentCard.tagalog}
              </div>

              {/* Stress breakdown */}
              <div className="mt-2 text-sm sm:text-base font-semibold text-amber-300">
                {currentCard.tagalogWithStress}
              </div>

              {/* Syllable phonetic pronunciation guide */}
              <div className="mt-1 text-xs sm:text-sm font-mono text-slate-400">
                [{currentCard.pronunciationGuide}]
              </div>
            </div>

            {/* Bottom prompt */}
            <div className="flex items-center justify-between text-xs text-slate-400 border-t border-white/10 pt-4">
              <span>Difficulty: <strong className="text-slate-200">{currentCard.difficulty}</strong></span>
              <span className="text-sky-400 group-hover:underline flex items-center gap-1">
                Tap card to flip <RotateCcw className="h-3 w-3" />
              </span>
            </div>
          </div>
        ) : (
          /* BACK SIDE */
          <div className="flex flex-col justify-between h-full min-h-[320px] sm:min-h-[360px]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-sky-400">Meaning</span>
                <span className="text-xs text-slate-400">({currentCard.tagalog})</span>
              </div>
              <button
                onClick={handlePlayWord}
                className={`flex h-9 w-9 items-center justify-center rounded-xl border transition-all ${
                  playingTarget === 'word'
                    ? 'bg-amber-400 text-slate-950 border-amber-300'
                    : 'bg-white/10 text-white border-white/20 hover:bg-sky-500'
                }`}
                title="Listen to word"
              >
                <Volume2 className="h-4 w-4" />
              </button>
            </div>

            {/* English translation */}
            <div className="my-auto py-4 space-y-4">
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white text-center">
                {currentCard.english}
              </h2>

              {/* Example sentence with native female audio */}
              <div className="rounded-2xl bg-white/[0.04] p-4 border border-white/10">
                <div className="flex items-center justify-between mb-1">
                  <div className="text-xs font-semibold text-sky-300">Example Usage:</div>
                  <button
                    onClick={handlePlayExample}
                    className={`flex items-center gap-1 rounded-lg px-2 py-0.5 text-[11px] font-semibold border transition-all ${
                      playingTarget === 'example'
                        ? 'bg-amber-400 text-slate-950 border-amber-300'
                        : 'bg-white/10 text-slate-300 border-white/10 hover:bg-sky-500 hover:text-white'
                    }`}
                    title="Listen to authentic female sentence"
                  >
                    <Volume2 className="h-3 w-3" />
                    <span>Listen</span>
                  </button>
                </div>
                <div className="text-sm sm:text-base font-medium text-white italic">
                  &ldquo;{currentCard.exampleSentenceTagalog}&rdquo;
                </div>
                <div className="text-xs sm:text-sm text-slate-300 mt-1">
                  &ldquo;{currentCard.exampleSentenceEnglish}&rdquo;
                </div>
              </div>

              {/* Cultural Context Note */}
              {currentCard.culturalNote && (
                <div className="rounded-2xl bg-amber-500/10 p-3.5 border border-amber-500/20">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-amber-300 mb-1">
                    <Sparkles className="h-3.5 w-3.5" />
                    <span>Cultural Context & Etiquette</span>
                  </div>
                  <p className="text-xs text-amber-100/90 leading-relaxed">
                    {currentCard.culturalNote}
                  </p>
                </div>
              )}
            </div>

            {/* Card Footer */}
            <div className="flex items-center justify-between border-t border-white/10 pt-4 text-xs">
              <button
                onClick={handleMarkMastered}
                className={`inline-flex items-center gap-1.5 rounded-xl px-3 py-1.5 font-semibold transition-all ${
                  isCurrentMastered
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                    : 'bg-white/10 text-slate-300 hover:bg-emerald-500 hover:text-white border border-white/10'
                }`}
              >
                <CheckCircle2 className="h-4 w-4" />
                <span>{isCurrentMastered ? 'Mastered (+15 XP)' : 'Mark as Mastered'}</span>
              </button>

              <span className="text-slate-400 flex items-center gap-1">
                Tap to flip back <RotateCcw className="h-3 w-3" />
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Navigation Controls */}
      <div className="flex items-center justify-between gap-4">
        <button
          onClick={handlePrev}
          className="flex items-center gap-2 rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white hover:bg-white/10 transition-all active:scale-95"
        >
          <ChevronLeft className="h-4 w-4" />
          <span>Previous</span>
        </button>

        <button
          onClick={handleNext}
          className="flex items-center gap-2 rounded-2xl bg-gradient-to-r from-sky-500 to-indigo-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-sky-500/20 hover:from-sky-400 hover:to-indigo-500 transition-all active:scale-95"
        >
          <span>Next Card</span>
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
