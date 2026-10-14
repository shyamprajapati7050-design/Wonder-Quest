import React, { useState } from 'react';
import { useGame } from '../context/GameContext';
import {
  Volume2,
  VolumeX,
  Shield,
  HelpCircle,
  ArrowLeft,
  RotateCcw,
  Sparkles,
  Lock,
  CheckCircle2,
  Wifi,
  WifiOff,
  Cloud,
  Smartphone,
  Globe,
} from 'lucide-react';
import { PWAInstallButton } from '../components/PWAInstallButton';
import { useOnlineStatus } from '../hooks/useOnlineStatus';
import { SUPPORTED_LANGUAGES } from '../data/languages';
import { AppLanguage } from '../types';
import { firebaseService } from '../services/firebase';

export const SettingsScreen: React.FC = () => {
  const {
    soundEnabled,
    setSoundEnabled,
    voiceEnabled,
    setVoiceEnabled,
    activeChild,
    setCurrentScreen,
    requestParentAction,
    language,
    setLanguage,
    setIsLanguageModalOpen,
    t,
    currentUser,
  } = useGame();

  const isOnline = useOnlineStatus();
  const [faqOpened, setFaqOpened] = useState<number | null>(null);

  const faqs = [
    {
      q: 'Does WonderQuest work offline without internet (ऑफ़लाइन)?',
      a: 'Yes! WonderQuest is engineered to work in both Online and Offline situations. All 100+ Levels, math/science questions, Read & Learn lessons, and speech chimes are stored directly on your device. You can play in planes, cars, or areas with no internet connection. When you reconnect to Wi-Fi/mobile data, all your coins, stars, and quiz scores automatically synchronize with Google Cloud Firestore.',
    },
    {
      q: 'How do I install the WonderQuest app on my device?',
      a: 'Click the "Install App" button in the navigation bar or settings. On Chrome/Android/Desktop, installation is 1-click. On iPhone/iPad (Safari), tap the Share icon and select "Add to Home Screen". The app will open in full-screen standalone mode without any browser address bar!',
    },
    {
      q: 'How does the 25-question level system work?',
      a: 'Every level is carefully curated with exactly 25 interactive questions spanning Math, Science, Language, and Logic. A 60-second timer per question helps build focus without overwhelming pressure.',
    },
    {
      q: 'What is the Master Test and when does it unlock?',
      a: 'After every 5 completed levels (e.g. Level 5, Level 10), a Master Test with exactly 15 comprehensive questions unlocks automatically. Passing requires scoring at least 12/15 (80%). Passing awards high-tier trophies and unlocks the next world!',
    },
    {
      q: 'How does adaptive learning help when I struggle?',
      a: 'If questions are answered incorrectly, WonderQuest detects the exact weak topic (e.g. fractions, plant cells, or punctuation), suggests tailored Read & Learn revision, and reinforces those concepts before higher levels.',
    },
    {
      q: 'Is WonderQuest safe for children?',
      a: 'Yes! WonderQuest is designed exclusively for kids: zero third-party advertisements, zero chat with strangers, no personal data tracking, and secure parent oversight with PIN authentication.',
    },
    {
      q: 'How do real-world prizes work?',
      a: 'Children can spend earned Wonder Coins to request fun family privileges (like choosing dinner or extra storytime). Requests go directly to the Parent Dashboard for approval.',
    },
  ];

  return (
    <div className="max-w-3xl mx-auto space-y-6 sm:space-y-8 animate-fadeIn pb-24">
      {/* Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setCurrentScreen('home_dashboard')}
          className="flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-white border border-slate-200 px-3.5 py-2 rounded-xl transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Dashboard</span>
        </button>

        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
          Preferences & Support
        </span>
      </div>

      <div className="text-center max-w-xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-heading">
          Settings & Explorer Help
        </h1>
        <p className="mt-2 text-sm text-slate-600">
          Audio controls, child safety guidelines, and platform assistance.
        </p>
      </div>

      {/* Account & Login Card */}
      <div className="bg-gradient-to-br from-indigo-900 via-slate-900 to-indigo-950 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-amber-400/10 rounded-full blur-2xl pointer-events-none" />
        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-400/20 text-amber-300 border border-amber-400/30">
                {currentUser ? 'Logged In Account' : 'Guest Mode Active'}
              </span>
              <span className="text-xs text-slate-400">
                {isOnline ? 'Cloud Synced' : 'Offline'}
              </span>
            </div>
            <h3 className="text-xl font-bold font-heading text-white">
              {currentUser ? currentUser.displayName || currentUser.email : 'Log In or Register Account'}
            </h3>
            <p className="text-xs text-slate-300 max-w-lg leading-relaxed">
              {currentUser ? (
                <>
                  Email: <strong>{currentUser.email}</strong> · Age: <strong>{currentUser.age} yrs</strong> · Class: <strong>{currentUser.gradeLevel?.toUpperCase()}</strong>
                  {currentUser.phoneNumber ? ` · Phone: ${currentUser.phoneNumber}` : ''}
                </>
              ) : (
                'Sign in with your Email ID, Password, Phone Number, Age, and Class to preserve progress across devices and access personalized quests!'
              )}
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setCurrentScreen('login')}
              className="px-4 py-2.5 rounded-xl font-bold text-xs bg-amber-400 hover:bg-amber-300 text-slate-950 shadow-md shadow-amber-500/25 transition cursor-pointer"
            >
              {currentUser ? 'Switch Account / Log In' : 'Open Login Page'}
            </button>
            {currentUser && (
              <button
                onClick={async () => {
                  await firebaseService.signOut();
                  setCurrentScreen('login');
                }}
                className="px-3.5 py-2.5 rounded-xl font-bold text-xs bg-white/10 hover:bg-white/20 text-white border border-white/15 transition cursor-pointer"
              >
                Sign Out
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Audio Preferences Card */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm">
        <h3 className="text-lg font-bold text-slate-900 font-heading mb-4">
          Audio & Accessibility
        </h3>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
                <Volume2 className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-slate-900">
                  Chimes & Sound Effects
                </h4>
                <p className="text-[11px] text-slate-500">
                  Play cheerful tones for correct answers and fanfare
                </p>
              </div>
            </div>

            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                soundEnabled
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-200 text-slate-600'
              }`}
            >
              {soundEnabled ? 'Enabled' : 'Muted'}
            </button>
          </div>

          <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-slate-900">
                  Voice Readout (Text-to-Speech)
                </h4>
                <p className="text-[11px] text-slate-500">
                  Allow questions and lessons to be narrated aloud
                </p>
              </div>
            </div>

            <button
              onClick={() => setVoiceEnabled(!voiceEnabled)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                voiceEnabled
                  ? 'bg-indigo-600 text-white'
                  : 'bg-slate-200 text-slate-600'
              }`}
            >
              {voiceEnabled ? 'Active' : 'Disabled'}
            </button>
          </div>
        </div>
      </div>

      {/* 5-Language & Regional Speech Card */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold">
              <Globe className="w-5 h-5 animate-spin-slow" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 font-heading">
                Language & Pronunciation (5 भारतीय भाषाएं)
              </h3>
              <p className="text-xs text-slate-500">
                Current:{' '}
                <strong className="text-indigo-600 font-bold">
                  {SUPPORTED_LANGUAGES[language]?.nativeName} ({SUPPORTED_LANGUAGES[language]?.name})
                </strong>
                {' '}• Child can switch anytime
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsLanguageModalOpen(true)}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold text-xs shadow-xs transition cursor-pointer"
          >
            <Globe className="w-3.5 h-3.5" />
            <span>{t.switchLanguage}</span>
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 pt-1">
          {(Object.values(SUPPORTED_LANGUAGES) as typeof SUPPORTED_LANGUAGES[AppLanguage][]).map((item) => {
            const isSelected = language === item.code;
            return (
              <button
                key={item.code}
                onClick={() => setLanguage(item.code)}
                className={`p-3 rounded-2xl border-2 text-left transition-all cursor-pointer ${
                  isSelected
                    ? 'border-indigo-600 bg-indigo-50/80 shadow-xs ring-1 ring-indigo-500/20'
                    : 'border-slate-200 bg-slate-50/60 hover:bg-white hover:border-indigo-200'
                }`}
              >
                <div className="text-xs font-black text-slate-900 font-heading">
                  {item.nativeName}
                </div>
                <div className="text-[10px] text-slate-500">
                  {item.name}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Child Safety & Privacy Commitment */}
      <div className="bg-emerald-50/70 rounded-3xl border border-emerald-200 p-6 sm:p-8 shadow-sm">
        <div className="flex items-center gap-3 mb-2">
          <Shield className="w-6 h-6 text-emerald-600" />
          <h3 className="text-lg font-bold text-emerald-950 font-heading">
            Child Privacy & Protection Shield
          </h3>
        </div>
        <p className="text-xs text-emerald-900 leading-relaxed mb-4">
          WonderQuest is built strictly for child safety:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-emerald-950">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>No external commercial advertisements</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>No chat with strangers or open social messaging</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>No personal identifiers required (avatars only)</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Parent PIN gates sensitive settings</span>
          </div>
        </div>
      </div>

      {/* Online & Offline Capabilities Card */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-2xl flex items-center justify-center ${
              isOnline ? 'bg-emerald-100 text-emerald-600' : 'bg-amber-100 text-amber-600'
            }`}>
              {isOnline ? <Wifi className="w-5 h-5" /> : <WifiOff className="w-5 h-5" />}
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 font-heading">
                Online & Offline Dual Mode (दोनों स्थितियों में सक्रिय)
              </h3>
              <p className="text-xs text-slate-500">
                Current Status:{' '}
                <strong className={isOnline ? 'text-emerald-600' : 'text-amber-600'}>
                  {isOnline ? 'Online (Connected)' : 'Offline (Local Storage Active)'}
                </strong>
              </p>
            </div>
          </div>

          <PWAInstallButton variant="button" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs">
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
            <div className="font-bold text-slate-800 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              1. Offline Storage
            </div>
            <p className="text-slate-500 text-[11px] leading-relaxed">
              All question banks, lessons, audio synthesizer, and graphics are bundled locally in the app.
            </p>
          </div>

          <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
            <div className="font-bold text-slate-800 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-blue-500" />
              2. IndexedDB & Cache
            </div>
            <p className="text-slate-500 text-[11px] leading-relaxed">
              Progress, scores, and coins are safely stored in browser IndexedDB while without internet.
            </p>
          </div>

          <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
            <div className="font-bold text-slate-800 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-indigo-500" />
              3. Cloud Auto-Sync
            </div>
            <p className="text-slate-500 text-[11px] leading-relaxed">
              Instant background synchronization with Google Cloud Firestore as soon as device reconnects.
            </p>
          </div>
        </div>
      </div>

      {/* FAQ & Help Section */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm">
        <div className="flex items-center gap-2 mb-2">
          <HelpCircle className="w-5 h-5 text-indigo-600" />
          <h3 className="text-lg font-bold text-slate-900 font-heading">
            Frequently Asked Questions
          </h3>
        </div>
        <p className="text-xs text-slate-500 mb-6">
          Answers to common questions about gameplay, levels, and master tests.
        </p>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpened = faqOpened === idx;
            return (
              <div
                key={idx}
                onClick={() => setFaqOpened(isOpened ? null : idx)}
                className="p-4 rounded-2xl border border-slate-200 bg-slate-50/60 hover:bg-slate-50 cursor-pointer transition-colors"
              >
                <div className="flex items-center justify-between font-bold text-xs sm:text-sm text-slate-900">
                  <span>{faq.q}</span>
                  <span className="text-slate-400 font-mono text-base">{isOpened ? '−' : '+'}</span>
                </div>
                {isOpened && (
                  <p className="mt-2 pt-2 border-t border-slate-200 text-xs text-slate-600 leading-relaxed animate-fadeIn">
                    {faq.a}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
