import React, { useState } from 'react';
import { useDeviceDetect } from '../hooks/useDeviceDetect';
import {
  Laptop,
  Smartphone,
  Tablet,
  Sparkles,
  Command,
  CheckCircle2,
  X,
  Volume2,
  Zap,
  Download,
  Info,
  Apple,
} from 'lucide-react';
import { PWAInstallButton } from './PWAInstallButton';

export const DeviceAdaptiveBadge: React.FC = () => {
  const {
    deviceType,
    isMobile,
    isTablet,
    isLaptop,
    isIOS,
    isAndroid,
    isStandalone,
    hapticFeedback,
  } = useDeviceDetect();

  const [isOpen, setIsOpen] = useState(false);

  const getDeviceIcon = () => {
    if (isMobile) return <Smartphone className="w-3.5 h-3.5 text-blue-600" />;
    if (isTablet) return <Tablet className="w-3.5 h-3.5 text-indigo-600" />;
    return <Laptop className="w-3.5 h-3.5 text-violet-600" />;
  };

  const getDeviceLabel = () => {
    if (isIOS) return isTablet ? 'iPad' : 'iPhone';
    if (isAndroid) return isTablet ? 'Android Tablet' : 'Android';
    if (isTablet) return 'Tablet';
    return 'Laptop / PC';
  };

  return (
    <>
      {/* Subtle indicator in header or footer */}
      <button
        onClick={() => {
          hapticFeedback('light');
          setIsOpen(true);
        }}
        title="Cross-Device Smooth Experience: Laptop, iPhone, Android & Tablet"
        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 transition-all border border-slate-200 shadow-2xs cursor-pointer hover:scale-105 active:scale-95"
      >
        {getDeviceIcon()}
        <span>{getDeviceLabel()}</span>
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
      </button>

      {/* Cross-Device Optimization Guide Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in">
          <div className="w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl border border-slate-100 space-y-5 text-slate-800">
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-gradient-to-tr from-blue-500 to-indigo-600 text-white rounded-2xl shadow-md">
                  {getDeviceIcon()}
                </div>
                <div>
                  <h3 className="text-base font-extrabold font-heading text-slate-900">
                    Smooth Multi-Device Engine
                  </h3>
                  <p className="text-xs text-slate-500 font-medium">
                    Optimized for Laptop, iPhone, Android & Tablet
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Current Device Detection Status Card */}
            <div className="p-3.5 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-100 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="text-2xl">
                  {isIOS ? '🍎' : isAndroid ? '🤖' : isTablet ? '📱' : '💻'}
                </span>
                <div>
                  <div className="text-xs font-bold text-slate-800">
                    Detected: <span className="text-blue-700">{getDeviceLabel()}</span>
                  </div>
                  <div className="text-[11px] text-slate-500">
                    {isStandalone ? 'Running as Installed Native App' : 'Web App · 100% Offline Capable'}
                  </div>
                </div>
              </div>
              <span className="text-[11px] font-bold text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full border border-emerald-200">
                Smooth 60fps
              </span>
            </div>

            {/* Platform Specific Capabilities & Perks */}
            <div className="space-y-2.5 text-xs">
              <div className="font-bold text-slate-700 flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-amber-500" />
                <span>Device-Specific Enhancements:</span>
              </div>

              {/* 1. Laptop / Desktop */}
              <div
                className={`p-3 rounded-xl border transition-all ${
                  isLaptop
                    ? 'bg-violet-50/80 border-violet-200 shadow-2xs'
                    : 'bg-slate-50 border-slate-100 opacity-75'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-violet-900 flex items-center gap-1.5">
                    <Laptop className="w-4 h-4 text-violet-600" /> Laptop & Desktop
                  </span>
                  {isLaptop && <span className="text-[10px] bg-violet-200 text-violet-800 font-bold px-2 py-0.5 rounded-full">Active</span>}
                </div>
                <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">
                  • Keyboard shortcuts for quizzes: keys <strong>1, 2, 3, 4</strong> to answer, <strong>Enter</strong> to check, <strong>Space</strong> to hear audio.
                  <br />• Large-screen layout with spacious grids and fast mouse hover interactions.
                </p>
              </div>

              {/* 2. Phone (Android & iPhone) */}
              <div
                className={`p-3 rounded-xl border transition-all ${
                  isMobile
                    ? 'bg-blue-50/80 border-blue-200 shadow-2xs'
                    : 'bg-slate-50 border-slate-100 opacity-75'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-blue-900 flex items-center gap-1.5">
                    <Smartphone className="w-4 h-4 text-blue-600" /> Mobile Phones (Android & iPhone)
                  </span>
                  {isMobile && <span className="text-[10px] bg-blue-200 text-blue-800 font-bold px-2 py-0.5 rounded-full">Active</span>}
                </div>
                <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">
                  • <strong>Thumb-Friendly Bottom Dock</strong> with one-tap access to Home, 25-Q Quizzes, Subjects, and Map.
                  <br />• <strong>Safe-Area Insets</strong> ensuring no buttons are cut off by the iPhone home bar or camera notch.
                  <br />• <strong>Zero Tap-Delay</strong> and vibration haptics on Android & supported touchscreens.
                </p>
              </div>

              {/* 3. Tablets (iPad & Android Tablets) */}
              <div
                className={`p-3 rounded-xl border transition-all ${
                  isTablet
                    ? 'bg-indigo-50/80 border-indigo-200 shadow-2xs'
                    : 'bg-slate-50 border-slate-100 opacity-75'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-indigo-900 flex items-center gap-1.5">
                    <Tablet className="w-4 h-4 text-indigo-600" /> Tablets (iPads & Galaxy Tabs)
                  </span>
                  {isTablet && <span className="text-[10px] bg-indigo-200 text-indigo-800 font-bold px-2 py-0.5 rounded-full">Active</span>}
                </div>
                <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">
                  • 2 & 3 column dynamic responsive grid adapting smoothly between landscape & portrait.
                  <br />• Oversized touch targets ideal for kids using fingers or stylus pens.
                </p>
              </div>
            </div>

            {/* Offline PWA Installation CTA */}
            <div className="pt-1">
              <PWAInstallButton variant="card" />
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-md transition-all active:scale-95 cursor-pointer"
            >
              Close & Enjoy Learning
            </button>
          </div>
        </div>
      )}
    </>
  );
};
