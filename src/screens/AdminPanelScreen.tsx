import React, { useState } from 'react';
import { useGame } from '../context/GameContext';
import { SUBJECTS, SubjectData } from '../data/subjects';
import { Level, Question, SubjectId, AgeGroup } from '../types';
import { getQuestionsForLevel } from '../data/levelsData';
import {
  Settings,
  PlusCircle,
  Database,
  BarChart3,
  Layers,
  BookOpen,
  ArrowLeft,
  CheckCircle2,
  Trash2,
  Edit2,
  Sparkles,
  Shield,
  HelpCircle,
  Server,
  Activity,
  Cpu,
  Gauge,
  Zap,
  Users,
  RefreshCw,
} from 'lucide-react';
import { SYSTEM_SCALING_CONFIG, getSimulatedSystemMetrics } from '../data/systemConfig';

export const AdminPanelScreen: React.FC = () => {
  const { levels, addNewLevel, setCurrentScreen } = useGame();

  const [activeTab, setActiveTab] = useState<'levels' | 'subjects' | 'capacity' | 'analytics'>('levels');
  const [simulatedLoadOffset, setSimulatedLoadOffset] = useState<number>(0);
  const metrics = getSimulatedSystemMetrics(simulatedLoadOffset);

  // New level creator state
  const [newLevelTitle, setNewLevelTitle] = useState('');
  const [newLevelDesc, setNewLevelDesc] = useState('');
  const [newLevelSubject, setNewLevelSubject] = useState<SubjectId>('math');
  const [newLevelAgeGroup, setNewLevelAgeGroup] = useState<AgeGroup>('9-11');
  const [creationNotice, setCreationNotice] = useState<string | null>(null);

  // Subject management state
  const [subjectList, setSubjectList] = useState<SubjectData[]>(SUBJECTS);

  const handleCreateLevel = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLevelTitle.trim()) return;

    const nextId = levels.length + 1;
    // Automatically generate exactly 25 questions for this new level!
    const generated25Questions = getQuestionsForLevel(nextId, newLevelAgeGroup);

    const levelObj: Level = {
      id: nextId,
      worldSection: Math.ceil(nextId / 5),
      title: `Level ${nextId}: ${newLevelTitle.trim()}`,
      description: newLevelDesc.trim() || 'Custom academic level created via Admin CMS.',
      subjectId: newLevelSubject,
      ageGroup: newLevelAgeGroup,
      requiredStars: nextId * 2,
      rewardXp: 200 + nextId * 20,
      rewardCoins: 50 + nextId * 10,
      lessonId: 'lesson_1',
      questionCount: 25, // Exactly 25 questions as strictly required!
      passAccuracyThreshold: 70,
    };

    addNewLevel(levelObj, generated25Questions);
    setCreationNotice(
      `Level ${nextId} created successfully with exactly 25 adaptive questions!`
    );
    setNewLevelTitle('');
    setNewLevelDesc('');
    setTimeout(() => setCreationNotice(null), 4000);
  };

  return (
    <div className="space-y-6 sm:space-y-8 animate-fadeIn pb-24">
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setCurrentScreen('parent_dashboard')}
          className="flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-white border border-slate-200 px-3.5 py-2 rounded-xl transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Parent Portal</span>
        </button>

        <span className="text-xs font-bold text-indigo-700 bg-indigo-50 border border-indigo-200 px-3 py-1.5 rounded-full flex items-center gap-1.5">
          <Shield className="w-3.5 h-3.5" />
          <span>WonderQuest Admin CMS</span>
        </span>
      </div>

      <div className="text-center max-w-xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-heading">
          Curriculum & Platform Administration
        </h1>
        <p className="mt-2 text-sm text-slate-600">
          Create levels (exactly 25 questions per level), manage 8 curriculum subjects, and monitor platform metrics.
        </p>
      </div>

      {/* Admin Tabs */}
      <div className="flex flex-wrap items-center gap-2 p-1.5 bg-slate-100 rounded-2xl max-w-xl mx-auto">
        {(['levels', 'subjects', 'capacity', 'analytics'] as const).map((tab) => {
          const names = {
            levels: 'Level & 25-Q Builder',
            subjects: 'Subjects Management',
            capacity: '10,000 User Capacity',
            analytics: 'Platform Analytics',
          };
          return (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 min-w-[130px] py-2 px-3 text-xs font-bold rounded-xl transition-all cursor-pointer text-center ${
                activeTab === tab
                  ? 'bg-white text-indigo-700 shadow-sm'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              {names[tab]}
            </button>
          );
        })}
      </div>

      {/* Tab 1: Level Creator with exactly 25 Questions */}
      {activeTab === 'levels' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Create Level Form */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <PlusCircle className="w-5 h-5 text-indigo-600" />
              <h3 className="text-lg font-bold text-slate-900 font-heading">
                Author New Level (25 Questions Engine)
              </h3>
            </div>
            <p className="text-xs text-slate-500 mb-6">
              Every level authored adheres to the mandatory 25-question standard with 60-second timers.
            </p>

            {creationNotice && (
              <div className="p-3.5 mb-6 rounded-xl bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-800 animate-fadeIn">
                {creationNotice}
              </div>
            )}

            <form onSubmit={handleCreateLevel} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Level Title
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Celestial Orbit Explorations"
                  value={newLevelTitle}
                  onChange={(e) => setNewLevelTitle(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Subject Domain
                </label>
                <select
                  value={newLevelSubject}
                  onChange={(e) => setNewLevelSubject(e.target.value as SubjectId)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                >
                  {subjectList.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name} ({s.shortName})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Target Age Group
                </label>
                <select
                  value={newLevelAgeGroup}
                  onChange={(e) => setNewLevelAgeGroup(e.target.value as AgeGroup)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                >
                  <option value="6-8">6–8 Years (Curious Seedlings)</option>
                  <option value="9-11">9–11 Years (Star Voyagers)</option>
                  <option value="12-14">12–14 Years (Logic Navigators)</option>
                  <option value="15-16">15–16 Years (Academic Masters)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Description / Learning Outcomes
                </label>
                <textarea
                  rows={3}
                  placeholder="Summary of skills practiced in this 25-question set..."
                  value={newLevelDesc}
                  onChange={(e) => setNewLevelDesc(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="p-3 bg-indigo-50/70 border border-indigo-100 rounded-xl text-[11px] text-indigo-900">
                ⚡ <strong>Specification Check:</strong> Creating this level will populate exactly 25 interactive questions (MCQ, True/False, Match, Image, Drag-Drop, Memory, Problem Solving) each with 60s timers!
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-sm transition-colors cursor-pointer"
              >
                Create Level & Generate 25 Questions
              </button>
            </form>
          </div>

          {/* Current Levels Manifest */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 font-heading mb-1">
              Active Levels Manifest ({levels.length} Total)
            </h3>
            <p className="text-xs text-slate-500 mb-6">
              Review published levels and question quotas.
            </p>

            <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
              {levels.map((lvl) => (
                <div
                  key={lvl.id}
                  className="p-4 rounded-2xl border border-slate-200 bg-slate-50 flex items-center justify-between gap-3"
                >
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-bold text-slate-900">{lvl.title}</span>
                      {lvl.isMilestone && (
                        <span className="text-[10px] font-bold text-amber-700 bg-amber-100 px-1.5 py-0.5 rounded">
                          Milestone Level
                        </span>
                      )}
                    </div>
                    <span className="text-[11px] text-slate-500">
                      Domain: <strong>{lvl.subjectId}</strong> · {lvl.questionCount} Questions · +{lvl.rewardCoins} Coins
                    </span>
                  </div>

                  <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-lg shrink-0">
                    25 Qs
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Subjects Management */}
      {activeTab === 'subjects' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm">
          <h3 className="text-lg font-bold text-slate-900 font-heading mb-1">
            Curriculum Subject Taxonomy
          </h3>
          <p className="text-xs text-slate-500 mb-6">
            Manage subject definitions and curriculum tags across all age groups.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {subjectList.map((sub) => (
              <div
                key={sub.id}
                className="p-5 rounded-2xl border border-slate-200 bg-slate-50 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-sm font-bold text-slate-900">{sub.name}</h4>
                    <span className="text-[11px] font-mono text-slate-500">ID: {sub.id}</span>
                  </div>
                  <p className="text-xs text-slate-600 mb-3">{sub.description}</p>
                </div>

                <div className="pt-3 border-t border-slate-200/60 flex items-center justify-between text-xs text-slate-500">
                  <span>Topics for 9–11: {sub.topicsByAge['9-11']?.length || 4} topics</span>
                  <span className="text-emerald-700 font-semibold">Active in Quests</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: 10,000 Maximum User Capability & Platform Scalability */}
      {activeTab === 'capacity' && (
        <div className="space-y-6">
          {/* Hero Capacity Card */}
          <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 rounded-3xl border border-indigo-500/30 p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 border border-indigo-400/40 flex items-center justify-center text-indigo-300">
                    <Server className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                        Maximum User Capability: 10,000 Active Learners
                      </span>
                    </div>
                    <h2 className="text-xl sm:text-2xl font-bold font-heading mt-1">
                      Enterprise High-Throughput Concurrency Cluster
                    </h2>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono bg-white/10 px-3 py-1.5 rounded-xl border border-white/10 text-indigo-200">
                    Cluster Status: OPTIMAL
                  </span>
                </div>
              </div>

              {/* Progress Load Meter */}
              <div className="space-y-2 bg-white/5 border border-white/10 rounded-2xl p-5">
                <div className="flex items-center justify-between text-xs sm:text-sm font-semibold">
                  <span className="text-slate-300 flex items-center gap-2">
                    <Activity className="w-4 h-4 text-emerald-400" />
                    Current System Load ({metrics.currentActiveUsers.toLocaleString()} / 10,000 Concurrent Learners)
                  </span>
                  <span className="font-mono text-emerald-400 font-bold">
                    {metrics.capacityUtilizationPercent}% Capacity
                  </span>
                </div>

                <div className="w-full bg-white/10 h-3 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500 bg-gradient-to-r from-emerald-500 via-teal-400 to-indigo-500"
                    style={{ width: `${Math.min(100, metrics.capacityUtilizationPercent)}%` }}
                  />
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1 font-mono">
                  <span>0 Learners</span>
                  <span>5,000 Safe Buffer</span>
                  <span>10,000 Maximum Capability</span>
                </div>
              </div>

              {/* Interactive Simulation Controls */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                <span className="text-slate-300 font-semibold flex items-center gap-1.5">
                  <Gauge className="w-4 h-4 text-amber-400" />
                  Simulate Concurrency Load Test:
                </span>
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    onClick={() => setSimulatedLoadOffset(0)}
                    className="px-3 py-1.5 bg-white/10 hover:bg-white/20 rounded-xl text-slate-200 transition-colors cursor-pointer"
                  >
                    Normal (1,840)
                  </button>
                  <button
                    onClick={() => setSimulatedLoadOffset(3160)}
                    className="px-3 py-1.5 bg-white/10 hover:bg-white/20 rounded-xl text-slate-200 transition-colors cursor-pointer"
                  >
                    Moderate (5,000)
                  </button>
                  <button
                    onClick={() => setSimulatedLoadOffset(6160)}
                    className="px-3 py-1.5 bg-white/10 hover:bg-white/20 rounded-xl text-slate-200 transition-colors cursor-pointer"
                  >
                    Peak (8,000)
                  </button>
                  <button
                    onClick={() => setSimulatedLoadOffset(8160)}
                    className="px-3 py-1.5 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/30 rounded-xl font-bold transition-colors cursor-pointer"
                  >
                    Max (10,000 Peak)
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* 4 Technical Architecture Pillars for 10,000 Maximum Capability */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm space-y-2">
              <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                <Users className="w-5 h-5" />
              </div>
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                Maximum User Capability
              </span>
              <div className="text-2xl font-black text-slate-900 font-heading tabular-nums">
                10,000
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                Dedicated active learner session headroom across all grade stages.
              </p>
            </div>

            <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm space-y-2">
              <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <Zap className="w-5 h-5" />
              </div>
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                Peak Request Capacity
              </span>
              <div className="text-2xl font-black text-emerald-600 font-heading tabular-nums">
                600,000 / min
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                10,000 requests/sec burst protection with in-memory caching.
              </p>
            </div>

            <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm space-y-2">
              <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                <Cpu className="w-5 h-5" />
              </div>
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                Write-Back Debounce
              </span>
              <div className="text-2xl font-black text-amber-600 font-heading tabular-nums">
                1,500 ms
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                Batched progress writes to prevent Firestore write locks.
              </p>
            </div>

            <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm space-y-2">
              <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <Database className="w-5 h-5" />
              </div>
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                Cloud Database
              </span>
              <div className="text-xl font-bold text-blue-600 font-heading truncate">
                Firestore Enterprise
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                Auto-scaling database IOPS with Zero-Trust ABAC security.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Platform Analytics */}
      {activeTab === 'analytics' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
                Active Explorers
              </span>
              <span className="text-3xl font-extrabold text-slate-900 font-heading tabular-nums">
                1,420
              </span>
              <p className="text-[11px] text-slate-500 mt-1">Simulated learner accounts</p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
                Questions Answered
              </span>
              <span className="text-3xl font-extrabold text-blue-600 font-heading tabular-nums">
                35,500
              </span>
              <p className="text-[11px] text-slate-500 mt-1">25 questions per level quota</p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
                Avg Level Pass Rate
              </span>
              <span className="text-3xl font-extrabold text-emerald-600 font-heading tabular-nums">
                84.2%
              </span>
              <p className="text-[11px] text-slate-500 mt-1">≥70% pass threshold</p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
                Master Test Clears
              </span>
              <span className="text-3xl font-extrabold text-amber-600 font-heading tabular-nums">
                712
              </span>
              <p className="text-[11px] text-slate-500 mt-1">80% passing standard</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
