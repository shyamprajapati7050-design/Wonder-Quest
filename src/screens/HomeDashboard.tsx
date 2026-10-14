import React from 'react';
import { useGame } from '../context/GameContext';
import { ASSET_PATHS } from '../assets/assetRegistry';
import { getGradeDetails } from '../data/gradesData';
import {
  Play,
  BookOpen,
  MapPin,
  Trophy,
  Flame,
  Coins,
  Sparkles,
  Target,
  ArrowRight,
  ShieldAlert,
  GraduationCap,
  Award,
  Compass,
  CheckCircle2,
  School,
  BookCheck,
  Users,
  Volume2,
  Cloud,
  Database,
  Lock,
  Server,
  ShieldCheck,
  Wifi,
  WifiOff,
  Globe,
} from 'lucide-react';
import { SUBJECTS } from '../data/subjects';
import { getStudyBuddy } from '../data/buddiesData';
import { BuddyAvatar } from '../components/BuddyAvatar';
import { BuddySelectorModal } from '../components/BuddySelectorModal';
import { soundEngine } from '../utils/audio';
import { PWAInstallButton } from '../components/PWAInstallButton';
import { useOnlineStatus } from '../hooks/useOnlineStatus';
import { SUPPORTED_LANGUAGES } from '../data/languages';
import { AppLanguage } from '../types';
import { StreakFlameCard } from '../components/StreakFlameCard';
import { StreakFlameIcon } from '../components/StreakFlameIcon';
import { DailyGoalsCard } from '../components/DailyGoalsCard';

export const HomeDashboard: React.FC = () => {
  const {
    activeChild,
    setCurrentScreen,
    levels,
    selectLevel,
    dailyChallenges,
    claimDailyChallenge,
    startMasterTest,
    activeBuddyId,
    currentUser,
    setIsAuthModalOpen,
    isFirestoreConnected,
    language,
    setLanguage,
    setIsLanguageModalOpen,
    setIsStreakModalOpen,
    t,
  } = useGame();

  const [isBuddyModalOpen, setIsBuddyModalOpen] = React.useState(false);
  const isOnline = useOnlineStatus();
  const studyBuddy = getStudyBuddy(activeBuddyId);
  const gradeMeta = getGradeDetails(activeChild.gradeLevel);

  const currentLevelObj =
    levels.find((l) => l.id === activeChild.currentLevel) || levels[0];

  const totalLevelsCount = levels.length;
  const completedCount = activeChild.completedLevels.length;
  const progressPercent = Math.min(100, Math.round((completedCount / totalLevelsCount) * 100));

  // Calculate overall accuracy
  const scoreEntries = Object.values(activeChild.levelScores);
  const avgAccuracy =
    scoreEntries.length > 0
      ? Math.round(
          scoreEntries.reduce((acc, curr) => acc + curr.accuracy, 0) / scoreEntries.length
        )
      : 90;

  // Check if Master Test is available (unlocked when level 5 is completed or active child has milestone)
  const isMasterTestUnlocked =
    activeChild.completedLevels.includes(5) || activeChild.currentLevel >= 5;

  return (
    <div className="space-y-6 sm:space-y-8 animate-fadeIn pb-12">
      {/* Hero Welcome Banner - Clean, Professional Educational Header (No Dark Blue) */}
      <div className="relative rounded-3xl overflow-hidden bg-white text-slate-900 shadow-sm border border-slate-200/90">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-amber-100/40 via-indigo-50/30 to-transparent rounded-full blur-2xl pointer-events-none" />

        <div className="relative p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-5">
            {/* Avatar, Frame, Pet & Master Test Accessory Cluster */}
            <div className="relative">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-amber-50/80 border-2 border-amber-300 flex items-center justify-center text-4xl sm:text-5xl shadow-xs relative">
                <span>{activeChild.avatar}</span>
                {activeChild.activeAccessory && (
                  <div
                    title={`Master Test Tier Accessory: ${activeChild.activeAccessory}`}
                    className="absolute -top-3 -right-2 w-8 h-8 rounded-full bg-white border border-amber-300 flex items-center justify-center text-lg shadow-sm animate-gentle-bounce"
                  >
                    {activeChild.activeAccessory}
                  </div>
                )}
              </div>
              {activeChild.activePet && (
                <div
                  title="Equipped Companion Pet"
                  className="absolute -bottom-2 -right-2 w-9 h-9 rounded-full bg-amber-400 border-2 border-white flex items-center justify-center text-lg shadow-sm animate-gentle-bounce"
                >
                  {activeChild.activePet}
                </div>
              )}
            </div>

            <div>
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-1.5">
                <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">
                  Level {activeChild.currentLevel} Explorer
                </span>
                <span className="text-xs text-slate-300">·</span>
                <button
                  onClick={() => setCurrentScreen('age_select')}
                  className="inline-flex items-center gap-1.5 text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 px-2.5 py-0.5 rounded-full border border-slate-200 transition-all cursor-pointer shadow-2xs"
                  title="Change Class (Nursery to 12th)"
                >
                  <span>{gradeMeta.icon}</span>
                  <span>{gradeMeta.label}</span>
                  <span className="text-[10px] text-slate-500">· Change</span>
                </button>
                <span className="text-xs text-slate-300">·</span>
                {/* 1-Click Language Switcher Pill */}
                <button
                  onClick={() => setIsLanguageModalOpen(true)}
                  className="inline-flex items-center gap-1.5 text-xs font-bold bg-emerald-50 hover:bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full border border-emerald-200 transition-all cursor-pointer shadow-2xs hover:scale-105"
                  title="Switch Language anytime (Hindi, English, Telugu, Kannada, Malayalam)"
                >
                  <Globe className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{SUPPORTED_LANGUAGES[language]?.nativeName}</span>
                  <span className="text-[10px] text-emerald-600">· {t.switchLanguage}</span>
                </button>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold font-heading text-slate-900 tracking-tight">
                Welcome back, {activeChild.name}!
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-lg leading-relaxed">
                Ready for today’s quest? Master 25 questions in Level {activeChild.currentLevel} to earn coins, unlock Read & Learn lessons, and conquer Master Tests!
              </p>
            </div>
          </div>

          {/* Quick Play CTA */}
          <div className="flex flex-col sm:flex-row md:flex-col gap-2.5 w-full sm:w-auto shrink-0">
            <button
              onClick={() => selectLevel(currentLevelObj)}
              className="px-6 py-3.5 bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-400 hover:from-amber-400 hover:to-yellow-300 text-slate-950 font-bold text-sm rounded-2xl shadow-md shadow-amber-500/20 flex items-center justify-center gap-2 transform active:scale-95 transition-all cursor-pointer"
            >
              <Play className="w-4 h-4 fill-slate-950" />
              <span>Continue Level {activeChild.currentLevel} (25 Qs)</span>
            </button>
            <button
              onClick={() => setCurrentScreen('level_map')}
              className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold rounded-xl border border-slate-200 transition-colors cursor-pointer text-center"
            >
              Explore World Map
            </button>
          </div>
        </div>

        {/* Level Progression Bar Strip */}
        <div className="bg-slate-50/80 backdrop-blur-sm px-6 py-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-600">
          <div className="flex items-center gap-2">
            <span className="text-slate-500 font-medium">World 1 Journey:</span>
            <span className="font-bold text-slate-900">
              {completedCount} of {totalLevelsCount} Levels Completed
            </span>
          </div>

          <div className="flex items-center gap-3 flex-1 max-w-xs">
            <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
              <div
                className="bg-gradient-to-r from-amber-500 to-orange-500 h-full rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <span className="text-slate-700 font-mono text-[11px] tabular-nums font-bold">
              {progressPercent}%
            </span>
          </div>

          <div className="flex items-center gap-4 text-slate-600">
            <span className="flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <strong className="text-slate-900 tabular-nums">{activeChild.stars}</strong> Stars
            </span>
            <span className="flex items-center gap-1">
              <GraduationCap className="w-3.5 h-3.5 text-indigo-600" />
              <strong className="text-slate-900 tabular-nums">{avgAccuracy}%</strong> Accuracy
            </span>
          </div>
        </div>
      </div>

      {/* Prominent Daily Streak Flame Card */}
      <StreakFlameCard />

      {/* Personalized Daily Goals & Study Plan (Progress Ring + Target Checklist) */}
      <DailyGoalsCard />

      {/* Key Metric Highlights Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {/* Streak Flame Box */}
        <button
          onClick={() => {
            soundEngine.playCardFlip();
            setIsStreakModalOpen(true);
          }}
          className="bg-white p-5 rounded-3xl border border-orange-200/80 shadow-xs hover:shadow-md flex items-center gap-4 transition-all text-left cursor-pointer group hover:border-orange-300"
          title="Click to view Streak Flame Milestones & Daily Rewards"
        >
          <div className="w-12 h-12 rounded-2xl bg-orange-50 border border-orange-200 flex items-center justify-center group-hover:scale-105 transition-transform">
            <StreakFlameIcon size="md" animated={true} />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-2xl font-extrabold text-slate-900 font-heading tabular-nums block">
                {activeChild.streakDays}d
              </span>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" title="Active today" />
            </div>
            <span className="text-xs text-orange-950 font-medium group-hover:text-orange-700 transition-colors flex items-center gap-0.5">
              {t.streakFlame || 'Streak Flame'} →
            </span>
          </div>
        </button>

        {/* Coins */}
        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-600">
            <Coins className="w-6 h-6 fill-amber-400" />
          </div>
          <div>
            <span className="text-2xl font-extrabold text-slate-900 font-heading tabular-nums block">
              {activeChild.coins}
            </span>
            <span className="text-xs text-slate-500">Wonder Coins</span>
          </div>
        </div>

        {/* Total XP */}
        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <span className="text-2xl font-extrabold text-slate-900 font-heading tabular-nums block">
              {activeChild.xp}
            </span>
            <span className="text-xs text-slate-500">Knowledge XP</span>
          </div>
        </div>

        {/* Badges Earned */}
        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <span className="text-2xl font-extrabold text-slate-900 font-heading tabular-nums block">
              {activeChild.earnedBadges.length}
            </span>
            <span className="text-xs text-slate-500">Badges Unlocked</span>
          </div>
        </div>
      </div>

      {/* Two Column Layout: Daily Quests & Milestone Arena */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Learning Hub & Adaptive Booster */}
        <div className="lg:col-span-2 space-y-6">
          {/* Active Level Spotlight Card */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                <h3 className="text-base font-bold text-slate-900 font-heading">
                  Current Adventure: {currentLevelObj.title}
                </h3>
              </div>
              <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full">
                25 Questions · 60s per Q
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 my-4 leading-relaxed">
              {currentLevelObj.description}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
              <button
                onClick={() => {
                  useGame().setActiveLessonId(currentLevelObj.lessonId);
                  setCurrentScreen('read_and_learn');
                }}
                className="p-3.5 bg-blue-50/70 hover:bg-blue-100/70 border border-blue-200/80 rounded-2xl flex items-center gap-3 transition-colors cursor-pointer text-left"
              >
                <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-blue-950">Read & Learn First</h4>
                  <p className="text-[11px] text-blue-700">Audio narration & key vocabulary</p>
                </div>
              </button>

              <button
                onClick={() => selectLevel(currentLevelObj)}
                className="p-3.5 bg-amber-50/70 hover:bg-amber-100/70 border border-amber-200/80 rounded-2xl flex items-center gap-3 transition-colors cursor-pointer text-left"
              >
                <div className="w-10 h-10 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center shrink-0 font-bold">
                  <Play className="w-5 h-5 fill-slate-950" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-amber-950">Play 25 Questions</h4>
                  <p className="text-[11px] text-amber-800">Earn +{currentLevelObj.rewardCoins} coins & +{currentLevelObj.rewardXp} XP</p>
                </div>
              </button>
            </div>
          </div>

          {/* Grade Curriculum & Syllabus Card (Nursery to 12th) */}
          <div className="bg-gradient-to-br from-indigo-50/80 via-white to-blue-50/60 rounded-3xl border border-indigo-100 p-6 shadow-sm">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-indigo-100/80">
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${gradeMeta.color} flex items-center justify-center text-2xl shadow-sm`}>
                  {gradeMeta.icon}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-600 bg-indigo-100/70 px-2 py-0.5 rounded-md">
                      {gradeMeta.stageName} · {gradeMeta.ageRange}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900 font-heading">
                    {gradeMeta.label} Curriculum
                  </h3>
                </div>
              </div>

              <button
                onClick={() => setCurrentScreen('age_select')}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-slate-50 border border-indigo-200 text-xs font-bold text-indigo-700 rounded-xl transition-all shadow-xs cursor-pointer"
              >
                <School className="w-3.5 h-3.5" />
                <span>Switch Class (Nursery to 12th)</span>
              </button>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 my-3 leading-relaxed">
              {gradeMeta.description}
            </p>

            <div className="space-y-1.5 bg-white/80 p-3 rounded-2xl border border-indigo-100/60">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                Key Topics for {gradeMeta.shortLabel}
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs text-slate-800">
                {gradeMeta.sampleTopics.map((topic, i) => (
                  <div key={i} className="flex items-center gap-1.5 bg-slate-50 px-2.5 py-1.5 rounded-lg border border-slate-100">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0" />
                    <span className="truncate font-medium">{topic}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Study Buddy Virtual Mentor Spotlight Card */}
          <div className="bg-gradient-to-br from-indigo-50/90 via-white to-purple-50/70 rounded-3xl border border-indigo-100 p-6 shadow-sm">
            <div className="flex flex-col sm:flex-row items-center gap-5">
              <div
                onClick={() => {
                  soundEngine.playBuddyChime();
                  soundEngine.speakText(
                    `Hi ${activeChild.name}! I'm ${studyBuddy.name}. ${studyBuddy.catchphrase}`,
                    { pitch: studyBuddy.voiceConfig.pitch, rate: studyBuddy.voiceConfig.rate }
                  );
                }}
                className="cursor-pointer shrink-0"
                title={`Click to talk with ${studyBuddy.name}!`}
              >
                <BuddyAvatar
                  buddyId={studyBuddy.id}
                  size="lg"
                  animationState="waving"
                />
              </div>

              <div className="flex-1 text-center sm:text-left">
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-1">
                  <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">
                    Virtual Study Mentor
                  </span>
                  <span>·</span>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-indigo-100 text-indigo-800">
                    {studyBuddy.title}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 font-heading">
                  Meet {studyBuddy.name} ({studyBuddy.species})
                </h3>

                <p className="text-xs text-slate-600 mt-1 italic leading-relaxed">
                  "{studyBuddy.catchphrase}"
                </p>

                <div className="mt-3 flex flex-wrap items-center justify-center sm:justify-start gap-2">
                  <button
                    onClick={() => {
                      soundEngine.playBuddyChime();
                      soundEngine.speakText(
                        `Hi ${activeChild.name}! I'm ${studyBuddy.name}. ${studyBuddy.catchphrase}`,
                        { pitch: studyBuddy.voiceConfig.pitch, rate: studyBuddy.voiceConfig.rate }
                      );
                    }}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-indigo-100 hover:bg-indigo-200 text-indigo-800 text-xs font-bold rounded-xl transition-colors cursor-pointer"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>Hear {studyBuddy.name}</span>
                  </button>

                  <button
                    onClick={() => setIsBuddyModalOpen(true)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-colors cursor-pointer shadow-xs"
                  >
                    <Users className="w-3.5 h-3.5 text-slate-500" />
                    <span>Change Study Buddy</span>
                  </button>

                  <button
                    onClick={() => setCurrentScreen('read_and_learn')}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl transition-colors cursor-pointer shadow-xs"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Learn with {studyBuddy.name}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Cloud Firestore Database & Sync Card (Answers user's data storage inquiry) */}
          <div className="bg-gradient-to-br from-indigo-50/80 via-white to-slate-50 rounded-3xl border border-indigo-200/80 p-6 text-slate-900 shadow-xs relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />
            <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-indigo-100 border border-indigo-200 flex items-center justify-center shrink-0 text-indigo-700">
                  <Database className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      Google Cloud Firestore
                    </span>
                    <span className="text-[10px] text-slate-500 font-mono hidden md:inline-block">
                      Enterprise Zero-Trust
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold font-heading text-slate-900 mt-1">
                    {currentUser ? (
                      <span className="text-emerald-700">Cloud Synced: {currentUser.email}</span>
                    ) : (
                      'Cloud Data Storage & Auto-Sync'
                    )}
                  </h3>

                  <p className="text-xs text-slate-600 mt-1 max-w-xl leading-relaxed">
                    {currentUser ? (
                      <>
                        Account verified! Stored user age: <strong>{currentUser.age} yrs</strong>. Level progression, Wonder Coins (<strong>{activeChild.coins}</strong>), and Study Buddy settings are live-persisted to Firestore collections <code className="bg-slate-100 px-1 py-0.5 rounded text-indigo-700">/users/{currentUser.id}</code>.
                      </>
                    ) : (
                      <>
                        Sign up with your <strong>Email, Password, and Age</strong> to store all progress, levels, coins, and custom quizzes directly in <strong>Google Cloud Firestore</strong> across all devices!
                      </>
                    )}
                  </p>
                </div>
              </div>

              <div className="flex sm:flex-col gap-2 w-full sm:w-auto shrink-0">
                <button
                  onClick={() => setCurrentScreen('login')}
                  className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs ${
                    currentUser
                      ? 'bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200'
                      : 'bg-indigo-600 hover:bg-indigo-700 text-white'
                  }`}
                >
                  <Cloud className="w-4 h-4" />
                  <span>{currentUser ? 'Manage Cloud Account' : 'Sign Up / Store Data'}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Online & Offline Dual-Mode Banner & PWA Installation Card */}
          <div className="bg-gradient-to-br from-emerald-50/60 via-white to-indigo-50/50 rounded-3xl p-6 text-slate-900 shadow-xs relative overflow-hidden border border-slate-200">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 relative z-10">
              <div className="space-y-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider ${
                    isOnline ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' : 'bg-amber-100 text-amber-800 border border-amber-300'
                  }`}>
                    {isOnline ? (
                      <>
                        <Wifi className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Online Mode Active • ऑनलाइन मोड</span>
                      </>
                    ) : (
                      <>
                        <WifiOff className="w-3.5 h-3.5 text-amber-600 animate-pulse" />
                        <span>Offline Mode Active • ऑफ़लाइन मोड</span>
                      </>
                    )}
                  </span>
                  <span className="text-xs bg-indigo-50 border border-indigo-200 text-indigo-700 px-2.5 py-0.5 rounded-full font-bold">
                    Dual Situation Enabled (ऑनलाइन + ऑफ़लाइन)
                  </span>
                </div>

                <h3 className="text-lg sm:text-xl font-black font-heading text-slate-900">
                  Plays 100% Offline & Auto-Syncs Online
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed">
                  Internet ho ya na ho, WonderQuest har situation me chalta hai! Sabhi 100+ Levels, Math & Science Quiz,
                  Read & Learn lessons aur audio synthesizer device par locally cache hain. Jab internet aayega, aapke coins aur marks automatically <strong>Google Cloud Firestore</strong> me sync ho jayenge.
                </p>

                <div className="flex flex-wrap items-center gap-3 pt-1 text-xs text-slate-600">
                  <span className="flex items-center gap-1 text-emerald-700 font-semibold">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> No Wi-Fi Needed
                  </span>
                  <span className="flex items-center gap-1 text-emerald-700 font-semibold">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Zero Data Wastage
                  </span>
                  <span className="flex items-center gap-1 text-emerald-700 font-semibold">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Cloud Auto-Sync
                  </span>
                </div>
              </div>

              <div className="shrink-0 flex flex-col sm:flex-row lg:flex-col gap-2.5">
                <PWAInstallButton variant="card" className="w-full sm:w-auto" />
              </div>
            </div>
          </div>

          {/* 5 Languages Support Card (Child can switch anytime) */}
          <div className="bg-white rounded-3xl border border-indigo-200/80 p-6 shadow-sm relative overflow-hidden">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-indigo-50 border border-indigo-200 text-indigo-600 flex items-center justify-center font-bold">
                  <Globe className="w-6 h-6 animate-spin-slow" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">
                      Multilingual Learning • बहुभाषी शिक्षा
                    </span>
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 font-extrabold px-2 py-0.5 rounded-full">
                      5 Languages Active
                    </span>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 font-heading">
                    Learn in English, हिन्दी, తెలుగు, ಕನ್ನಡ & മലയാളം
                  </h3>
                </div>
              </div>

              <button
                onClick={() => setIsLanguageModalOpen(true)}
                className="inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs rounded-xl shadow-xs transition-all cursor-pointer"
              >
                <Globe className="w-3.5 h-3.5" />
                <span>{t.switchLanguage}</span>
              </button>
            </div>

            <p className="text-xs text-slate-600 mb-4 leading-relaxed">
              WonderQuest supports complete bilingual and regional learning. <strong>{activeChild.name}</strong> can switch languages at any moment—during quizzes, lessons, or dashboards—and the virtual study buddy will pronounce words in that language!
            </p>

            {/* 5 Quick Language Toggle Chips */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
              {(Object.values(SUPPORTED_LANGUAGES) as typeof SUPPORTED_LANGUAGES[AppLanguage][]).map((item) => {
                const isSelected = language === item.code;
                return (
                  <button
                    key={item.code}
                    onClick={() => {
                      soundEngine.playCardFlip();
                      setLanguage(item.code);
                      setTimeout(() => {
                        soundEngine.speakText(item.greeting, {
                          lang: item.voiceLangCode,
                          pitch: 1.15,
                          rate: 0.95,
                        });
                      }, 100);
                    }}
                    className={`flex items-center gap-2.5 p-3 rounded-2xl border-2 transition-all cursor-pointer text-left ${
                      isSelected
                        ? 'border-indigo-600 bg-indigo-50/90 shadow-sm ring-1 ring-indigo-500/30'
                        : 'border-slate-200 bg-slate-50/60 hover:bg-white hover:border-indigo-300'
                    }`}
                  >
                    <span className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs ${
                      isSelected ? 'bg-indigo-600 text-white' : 'bg-white text-slate-700 border border-slate-200'
                    }`}>
                      {item.scriptLabel}
                    </span>
                    <div className="min-w-0">
                      <div className="text-xs font-black text-slate-900 truncate font-heading">
                        {item.nativeName}
                      </div>
                      <div className="text-[10px] text-slate-500 truncate">
                        {item.name}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Adaptive Learning Recommendation Card */}
          {activeChild.weakTopics.length > 0 && (
            <div className="bg-amber-50/60 rounded-3xl border border-amber-200 p-6 shadow-sm">
              <div className="flex items-center gap-2 text-amber-800 mb-2">
                <Target className="w-5 h-5 text-amber-600" />
                <h3 className="text-sm font-bold font-heading">
                  Personalized Adaptive Practice
                </h3>
              </div>
              <p className="text-xs text-amber-900 mb-4">
                We detected topics you found tricky recently. Practice these bite-sized concepts to boost your score:
              </p>

              <div className="flex flex-wrap gap-2">
                {activeChild.weakTopics.map((wt, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setCurrentScreen('read_and_learn');
                    }}
                    className="px-3 py-1.5 bg-white border border-amber-300 rounded-xl text-xs font-semibold text-amber-900 hover:bg-amber-100 transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs"
                  >
                    <span>{wt.topic}</span>
                    <span className="text-[10px] text-amber-600 bg-amber-100 px-1.5 py-0.2 rounded font-mono">
                      Review
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Subject Mastery Grid */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-slate-900 font-heading">
                Subject Explorations
              </h3>
              <button
                onClick={() => setCurrentScreen('subjects')}
                className="text-xs font-semibold text-blue-600 hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>View All 8 Subjects</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {SUBJECTS.slice(0, 4).map((sub) => (
                <div
                  key={sub.id}
                  onClick={() => setCurrentScreen('subjects')}
                  className="p-3.5 rounded-2xl border border-slate-200 hover:border-blue-300 hover:shadow-sm transition-all cursor-pointer bg-slate-50/50 hover:bg-white text-center"
                >
                  <span className="text-xs font-bold text-slate-800 block truncate">
                    {sub.shortName}
                  </span>
                  <span className="text-[11px] text-slate-500 block mt-0.5 truncate">
                    {sub.topicsByAge[activeChild.ageGroup]?.[0] || 'Core Lessons'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right 1 Col: Master Test Arena & Daily Quests */}
        <div className="space-y-6">
          {/* Milestone & Master Test Card */}
          <div className="bg-gradient-to-br from-amber-500 via-orange-500 to-amber-600 rounded-3xl p-6 text-white shadow-lg relative overflow-hidden">
            <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center mb-4">
              <Trophy className="w-6 h-6 text-white" />
            </div>

            <span className="text-[11px] font-extrabold uppercase tracking-widest text-amber-200 block">
              Level 5 Milestone
            </span>
            <h3 className="text-xl font-extrabold font-heading text-white mt-0.5">
              Master Test Arena
            </h3>

            <p className="text-xs text-amber-100 mt-2 leading-relaxed">
              Complete 5 levels to unlock the 15-question Master Test! Passing requirement: 12/15 (80%).
            </p>

            <div className="mt-5">
              <button
                onClick={() => startMasterTest(5)}
                className="w-full py-3 bg-white hover:bg-amber-50 text-slate-950 font-bold text-xs rounded-xl shadow-md transition-colors cursor-pointer flex items-center justify-center gap-2"
              >
                <Trophy className="w-4 h-4 text-amber-600" />
                <span>Enter Master Test (15 Questions)</span>
              </button>
            </div>
          </div>

          {/* Daily Quests */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4 text-orange-500" />
                <h3 className="text-sm font-bold text-slate-900 font-heading">
                  Daily Quests
                </h3>
              </div>
              <span className="text-[11px] font-semibold text-slate-400">Resets daily</span>
            </div>

            <div className="space-y-3">
              {dailyChallenges.map((ch) => (
                <div
                  key={ch.id}
                  className="p-3 rounded-2xl border border-slate-100 bg-slate-50/70 flex items-center justify-between gap-3"
                >
                  <div className="min-w-0">
                    <h4 className="text-xs font-bold text-slate-800 truncate">
                      {ch.title}
                    </h4>
                    <span className="text-[11px] text-slate-500 font-mono">
                      {ch.currentCount}/{ch.targetCount} · +{ch.rewardCoins} Coins
                    </span>
                  </div>

                  {ch.completed ? (
                    <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-1 rounded-lg border border-emerald-200 shrink-0">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Claimed
                    </span>
                  ) : ch.currentCount >= ch.targetCount ? (
                    <button
                      onClick={() => claimDailyChallenge(ch.id)}
                      className="px-3 py-1 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs rounded-lg shadow-sm transition-colors cursor-pointer shrink-0"
                    >
                      Claim
                    </button>
                  ) : (
                    <span className="text-[11px] text-slate-400 font-medium shrink-0">
                      In Progress
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Master Test Reward Tiers & Shop Quick Access */}
          <div className="bg-gradient-to-br from-amber-500/10 via-amber-500/5 to-white text-slate-900 rounded-3xl p-6 shadow-xs border border-amber-200/80">
            <div className="flex items-center gap-1.5 mb-1">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
              <h4 className="text-xs font-bold uppercase tracking-wider text-amber-800">
                Reward Tiers & Accessories
              </h4>
            </div>
            <p className="text-xs text-slate-600 mb-4 leading-relaxed">
              Pass Master Tests to unlock legendary avatar accessories (🎓, 👑, 🪽, ⚡), bonus coins, and family prizes!
            </p>
            <button
              onClick={() => setCurrentScreen('rewards')}
              className="w-full py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold rounded-xl shadow-xs transition-colors cursor-pointer flex items-center justify-center gap-1.5"
            >
              <Trophy className="w-3.5 h-3.5 fill-slate-950" />
              <span>Explore Reward Tiers</span>
            </button>
          </div>
        </div>
      </div>

      {/* Buddy Selection Modal */}
      <BuddySelectorModal
        isOpen={isBuddyModalOpen}
        onClose={() => setIsBuddyModalOpen(false)}
      />
    </div>
  );
};
