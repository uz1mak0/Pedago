'use client';

import React, { useState } from 'react';
import { Search, BookOpen, Volume2, CheckCircle, HelpCircle, Award, Sparkles, Filter, ChevronRight } from 'lucide-react';
import { GrammarExercise } from '../lib/types';
import { playTagalogSpeech } from '../lib/audio-voice';

interface GrammarViewProps {
  exercises: GrammarExercise[];
  completedTopicIds: string[];
  onToggleCompleteTopic: (id: string) => void;
  onAddXp: (amount: number) => void;
}

export function GrammarView({
  exercises,
  completedTopicIds,
  onToggleCompleteTopic,
  onAddXp
}: GrammarViewProps) {
  const [selectedTopicId, setSelectedTopicId] = useState<string>(exercises[0]?.id || 'grammar-1');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({});
  const [playingAudioId, setPlayingAudioId] = useState<string | null>(null);

  const categories = [
    'All',
    'Focus System',
    'Verbal Aspects',
    'Case Markers',
    'Particles & Enclitics',
    'Pronouns & Demonstratives',
    'Sentences & Syntax',
    'Adjectives & Modifiers',
    'Colloquial & Everyday'
  ];

  // Filtering
  const filteredExercises = exercises.filter((ex) => {
    const matchesCategory = selectedCategory === 'All' || ex.category === selectedCategory;
    const matchesSearch =
      ex.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ex.tagalogTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ex.topic.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ex.formula.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const activeTopic = exercises.find((ex) => ex.id === selectedTopicId) || exercises[0];

  const handlePlayAudio = async (text: string, id: string) => {
    setPlayingAudioId(id);
    await playTagalogSpeech(text);
    setPlayingAudioId((current) => (current === id ? null : current));
  };

  const handleAnswerQuiz = (questionId: string, optionIndex: number, correctIndex: number) => {
    if (quizAnswers[questionId] !== undefined) return; // already answered

    setQuizAnswers((prev) => ({ ...prev, [questionId]: optionIndex }));

    if (optionIndex === correctIndex) {
      onAddXp(20);
      if (activeTopic && !completedTopicIds.includes(activeTopic.id)) {
        onToggleCompleteTopic(activeTopic.id);
      }
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* View Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Grammar & Syntax Mastery</h1>
            <span className="rounded-full bg-indigo-500/10 border border-indigo-500/20 px-2.5 py-0.5 text-xs font-semibold text-indigo-400">
              50 Topics
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Learn the Tagalog focus system, aspect conjugations, case markers (ang/ng/sa), and natural sentence structures.
          </p>
        </div>

        <div className="text-xs font-medium text-emerald-400 rounded-xl bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 self-start sm:self-auto flex items-center gap-1.5">
          <CheckCircle className="h-4 w-4" />
          <span>{completedTopicIds.length} of 50 Topics Completed</span>
        </div>
      </div>

      {/* Search & Category Filter Pills */}
      <div className="space-y-3">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search 50 grammar topics, affixes, or rules (e.g. -um-, enclitics, focus, po)..."
            className="w-full rounded-2xl border border-white/10 bg-white/[0.04] py-3 pl-11 pr-4 text-sm text-white placeholder-slate-400 backdrop-blur-xl focus:border-sky-400/50 focus:outline-none focus:ring-1 focus:ring-sky-400/50"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`whitespace-nowrap rounded-xl px-3 py-1.5 text-xs font-medium transition-all ${
                selectedCategory === cat
                  ? 'bg-sky-500/20 text-sky-300 border border-sky-400/30'
                  : 'bg-white/[0.03] text-slate-400 border border-white/5 hover:text-white hover:bg-white/[0.07]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Main Layout: 50 Topics List (Left) & Topic Details (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Topic Selector (Scrollable 50 items) */}
        <div className="lg:col-span-4 rounded-3xl border border-white/10 bg-white/[0.03] p-3 backdrop-blur-xl max-h-[640px] flex flex-col">
          <div className="flex items-center justify-between px-3 py-2 border-b border-white/10 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Select Lesson ({filteredExercises.length})
            </span>
            <span className="text-[11px] text-sky-400 font-mono">01 - 50</span>
          </div>

          <div className="overflow-y-auto space-y-1.5 pr-1 flex-1">
            {filteredExercises.map((exercise) => {
              const isSelected = activeTopic?.id === exercise.id;
              const isDone = completedTopicIds.includes(exercise.id);
              const numStr = String(exercise.topicNumber).padStart(2, '0');

              return (
                <button
                  key={exercise.id}
                  onClick={() => setSelectedTopicId(exercise.id)}
                  className={`w-full text-left rounded-2xl p-3 transition-all flex items-start gap-2.5 ${
                    isSelected
                      ? 'bg-gradient-to-r from-sky-500/20 to-indigo-500/20 border border-sky-400/40 text-white shadow-md'
                      : 'hover:bg-white/[0.05] border border-transparent text-slate-300'
                  }`}
                >
                  <span className={`font-mono text-xs font-bold pt-0.5 ${isSelected ? 'text-sky-300' : 'text-slate-500'}`}>
                    {numStr}.
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1">
                      <p className={`text-xs font-semibold truncate ${isSelected ? 'text-white' : 'text-slate-200'}`}>
                        {exercise.title}
                      </p>
                      {isDone && <CheckCircle className="h-3.5 w-3.5 text-emerald-400 flex-shrink-0" />}
                    </div>
                    <p className="text-[11px] text-slate-400 truncate mt-0.5">
                      {exercise.tagalogTitle}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Detail Pane */}
        {activeTopic && (
          <div className="lg:col-span-8 space-y-6 rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.05] via-white/[0.02] to-slate-900/60 p-6 sm:p-8 backdrop-blur-2xl">
            {/* Header / Titles */}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 border-b border-white/10 pb-5">
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="rounded-full bg-sky-500/10 border border-sky-500/20 px-2.5 py-0.5 text-[11px] font-semibold text-sky-400">
                    Topic #{activeTopic.topicNumber} &bull; {activeTopic.category}
                  </span>
                  <span className="rounded-full bg-white/10 px-2 py-0.5 text-[11px] font-semibold text-slate-300">
                    {activeTopic.level}
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-white">{activeTopic.title}</h2>
                <p className="text-sm font-medium text-amber-300 mt-0.5">{activeTopic.tagalogTitle}</p>
              </div>

              <button
                onClick={() => onToggleCompleteTopic(activeTopic.id)}
                className={`self-start sm:self-auto inline-flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-semibold transition-all ${
                  completedTopicIds.includes(activeTopic.id)
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                    : 'bg-white/5 text-slate-300 border border-white/10 hover:bg-white/10'
                }`}
              >
                <CheckCircle className="h-4 w-4" />
                <span>{completedTopicIds.includes(activeTopic.id) ? 'Completed' : 'Mark as Done'}</span>
              </button>
            </div>

            {/* Formula Card */}
            <div className="rounded-2xl border border-sky-500/20 bg-sky-500/10 p-4">
              <span className="text-[11px] font-bold uppercase tracking-wider text-sky-400">Grammar Formula / Pattern:</span>
              <p className="text-sm font-mono font-bold text-sky-100 mt-1">{activeTopic.formula}</p>
            </div>

            {/* Detailed Explanation */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Lesson Explanation</h3>
              <p className="text-sm text-slate-200 leading-relaxed">{activeTopic.detailedExplanation}</p>
            </div>

            {/* Sentence Examples with Audio */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">Authentic Sentence Examples</h3>
              <div className="space-y-3">
                {activeTopic.examples.map((example, idx) => (
                  <div
                    key={idx}
                    className="group rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition-all hover:bg-white/[0.06]"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="text-sm sm:text-base font-bold text-white group-hover:text-sky-300 transition-colors">
                          {example.tagalog}
                        </div>
                        <div className="text-xs sm:text-sm text-slate-300 mt-0.5">
                          {example.english}
                        </div>
                        {example.breakdown && (
                          <div className="text-[11px] font-mono text-amber-300/90 mt-1.5">
                            {example.breakdown}
                          </div>
                        )}
                      </div>

                      <button
                        onClick={() => handlePlayAudio(example.tagalog, `ex-${activeTopic.id}-${idx}`)}
                        className={`flex h-9 w-9 items-center justify-center rounded-xl transition-all ${
                          playingAudioId === `ex-${activeTopic.id}-${idx}`
                            ? 'bg-amber-400 text-slate-950 scale-105 shadow-md shadow-amber-400/30'
                            : 'bg-white/10 text-slate-300 hover:bg-sky-500 hover:text-white'
                        }`}
                        title="Listen audio"
                      >
                        <Volume2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Interactive Knowledge Quiz */}
            {activeTopic.quiz.length > 0 && (
              <div className="rounded-2xl border border-white/15 bg-white/[0.04] p-5">
                <div className="flex items-center gap-2 mb-3">
                  <Award className="h-4 w-4 text-amber-400" />
                  <h3 className="text-xs font-bold uppercase tracking-wider text-white">Check Your Understanding (+20 XP)</h3>
                </div>

                {activeTopic.quiz.map((q) => {
                  const userAnswer = quizAnswers[q.id];
                  const hasAnswered = userAnswer !== undefined;

                  return (
                    <div key={q.id} className="space-y-3">
                      <p className="text-sm font-semibold text-slate-100">{q.question}</p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {q.options.map((opt, optIdx) => {
                          const isCorrect = optIdx === q.correctIndex;
                          const isSelected = userAnswer === optIdx;

                          let btnClasses = 'border-white/10 bg-white/[0.04] text-slate-200 hover:bg-white/[0.08]';
                          if (hasAnswered) {
                            if (isCorrect) {
                              btnClasses = 'border-emerald-500/40 bg-emerald-500/20 text-emerald-200 font-bold';
                            } else if (isSelected) {
                              btnClasses = 'border-rose-500/40 bg-rose-500/20 text-rose-200 line-through';
                            }
                          }

                          return (
                            <button
                              key={optIdx}
                              disabled={hasAnswered}
                              onClick={() => handleAnswerQuiz(q.id, optIdx, q.correctIndex)}
                              className={`rounded-xl border p-3 text-left text-xs font-medium transition-all ${btnClasses}`}
                            >
                              {opt}
                            </button>
                          );
                        })}
                      </div>

                      {hasAnswered && (
                        <div
                          className={`rounded-xl p-3 text-xs leading-relaxed border ${
                            userAnswer === q.correctIndex
                              ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-200'
                              : 'bg-rose-500/10 border-rose-500/20 text-rose-200'
                          }`}
                        >
                          <strong>{userAnswer === q.correctIndex ? 'Correct! ' : 'Not quite. '}</strong>
                          {q.explanation}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
