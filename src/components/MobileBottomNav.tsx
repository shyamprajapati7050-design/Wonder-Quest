import React, { useState } from 'react';
import { useGame } from '../context/GameContext';
import { useDeviceDetect } from '../hooks/useDeviceDetect';
import { soundEngine } from '../utils/audio';
import { getGradeDetails } from '../data/gradesData';
import { SUPPORTED_LANGUAGES } from '../data/languages';
import {
  Home,
  BookOpen,
  Compass,
  MapPin,
  Trophy,
  Menu,
  X,
  Sparkles,
  Shield,
  Volume2,
  VolumeX,
  Globe,
  Download,
  School,
  Flame,
  Coins,
  ChevronRight,
  GraduationCap,
  Layers,
  Award,
  BarChart2,
  ShoppingBag,
  Info,
} from 'lucide-react';
import { PWAInstallButton } from './PWAInstallButton';
import { StreakFlameIcon } from './StreakFlameIcon';

export const MobileBottomNav: React.FC = () => {
  const {
    currentScreen,
    setCurrentScreen,
    activeChild,
    soundEnabled,
    setSoundEnabled,
    requestParentAction,
    language,
    setIsLanguageModalOpen,
    setIsStreakModalOpen,
    t,
  } = useGame();

  const { isMobile, isIOS, isAndroid, isTablet, hapticFeedback } = useDeviceDetect();
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false);

  // Hide mobile bottom nav during full-screen question solving or intro splash/auth
  if (
    currentScreen === 'question_screen' ||
    currentScreen === 'master_test' ||
    currentScreen === 'login' ||
    currentScreen === 'splash' ||
    currentScreen === 'welcome' ||
    currentScreen === 'parent_auth'
  ) {
    return null;
  }

  const gradeMeta = getGradeDetails(activeChild.gradeLevel);

  const handleNav = (screen: any) => {
    hapticFeedback('light');
    soundEngine.playCardFlip();
    setCurrentScreen(screen);
    setIsMoreMenuOpen(false);
  };

  const handleParentPortal = () => {
    hapticFeedback('medium');
    setIsMoreMenuOpen(false);
    requestParentAction(() => {
      setCurrentScreen('parent_dashboard');
    });
  };

  return (
    <>
      {/* Mobile Bottom Dock (Phones & Compact Tablets) */}
      <nav
        aria-label="Mobile Navigation"
        className="fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-lg border-t border-slate-200/90 shadow-2xl pb-safe md:hidden"
      >
        <div className="flex items-center justify-around px-1 py-1.5 max-w-lg mx-auto">
          {/* 1. Home */}
          <button
            onClick={() => handleNav('home_dashboard')}
            className={`flex flex-col items-center justify-center flex-1 py-1 px-1 rounded-xl transition-all cursor-pointer touch-press ${
              currentScreen === 'home_dashboard'
                ? 'text-blue-600 font-bold'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <div
              className={`p-1 rounded-lg transition-transform ${
                currentScreen === 'home_dashboard' ? 'bg-blue-50 scale-110' : ''
              }`}
            >
              <Home className="w-5 h-5" />
            </div>
            <span className="text-[10px] mt-0.5 tracking-tight font-medium">Home</span>
          </button>

          {/* 2. Chapter Quizzes (25-Q) */}
          <button
            onClick={() => handleNav('chapter_quizzes')}
            className={`flex flex-col items-center justify-center flex-1 py-1 px-1 rounded-xl transition-all cursor-pointer relative touch-press ${
              currentScreen === 'chapter_quizzes'
                ? 'text-indigo-600 font-bold'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <div
              className={`p-1 rounded-lg transition-transform ${
                currentScreen === 'chapter_quizzes' ? 'bg-indigo-50 scale-110' : ''
              }`}
            >
              <BookOpen className="w-5 h-5" />
            </div>
            <span className="text-[10px] mt-0.5 tracking-tight font-medium">25-Q Quiz</span>
            <span className="absolute top-1 right-2 w-2 h-2 rounded-full bg-amber-400 ring-2 ring-white" />
          </button>

          {/* 3. Subjects */}
          <button
            onClick={() => handleNav('subjects')}
            className={`flex flex-col items-center justify-center flex-1 py-1 px-1 rounded-xl transition-all cursor-pointer touch-press ${
              currentScreen === 'subjects'
                ? 'text-blue-600 font-bold'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <div
              className={`p-1 rounded-lg transition-transform ${
                currentScreen === 'subjects' ? 'bg-blue-50 scale-110' : ''
              }`}
            >
              <Compass className="w-5 h-5" />
            </div>
            <span className="text-[10px] mt-0.5 tracking-tight font-medium">Subjects</span>
          </button>

          {/* 4. Level Map */}
          <button
            onClick={() => handleNav('level_map')}
            className={`flex flex-col items-center justify-center flex-1 py-1 px-1 rounded-xl transition-all cursor-pointer touch-press ${
              currentScreen === 'level_map'
                ? 'text-emerald-600 font-bold'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <div
              className={`p-1 rounded-lg transition-transform ${
                currentScreen === 'level_map' ? 'bg-emerald-50 scale-110' : ''
              }`}
            >
              <MapPin className="w-5 h-5" />
            </div>
            <span className="text-[10px] mt-0.5 tracking-tight font-medium">Map</span>
          </button>

          {/* 5. More Menu Drawer */}
          <button
            onClick={() => {
              hapticFeedback('light');
              setIsMoreMenuOpen(!isMoreMenuOpen);
            }}
            className={`flex flex-col items-center justify-center flex-1 py-1 px-1 rounded-xl transition-all cursor-pointer touch-press ${
              isMoreMenuOpen
                ? 'text-purple-600 font-bold'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <div
              className={`p-1 rounded-lg transition-transform ${
                isMoreMenuOpen ? 'bg-purple-50 scale-110' : ''
              }`}
            >
              <Menu className="w-5 h-5" />
            </div>
            <span className="text-[10px] mt-0.5 tracking-tight font-medium">More</span>
          </button>
        </div>
      </nav>

      {/* Slide-up "More" Drawer for Phones & Mobile Safari/Chrome */}
      {isMoreMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex flex-col justify-end">
          {/* Backdrop */}
          <div
            onClick={() => setIsMoreMenuOpen(false)}
            className="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity animate-fade-in"
          />

          {/* Sheet */}
          <div className="relative bg-white rounded-t-3xl shadow-2xl border-t border-slate-100 max-h-[82vh] overflow-y-auto pb-safe p-5 animate-slide-up space-y-4">
            {/* Sheet Handle */}
            <div className="w-12 h-1.5 bg-slate-300 rounded-full mx-auto" />

            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{gradeMeta.icon}</span>
                <div>
                  <h3 className="font-bold text-slate-800 text-sm font-heading">
                    {activeChild.name} ({gradeMeta.shortLabel})
                  </h3>
                  <div className="flex items-center gap-3 text-xs text-slate-500">
                    <span className="flex items-center gap-1 text-amber-600 font-bold">
                      <Coins className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                      {activeChild.coins}
                    </span>
                    <button
                      onClick={() => {
                        setIsMoreMenuOpen(false);
                        soundEngine.playCardFlip();
                        setIsStreakModalOpen(true);
                      }}
                      className="flex items-center gap-1 text-orange-600 font-bold bg-orange-50 px-2 py-0.5 rounded-full border border-orange-200 cursor-pointer"
                      title="View Streak Flame"
                    >
                      <StreakFlameIcon size="sm" animated={true} />
                      <span>{activeChild.streakDays}d streak</span>
                    </button>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsMoreMenuOpen(false)}
                className="p-2 rounded-full hover:bg-slate-100 text-slate-400"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Actions Grid */}
            <div className="grid grid-cols-2 gap-2.5">
              <button
                onClick={() => handleNav('read_and_learn')}
                className="flex items-center gap-2.5 p-3 rounded-2xl bg-sky-50 hover:bg-sky-100 text-sky-900 text-left transition-colors cursor-pointer touch-press border border-sky-100"
              >
                <div className="p-2 bg-white rounded-xl text-sky-600 shadow-xs">
                  <GraduationCap className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-bold text-xs">{t.navReadLearn}</div>
                  <div className="text-[10px] text-sky-700">Audio Lessons</div>
                </div>
              </button>

              <button
                onClick={() => handleNav('rewards')}
                className="flex items-center gap-2.5 p-3 rounded-2xl bg-amber-50 hover:bg-amber-100 text-amber-900 text-left transition-colors cursor-pointer touch-press border border-amber-100"
              >
                <div className="p-2 bg-white rounded-xl text-amber-600 shadow-xs">
                  <ShoppingBag className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-bold text-xs">{t.navShop}</div>
                  <div className="text-[10px] text-amber-700">Pets & Hats</div>
                </div>
              </button>

              <button
                onClick={() => handleNav('achievements')}
                className="flex items-center gap-2.5 p-3 rounded-2xl bg-emerald-50 hover:bg-emerald-100 text-emerald-900 text-left transition-colors cursor-pointer touch-press border border-emerald-100"
              >
                <div className="p-2 bg-white rounded-xl text-emerald-600 shadow-xs">
                  <Award className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-bold text-xs">{t.navBadges}</div>
                  <div className="text-[10px] text-emerald-700">Trophies</div>
                </div>
              </button>

              <button
                onClick={() => handleNav('progress_dashboard')}
                className="flex items-center gap-2.5 p-3 rounded-2xl bg-purple-50 hover:bg-purple-100 text-purple-900 text-left transition-colors cursor-pointer touch-press border border-purple-100"
              >
                <div className="p-2 bg-white rounded-xl text-purple-600 shadow-xs">
                  <BarChart2 className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-bold text-xs">{t.navProgress}</div>
                  <div className="text-[10px] text-purple-700">Accuracy & XP</div>
                </div>
              </button>
            </div>

            {/* Quick Settings & Controls */}
            <div className="space-y-2 pt-2 border-t border-slate-100 text-xs">
              {/* Language Switch */}
              <button
                onClick={() => {
                  setIsMoreMenuOpen(false);
                  setIsLanguageModalOpen(true);
                }}
                className="w-full flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 font-semibold cursor-pointer touch-press"
              >
                <div className="flex items-center gap-2.5">
                  <Globe className="w-4 h-4 text-indigo-600" />
                  <span>Language / भाषा / భాష</span>
                </div>
                <span className="font-bold text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded-full border border-indigo-200">
                  {SUPPORTED_LANGUAGES[language]?.name}
                </span>
              </button>

              {/* Class Switch */}
              <button
                onClick={() => handleNav('age_select')}
                className="w-full flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 font-semibold cursor-pointer touch-press"
              >
                <div className="flex items-center gap-2.5">
                  <School className="w-4 h-4 text-blue-600" />
                  <span>Change Class (Nursery–12th)</span>
                </div>
                <span className="font-bold text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200">
                  {gradeMeta.shortLabel}
                </span>
              </button>

              {/* Sound Toggle */}
              <button
                onClick={() => {
                  hapticFeedback('light');
                  setSoundEnabled(!soundEnabled);
                }}
                className="w-full flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 font-semibold cursor-pointer touch-press"
              >
                <div className="flex items-center gap-2.5">
                  {soundEnabled ? (
                    <Volume2 className="w-4 h-4 text-emerald-600" />
                  ) : (
                    <VolumeX className="w-4 h-4 text-slate-400" />
                  )}
                  <span>Game & Lesson Sounds</span>
                </div>
                <span className={`font-bold px-2.5 py-0.5 rounded-full ${soundEnabled ? 'text-emerald-700 bg-emerald-50' : 'text-slate-500 bg-slate-200'}`}>
                  {soundEnabled ? 'ON' : 'OFF'}
                </span>
              </button>

              {/* Parent Portal */}
              <button
                onClick={handleParentPortal}
                className="w-full flex items-center justify-between p-3 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-900 font-bold cursor-pointer touch-press border border-indigo-200"
              >
                <div className="flex items-center gap-2.5">
                  <Shield className="w-4 h-4 text-indigo-600" />
                  <span>Parent Dashboard (PIN Protected)</span>
                </div>
                <ChevronRight className="w-4 h-4 text-indigo-600" />
              </button>

              {/* Account & Profile Switch */}
              <button
                onClick={() => handleNav('login')}
                className="w-full flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 font-semibold cursor-pointer touch-press"
              >
                <div className="flex items-center gap-2.5">
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  <span>Account & Cloud Profile</span>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </button>
            </div>

            {/* Offline PWA Install Banner */}
            <div className="pt-2">
              <PWAInstallButton variant="card" />
            </div>
          </div>
        </div>
      )}
    </>
  );
};
