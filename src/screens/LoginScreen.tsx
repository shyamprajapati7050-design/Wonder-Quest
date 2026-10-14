import React, { useState } from 'react';
import { useGame } from '../context/GameContext';
import { useGlobalLanguage } from '../context/GlobalLanguageContext';
import { firebaseService, StoredUserProfile } from '../services/firebase';
import { soundEngine } from '../utils/audio';
import { GRADES_METADATA, getGradeDetails, getGradeFromAge, getAgeGroupFromGrade } from '../data/gradesData';
import { STUDY_BUDDIES, getStudyBuddy } from '../data/buddiesData';
import { ASSET_PATHS } from '../assets/assetRegistry';
import { useOnlineStatus } from '../hooks/useOnlineStatus';
import { AppLanguage, GradeLevel, UserRole } from '../types';
import { DeviceAdaptiveBadge } from '../components/DeviceAdaptiveBadge';
import {
  Mail,
  Lock,
  Phone,
  User,
  Calendar,
  GraduationCap,
  Eye,
  EyeOff,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  Shield,
  Globe,
  Volume2,
  Compass,
  Play,
  RotateCcw,
  Smartphone,
  BookOpen,
  Trophy,
  Check,
  AlertCircle,
  LogIn,
  UserPlus,
} from 'lucide-react';

export const LoginScreen: React.FC = () => {
  const {
    setCurrentScreen,
    currentUser,
    switchChild,
    createChildProfile,
    allChildren,
  } = useGame();

  const {
    language,
    setLanguage,
    availableLanguages,
    currentLanguageMeta,
    t,
  } = useGlobalLanguage();

  const isOnline = useOnlineStatus();

  // Mode: 'signin' or 'signup'
  const [tab, setTab] = useState<'signin' | 'signup'>('signin');

  // Form fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [age, setAge] = useState<number>(10);
  const [gradeLevel, setGradeLevel] = useState<GradeLevel>('class_5');
  const [selectedBuddyId, setSelectedBuddyId] = useState<string>('owl_pip');
  const [selectedAvatar, setSelectedAvatar] = useState<string>('🦉');
  const [role, setRole] = useState<UserRole>('student');

  // Feedback states
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Avatar choices
  const avatarChoices = ['🦉', '🤖', '🦊', '🧸', '🐰', '🦁', '🚀', '🔬', '🎓', '🎨', '🎒', '⭐'];

  // Handle Age change -> sync recommended Grade
  const handleAgeChange = (newAge: number) => {
    setAge(newAge);
    const recGrade = getGradeFromAge(newAge);
    setGradeLevel(recGrade);
  };

  // Handle Grade change -> sync matching age
  const handleGradeChange = (newGrade: GradeLevel) => {
    setGradeLevel(newGrade);
    const meta = getGradeDetails(newGrade);
    if (newGrade === 'nursery') setAge(4);
    else if (newGrade === 'lkg_ukg') setAge(5);
    else if (newGrade === 'class_1') setAge(6);
    else if (newGrade === 'class_2') setAge(7);
    else if (newGrade === 'class_3') setAge(8);
    else if (newGrade === 'class_4') setAge(9);
    else if (newGrade === 'class_5') setAge(10);
    else if (newGrade === 'class_6') setAge(11);
    else if (newGrade === 'class_7') setAge(12);
    else if (newGrade === 'class_8') setAge(13);
    else if (newGrade === 'class_9') setAge(14);
    else if (newGrade === 'class_10') setAge(15);
    else if (newGrade === 'class_11') setAge(16);
    else if (newGrade === 'class_12') setAge(17);
  };

  // Handle Language switch with voice greeting
  const handleLanguageSelect = (langCode: AppLanguage) => {
    setLanguage(langCode, true);
  };

  // Sign In handler
  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    if (!email || !password) {
      setErrorMsg('Please enter both email and password.');
      soundEngine.playIncorrect();
      return;
    }

    try {
      setLoading(true);
      soundEngine.playCardFlip();
      const profile = await firebaseService.signInWithEmail(email.trim(), password);
      soundEngine.playCorrect();
      setSuccessMsg(`Welcome back, ${profile.displayName || 'Explorer'}!`);

      // If user profile has preferred language, apply it
      if (profile.language && profile.language !== language) {
        setLanguage(profile.language as AppLanguage, false);
      }

      setTimeout(() => {
        setCurrentScreen('home_dashboard');
      }, 900);
    } catch (err: any) {
      console.warn('Sign In error:', err);
      soundEngine.playIncorrect();
      const msg = err?.message || 'Login failed. Please check your email and password.';
      if (msg.includes('user-not-found') || msg.includes('wrong-password') || msg.includes('invalid-credential')) {
        setErrorMsg('Invalid email or password. You can also click "1-Click Demo Login" below to test instantly!');
      } else {
        setErrorMsg(msg);
      }
    } finally {
      setLoading(false);
    }
  };

  // Sign Up / Registration handler
  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    const cleanEmail = email.trim();
    const cleanName = displayName.trim() || 'Young Explorer';

    if (!cleanEmail || !password) {
      setErrorMsg('Please fill in email and password.');
      soundEngine.playIncorrect();
      return;
    }
    if (password.length < 6) {
      setErrorMsg('Password must be at least 6 characters long.');
      soundEngine.playIncorrect();
      return;
    }
    if (phoneNumber && phoneNumber.trim().length < 6) {
      setErrorMsg('Please enter a valid phone number (at least 6 digits).');
      soundEngine.playIncorrect();
      return;
    }

    try {
      setLoading(true);
      soundEngine.playCardFlip();

      const profile = await firebaseService.signUpWithEmail(
        cleanEmail,
        password,
        cleanName,
        age,
        role,
        gradeLevel,
        phoneNumber.trim(),
        language,
        selectedAvatar
      );

      soundEngine.playFanfare();
      setSuccessMsg(`Account created successfully for ${cleanName}! Starting adventure...`);

      // Create local child profile matching the new user
      const ageGroup = getAgeGroupFromGrade(gradeLevel);
      createChildProfile(cleanName, age, ageGroup, selectedAvatar, gradeLevel);

      setTimeout(() => {
        setCurrentScreen('home_dashboard');
      }, 1200);
    } catch (err: any) {
      console.warn('Sign Up error:', err);
      soundEngine.playIncorrect();
      const msg = err?.message || 'Failed to create account.';
      if (msg.includes('email-already-in-use')) {
        setErrorMsg('This email is already registered. Please sign in or use another email.');
      } else {
        setErrorMsg(msg);
      }
    } finally {
      setLoading(false);
    }
  };

  // Quick 1-Click Demo Login Helper
  const handleQuickDemoLogin = (childIndex: number) => {
    const target = allChildren[childIndex] || allChildren[0];
    soundEngine.playCorrect();
    switchChild(target.id);
    if (target.language) {
      setLanguage(target.language, false);
    }
    setSuccessMsg(`Welcome, ${target.name}! Logging into ${target.gradeLevel?.toUpperCase() || 'Quest'}...`);
    setTimeout(() => {
      setCurrentScreen('home_dashboard');
    }, 600);
  };

  // Google Sign In
  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      setErrorMsg(null);
      soundEngine.playCardFlip();
      const profile = await firebaseService.signInWithGoogle();
      soundEngine.playFanfare();
      setSuccessMsg(`Welcome, ${profile.displayName}!`);
      setTimeout(() => {
        setCurrentScreen('home_dashboard');
      }, 900);
    } catch (err: any) {
      console.warn('Google sign-in error:', err);
      soundEngine.playIncorrect();
      setErrorMsg(err?.message || 'Google sign-in was cancelled or encountered an error.');
    } finally {
      setLoading(false);
    }
  };

  const selectedBuddy = getStudyBuddy(selectedBuddyId);
  const selectedGradeMeta = getGradeDetails(gradeLevel);

  return (
    <div className="min-h-screen min-h-[100dvh] bg-slate-50 text-slate-900 flex flex-col justify-between py-6 px-4 sm:px-6 pt-safe pb-safe relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-100/50 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-100/50 rounded-full blur-3xl pointer-events-none" />

      {/* Top Header with Brand & Language Bar */}
      <div className="max-w-5xl mx-auto w-full flex flex-col sm:flex-row items-center justify-between gap-4 pb-6 border-b border-slate-200 z-10">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-amber-400 to-orange-500 flex items-center justify-center shadow-sm">
            <Sparkles className="w-6 h-6 text-slate-950" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-black font-heading tracking-tight text-slate-900">
                WonderQuest
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-200">
                5 Languages
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Adaptive Learning Adventures · Nursery to 12th Class
            </p>
          </div>
        </div>

        {/* Global 5-Language Selector in Header */}
        <div className="flex items-center gap-1.5 bg-white p-1.5 rounded-2xl border border-slate-200 shadow-xs">
          <Globe className="w-4 h-4 text-indigo-600 ml-1.5 mr-1 shrink-0" />
          {availableLanguages.map((lang) => {
            const isSelected = language === lang.code;
            return (
              <button
                key={lang.code}
                onClick={() => handleLanguageSelect(lang.code)}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-gradient-to-r from-amber-400 to-yellow-400 text-slate-950 font-bold shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
                title={`Switch language to ${lang.name} (${lang.nativeName})`}
              >
                <span>{lang.flag}</span>
                <span className="hidden md:inline">{lang.nativeName}</span>
                <span className="md:hidden text-[10px] font-mono">{lang.scriptLabel}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-4xl mx-auto w-full my-auto py-6 z-10">
        <div className="bg-white border border-slate-200/90 rounded-3xl shadow-xl overflow-hidden">
          
          {/* Card Subheader: Tabs */}
          <div className="grid grid-cols-2 border-b border-slate-200 bg-slate-100/80 p-1.5 gap-1.5">
            <button
              onClick={() => {
                setTab('signin');
                setErrorMsg(null);
                setSuccessMsg(null);
                soundEngine.playCardFlip();
              }}
              className={`flex items-center justify-center gap-2 py-3 px-4 rounded-2xl text-sm font-bold transition-all cursor-pointer ${
                tab === 'signin'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-500 hover:text-slate-900 hover:bg-white/50'
              }`}
            >
              <LogIn className="w-4 h-4 text-indigo-600" />
              <span>{t.loginTab || 'Log In'}</span>
            </button>

            <button
              onClick={() => {
                setTab('signup');
                setErrorMsg(null);
                setSuccessMsg(null);
                soundEngine.playCardFlip();
              }}
              className={`flex items-center justify-center gap-2 py-3 px-4 rounded-2xl text-sm font-bold transition-all cursor-pointer ${
                tab === 'signup'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-500 hover:text-slate-900 hover:bg-white/50'
              }`}
            >
              <UserPlus className="w-4 h-4 text-amber-500" />
              <span>{t.signUpTab || 'Create Account / Register'}</span>
            </button>
          </div>

          {/* Alert Messages */}
          {errorMsg && (
            <div className="m-6 p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 flex items-start gap-3 text-sm animate-fadeIn">
              <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
              <div className="flex-1">{errorMsg}</div>
            </div>
          )}

          {successMsg && (
            <div className="m-6 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 flex items-center gap-3 text-sm animate-fadeIn">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <div className="flex-1 font-medium">{successMsg}</div>
            </div>
          )}

          {/* TAB 1: SIGN IN */}
          {tab === 'signin' && (
            <div className="p-6 sm:p-10 space-y-8">
              <div className="text-center max-w-md mx-auto">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading">
                  Welcome Back to WonderQuest
                </h2>
                <p className="mt-2 text-sm text-slate-600">
                  Enter your credentials below to resume your learning adventure, unlock quests, and view progress!
                </p>
              </div>

              <form onSubmit={handleSignIn} className="max-w-md mx-auto space-y-4">
                {/* Email Field */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-indigo-600" />
                    <span>{t.emailId || 'Email ID'}</span>
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="explorer@wonderquest.org"
                      required
                      className="w-full bg-slate-50/80 border border-slate-200 focus:border-indigo-600 focus:bg-white rounded-xl px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-100 transition-colors"
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                      <Lock className="w-3.5 h-3.5 text-amber-600" />
                      <span>{t.password || 'Password'}</span>
                    </label>
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="text-xs text-slate-500 hover:text-slate-800 flex items-center gap-1 transition-colors cursor-pointer"
                    >
                      {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                      <span>{showPassword ? 'Hide' : 'Show'}</span>
                    </button>
                  </div>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      required
                      className="w-full bg-slate-50/80 border border-slate-200 focus:border-indigo-600 focus:bg-white rounded-xl px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-100 transition-colors"
                    />
                  </div>
                </div>

                {/* Language in Sign In Form */}
                <div className="pt-1">
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Globe className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{t.languageSelect || 'App Language'}</span>
                  </label>
                  <div className="grid grid-cols-5 gap-2">
                    {availableLanguages.map((lang) => (
                      <button
                        type="button"
                        key={lang.code}
                        onClick={() => handleLanguageSelect(lang.code)}
                        className={`py-2 px-1 text-center rounded-xl text-xs font-bold transition-all border cursor-pointer ${
                          language === lang.code
                            ? 'bg-amber-50 border-amber-300 text-amber-900 shadow-2xs'
                            : 'bg-slate-50 border-slate-200 text-slate-600 hover:border-slate-300'
                        }`}
                      >
                        <div className="text-base">{lang.flag}</div>
                        <div className="truncate text-[11px] mt-0.5">{lang.name}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Submit Sign In Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white font-bold text-sm shadow-md shadow-indigo-600/20 flex items-center justify-center gap-2 transform active:scale-98 transition-all cursor-pointer disabled:opacity-50"
                  >
                    {loading ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        <LogIn className="w-4 h-4" />
                        <span>{t.signInBtn || 'Sign In to WonderQuest'}</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Google Sign In */}
                <div className="relative flex items-center justify-center my-4">
                  <div className="border-t border-slate-200 w-full" />
                  <span className="bg-white px-3 text-[11px] text-slate-400 uppercase tracking-wider font-semibold">
                    Or
                  </span>
                  <div className="border-t border-slate-200 w-full" />
                </div>

                <button
                  type="button"
                  onClick={handleGoogleSignIn}
                  disabled={loading}
                  className="w-full py-3 px-4 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-semibold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-2xs"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                    />
                  </svg>
                  <span>Continue with Google</span>
                </button>
              </form>

              {/* 1-Click Quick Demo Login Section */}
              <div className="max-w-md mx-auto pt-6 border-t border-slate-100">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-amber-700 uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{t.quickDemoLogin || '1-Click Quick Demo Login'}</span>
                  </span>
                  <span className="text-[11px] text-slate-400">No password required</span>
                </div>

                <div className="grid grid-cols-2 gap-2.5">
                  <button
                    onClick={() => handleQuickDemoLogin(0)}
                    className="p-3 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-left transition-all hover:scale-102 cursor-pointer group shadow-2xs"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">🦉</span>
                      <div>
                        <div className="text-xs font-bold text-slate-900 group-hover:text-indigo-600">
                          Aarav (Class 5)
                        </div>
                        <div className="text-[10px] text-slate-500">Age 10 · Intermediate</div>
                      </div>
                    </div>
                  </button>

                  <button
                    onClick={() => handleQuickDemoLogin(1)}
                    className="p-3 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-left transition-all hover:scale-102 cursor-pointer group shadow-2xs"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">🐰</span>
                      <div>
                        <div className="text-xs font-bold text-slate-900 group-hover:text-indigo-600">
                          Mia (Class 2)
                        </div>
                        <div className="text-[10px] text-slate-500">Age 7 · Primary</div>
                      </div>
                    </div>
                  </button>

                  <button
                    onClick={() => handleQuickDemoLogin(2)}
                    className="p-3 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-left transition-all hover:scale-102 cursor-pointer group shadow-2xs"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">🧸</span>
                      <div>
                        <div className="text-xs font-bold text-slate-900 group-hover:text-indigo-600">
                          Toby (Nursery)
                        </div>
                        <div className="text-[10px] text-slate-500">Age 4 · Pre-Primary</div>
                      </div>
                    </div>
                  </button>

                  <button
                    onClick={() => handleQuickDemoLogin(3)}
                    className="p-3 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-left transition-all hover:scale-102 cursor-pointer group shadow-2xs"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">🎓</span>
                      <div>
                        <div className="text-xs font-bold text-slate-900 group-hover:text-indigo-600">
                          Aria (Class 12)
                        </div>
                        <div className="text-[10px] text-slate-500">Age 17 · Senior</div>
                      </div>
                    </div>
                  </button>
                </div>
              </div>

              {/* Bottom Guest Action */}
              <div className="text-center pt-4">
                <button
                  onClick={() => {
                    soundEngine.playCardFlip();
                    setCurrentScreen('home_dashboard');
                  }}
                  className="text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors cursor-pointer inline-flex items-center gap-1.5"
                >
                  <span>{t.exploreAsGuest || 'Explore as Guest'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* TAB 2: SIGN UP / REGISTRATION */}
          {tab === 'signup' && (
            <div className="p-6 sm:p-10 space-y-8">
              <div className="text-center max-w-xl mx-auto">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading">
                  Create New Student / Learner Account
                </h2>
                <p className="mt-2 text-sm text-slate-600">
                  Select your age, class, contact number, language, and companion buddy to personalize your curriculum!
                </p>
              </div>

              <form onSubmit={handleSignUp} className="space-y-6 max-w-2xl mx-auto">
                {/* Row 1: Name and Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-amber-600" />
                      <span>{t.childName || 'Student / Child Name'} *</span>
                    </label>
                    <input
                      type="text"
                      value={displayName}
                      onChange={(e) => setDisplayName(e.target.value)}
                      placeholder="e.g. Aarav Sharma"
                      required
                      className="w-full bg-slate-50/80 border border-slate-200 focus:border-indigo-600 focus:bg-white rounded-xl px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-100"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5 text-indigo-600" />
                      <span>{t.emailId || 'Email ID'} *</span>
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="learner@wonderquest.org"
                      required
                      className="w-full bg-slate-50/80 border border-slate-200 focus:border-indigo-600 focus:bg-white rounded-xl px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-100"
                    />
                  </div>
                </div>

                {/* Row 2: Password and Phone Number */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Password */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                        <Lock className="w-3.5 h-3.5 text-amber-600" />
                        <span>{t.password || 'Password (Min 6 Chars)'} *</span>
                      </label>
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="text-xs text-slate-500 hover:text-slate-800"
                      >
                        {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Create a strong password"
                      required
                      minLength={6}
                      className="w-full bg-slate-50/80 border border-slate-200 focus:border-indigo-600 focus:bg-white rounded-xl px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-100"
                    />
                  </div>

                  {/* Phone Number */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{t.phoneNumber || 'Phone Number (Parent / Student)'}</span>
                    </label>
                    <div className="relative flex items-center">
                      <span className="absolute left-3 text-xs font-mono text-slate-500">
                        🇮🇳 +91
                      </span>
                      <input
                        type="tel"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        placeholder="98765 43210"
                        className="w-full bg-slate-50/80 border border-slate-200 focus:border-indigo-600 focus:bg-white rounded-xl pl-16 pr-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-100"
                      />
                    </div>
                  </div>
                </div>

                {/* Row 3: Age & Class Selection (Crucial User Requirement) */}
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                    <div>
                      <span className="text-xs font-bold text-amber-800 uppercase tracking-wider flex items-center gap-1.5">
                        <Calendar className="w-4 h-4 text-amber-600" />
                        <span>{t.age || 'Age (Years)'}: <span className="text-slate-900 text-sm font-bold">{age} Years</span></span>
                      </span>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        Matches your child's developmental cognitive stage
                      </p>
                    </div>

                    <div className="flex items-center gap-1 flex-wrap">
                      {[3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18].map((a) => (
                        <button
                          key={a}
                          type="button"
                          onClick={() => handleAgeChange(a)}
                          className={`w-7 h-7 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                            age === a
                              ? 'bg-amber-400 text-slate-950 shadow-sm'
                              : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                          }`}
                        >
                          {a}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Which Class Selection */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2 flex items-center justify-between">
                      <span className="flex items-center gap-1.5">
                        <GraduationCap className="w-4 h-4 text-indigo-600" />
                        <span>{t.whichClass || 'Which Class / Grade'} *</span>
                      </span>
                      <span className="text-[11px] text-indigo-700 font-medium">
                        Selected: <strong>{selectedGradeMeta.label}</strong> ({selectedGradeMeta.stageName})
                      </span>
                    </label>

                    <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2">
                      {GRADES_METADATA.map((grade) => {
                        const isSelected = gradeLevel === grade.id;
                        return (
                          <button
                            type="button"
                            key={grade.id}
                            onClick={() => handleGradeChange(grade.id)}
                            className={`p-2 rounded-xl text-center border transition-all cursor-pointer ${
                              isSelected
                                ? 'bg-indigo-50 border-indigo-300 text-indigo-900 shadow-xs ring-1 ring-indigo-400 font-bold'
                                : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300 hover:text-slate-900'
                            }`}
                          >
                            <div className="text-base">{grade.icon}</div>
                            <div className="text-xs font-bold mt-1 truncate">{grade.shortLabel}</div>
                            <div className="text-[9px] text-slate-400 truncate">{grade.ageRange}</div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Row 4: Language Selection (5 Languages) */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                      <Globe className="w-4 h-4 text-emerald-600" />
                      <span>{t.languageSelect || 'Language Selection (5 Languages)'} *</span>
                    </label>
                    <span className="text-[11px] text-slate-400">
                      Child can toggle anytime during gameplay!
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
                    {availableLanguages.map((lang) => {
                      const isSelected = language === lang.code;
                      return (
                        <button
                          type="button"
                          key={lang.code}
                          onClick={() => handleLanguageSelect(lang.code)}
                          className={`p-3 rounded-2xl border text-left transition-all cursor-pointer relative overflow-hidden group ${
                            isSelected
                              ? 'bg-amber-50 border-amber-300 text-amber-900 shadow-xs font-bold'
                              : 'bg-white border-slate-200 hover:border-slate-300'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-2xl">{lang.flag}</span>
                            {isSelected && (
                              <span className="w-5 h-5 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center text-xs">
                                ✓
                              </span>
                            )}
                          </div>
                          <div className="mt-2 text-sm font-bold text-slate-900 group-hover:text-amber-800">
                            {lang.nativeName}
                          </div>
                          <div className="text-[10px] text-slate-400">{lang.name}</div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Row 5: Companion Study Buddy & Avatar */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  {/* Avatar Picker */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                      Choose Profile Avatar
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {avatarChoices.map((av) => (
                        <button
                          type="button"
                          key={av}
                          onClick={() => setSelectedAvatar(av)}
                          className={`w-9 h-9 rounded-xl text-lg flex items-center justify-center transition-all cursor-pointer ${
                            selectedAvatar === av
                              ? 'bg-amber-400 text-slate-950 scale-110 shadow-sm ring-2 ring-amber-300'
                              : 'bg-white border border-slate-200 hover:bg-slate-100 text-slate-800'
                          }`}
                        >
                          {av}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Study Buddy Companion */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                      Virtual Study Buddy
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {Object.values(STUDY_BUDDIES).slice(0, 4).map((buddy) => {
                        const isSelected = selectedBuddyId === buddy.id;
                        return (
                          <button
                            type="button"
                            key={buddy.id}
                            onClick={() => setSelectedBuddyId(buddy.id)}
                            className={`p-2 rounded-xl text-left border transition-all cursor-pointer flex items-center gap-2 ${
                              isSelected
                                ? 'bg-indigo-50 border-indigo-300 text-indigo-900 ring-1 ring-indigo-400'
                                : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                            }`}
                          >
                            <span className="text-xl">{buddy.avatarEmoji}</span>
                            <div className="truncate">
                              <div className="text-xs font-bold leading-tight">{buddy.name}</div>
                              <div className="text-[10px] text-slate-400 truncate">{buddy.title}</div>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Account Type / Role */}
                <div className="flex items-center gap-4 text-xs">
                  <span className="text-slate-500 font-semibold">Account Role:</span>
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="radio"
                      name="role"
                      value="student"
                      checked={role === 'student'}
                      onChange={() => setRole('student')}
                      className="accent-amber-500"
                    />
                    <span className="text-slate-700 font-medium">Student / Child</span>
                  </label>
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="radio"
                      name="role"
                      value="parent"
                      checked={role === 'parent'}
                      onChange={() => setRole('parent')}
                      className="accent-amber-500"
                    />
                    <span className="text-slate-700 font-medium">Parent / Guardian</span>
                  </label>
                </div>

                {/* Submit Register Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-400 hover:from-amber-300 hover:to-yellow-300 text-slate-950 font-extrabold text-base shadow-md shadow-amber-500/20 flex items-center justify-center gap-2 transform active:scale-98 transition-all cursor-pointer disabled:opacity-50"
                  >
                    {loading ? (
                      <div className="w-5 h-5 border-2 border-slate-950/30 border-t-slate-950 rounded-full animate-spin" />
                    ) : (
                      <>
                        <Sparkles className="w-5 h-5 fill-slate-950" />
                        <span>{t.createAccountBtn || 'Register & Start Adventure'}</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Switch to sign in */}
                <div className="text-center pt-2 text-xs text-slate-500">
                  <span>Already have an account? </span>
                  <button
                    type="button"
                    onClick={() => {
                      setTab('signin');
                      soundEngine.playCardFlip();
                    }}
                    className="font-bold text-indigo-600 hover:underline cursor-pointer"
                  >
                    Sign In here
                  </button>
                </div>
              </form>
            </div>
          )}

        </div>
      </div>

      {/* Footer info & Offline state */}
      <div className="max-w-5xl mx-auto w-full flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500 border-t border-slate-200 pt-4 z-10">
        <div className="flex items-center gap-2">
          <Shield className="w-4 h-4 text-emerald-600" />
          <span>Safe & Child-Friendly · Encrypted Cloud Sync · 100% Offline Capable</span>
        </div>

        <div className="flex items-center gap-3">
          <div>
            <DeviceAdaptiveBadge />
          </div>
          <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-600">
            <span className={`w-2 h-2 rounded-full ${isOnline ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`} />
            <span>{isOnline ? 'Cloud Synced' : 'Offline Ready'}</span>
          </span>
          <button
            onClick={() => {
              soundEngine.playCardFlip();
              setCurrentScreen('home_dashboard');
            }}
            className="hover:text-indigo-600 font-medium transition-colors cursor-pointer"
          >
            {t.exploreAsGuest || 'Guest Mode'}
          </button>
        </div>
      </div>
    </div>
  );
};
