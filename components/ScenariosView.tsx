'use client';

import React, { useState } from 'react';
import { Search, MessageSquare, Volume2, CheckCircle2, Sparkles, MapPin, Award, RotateCcw, ChevronRight, User, ShieldCheck } from 'lucide-react';
import { Scenario, DialogueNode, DialogueChoice } from '../lib/types';
import { playTagalogSpeech } from '../lib/audio-voice';

interface ScenariosViewProps {
  scenarios: Scenario[];
  completedScenarioIds: string[];
  onCompleteScenario: (id: string, xp: number) => void;
}

export function ScenariosView({
  scenarios,
  completedScenarioIds,
  onCompleteScenario
}: ScenariosViewProps) {
  const [selectedScenarioId, setSelectedScenarioId] = useState<string | null>(null);
  const [currentNodeId, setCurrentNodeId] = useState<string>('node-1');
  const [dialogueHistory, setDialogueHistory] = useState<DialogueNode[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [playingAudioId, setPlayingAudioId] = useState<string | null>(null);
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);

  const categories = ['All', 'Travel', 'Food & Dining', 'Daily Life', 'Community', 'Family & Social'];

  const filteredScenarios = scenarios.filter((scen) => {
    const matchesCat = selectedCategory === 'All' || scen.category === selectedCategory;
    const matchesSearch =
      scen.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      scen.titleTagalog.toLowerCase().includes(searchQuery.toLowerCase()) ||
      scen.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      scen.culturalContext.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const activeScenario = scenarios.find((s) => s.id === selectedScenarioId) || null;
  const currentNode = activeScenario?.dialogue.find((node) => node.id === currentNodeId);

  const handleStartScenario = (scenario: Scenario) => {
    setSelectedScenarioId(scenario.id);
    setCurrentNodeId('node-1');
    const firstNode = scenario.dialogue.find((n) => n.id === 'node-1') || scenario.dialogue[0];
    setDialogueHistory(firstNode ? [firstNode] : []);
    setFeedbackMessage(null);
  };

  const handleSelectChoice = (choice: DialogueChoice) => {
    if (!activeScenario) return;

    if (choice.culturalFeedback) {
      setFeedbackMessage(choice.culturalFeedback);
    }

    const nextNode = activeScenario.dialogue.find((n) => n.id === choice.nextNodeId);
    if (nextNode) {
      // Add user choice representation to history
      const userNode: DialogueNode = {
        id: `user-${Date.now()}`,
        speaker: 'user',
        speakerName: 'You',
        tagalog: choice.textTagalog,
        english: choice.textEnglish,
      };

      setDialogueHistory((prev) => [...prev, userNode, nextNode]);
      setCurrentNodeId(nextNode.id);

      if (nextNode.isTerminal) {
        if (!completedScenarioIds.includes(activeScenario.id)) {
          onCompleteScenario(activeScenario.id, activeScenario.xpReward);
        }
      }
    }
  };

  const handlePlayAudio = async (text: string, id: string) => {
    setPlayingAudioId(id);
    await playTagalogSpeech(text);
    setPlayingAudioId((current) => (current === id ? null : current));
  };

  const handleReset = () => {
    if (activeScenario) {
      handleStartScenario(activeScenario);
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Daily Conversational Scenarios</h1>
            <span className="rounded-full bg-amber-500/10 border border-amber-500/20 px-2.5 py-0.5 text-xs font-semibold text-amber-400">
              50 Scenarios
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Immerse in authentic real-life Philippine dialogues: Jeepneys, Carinderias, Palengke wet markets, and Town Fiestas.
          </p>
        </div>

        <div className="text-xs font-medium text-amber-300 rounded-xl bg-amber-500/10 border border-amber-500/20 px-3 py-1.5 self-start sm:self-auto flex items-center gap-1.5">
          <CheckCircle2 className="h-4 w-4 text-amber-400" />
          <span>{completedScenarioIds.length} of 50 Scenarios Mastered</span>
        </div>
      </div>

      {/* If a scenario is ACTIVE, render the interactive dialogue theater */}
      {activeScenario ? (
        <div className="space-y-6">
          {/* Header of Active Scenario */}
          <div className="rounded-3xl border border-white/10 bg-slate-900/60 p-5 sm:p-6 backdrop-blur-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="rounded-full bg-amber-500/10 border border-amber-500/20 px-2.5 py-0.5 text-[11px] font-semibold text-amber-400">
                  Scenario #{activeScenario.scenarioNumber} &bull; {activeScenario.category}
                </span>
                <span className="flex items-center gap-1 text-[11px] text-slate-400">
                  <MapPin className="h-3 w-3 text-sky-400" />
                  {activeScenario.location}
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">{activeScenario.title}</h2>
              <p className="text-xs sm:text-sm font-medium text-amber-300">{activeScenario.titleTagalog}</p>
            </div>

            <div className="flex items-center gap-2 self-start sm:self-auto">
              <button
                onClick={handleReset}
                className="flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold text-slate-300 hover:bg-white/10"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                <span>Restart</span>
              </button>
              <button
                onClick={() => setSelectedScenarioId(null)}
                className="rounded-xl bg-white/10 px-3.5 py-1.5 text-xs font-semibold text-white hover:bg-white/20"
              >
                Back to All 50
              </button>
            </div>
          </div>

          {/* Cultural Tip Pill */}
          <div className="rounded-2xl border border-amber-500/20 bg-amber-500/10 p-4">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-300 mb-1">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Cultural Protocol & Context</span>
            </div>
            <p className="text-xs text-amber-100/90 leading-relaxed">
              {activeScenario.culturalContext}
            </p>
          </div>

          {/* Dialogue Feed */}
          <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-4 sm:p-6 backdrop-blur-2xl space-y-4 max-h-[500px] overflow-y-auto">
            {dialogueHistory.map((node, index) => {
              const isNpc = node.speaker === 'npc';
              return (
                <div
                  key={`${node.id}-${index}`}
                  className={`flex gap-3 max-w-[85%] ${isNpc ? 'mr-auto' : 'ml-auto flex-row-reverse'}`}
                >
                  <div
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl border text-xs font-bold ${
                      isNpc
                        ? 'bg-sky-500/20 text-sky-300 border-sky-400/30'
                        : 'bg-amber-500/20 text-amber-300 border-amber-400/30'
                    }`}
                  >
                    {isNpc ? node.speakerName.charAt(0) : <User className="h-4 w-4" />}
                  </div>

                  <div
                    className={`rounded-2xl p-4 border shadow-md space-y-1 ${
                      isNpc
                        ? 'bg-slate-900/80 border-white/10 text-white'
                        : 'bg-gradient-to-r from-sky-600 to-indigo-600 border-sky-400/30 text-white'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-4">
                      <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                        {node.speakerName}
                      </span>
                      {isNpc && (
                        <button
                          onClick={() => handlePlayAudio(node.tagalog, `node-${index}`)}
                          className={`flex h-7 w-7 items-center justify-center rounded-lg transition-all ${
                            playingAudioId === `node-${index}`
                              ? 'bg-amber-400 text-slate-950'
                              : 'bg-white/10 text-slate-300 hover:bg-sky-500 hover:text-white'
                          }`}
                          title="Listen pronunciation"
                        >
                          <Volume2 className="h-3.5 w-3.5" />
                        </button>
                      )}
                    </div>

                    <div className="text-sm sm:text-base font-bold">{node.tagalog}</div>
                    <div className="text-xs text-slate-300/90 italic">{node.english}</div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Feedback & User Choices */}
          {feedbackMessage && (
            <div className="rounded-2xl border border-sky-500/30 bg-sky-500/10 p-3.5 text-xs text-sky-200 flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-sky-400 shrink-0" />
              <span>{feedbackMessage}</span>
            </div>
          )}

          {/* Choices Options or Completion Screen */}
          {currentNode && !currentNode.isTerminal && currentNode.choices && (
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Choose Your Response (How would a Filipino speak?):
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {currentNode.choices.map((choice, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSelectChoice(choice)}
                    className="group rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-left transition-all hover:border-sky-400/50 hover:bg-white/[0.08] hover:shadow-lg active:scale-98"
                  >
                    <div className="text-sm font-bold text-white group-hover:text-sky-300 transition-colors">
                      &ldquo;{choice.textTagalog}&rdquo;
                    </div>
                    <div className="text-xs text-slate-300 mt-1">
                      &ldquo;{choice.textEnglish}&rdquo;
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Terminal / Completion Node */}
          {currentNode?.isTerminal && (
            <div className="rounded-3xl border border-emerald-500/30 bg-emerald-500/10 p-6 text-center space-y-3 backdrop-blur-xl">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                <Award className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-white">Scenario Complete! (+{activeScenario.xpReward} XP)</h3>
              <p className="text-xs text-emerald-200/90 max-w-md mx-auto">
                Excellent job! You successfully conversed using authentic Filipino cultural etiquette and polite phrasing.
              </p>
              <div className="pt-2 flex justify-center gap-3">
                <button
                  onClick={handleReset}
                  className="rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold text-white hover:bg-white/10"
                >
                  Practice Again
                </button>
                <button
                  onClick={() => setSelectedScenarioId(null)}
                  className="rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 px-5 py-2 text-xs font-bold text-white shadow-md"
                >
                  Next Scenario
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Scenario List View (All 50 Scenarios) */
        <div className="space-y-4">
          {/* Search & Categories */}
          <div className="space-y-3">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search 50 Philippine scenarios (e.g. Jeepney, Taho, Palengke, Fiesta, Tricycle, Jollibee)..."
                className="w-full rounded-2xl border border-white/10 bg-white/[0.04] py-3 pl-11 pr-4 text-sm text-white placeholder-slate-400 backdrop-blur-xl focus:border-amber-400/50 focus:outline-none focus:ring-1 focus:ring-amber-400/50"
              />
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`whitespace-nowrap rounded-xl px-3 py-1.5 text-xs font-medium transition-all ${
                    selectedCategory === cat
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-400/30'
                      : 'bg-white/[0.03] text-slate-400 border border-white/5 hover:text-white hover:bg-white/[0.07]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Grid of 50 Scenarios */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredScenarios.map((scen) => {
              const isMastered = completedScenarioIds.includes(scen.id);
              const numStr = String(scen.scenarioNumber).padStart(2, '0');

              return (
                <div
                  key={scen.id}
                  onClick={() => handleStartScenario(scen)}
                  className="group cursor-pointer rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.05] via-white/[0.02] to-slate-900/50 p-5 backdrop-blur-xl transition-all duration-300 hover:border-amber-400/40 hover:bg-white/[0.08] hover:shadow-xl hover:-translate-y-1 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-1.5">
                        <span className="font-mono text-xs font-bold text-amber-400/90">#{numStr}</span>
                        <span className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] font-semibold text-slate-300">
                          {scen.category}
                        </span>
                      </div>
                      {isMastered ? (
                        <span className="flex items-center gap-1 text-[11px] font-semibold text-emerald-400">
                          <CheckCircle2 className="h-3.5 w-3.5" /> Done
                        </span>
                      ) : (
                        <span className="text-[11px] font-semibold text-sky-400">+{scen.xpReward} XP</span>
                      )}
                    </div>

                    <h3 className="text-base font-bold text-white group-hover:text-amber-300 transition-colors">
                      {scen.title}
                    </h3>
                    <p className="text-xs font-medium text-slate-400 mt-0.5">{scen.titleTagalog}</p>

                    <div className="flex items-center gap-1 text-[11px] text-slate-400 mt-2">
                      <MapPin className="h-3 w-3 text-sky-400 shrink-0" />
                      <span className="truncate">{scen.location}</span>
                    </div>

                    <p className="text-xs text-slate-300/80 mt-2.5 line-clamp-2 leading-relaxed">
                      {scen.culturalContext}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-white/10 mt-4 flex items-center justify-between text-xs">
                    <span className="text-slate-400">Difficulty: <strong className="text-slate-200">{scen.difficulty}</strong></span>
                    <span className="font-semibold text-amber-400 group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                      Start <ChevronRight className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
