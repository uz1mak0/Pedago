'use client';

import React from 'react';
import { BookOpen, Layers, MessageSquare, Compass, Flame, Sparkles } from 'lucide-react';

type TabId = 'tutorial' | 'flashcards' | 'grammar' | 'scenarios';

interface NavbarProps {
  activeTab: TabId;
  setActiveTab: (tab: TabId) => void;
  xp: number;
  streak: number;
}

const tabs = [
  { id: 'tutorial' as const, label: 'Tutorial', icon: Compass, badge: 'Start Here' },
  { id: 'flashcards' as const, label: 'Flashcards', icon: Layers, badge: '25 Cards' },
  { id: 'grammar' as const, label: 'Grammar', icon: BookOpen, badge: '100 Topics' },
  { id: 'scenarios' as const, label: 'Scenarios', icon: MessageSquare, badge: '100 Scenarios' },
];

// Top bar only. On phones/tablets the tabs are shown by BottomNav.tsx.
export function Navbar({ activeTab, setActiveTab, xp, streak }: NavbarProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-slate-950/70 backdrop-blur-2xl pt-[env(safe-area-inset-top)]">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-2 px-4 sm:px-6 lg:h-auto lg:py-3">
        {/* Brand / Logo */}
        <button
          type="button"
          onClick={() => setActiveTab('tutorial')}
          className="group flex min-w-0 items-center gap-3 text-left"
          aria-label="Go to tutorial"
        >
          <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-tr from-sky-500 via-indigo-500 to-amber-400 p-[1px] shadow-lg shadow-sky-500/20">
            <div className="flex h-full w-full items-center justify-center rounded-2xl bg-slate-950/80 backdrop-blur-sm transition-colors group-hover:bg-slate-950/60">
              <span className="bg-gradient-to-r from-sky-400 to-amber-300 bg-clip-text text-lg font-bold text-transparent">
                P
              </span>
            </div>
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="text-xl font-extrabold tracking-tight text-white">Pedago</span>
              <span className="hidden rounded-full border border-sky-500/20 bg-sky-500/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-sky-400 sm:inline-block">
                Tagalog
              </span>
            </div>
            <p className="hidden text-[11px] text-slate-400 lg:block">Learn Authentic Filipino Daily</p>
          </div>
        </button>

        {/* Navigation tabs: large screens only */}
        <nav className="hidden items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.04] p-1.5 shadow-inner lg:flex">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                aria-current={isActive ? 'page' : undefined}
                className={`relative flex items-center gap-2 whitespace-nowrap rounded-xl px-3 py-2 text-sm font-medium transition-all duration-200 ${isActive
                  ? 'border border-sky-400/30 bg-gradient-to-r from-sky-500/20 to-indigo-500/20 text-white shadow-md shadow-sky-500/10'
                  : 'text-slate-300 hover:bg-white/[0.06] hover:text-white'
                  }`}
              >
                <Icon className={`h-4 w-4 ${isActive ? 'text-sky-400' : 'text-slate-400'}`} />
                <span>{tab.label}</span>
                <span
                  className={`hidden rounded-full border px-1.5 py-0.5 text-[10px] font-medium xl:inline-block ${isActive
                    ? 'border-sky-400/30 bg-sky-400/20 text-sky-300'
                    : 'border-white/10 bg-white/5 text-slate-400'
                    }`}
                >
                  {tab.badge}
                </span>
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
}