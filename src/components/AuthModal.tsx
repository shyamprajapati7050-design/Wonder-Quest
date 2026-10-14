import React, { useState } from 'react';
import {
  X,
  Mail,
  Lock,
  User,
  Calendar,
  ShieldCheck,
  Database,
  Cloud,
  CheckCircle,
  AlertCircle,
  Sparkles,
  LogIn,
  UserPlus,
  Server,
} from 'lucide-react';
import { firebaseService, StoredUserProfile } from '../services/firebase';
import { soundEngine } from '../utils/audio';
import { GRADES_METADATA, getGradeFromAge } from '../data/gradesData';
import { GradeLevel } from '../types';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAuthSuccess?: (profile: StoredUserProfile) => void;
  currentUser?: StoredUserProfile | null;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onAuthSuccess,
  currentUser,
}) => {
  const [tab, setTab] = useState<'signup' | 'signin' | 'storage_info'>('signup');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [age, setAge] = useState<number>(10);
  const [gradeLevel, setGradeLevel] = useState<GradeLevel>('class_5');
  const [role, setRole] = useState<'parent' | 'student' | 'teacher'>('parent');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleAgeChange = (newAge: number) => {
    setAge(newAge);
    if (newAge >= 3) {
      setGradeLevel(getGradeFromAge(newAge));
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    if (!email || !password) {
      setErrorMsg('Please enter both email and password.');
      return;
    }
    if (password.length < 6) {
      setErrorMsg('Password must be at least 6 characters.');
      return;
    }
    if (!age || age < 3 || age > 100) {
      setErrorMsg('Please enter a valid age between 3 and 100.');
      return;
    }

    try {
      setLoading(true);
      soundEngine.playCardFlip();
      const profile = await firebaseService.signUpWithEmail(email, password, displayName, age, role, gradeLevel);
      soundEngine.playFanfare();
      setSuccessMsg(`Welcome, ${profile.displayName}! Initialized profile with Age (${profile.age}), Grade (${profile.gradeLevel}), and Progress in Firestore!`);
      if (onAuthSuccess) onAuthSuccess(profile);
      setTimeout(() => {
        onClose();
      }, 1500);
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err?.message || 'Failed to create account. Please check details.');
      soundEngine.playIncorrect();
    } finally {
      setLoading(false);
    }
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    if (!email || !password) {
      setErrorMsg('Please enter email and password.');
      return;
    }

    try {
      setLoading(true);
      soundEngine.playCardFlip();
      const profile = await firebaseService.signInWithEmail(email, password);
      soundEngine.playFanfare();
      setSuccessMsg('Successfully signed in! Synced from Firestore database.');
      if (profile && onAuthSuccess) onAuthSuccess(profile);
      setTimeout(() => {
        onClose();
      }, 1200);
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err?.message || 'Invalid credentials or user not found.');
      soundEngine.playIncorrect();
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setErrorMsg(null);
    setSuccessMsg(null);
    try {
      setLoading(true);
      soundEngine.playCardFlip();
      const profile = await firebaseService.signInWithGoogle();
      soundEngine.playFanfare();
      setSuccessMsg(`Signed in with Google as ${profile.displayName}!`);
      if (onAuthSuccess) onAuthSuccess(profile);
      setTimeout(() => {
        onClose();
      }, 1200);
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err?.message || 'Google Sign-In was cancelled or failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden border border-indigo-100 flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 p-6 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-2xl shadow-inner">
              ☁️
            </div>
            <div>
              <h2 className="text-xl font-bold tracking-tight">Cloud Database & Account</h2>
              <p className="text-xs text-indigo-100">
                Google Cloud Firestore • Zero-Trust Security • Real-time Sync
              </p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex gap-2 mt-4">
            <button
              onClick={() => {
                setTab('signup');
                setErrorMsg(null);
              }}
              className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                tab === 'signup'
                  ? 'bg-white text-indigo-700 shadow-md'
                  : 'bg-white/10 hover:bg-white/20 text-white'
              }`}
            >
              <UserPlus className="w-3.5 h-3.5" />
              Sign Up
            </button>
            <button
              onClick={() => {
                setTab('signin');
                setErrorMsg(null);
              }}
              className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                tab === 'signin'
                  ? 'bg-white text-indigo-700 shadow-md'
                  : 'bg-white/10 hover:bg-white/20 text-white'
              }`}
            >
              <LogIn className="w-3.5 h-3.5" />
              Sign In
            </button>
            <button
              onClick={() => {
                setTab('storage_info');
                setErrorMsg(null);
              }}
              className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                tab === 'storage_info'
                  ? 'bg-white text-indigo-700 shadow-md'
                  : 'bg-white/10 hover:bg-white/20 text-white'
              }`}
            >
              <Database className="w-3.5 h-3.5" />
              Data Storage
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-4">
          {errorMsg && (
            <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl flex items-start gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
              <span>{errorMsg}</span>
            </div>
          )}

          {successMsg && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs rounded-xl flex items-start gap-2">
              <CheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
              <span>{successMsg}</span>
            </div>
          )}

          {/* TAB 1: SIGN UP (Email, Password, Age, Name) */}
          {tab === 'signup' && (
            <form onSubmit={handleSignUp} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Full Name / Nickname</label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    placeholder="e.g. Leo Star"
                    className="w-full pl-9 pr-3 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Email Address</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full pl-9 pr-3 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Password (min 6 characters)</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="password"
                    required
                    minLength={6}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-9 pr-3 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all"
                  />
                </div>
              </div>

              {/* Age, Grade Level & Role Fields */}
              <div className="grid grid-cols-3 gap-2.5">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Age <span className="text-indigo-600 font-semibold">*</span>
                  </label>
                  <div className="relative">
                    <Calendar className="w-4 h-4 text-slate-400 absolute left-2.5 top-3" />
                    <input
                      type="number"
                      required
                      min={3}
                      max={100}
                      value={age}
                      onChange={(e) => handleAgeChange(parseInt(e.target.value, 10) || 0)}
                      className="w-full pl-8 pr-2 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all font-semibold"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Grade Level</label>
                  <select
                    value={gradeLevel}
                    onChange={(e) => setGradeLevel(e.target.value as GradeLevel)}
                    className="w-full px-2 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all cursor-pointer font-medium"
                  >
                    {GRADES_METADATA.map((g) => (
                      <option key={g.id} value={g.id}>
                        {g.shortLabel}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Role</label>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value as any)}
                    className="w-full px-2 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all cursor-pointer font-medium"
                  >
                    <option value="student">Student</option>
                    <option value="parent">Parent</option>
                    <option value="teacher">Teacher</option>
                  </select>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {loading ? (
                    <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      Create Account & Store in Firestore
                    </>
                  )}
                </button>
              </div>

              <div className="relative flex py-1 items-center">
                <div className="flex-grow border-t border-slate-200"></div>
                <span className="flex-shrink mx-4 text-xs font-semibold text-slate-400">OR</span>
                <div className="flex-grow border-t border-slate-200"></div>
              </div>

              <button
                type="button"
                onClick={handleGoogleSignIn}
                disabled={loading}
                className="w-full py-2.5 bg-white hover:bg-slate-50 border border-slate-300 text-slate-700 font-bold text-xs rounded-xl shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
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
                Continue with Google
              </button>
            </form>
          )}

          {/* TAB 2: SIGN IN */}
          {tab === 'signin' && (
            <form onSubmit={handleSignIn} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Email Address</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full pl-9 pr-3 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Password</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-9 pr-3 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {loading ? (
                    <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <LogIn className="w-4 h-4" />
                      Sign In & Load Progress
                    </>
                  )}
                </button>
              </div>

              <div className="relative flex py-1 items-center">
                <div className="flex-grow border-t border-slate-200"></div>
                <span className="flex-shrink mx-4 text-xs font-semibold text-slate-400">OR</span>
                <div className="flex-grow border-t border-slate-200"></div>
              </div>

              <button
                type="button"
                onClick={handleGoogleSignIn}
                disabled={loading}
                className="w-full py-2.5 bg-white hover:bg-slate-50 border border-slate-300 text-slate-700 font-bold text-xs rounded-xl shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
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
                Continue with Google
              </button>
            </form>
          )}

          {/* TAB 3: DATA STORAGE ARCHITECTURE INFO (Directly answers user's inquiry) */}
          {tab === 'storage_info' && (
            <div className="space-y-3.5 text-xs text-slate-600">
              <div className="p-3.5 bg-indigo-50/80 rounded-2xl border border-indigo-100 space-y-2">
                <div className="flex items-center gap-2 text-indigo-900 font-bold text-sm">
                  <Database className="w-4 h-4 text-indigo-600" />
                  Where is User Data Stored?
                </div>
                <p className="leading-relaxed">
                  Jab user apna <strong>Email, Password aur Age</strong> enter karke Sign Up karta hai, uska pura data
                  <strong> Google Cloud Firebase Firestore Database</strong> me safely store hota hai:
                </p>
              </div>

              <div className="space-y-2">
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                  <div className="flex items-center justify-between font-mono text-[11px] font-bold text-slate-800">
                    <span className="text-indigo-600">📁 Collection: /users/{'{userId}'}</span>
                    <span className="text-[10px] bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full">Initialized Profile</span>
                  </div>
                  <p className="text-[11px] text-slate-600">
                    • <strong>email:</strong> User ka verified email address<br />
                    • <strong>age:</strong> User ki enter ki hui age (e.g. 10, 16)<br />
                    • <strong>gradeLevel:</strong> Academic grade (e.g. nursery, class_1 - class_12)<br />
                    • <strong>progress:</strong> Live progress tracking object (currentLevel, currentWorld, xp, coins, stars, streakDays, completedLevels, activeStudyBuddy)<br />
                    • <strong>role:</strong> student / parent / teacher<br />
                    • <strong>createdAt & updatedAt:</strong> Server timestamp
                  </p>
                </div>

                <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                  <div className="flex items-center justify-between font-mono text-[11px] font-bold text-slate-800">
                    <span className="text-purple-600">📁 Subcollection: /users/{'{userId}'}/children/{'{childId}'}</span>
                    <span className="text-[10px] bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full">Learner Progress</span>
                  </div>
                  <p className="text-[11px] text-slate-600">
                    • <strong>currentLevel & currentWorld:</strong> Story map progression<br />
                    • <strong>xp, coins, stars & streakDays:</strong> Rewards & currency<br />
                    • <strong>activeStudyBuddy:</strong> Pip 🦉 / Nova 🦊 / Barnaby 🐻<br />
                    • <strong>weakTopics & quiz attempts:</strong> Adaptive revision data
                  </p>
                </div>

                <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                  <div className="flex items-center justify-between font-mono text-[11px] font-bold text-slate-800">
                    <span className="text-emerald-600">🛡️ Security Rules (ABAC)</span>
                    <span className="text-[10px] bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full">Zero-Trust Active</span>
                  </div>
                  <p className="text-[11px] text-slate-600">
                    Password Google Firebase Authentication me bcrypt/argon2 se securely hash rehta hai. Kisi dusre user ka data koi access nahi kar sakta (Owner-only ABAC rule enforced).
                  </p>
                </div>
              </div>

              <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-amber-800 text-[11px] flex items-center gap-2">
                <Server className="w-4 h-4 flex-shrink-0 text-amber-600" />
                <span>
                  <strong>Cloud Database ID:</strong> <code className="font-mono text-[10px]">ai-studio-wonderquestkidse-428a50dd-fe91-4e2f-abe4-55a03559aed9</code>
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-medium text-[11px]">Firestore Online</span>
          </div>
          <span className="text-[10px] text-slate-400 font-mono">gen-lang-client-0524975703</span>
        </div>
      </div>
    </div>
  );
};
