'use client';

import React from 'react';
import { BookOpen, Layers, MessageSquare, Compass, Flame, Sparkles } from 'lucide-react';

interface NavbarProps {
  activeTab: 'tutorial' | 'flashcards' | 'grammar' | 'scenarios';
  setActiveTab: (tab: 'tutorial' | 'flashcards' | 'grammar' | 'scenarios') => void;
  xp: number;
  streak: number;
}

export function Navbar({ activeTab, setActiveTab, xp, streak }: NavbarProps) {
  const tabs = [
    { id: 'tutorial' as const, label: 'Tutorial', icon: Compass, badge: 'Start Here' },
    { id: 'flashcards' as const, label: 'Flashcards', icon: Layers, badge: '25 Cards' },
    { id: 'grammar' as const, label: 'Grammar', icon: BookOpen, badge: '50 Topics' },
    { id: 'scenarios' as const, label: 'Scenarios', icon: MessageSquare, badge: '50 Scenarios' }
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-slate-950/60 backdrop-blur-2xl transition-all duration-300">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        {/* Brand / Logo */}
        <div
          onClick={() => setActiveTab('tutorial')}
          className="flex cursor-pointer items-center space-x-3 group"
        >
          <div className="relative flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-tr from-sky-500 via-indigo-500 to-amber-400 p-[1px] shadow-lg shadow-sky-500/20">
            <div className="flex h-full w-full items-center justify-center rounded-2xl bg-slate-950/80 backdrop-blur-sm transition-colors group-hover:bg-slate-950/60">
              <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-amber-300 text-lg">P</span>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold tracking-tight text-xl text-white">Pedago</span>
              <span className="rounded-full bg-sky-500/10 px-2 py-0.5 text-[10px] font-semibold tracking-wider text-sky-400 border border-sky-500/20 uppercase">
                Tagalog
              </span>
            </div>
            <p className="text-[11px] text-slate-400 hidden sm:block">Learn Authentic Filipino Daily</p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex items-center gap-1 sm:gap-2 rounded-2xl bg-white/[0.04] p-1.5 border border-white/10 shadow-inner">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative flex items-center gap-2 rounded-xl px-3 py-2 text-xs sm:text-sm font-medium transition-all duration-200 ${isActive
                    ? 'bg-gradient-to-r from-sky-500/20 to-indigo-500/20 text-white border border-sky-400/30 shadow-md shadow-sky-500/10'
                    : 'text-slate-300 hover:text-white hover:bg-white/[0.06]'
                  }`}
              >
                <Icon className={`h-4 w-4 ${isActive ? 'text-sky-400' : 'text-slate-400'}`} />
                <span>{tab.label}</span>
                {tab.badge && (
                  <span
                    className={`hidden md:inline-block rounded-full px-1.5 py-0.2 text-[10px] font-medium border ${isActive
                        ? 'bg-sky-400/20 text-sky-300 border-sky-400/30'
                        : 'bg-white/5 text-slate-400 border-white/10'
                      }`}
                  >
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Motivational Stats */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Streak badge */}
          <div className="flex items-center gap-1.5 rounded-xl bg-amber-500/10 border border-amber-500/20 px-2.5 py-1.5 text-xs font-semibold text-amber-300 shadow-sm">
            <Flame className="h-4 w-4 fill-amber-400 text-amber-400 animate-pulse" />
            <span>{streak}d</span>
          </div>

          {/* XP badge */}
          <div className="flex items-center gap-1.5 rounded-xl bg-sky-500/10 border border-sky-500/20 px-2.5 py-1.5 text-xs font-semibold text-sky-300 shadow-sm">
            <Sparkles className="h-4 w-4 text-sky-400" />
            <span>{xp} XP</span>
          </div>
        </div>
      </div>
    </header>
  );
}
