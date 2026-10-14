import React, { useState } from 'react';
import { useGame } from '../context/GameContext';
import { getGradeDetails } from '../data/gradesData';
import { getStudyBuddy } from '../data/buddiesData';
import { BuddyAvatar } from './BuddyAvatar';
import { BuddySelectorModal } from './BuddySelectorModal';
import { AuthModal } from './AuthModal';
import {
  Volume2,
  VolumeX,
  Shield,
  Coins,
  Sparkles,
  Flame,
  User,
  Settings,
  HelpCircle,
  Award,
  School,
  Users,
  Cloud,
  Database,
  Wifi,
  WifiOff,
  Globe,
} from 'lucide-react';
import { PWAInstallButton } from './PWAInstallButton';
import { DeviceAdaptiveBadge } from './DeviceAdaptiveBadge';
import { useOnlineStatus } from '../hooks/useOnlineStatus';
import { LanguageSelectorModal } from './LanguageSelectorModal';
import { SUPPORTED_LANGUAGES } from '../data/languages';
import { StreakFlameIcon } from './StreakFlameIcon';
import { soundEngine } from '../utils/audio';

export const Navbar: React.FC = () => {
  const {
    currentScreen,
    setCurrentScreen,
    activeChild,
    soundEnabled,
    setSoundEnabled,
    requestParentAction,
    activeBuddyId,
    currentUser,
    isAuthModalOpen,
    setIsAuthModalOpen,
    isFirestoreConnected,
    language,
    isLanguageModalOpen,
    setIsLanguageModalOpen,
    setIsStreakModalOpen,
    t,
  } = useGame();

  const [isBuddyModalOpen, setIsBuddyModalOpen] = useState(false);
  const isOnline = useOnlineStatus();
  const studyBuddy = getStudyBuddy(activeBuddyId);
  const gradeMeta = getGradeDetails(activeChild.gradeLevel);

  const handleParentPortalClick = () => {
    requestParentAction(() => {
      setCurrentScreen('parent_dashboard');
    });
  };

  const navLinks = [
    { label: t.navMap, screen: 'level_map' as const },
    { label: t.navChapters || 'Chapters (25-Q)', screen: 'chapter_quizzes' as const },
    { label: t.navSubjects, screen: 'subjects' as const },
    { label: t.navReadLearn, screen: 'read_and_learn' as const },
    { label: t.navShop, screen: 'rewards' as const },
    { label: t.navBadges, screen: 'achievements' as const },
    { label: t.navProgress, screen: 'progress_dashboard' as const },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Zone 1: Single text wordmark & Class Tag */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={() => setCurrentScreen('home_dashboard')}
            className="flex items-center gap-2 group text-left cursor-pointer"
          >
            <span className="text-xl sm:text-2xl font-bold tracking-tight font-heading bg-gradient-to-r from-indigo-700 via-indigo-600 to-amber-600 bg-clip-text text-transparent group-hover:opacity-90 transition-opacity">
              WonderQuest
            </span>
          </button>

          {/* Quick Class Badge & Switcher */}
          <button
            onClick={() => setCurrentScreen('age_select')}
            title="Click to Switch Class (Nursery to 12th)"
            className="flex items-center gap-1.5 text-xs font-bold text-slate-800 bg-slate-100 hover:bg-slate-200 border border-slate-200 px-2.5 py-1 rounded-full transition-all cursor-pointer shadow-xs hover:scale-105"
          >
            <span>{gradeMeta.icon}</span>
            <span className="hidden xs:inline">{gradeMeta.shortLabel}</span>
            <span className="text-[10px] text-slate-500 font-medium hidden sm:inline">({activeChild.ageGroup}y)</span>
          </button>

          {/* 5-Language Switcher (Switch anytime between English, Hindi, Telugu, Kannada, Malayalam) */}
          <button
            onClick={() => setIsLanguageModalOpen(true)}
            title={`Current Language: ${SUPPORTED_LANGUAGES[language]?.name} • Click to switch to Hindi, Telugu, Kannada, Malayalam`}
            className="flex items-center gap-1.5 text-xs font-black text-indigo-900 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 px-2.5 py-1 rounded-full transition-all cursor-pointer shadow-xs hover:scale-105"
          >
            <Globe className="w-3.5 h-3.5 text-indigo-600" />
            <span className="font-heading">{SUPPORTED_LANGUAGES[language]?.nativeName}</span>
          </button>
        </div>

        {/* Zone 2: Clean text navigation links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
          {navLinks.map((link) => {
            const isActive = currentScreen === link.screen;
            return (
              <button
                key={link.screen}
                onClick={() => setCurrentScreen(link.screen)}
                className={`transition-colors cursor-pointer py-1 relative ${
                  isActive
                    ? 'text-indigo-600 font-bold border-b-2 border-indigo-600'
                    : 'hover:text-slate-900'
                }`}
              >
                {link.label}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Actions, Kid Currency & Parent Portal */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Daily Streak Flame Button */}
          <button
            onClick={() => {
              soundEngine.playCardFlip();
              setIsStreakModalOpen(true);
            }}
            title={`${activeChild.streakDays} day learning streak! Click to view Streak Flame milestones.`}
            className="flex items-center gap-1.5 text-xs font-black text-orange-700 bg-orange-50 hover:bg-orange-100 px-2.5 py-1 rounded-full border border-orange-200 transition-all cursor-pointer shadow-2xs hover:scale-105 active:scale-95"
          >
            <StreakFlameIcon size="sm" animated={true} />
            <span className="tabular-nums font-heading">{activeChild.streakDays}d</span>
          </button>

          {/* Wonder Coins */}
          <div
            title={`${activeChild.coins} Wonder Coins`}
            className="flex items-center gap-1.5 text-xs font-bold text-amber-700 bg-amber-50 px-3 py-1 rounded-full border border-amber-200"
          >
            <Coins className="w-4 h-4 text-amber-500 fill-amber-400" />
            <span className="tabular-nums font-mono">{activeChild.coins}</span>
          </div>

          {/* Sound Toggle */}
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
            title={soundEnabled ? 'Mute Audio' : 'Enable Audio'}
            aria-label="Toggle Sound"
          >
            {soundEnabled ? (
              <Volume2 className="w-5 h-5 text-indigo-600" />
            ) : (
              <VolumeX className="w-5 h-5 text-slate-400" />
            )}
          </button>

          {/* Parent Portal (PIN Gated) */}
          <button
            onClick={handleParentPortalClick}
            className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:text-slate-950 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
            title="Parent Dashboard (Protected with PIN)"
          >
            <Shield className="w-3.5 h-3.5 text-indigo-600" />
            <span>Parents</span>
          </button>

          {/* Study Buddy Mentor Pill */}
          <button
            onClick={() => setIsBuddyModalOpen(true)}
            className="flex items-center gap-1.5 pl-1.5 pr-2.5 py-1 bg-indigo-50 hover:bg-indigo-100 rounded-full border border-indigo-200 transition-colors cursor-pointer"
            title={`Study Buddy: ${studyBuddy.name} (Click to change)`}
          >
            <BuddyAvatar
              buddyId={studyBuddy.id}
              size="sm"
              showReactionBadge={false}
              animationState="idle"
              className="w-5 h-5"
            />
            <span className="text-xs font-bold text-indigo-900 hidden md:inline-block max-w-[80px] truncate">
              {studyBuddy.name}
            </span>
          </button>

          {/* Cloud Database & Account Button -> Full Login / Profile Page */}
          <button
            onClick={() => setCurrentScreen('login')}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer border ${
              currentUser
                ? 'bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100'
                : 'bg-indigo-50 text-indigo-700 border-indigo-200 hover:bg-indigo-100'
            }`}
            title={
              currentUser
                ? `Logged in: ${currentUser.email} • Click to manage account or switch user`
                : 'Login / Register: Email, Password, Age, Class, Phone & Language'
            }
          >
            <span className="relative flex h-2 w-2">
              <span
                className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                  currentUser ? 'bg-emerald-400' : 'bg-indigo-400'
                }`}
              />
              <span
                className={`relative inline-flex rounded-full h-2 w-2 ${
                  currentUser ? 'bg-emerald-500' : 'bg-indigo-500'
                }`}
              />
            </span>
            <Cloud className="w-3.5 h-3.5" />
            <span className="hidden xl:inline-block max-w-[110px] truncate">
              {currentUser ? currentUser.displayName.split(' ')[0] : 'Cloud Sync'}
            </span>
          </button>

          {/* Online/Offline Status Indicator */}
          {!isOnline && (
            <div
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-900 border border-amber-300 animate-pulse"
              title="You are currently offline. All quizzes and games work 100% offline!"
            >
              <WifiOff className="w-3.5 h-3.5 text-amber-700" />
              <span className="hidden lg:inline text-[11px]">Offline Mode</span>
            </div>
          )}

          {/* Cross-Device Optimization Badge (Laptop, iPhone, Android, Tablet) */}
          <DeviceAdaptiveBadge />

          {/* PWA Install Button (Works on Android, iOS, Windows, Mac) */}
          <PWAInstallButton variant="navbar" />

          {/* Active Child Profile Pill */}
          <button
            onClick={() => setCurrentScreen('child_profile_select')}
            className="flex items-center gap-2 pl-2 pr-3 py-1 bg-slate-100 hover:bg-slate-200 rounded-full border border-slate-200 transition-colors cursor-pointer"
            title="Switch Child Profile"
          >
            <div className="relative flex items-center justify-center">
              <span className="text-base leading-none select-none">{activeChild.avatar}</span>
              {activeChild.activeAccessory && (
                <span
                  title={`Equipped Accessory: ${activeChild.activeAccessory}`}
                  className="absolute -top-2 -right-2 text-[11px] leading-none select-none drop-shadow-2xs animate-gentle-bounce"
                >
                  {activeChild.activeAccessory}
                </span>
              )}
            </div>
            <span className="text-xs font-semibold text-slate-800 hidden sm:inline-block max-w-[90px] truncate">
              {activeChild.name.split(' ')[0]}
            </span>
          </button>
        </div>
      </div>

      {/* Buddy Selection Modal */}
      <BuddySelectorModal
        isOpen={isBuddyModalOpen}
        onClose={() => setIsBuddyModalOpen(false)}
      />

      {/* Cloud Auth & Database Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        currentUser={currentUser}
      />

      {/* 5-Language Selection Modal (Child can switch anytime) */}
      <LanguageSelectorModal
        isOpen={isLanguageModalOpen}
        onClose={() => setIsLanguageModalOpen(false)}
      />
    </header>
  );
};
