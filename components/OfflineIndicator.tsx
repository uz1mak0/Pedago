'use client';

import React from 'react';
import { useOnlineStatus } from '@/hooks/use-online-status';
import { WifiOff, HardDrive } from 'lucide-react';

export const OfflineIndicator: React.FC = () => {
  const isOnline = useOnlineStatus();

  if (isOnline) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-20 md:bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2.5 rounded-2xl bg-amber-500/90 dark:bg-amber-600/80 text-slate-950 dark:text-white px-4 py-2 text-xs font-bold shadow-[0_8px_32px_rgba(245,158,11,0.3)] backdrop-blur-xl border border-amber-300/50 animate-in fade-in slide-in-from-bottom-2 duration-200"
    >
      <WifiOff className="w-4 h-4 stroke-[2px] animate-pulse" />
      <span>Naka-offline</span>
      <span aria-hidden="true">·</span>
      <span className="flex items-center gap-1 font-medium">
        <HardDrive className="w-3.5 h-3.5 stroke-[2px]" /> Lokal na imbakan (Full offline ready)
      </span>
    </div>
  );
};
