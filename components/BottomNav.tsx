'use client';

import React from 'react';
import { Compass, Layers, BookOpen, MessageSquare } from 'lucide-react';

interface BottomNavProps {
  activeTab: 'tutorial' | 'flashcards' | 'grammar' | 'scenarios';
  setActiveTab: (tab: 'tutorial' | 'flashcards' | 'grammar' | 'scenarios') => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'tutorial', label: 'Tutorial', icon: Compass },
    { id: 'flashcards', label: 'Flashcards', icon: Layers },
    { id: 'grammar', label: 'Grammar', icon: BookOpen },
    { id: 'scenarios', label: 'Scenarios', icon: MessageSquare },
  ] as const;

  return (
    <nav
      aria-label="Mobile Bottom Navigation"
      className="fixed bottom-0 left-0 right-0 z-50 md:hidden pb-[env(safe-area-inset-bottom)] pointer-events-auto px-4 pb-2"
    >
      {/* Floating Glass Dock */}
      <div className="max-w-md mx-auto rounded-3xl glass-panel border border-white/60 dark:border-white/[0.12] shadow-[0_12px_40px_rgba(0,0,0,0.15)] dark:shadow-[0_16px_50px_rgba(0,0,0,0.5)] p-1.5 relative overflow-hidden">
        {/* Specular gloss top rim */}
        <div className="gloss-overlay" />

        <div className="grid grid-cols-4 items-center">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                aria-label={tab.label}
                className={`flex flex-col items-center justify-center py-2 px-1 rounded-2xl transition-all duration-200 relative ${
                  isActive
                    ? 'text-sky-600 dark:text-sky-400 font-bold bg-white/70 dark:bg-white/[0.1] shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.15)]'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
              >
                <div className="relative">
                  <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.2px] drop-shadow-[0_0_8px_rgba(14,165,233,0.5)]' : 'stroke-[1.6px]'}`} />
                  {isActive && (
                    <span className="absolute -top-1 -right-1 w-1.5 h-1.5 rounded-full bg-amber-400 shadow-[0_0_6px_rgba(251,191,36,0.9)]" />
                  )}
                </div>
                <span className="text-[10px] tracking-tight mt-1 truncate max-w-[68px]">
                  {tab.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};
