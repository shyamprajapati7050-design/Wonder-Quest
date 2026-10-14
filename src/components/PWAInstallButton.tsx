import React, { useState } from 'react';
import { Download, Share2, PlusSquare, X, Check, Smartphone } from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';

interface PWAInstallButtonProps {
  variant?: 'navbar' | 'card' | 'badge' | 'button';
  className?: string;
}

export const PWAInstallButton: React.FC<PWAInstallButtonProps> = ({
  variant = 'button',
  className = '',
}) => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showIOSGuide, setShowIOSGuide] = useState(false);
  const [isInstalling, setIsInstalling] = useState(false);

  // Suppress button if already installed in standalone mode
  if (isInstalled) {
    if (variant === 'badge') {
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-700">
          <Check className="w-3.5 h-3.5" /> Installed App
        </span>
      );
    }
    return null;
  }

  const handleInstallClick = async () => {
    if (isIOS) {
      setShowIOSGuide(true);
      return;
    }
    if (isInstallable) {
      setIsInstalling(true);
      await install();
      setIsInstalling(false);
    } else {
      // In case browser hasn't fired beforeinstallprompt or on desktop without direct prompt
      setShowIOSGuide(true);
    }
  };

  return (
    <>
      {variant === 'navbar' ? (
        <button
          onClick={handleInstallClick}
          title="Install App for Offline Play"
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-bold text-xs bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-sm hover:from-violet-700 hover:to-indigo-700 active:scale-95 transition-all ${className}`}
        >
          <Download className="w-3.5 h-3.5 animate-bounce" />
          <span className="hidden sm:inline">Install App</span>
          <span className="text-[10px] bg-white/20 px-1 rounded font-medium">Offline</span>
        </button>
      ) : variant === 'badge' ? (
        <button
          onClick={handleInstallClick}
          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-indigo-50 text-indigo-700 hover:bg-indigo-100 transition-colors ${className}`}
        >
          <Download className="w-3 h-3" />
          <span>Install Offline App</span>
        </button>
      ) : variant === 'card' ? (
        <div className={`p-4 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl text-white shadow-lg flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${className}`}>
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-white/20 rounded-xl">
              <Smartphone className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="font-extrabold text-sm sm:text-base flex items-center gap-2">
                Install WonderQuest App
                <span className="text-[10px] bg-amber-400 text-amber-950 font-black px-2 py-0.5 rounded-full uppercase tracking-wider">
                  Offline Ready
                </span>
              </div>
              <div className="text-xs text-indigo-100 mt-0.5">
                Play anywhere without Wi-Fi or mobile data. All lessons & games work 100% offline!
              </div>
            </div>
          </div>
          <button
            onClick={handleInstallClick}
            disabled={isInstalling}
            className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white text-indigo-700 font-extrabold text-xs shadow-md hover:bg-indigo-50 active:scale-95 transition-transform"
          >
            <Download className="w-4 h-4" />
            {isInstalling ? 'Installing...' : 'Install Now'}
          </button>
        </div>
      ) : (
        <button
          onClick={handleInstallClick}
          disabled={isInstalling}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow transition-all ${className}`}
        >
          <Download className="w-4 h-4" />
          <span>Install App (Play Offline)</span>
        </button>
      )}

      {/* iOS / Fallback Guide Modal */}
      {showIOSGuide && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in">
          <div className="w-full max-w-sm rounded-3xl bg-white p-6 shadow-2xl border border-slate-100 space-y-4 text-slate-800">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-indigo-100 rounded-xl text-indigo-600">
                  <Smartphone className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-black text-slate-800">Install WonderQuest</h3>
                  <p className="text-[11px] text-slate-500 font-medium">Use Offline Anywhere</p>
                </div>
              </div>
              <button
                onClick={() => setShowIOSGuide(false)}
                className="p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 bg-slate-50 p-4 rounded-2xl border border-slate-100 text-xs">
              <div className="font-bold text-slate-700">How to install on iPhone, iPad & Chrome:</div>
              <div className="flex items-start gap-2.5">
                <div className="p-1 bg-white rounded-lg border border-slate-200 text-indigo-600 font-bold">1</div>
                <div>
                  Tap the <strong className="inline-flex items-center gap-1 font-bold text-indigo-600"><Share2 className="w-3.5 h-3.5 inline" /> Share</strong> button in Safari or the <strong>⋮ Menu</strong> in Chrome.
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <div className="p-1 bg-white rounded-lg border border-slate-200 text-indigo-600 font-bold">2</div>
                <div>
                  Scroll down and tap <strong className="inline-flex items-center gap-1 font-bold text-indigo-600"><PlusSquare className="w-3.5 h-3.5 inline" /> Add to Home Screen</strong>.
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <div className="p-1 bg-white rounded-lg border border-slate-200 text-emerald-600 font-bold">3</div>
                <div>
                  Tap <strong>Add</strong>. WonderQuest will open full-screen and run completely offline without internet!
                </div>
              </div>
            </div>

            <button
              onClick={() => setShowIOSGuide(false)}
              className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs shadow-md transition"
            >
              Got it, let's play!
            </button>
          </div>
        </div>
      )}
    </>
  );
};
