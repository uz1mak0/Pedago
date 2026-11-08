'use client';

import React from 'react';
import { Compass, Layers, BookOpen, MessageSquare } from 'lucide-react';

type TabId = 'tutorial' | 'flashcards' | 'grammar' | 'scenarios';

interface BottomNavProps {
  activeTab: TabId;
  setActiveTab: (tab: TabId) => void;
}

const tabs = [
  { id: 'tutorial', label: 'Tutorial', icon: Compass },
  { id: 'flashcards', label: 'Flashcards', icon: Layers },
  { id: 'grammar', label: 'Grammar', icon: BookOpen },
  { id: 'scenarios', label: 'Scenarios', icon: MessageSquare },
] as const;

// Phone/tablet tab bar. Hidden on large screens (lg+), where Navbar shows the tabs.
export const BottomNav: React.FC<BottomNavProps> = ({ activeTab, setActiveTab }) => {
  return (
    <nav
      aria-label="Mobile Bottom Navigation"
      className="pointer-events-auto fixed bottom-0 left-0 right-0 z-50 px-4 pb-[max(0.5rem,env(safe-area-inset-bottom))] lg:hidden"
    >
      {/* Floating Glass Dock */}
      <div className="glass-panel relative mx-auto max-w-md overflow-hidden rounded-3xl border border-white/60 p-1.5 shadow-[0_12px_40px_rgba(0,0,0,0.15)] dark:border-white/[0.12] dark:shadow-[0_16px_50px_rgba(0,0,0,0.5)]">
        {/* Specular gloss top rim */}
        <div className="gloss-overlay" />

        <div className="grid grid-cols-4 items-center">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                aria-label={tab.label}
                aria-current={isActive ? 'page' : undefined}
                className={`relative flex flex-col items-center justify-center rounded-2xl px-1 py-2 transition-all duration-200 ${isActive
                    ? 'bg-white/70 font-bold text-sky-600 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] dark:bg-white/[0.1] dark:text-sky-400 dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.15)]'
                    : 'text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200'
                  }`}
              >
                <div className="relative">
                  <Icon
                    className={`h-5 w-5 ${isActive
                        ? 'stroke-[2.2px] drop-shadow-[0_0_8px_rgba(14,165,233,0.5)]'
                        : 'stroke-[1.6px]'
                      }`}
                  />
                  {isActive && (
                    <span className="absolute -right-1 -top-1 h-1.5 w-1.5 rounded-full bg-amber-400 shadow-[0_0_6px_rgba(251,191,36,0.9)]" />
                  )}
                </div>
                <span className="mt-1 max-w-[68px] truncate text-[10px] tracking-tight">
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