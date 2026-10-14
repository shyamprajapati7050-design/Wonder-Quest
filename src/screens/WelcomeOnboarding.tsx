import React, { useState } from 'react';
import { useGame } from '../context/GameContext';
import { ASSET_PATHS } from '../assets/assetRegistry';
import {
  BookOpen,
  HelpCircle,
  Trophy,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Play,
  RotateCcw,
} from 'lucide-react';

export const WelcomeOnboarding: React.FC = () => {
  const { setCurrentScreen } = useGame();
  const [step, setStep] = useState<number>(0);

  const steps = [
    {
      title: 'Step 1: Read & Learn with Audio',
      subtitle: 'Bite-Sized Illustrated Lessons',
      description:
        'Before starting a quest, explore bite-sized lessons with cheerful illustrations, voice narration, important vocabulary keywords, and hands-on interactive checks.',
      icon: BookOpen,
      color: 'from-blue-500 to-indigo-600',
      badge: 'Interactive Audio & Words',
      image: ASSET_PATHS.scienceLab,
    },
    {
      title: 'Step 2: Tackle 25-Question Levels',
      subtitle: '60 Seconds Per Question Challenge',
      description:
        'Each progressive level contains exactly 25 interactive questions: Multiple Choice, True/False, Match Pairs, Picture Analysis, Drag & Drop ordering, and Memory Matrix!',
      icon: HelpCircle,
      color: 'from-amber-500 to-orange-600',
      badge: 'Exactly 25 Questions · 1 Min Timer',
      image: ASSET_PATHS.worldMap,
    },
    {
      title: 'Step 3: Milestone Rewards & Master Tests',
      subtitle: 'Every 5 Levels Unlocks The Arena',
      description:
        'Complete 5 levels to unlock a special milestone treasure chest and the Master Test! Score 12/15 (80%+) to earn legendary trophies, huge coin bounties, and unlock the next realm!',
      icon: Trophy,
      color: 'from-emerald-500 to-teal-600',
      badge: 'Pass 12/15 (80%) · Golden Trophies',
      image: ASSET_PATHS.milestoneChest,
    },
  ];

  const current = steps[step];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between p-4 sm:p-8">
      {/* Top Bar */}
      <div className="max-w-4xl mx-auto w-full flex items-center justify-between pb-4 border-b border-slate-200">
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold font-heading text-slate-900">WonderQuest</span>
          <span className="text-xs text-slate-500">· Guide for Explorers</span>
        </div>
        <button
          onClick={() => setCurrentScreen('home_dashboard')}
          className="text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
        >
          Skip Tutorial
        </button>
      </div>

      {/* Main Card */}
      <div className="max-w-3xl mx-auto w-full my-auto py-8">
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
          {/* Card Media Header */}
          <div className="h-56 sm:h-64 relative bg-slate-100 overflow-hidden">
            <img
              src={current.image}
              alt={current.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/30 to-transparent" />
            <div className="absolute bottom-4 left-6 right-6 flex items-center justify-between">
              <span className="text-xs font-bold text-amber-900 bg-amber-50 border border-amber-300 px-3 py-1 rounded-full shadow-xs">
                {current.badge}
              </span>
              <span className="text-xs font-semibold text-slate-300 font-mono">
                {step + 1} of 3
              </span>
            </div>
          </div>

          {/* Card Content */}
          <div className="p-6 sm:p-8">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading">
              {current.title}
            </h2>
            <p className="text-sm font-semibold text-blue-600 mt-1">{current.subtitle}</p>

            <p className="mt-4 text-base text-slate-600 leading-relaxed">
              {current.description}
            </p>

            {/* Stepper Dots */}
            <div className="flex items-center gap-2 mt-8 pt-6 border-t border-slate-100">
              {steps.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setStep(i)}
                  className={`h-2.5 rounded-full transition-all cursor-pointer ${
                    step === i ? 'w-8 bg-blue-600' : 'w-2.5 bg-slate-200 hover:bg-slate-300'
                  }`}
                  aria-label={`Go to step ${i + 1}`}
                />
              ))}

              <div className="ml-auto flex items-center gap-3">
                {step > 0 && (
                  <button
                    onClick={() => setStep((prev) => prev - 1)}
                    className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer"
                  >
                    Previous
                  </button>
                )}

                {step < steps.length - 1 ? (
                  <button
                    onClick={() => setStep((prev) => prev + 1)}
                    className="px-6 py-2.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-sm flex items-center gap-2 transition-colors cursor-pointer"
                  >
                    <span>Next Step</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    onClick={() => setCurrentScreen('age_select')}
                    className="px-6 py-2.5 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-xl shadow-sm flex items-center gap-2 transition-colors cursor-pointer"
                  >
                    <Play className="w-4 h-4 fill-slate-950" />
                    <span>Select Age & Begin</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="max-w-4xl mx-auto w-full text-center text-xs text-slate-400">
        WonderQuest adheres to strict child privacy protocols · No data selling · Safe for classroom and home
      </div>
    </div>
  );
};
