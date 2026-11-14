'use client';

import React, { useState } from 'react';
import {
  Volume2,
  ArrowRight,
  Sparkles,
  BookOpen,
  MessageSquare,
  Layers,
  Heart,
  Compass,
} from 'lucide-react';
import { playTagalogSpeech } from '../lib/audio-voice';
import { tutorialPhrases } from '../lib/tutorial-phrases';
import pedagoData from '../lib/pedago_tagalog_data.json';

interface TutorialViewProps {
  onStartLearning: (tab: 'flashcards' | 'grammar' | 'scenarios') => void;
}

export function TutorialView({ onStartLearning }: TutorialViewProps) {
  const [playingWord, setPlayingWord] = useState<string | null>(null);

  const testPhrases = tutorialPhrases;
  const { grammarTopics, scenarios } = pedagoData;

  const handlePlay = async (phrase: string) => {
    setPlayingWord(phrase);
    await playTagalogSpeech(phrase);
    setPlayingWord((current) => (current === phrase ? null : current));
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Hero Welcome Card */}
      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.08] via-white/[0.03] to-transparent p-6 sm:p-10 shadow-2xl backdrop-blur-2xl">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 h-64 w-64 rounded-full bg-sky-500/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-16 -mb-16 h-64 w-64 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-sky-400/20 bg-sky-400/10 px-3 py-1 text-xs font-semibold text-sky-300">
            <Compass className="h-3.5 w-3.5 text-sky-400" />
            <span>Welcome to Pedago</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
            Speak Tagalog Naturally, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-indigo-300 to-amber-300">
              The Way Filipinos Really Speak.
            </span>
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Welcome! As creators from the Philippines, we built <strong>Pedago</strong> for foreigners and passionate language learners who want genuine, high-quality Tagalog. No textbook robotic artificial phrases—only authentic words, accurate pronunciation,{' '}
            <strong>{grammarTopics.length} detailed grammar topics</strong>, and{' '}
            <strong>{scenarios.length} everyday Philippine life scenarios</strong>.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap gap-3 pt-3">
            <button
              onClick={() => onStartLearning('flashcards')}
              className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-sky-500 to-indigo-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-sky-500/25 hover:from-sky-400 hover:to-indigo-500 transition-all hover:scale-105 active:scale-95"
            >
              <Layers className="h-4 w-4" />
              <span>Practice Flashcards</span>
              <ArrowRight className="h-4 w-4" />
            </button>

            <button
              onClick={() => onStartLearning('grammar')}
              className="inline-flex items-center gap-2 rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-bold text-slate-200 hover:bg-white/10 hover:text-white transition-all backdrop-blur-xl"
            >
              <BookOpen className="h-4 w-4 text-sky-400" />
              <span>Explore {grammarTopics.length} Grammar Topics</span>
            </button>

            <button
              onClick={() => onStartLearning('scenarios')}
              className="inline-flex items-center gap-2 rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-bold text-slate-200 hover:bg-white/10 hover:text-white transition-all backdrop-blur-xl"
            >
              <MessageSquare className="h-4 w-4 text-amber-400" />
              <span>Enter {scenarios.length} Scenarios</span>
            </button>
          </div>
        </div>
      </div>

      {/* Interactive Sound Test: Hear Authentic Filipino Speech */}
      <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 sm:p-8 backdrop-blur-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-amber-400" />
              <h2 className="text-lg sm:text-xl font-bold text-white">
                Authentic Female Filipino Voice &amp; Pronunciation
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Tap any phrase to hear our authentic female native Filipino speaker. Notice the pure vowel quality, natural stress, and warm conversational tone.
            </p>
          </div>
          <span className="self-start sm:self-auto rounded-full bg-rose-500/10 border border-rose-500/25 px-3 py-1 text-xs font-semibold text-rose-300">
            Native Female Voice Active
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {testPhrases.map((phrase) => {
            const isPlaying = playingWord === phrase.tagalog;
            return (
              <div
                key={phrase.tagalog}
                onClick={() => handlePlay(phrase.tagalog)}
                className="group cursor-pointer rounded-2xl border border-white/10 bg-slate-900/40 p-4 transition-all hover:border-sky-400/40 hover:bg-white/[0.07] hover:shadow-lg"
              >
                <div className="flex items-center justify-between">
                  <span className="text-base font-bold text-white group-hover:text-sky-300 transition-colors">
                    {phrase.tagalog}
                  </span>
                  <button
                    aria-label="Listen audio"
                    className={`flex h-9 w-9 items-center justify-center rounded-xl transition-all ${isPlaying
                        ? 'bg-amber-400 text-slate-950 scale-110 shadow-md shadow-amber-400/30'
                        : 'bg-white/10 text-slate-300 group-hover:bg-sky-500 group-hover:text-white'
                      }`}
                  >
                    <Volume2 className="h-4 w-4" />
                  </button>
                </div>
                <p className="text-xs font-medium text-slate-300 mt-2">{phrase.english}</p>
                <p className="text-[11px] text-slate-400 mt-0.5">{phrase.note}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4 Core Learning Pillars */}
      <div>
        <h2 className="text-lg sm:text-xl font-bold text-white mb-4">How Pedago Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Pillar 1 */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-xl">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-500/20 text-sky-400 border border-sky-500/30">
                <Volume2 className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">
                  1. Authentic Native Pronunciation
                </h3>
                <p className="text-xs text-slate-400">
                  Accurate Tagalog syllable cadence and glottal stress
                </p>
              </div>
            </div>
            <p className="text-xs text-slate-300 mt-3 leading-relaxed">
              Every word is paired with clear syllable breakdowns (e.g.{' '}
              <em>mah-gahn-DAHNG oo-MAH-gah</em>) and audio to train your ear for natural Philippine conversations.
            </p>
          </div>

          {/* Pillar 2 */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-xl">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
                <BookOpen className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">
                  2. {grammarTopics.length} Comprehensive Grammar Topics
                </h3>
                <p className="text-xs text-slate-400">
                  From the Focus System to Enclitic Particles
                </p>
              </div>
            </div>
            <p className="text-xs text-slate-300 mt-3 leading-relaxed">
              Demystifies the famous Austronesian focus affixes (-um-, mag-, -in-, -an, i-), aspect tenses, personal markers (ang/ng/sa), and everyday particles (po, nga, naman, pala).
            </p>
          </div>

          {/* Pillar 3 */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-xl">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
                <MessageSquare className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">
                  3. {scenarios.length} Authentic Philippine Scenarios
                </h3>
                <p className="text-xs text-slate-400">
                  Jeepneys, Sari-sari stores, Fiestas, and Wet markets
                </p>
              </div>
            </div>
            <p className="text-xs text-slate-300 mt-3 leading-relaxed">
              Step directly into real-life situations with multi-turn dialogues, native etiquette protocols, and cultural context tips practiced by 115+ million Filipinos.
            </p>
          </div>

          {/* Pillar 4 */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-xl">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                <Layers className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">
                  4. Interactive Flashcards &amp; Spaced Repetition
                </h3>
                <p className="text-xs text-slate-400">
                  Master essential words with instant audio playback
                </p>
              </div>
            </div>
            <p className="text-xs text-slate-300 mt-3 leading-relaxed">
              Flip 3D cards to reveal meanings, parts of speech, sample sentences, and cultural notes. Track your mastered vocabulary as you build daily streaks.
            </p>
          </div>
        </div>
      </div>

      {/* Creator's Note */}
      <div className="rounded-2xl border border-white/10 bg-gradient-to-r from-sky-950/40 via-indigo-950/30 to-slate-900/40 p-5 sm:p-6 backdrop-blur-xl">
        <div className="flex items-start gap-3">
          <Heart className="h-5 w-5 text-rose-400 flex-shrink-0 mt-0.5" />
          <div className="space-y-1">
            <p className="text-xs sm:text-sm font-bold text-white">
              A Heartfelt Message from the Creator
            </p>
            <p className="text-xs text-slate-300 leading-relaxed">
              &ldquo;We designed Pedago with zero clutter, zero mandatory cloud logins, and zero fluff so you can focus 100% on learning Tagalog. When you travel to Manila, Cebu, Boracay, or chat with Filipino friends anywhere in the world, your words will carry genuine respect and warmth. Maligayang pag-aaral!&rdquo;
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}