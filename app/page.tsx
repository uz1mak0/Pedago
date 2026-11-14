'use client';

import React, { useState, useEffect, useRef } from 'react';
import { App as CapApp } from '@capacitor/app';
import { Navbar } from '../components/Navbar';
import { BottomNav } from '../components/BottomNav';
import { TutorialView } from '../components/TutorialView';
import { FlashcardsView } from '../components/FlashcardsView';
import { GrammarView } from '../components/GrammarView';
import { ScenariosView } from '../components/ScenariosView';
import { initialFlashcards } from '../lib/tagalog-data';
import { GrammarExercise, Scenario } from '../lib/types';
import pedagoData from '../lib/pedago_100_schema_matched.json';

export default function Home() {
  const [activeTab, setActiveTab] = useState<'tutorial' | 'flashcards' | 'grammar' | 'scenarios'>('tutorial');
  const [activeScenarioId, setActiveScenarioId] = useState<string | null>(null);
  const [xp, setXp] = useState<number>(0);
  const [streak, setStreak] = useState<number>(1);
  const [masteredCards, setMasteredCards] = useState<string[]>([]);
  const [completedTopics, setCompletedTopics] = useState<string[]>([]);
  const [completedScenarios, setCompletedScenarios] = useState<string[]>([]);
  const [isClient, setIsClient] = useState(false);

  // Keep latest navigation state in refs for backButton listener
  const activeTabRef = useRef(activeTab);
  activeTabRef.current = activeTab;
  const activeScenarioIdRef = useRef(activeScenarioId);
  activeScenarioIdRef.current = activeScenarioId;

  // Handle Android hardware back button
  useEffect(() => {
    let removeListener: (() => void) | undefined;

    CapApp.addListener('backButton', () => {
      // 1. If currently inside an open scenario conversation, go back to the scenarios list
      if (activeTabRef.current === 'scenarios' && activeScenarioIdRef.current) {
        setActiveScenarioId(null);
        return;
      }

      // 2. If on any tab other than tutorial (e.g. Flashcards, Grammar, Scenarios), navigate back to Tutorial (Home)
      if (activeTabRef.current !== 'tutorial') {
        setActiveTab('tutorial');
        return;
      }

      // 3. If already on the root / home screen (Tutorial), exit the app cleanly
      CapApp.exitApp();
    }).then((handle) => {
      removeListener = () => handle.remove();
    }).catch(() => {
      // Not running in Capacitor / web browser environment
    });

    return () => {
      removeListener?.();
    };
  }, []);

  // Hydration-safe loading of stored learning state
  useEffect(() => {
    setIsClient(true);
    try {
      const savedXp = localStorage.getItem('pedago_xp');
      if (savedXp) setXp(parseInt(savedXp, 10));

      const savedStreak = localStorage.getItem('pedago_streak');
      if (savedStreak) setStreak(parseInt(savedStreak, 10));

      const savedMastered = localStorage.getItem('pedago_mastered_cards');
      if (savedMastered) setMasteredCards(JSON.parse(savedMastered));

      const savedTopics = localStorage.getItem('pedago_completed_topics');
      if (savedTopics) setCompletedTopics(JSON.parse(savedTopics));

      const savedScenarios = localStorage.getItem('pedago_completed_scenarios');
      if (savedScenarios) setCompletedScenarios(JSON.parse(savedScenarios));
    } catch {
      // Fallback gracefully if storage is restricted
    }
  }, []);

  const handleAddXp = (amount: number) => {
    setXp((prev) => {
      const next = prev + amount;
      if (typeof window !== 'undefined') {
        localStorage.setItem('pedago_xp', String(next));
      }
      return next;
    });
  };

  const handleToggleMasteredCard = (cardId: string) => {
    setMasteredCards((prev) => {
      const next = prev.includes(cardId)
        ? prev.filter((id) => id !== cardId)
        : [...prev, cardId];
      if (typeof window !== 'undefined') {
        localStorage.setItem('pedago_mastered_cards', JSON.stringify(next));
      }
      return next;
    });
  };

  const handleToggleCompleteTopic = (topicId: string) => {
    setCompletedTopics((prev) => {
      const next = prev.includes(topicId)
        ? prev.filter((id) => id !== topicId)
        : [...prev, topicId];
      if (typeof window !== 'undefined') {
        localStorage.setItem('pedago_completed_topics', JSON.stringify(next));
      }
      return next;
    });
  };

  const handleCompleteScenario = (scenarioId: string, rewardXp: number) => {
    if (!completedScenarios.includes(scenarioId)) {
      setCompletedScenarios((prev) => {
        const next = [...prev, scenarioId];
        if (typeof window !== 'undefined') {
          localStorage.setItem('pedago_completed_scenarios', JSON.stringify(next));
        }
        return next;
      });
      handleAddXp(rewardXp);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 font-sans selection:bg-sky-500/20">
      {/* Navigation Header */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        xp={xp}
        streak={streak}
      />

      {/* Main App Container */}
      <main className="flex-1 mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 sm:py-8">
        {activeTab === 'tutorial' && (
          <TutorialView onStartLearning={(tab) => setActiveTab(tab)} />
        )}

        {activeTab === 'flashcards' && (
          <FlashcardsView
            cards={initialFlashcards}
            masteredIds={masteredCards}
            onToggleMastered={handleToggleMasteredCard}
            onAddXp={handleAddXp}
            onBackToHome={() => setActiveTab('tutorial')}
          />
        )}

        {activeTab === 'grammar' && (
          <GrammarView
            exercises={pedagoData.grammarExercises as GrammarExercise[]}
            completedTopicIds={completedTopics}
            onToggleCompleteTopic={handleToggleCompleteTopic}
            onAddXp={handleAddXp}
            onBackToHome={() => setActiveTab('tutorial')}
          />
        )}

        {activeTab === 'scenarios' && (
          <ScenariosView
            scenarios={pedagoData.scenarios as Scenario[]}
            completedScenarioIds={completedScenarios}
            onCompleteScenario={handleCompleteScenario}
            selectedScenarioId={activeScenarioId}
            onSelectScenarioId={setActiveScenarioId}
            onBackToHome={() => setActiveTab('tutorial')}
          />
        )}
      </main>

      {/* Mobile Bottom Navigation Bar */}
      <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Glossy Minimalist Footer */}
      <footer className="border-t border-white/10 bg-slate-950/80 backdrop-blur-xl py-6 text-center text-xs text-slate-500">
        <div className="mx-auto max-w-7xl px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p>
            <strong>Pedago</strong> &bull; Authentic Tagalog Language Learning
          </p>
          <p className="text-slate-400">
            Crafted with Filipino care for global learners &bull; 100 Grammar Lessons &bull; 100 Scenarios
          </p>
        </div>
      </footer>
    </div>
  );
}
