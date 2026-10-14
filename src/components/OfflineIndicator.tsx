import React, { useState, useEffect } from 'react';
import { WifiOff, Wifi, CloudOff, CheckCircle2 } from 'lucide-react';
import { useOnlineStatus } from '../hooks/useOnlineStatus';

export const OfflineIndicator: React.FC = () => {
  const isOnline = useOnlineStatus();
  const [showReconnectedBanner, setShowReconnectedBanner] = useState(false);
  const [hasBeenOffline, setHasBeenOffline] = useState(false);

  useEffect(() => {
    if (!isOnline) {
      setHasBeenOffline(true);
      setShowReconnectedBanner(false);
    } else if (hasBeenOffline) {
      // Just reconnected
      setShowReconnectedBanner(true);
      const timer = setTimeout(() => {
        setShowReconnectedBanner(false);
        setHasBeenOffline(false);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [isOnline, hasBeenOffline]);

  // When back online after being offline
  if (showReconnectedBanner) {
    return (
      <div className="fixed bottom-4 left-4 right-4 sm:right-auto sm:max-w-md z-50 animate-bounce duration-500">
        <div className="flex items-center gap-3 bg-emerald-600 text-white px-4 py-3 rounded-2xl shadow-xl border border-emerald-500/50 backdrop-blur-md">
          <div className="p-1.5 bg-emerald-500/40 rounded-xl">
            <CheckCircle2 className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1">
            <div className="text-xs font-black tracking-wide uppercase">Internet Restored • वापस ऑनलाइन</div>
            <div className="text-xs text-emerald-100 font-medium">
              Connected! All local progress and quiz scores are now synced to Cloud Firestore.
            </div>
          </div>
        </div>
      </div>
    );
  }

  // When completely offline
  if (!isOnline) {
    return (
      <aside aria-label="Network status" className="fixed bottom-4 left-4 right-4 sm:right-auto sm:max-w-md z-50 transition-all duration-300">
        <div className="flex items-start gap-3 bg-amber-500 text-white p-3.5 rounded-2xl shadow-2xl border-2 border-amber-400 backdrop-blur-md">
          <div className="p-2 bg-amber-600/40 rounded-xl flex-shrink-0 animate-pulse">
            <WifiOff className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black tracking-wider uppercase flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-white animate-ping" />
                Offline Mode • ऑफ़लाइन मोड
              </span>
              <span className="text-[10px] bg-amber-700/60 px-2 py-0.5 rounded-full font-bold">100% Playable</span>
            </div>
            <p className="text-xs text-amber-50 mt-1 leading-snug">
              No internet required! All games, math/science questions, audio, and lessons are cached locally.
              Progress will auto-sync to cloud when online.
            </p>
          </div>
        </div>
      </aside>
    );
  }

  return null;
};
