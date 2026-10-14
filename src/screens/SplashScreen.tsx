import React from 'react';
import { useGame } from '../context/GameContext';
import { ASSET_PATHS } from '../assets/assetRegistry';
import { Play, Sparkles, Shield, Compass, BookOpen, Trophy } from 'lucide-react';

export const SplashScreen: React.FC = () => {
  const { setCurrentScreen, activeChild, requestParentAction } = useGame();

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col justify-between p-6 sm:p-10 relative overflow-hidden">
      {/* Subtle ambient lighting */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-200/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-indigo-200/20 rounded-full blur-3xl pointer-events-none" />

      {/* Top Header */}
      <div className="max-w-6xl mx-auto w-full flex items-center justify-between z-10 border-b border-slate-200/80 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-400 to-orange-500 flex items-center justify-center shadow-md shadow-amber-500/20">
            <Sparkles className="w-5 h-5 text-slate-950" />
          </div>
          <div>
            <span className="text-xl font-bold font-heading tracking-tight text-slate-900 block">
              WonderQuest
            </span>
            <span className="text-[11px] text-slate-500 font-medium">Nursery to 12th Class Play & Learn</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setCurrentScreen('age_select')}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-indigo-700 hover:text-indigo-900 bg-indigo-50 hover:bg-indigo-100 rounded-xl transition-colors cursor-pointer border border-indigo-200/70 shadow-2xs"
          >
            <span>Class: Nursery–12th</span>
          </button>
          <button
            onClick={() => {
              requestParentAction(() => {
                setCurrentScreen('parent_dashboard');
              });
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:text-slate-900 bg-white hover:bg-slate-100 rounded-xl transition-colors cursor-pointer border border-slate-200 shadow-2xs"
          >
            <Shield className="w-4 h-4 text-amber-500" />
            <span>Parent Gate</span>
          </button>
        </div>
      </div>

      {/* Hero Body */}
      <div className="max-w-4xl mx-auto w-full text-center my-auto z-10 py-8">
        {/* Mascot Asset */}
        <div className="relative inline-block mb-8">
          <div className="w-56 h-36 sm:w-80 sm:h-52 rounded-2xl overflow-hidden border-2 border-amber-300 shadow-xl shadow-slate-200 mx-auto relative group bg-white">
            <img
              src={ASSET_PATHS.heroMascot}
              alt="WonderQuest Learning Hero Mascot"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent flex items-end justify-center pb-3">
              <span className="text-xs font-semibold text-white">
                Meet Spark & Archie: Your Adventure Companions
              </span>
            </div>
          </div>
          <div className="absolute -top-3 -right-3 w-10 h-10 bg-amber-400 rounded-full flex items-center justify-center text-slate-950 font-bold text-lg shadow-md animate-bounce">
            ★
          </div>
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold font-heading text-slate-900 tracking-tight leading-tight max-w-2xl mx-auto">
          Learn, Play, and Conquer Every Quest!
        </h1>

        <p className="mt-4 text-base sm:text-lg text-slate-600 max-w-xl mx-auto">
          An adaptive educational adventure tailored for Nursery to 12th Class students (Ages 3–18). Solve 25-question levels, unlock Read & Learn lessons, and earn rewards!
        </p>

        {/* Feature Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 mt-6 text-xs text-slate-700">
          <span className="flex items-center gap-1.5 bg-amber-50 px-3 py-1.5 rounded-full border border-amber-200 text-amber-800 font-semibold shadow-2xs">
            🧸 Nursery to 12th Class
          </span>
          <span className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-full border border-slate-200 shadow-2xs">
            <BookOpen className="w-3.5 h-3.5 text-indigo-600" /> Read & Learn Audio
          </span>
          <span className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-full border border-slate-200 shadow-2xs">
            <Compass className="w-3.5 h-3.5 text-amber-500" /> 25-Question Levels
          </span>
          <span className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-full border border-slate-200 shadow-2xs">
            <Trophy className="w-3.5 h-3.5 text-emerald-600" /> Milestone Master Tests
          </span>
        </div>

        {/* Actions */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto">
          <button
            onClick={() => setCurrentScreen('home_dashboard')}
            className="w-full sm:w-auto px-8 py-3.5 text-base font-bold text-slate-950 bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-400 hover:from-amber-300 hover:to-yellow-300 rounded-xl shadow-md shadow-amber-500/20 flex items-center justify-center gap-2 transform active:scale-95 transition-all cursor-pointer"
          >
            <Play className="w-5 h-5 fill-slate-950" />
            <span>Start Adventure as {activeChild.name}</span>
          </button>

          <button
            onClick={() => setCurrentScreen('login')}
            className="w-full sm:w-auto px-6 py-3.5 text-sm font-semibold text-slate-700 hover:text-slate-900 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl transition-colors cursor-pointer shadow-xs"
          >
            Log In / Register
          </button>
        </div>
      </div>

      {/* Footer Info */}
      <div className="max-w-6xl mx-auto w-full flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-500 border-t border-slate-200 pt-4 z-10">
        <div>Safe & Child-Friendly · No External Ads · Parent Oversight</div>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setCurrentScreen('login')}
            className="hover:text-indigo-600 transition-colors cursor-pointer font-semibold text-slate-600"
          >
            Login / New Account
          </button>
          <span>·</span>
          <button
            onClick={() => setCurrentScreen('age_select')}
            className="hover:text-indigo-600 transition-colors cursor-pointer"
          >
            Change Age ({activeChild.ageGroup} yrs)
          </button>
          <span>·</span>
          <button
            onClick={() => setCurrentScreen('child_profile_select')}
            className="hover:text-indigo-600 transition-colors cursor-pointer"
          >
            Switch Profile
          </button>
        </div>
      </div>
    </div>
  );
};
