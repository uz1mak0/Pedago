'use client';

import React, { useState } from 'react';
import { usePWAInstall } from '@/hooks/use-pwa-install';
import { Download, Share2, PlusSquare, X } from 'lucide-react';

export const PWAInstallButton: React.FC<{ variant?: 'nav' | 'hero' | 'banner' }> = ({
  variant = 'nav',
}) => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showIOSModal, setShowIOSModal] = useState(false);

  // If already running in standalone mode, do not render
  if (isInstalled) return null;

  const handleInstallClick = async () => {
    if (isInstallable) {
      await install();
    } else if (isIOS) {
      setShowIOSModal(true);
    } else {
      setShowIOSModal(true); // Fallback explanation
    }
  };

  const buttonClasses =
    variant === 'hero'
      ? 'glass-btn-amber font-bold text-xs px-5 py-2.5 rounded-2xl flex items-center gap-2 shadow-[0_4px_18px_rgba(245,158,11,0.3)]'
      : 'glass-btn font-bold text-xs px-3.5 py-1.5 rounded-xl flex items-center gap-1.5 text-slate-800 dark:text-slate-200 hover:text-sky-600 dark:hover:text-sky-400';

  return (
    <>
      <button
        onClick={handleInstallClick}
        aria-label="Install Pedago app on iOS or Android"
        className={buttonClasses}
      >
        <Download className="w-3.5 h-3.5 text-amber-500 stroke-[2px]" />
        <span>Install App</span>
      </button>

      {showIOSModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-150"
        >
          <div className="relative w-full max-w-sm rounded-3xl glass-panel border border-white/60 dark:border-white/[0.12] p-6 shadow-[0_16px_50px_rgba(0,0,0,0.4)] text-slate-900 dark:text-slate-100 overflow-hidden">
            <div className="gloss-overlay" />

            <div className="relative z-10 flex items-center justify-between pb-3 border-b border-slate-200/50 dark:border-white/[0.08]">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-sky-500 to-amber-400 p-[1.5px] shadow-[0_0_10px_rgba(14,165,233,0.3)]">
                  <div className="w-full h-full bg-slate-900 rounded-[10px] flex items-center justify-center text-amber-400 font-bold text-xs">
                    ᜉ
                  </div>
                </div>
                <h3 className="text-sm font-extrabold text-slate-900 dark:text-white">Install Pedago on iOS & Android</h3>
              </div>
              <button
                onClick={() => setShowIOSModal(false)}
                className="p-1 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                aria-label="Close install modal"
              >
                <X className="w-5 h-5 stroke-[2px]" />
              </button>
            </div>

            <div className="relative z-10 mt-4 space-y-3.5 text-xs leading-relaxed text-slate-600 dark:text-slate-300">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-xl bg-sky-500/20 text-sky-500 flex items-center justify-center shrink-0 font-bold text-xs border border-sky-400/30">
                  1
                </div>
                <div>
                  <p className="font-bold text-slate-900 dark:text-white">Para sa iPhone / iPad (iOS Safari):</p>
                  <p className="mt-0.5 flex items-center gap-1.5 flex-wrap">
                    Pindutin ang <Share2 className="w-3.5 h-3.5 inline text-sky-500 stroke-[2px]" /> <strong>Share</strong> button sa ibaba ng browser, pagkatapos ay piliin ang <PlusSquare className="w-3.5 h-3.5 inline text-sky-500 stroke-[2px]" /> <strong>Add to Home Screen</strong>.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-xl bg-amber-500/20 text-amber-500 flex items-center justify-center shrink-0 font-bold text-xs border border-amber-400/30">
                  2
                </div>
                <div>
                  <p className="font-bold text-slate-900 dark:text-white">Para sa Android (Chrome):</p>
                  <p className="mt-0.5">
                    Pindutin ang tatlong tuldok (⋮) sa browser menu at piliin ang <strong>Install app</strong> o <strong>Add to Home Screen</strong>.
                  </p>
                </div>
              </div>

              <div className="p-3 rounded-2xl glass-card border border-white/40 dark:border-white/[0.06] text-[11px] text-slate-500 dark:text-slate-400">
                🚀 <strong>100% Offline Ready:</strong> Pagkatapos i-install, magagamit mo ang mga flashcard at grammar exercises kahit walang internet o cellular data.
              </div>
            </div>

            <button
              onClick={() => setShowIOSModal(false)}
              className="relative z-10 mt-5 w-full py-3 rounded-2xl glass-btn-primary font-bold text-xs"
            >
              Naiintindihan ko (Got it!)
            </button>
          </div>
        </div>
      )}
    </>
  );
};
