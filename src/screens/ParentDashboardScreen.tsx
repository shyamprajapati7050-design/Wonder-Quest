import React, { useState } from 'react';
import { useGame } from '../context/GameContext';
import { getGradeDetails } from '../data/gradesData';
import {
  Shield,
  Clock,
  CheckCircle2,
  XCircle,
  Award,
  Trophy,
  ArrowLeft,
  Settings,
  Users,
  AlertTriangle,
  Lock,
  ThumbsUp,
  ThumbsDown,
  Volume2,
  School,
} from 'lucide-react';

export const ParentDashboardScreen: React.FC = () => {
  const {
    activeChild,
    allChildren,
    switchChild,
    parentSettings,
    updateParentSettings,
    approveRealReward,
    rejectRealReward,
    setCurrentScreen,
    requestParentAction,
  } = useGame();

  const activeGradeMeta = getGradeDetails(activeChild.gradeLevel);

  const [activeTab, setActiveTab] = useState<'overview' | 'rewards' | 'settings'>('overview');
  const [dailyLimit, setDailyLimit] = useState(parentSettings.dailyLimitMinutes);
  const [pinChange, setPinChange] = useState('');
  const [pinNotice, setPinNotice] = useState<string | null>(null);

  const handleSaveSettings = () => {
    updateParentSettings({
      dailyLimitMinutes: dailyLimit,
      ...(pinChange.length === 4 ? { parentPin: pinChange } : {}),
    });
    setPinNotice('Parent settings saved successfully!');
    setTimeout(() => setPinNotice(null), 3500);
    setPinChange('');
  };

  const pendingRequests = activeChild.realRewardRequests.filter((r) => r.status === 'pending');

  return (
    <div className="space-y-6 sm:space-y-8 animate-fadeIn pb-24">
      {/* Top Bar */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setCurrentScreen('home_dashboard')}
          className="flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-white border border-slate-200 px-3.5 py-2 rounded-xl transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Exit to Student Dashboard</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              requestParentAction(() => {
                setCurrentScreen('admin_panel');
              });
            }}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white transition-colors cursor-pointer shadow-sm"
          >
            <Settings className="w-4 h-4" />
            <span>Admin CMS & Questions Builder</span>
          </button>
        </div>
      </div>

      {/* Parent Header */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl border border-slate-800">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-indigo-500/20 border border-indigo-400/30 flex items-center justify-center text-indigo-300">
              <Shield className="w-7 h-7" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-400 block mb-0.5">
                Guardian Oversight & Privacy Portal
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold font-heading text-white">
                Parent Dashboard: {parentSettings.parentName}
              </h1>
              <div className="flex flex-wrap items-center gap-2 text-xs text-slate-300 mt-1">
                <span>Active Student: <strong className="text-white">{activeChild.name}</strong></span>
                <span>·</span>
                <span className="text-indigo-300 font-semibold">{activeGradeMeta.icon} {activeGradeMeta.label} ({activeGradeMeta.stageName})</span>
              </div>
            </div>
          </div>

          {/* Child Switcher Pill */}
          <div className="flex flex-wrap items-center gap-2 bg-white/10 p-1.5 rounded-2xl border border-white/15">
            {allChildren.map((c) => {
              const cGrade = getGradeDetails(c.gradeLevel);
              return (
                <button
                  key={c.id}
                  onClick={() => switchChild(c.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5 ${
                    c.id === activeChild.id
                      ? 'bg-white text-slate-950 shadow-sm'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  <span>{c.avatar}</span>
                  <span>{c.name.split(' ')[0]}</span>
                  <span className="text-[10px] text-slate-400 font-normal">({cGrade.shortLabel})</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 p-1.5 bg-slate-100 rounded-2xl max-w-md">
        {(['overview', 'rewards', 'settings'] as const).map((tab) => {
          const titles = {
            overview: 'Progress & Scores',
            rewards: `Reward Approvals (${pendingRequests.length})`,
            settings: 'Screen Time & Safety',
          };
          return (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer text-center ${
                activeTab === tab
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              {titles[tab]}
            </button>
          );
        })}
      </div>

      {/* Tab 1: Overview & Scores */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Key Analytics */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
                Completed Levels
              </span>
              <span className="text-3xl font-extrabold text-slate-900 font-heading tabular-nums">
                {activeChild.completedLevels.length} Levels
              </span>
              <p className="text-xs text-slate-500 mt-1">
                25 verified questions per completed level
              </p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
                Master Test Record
              </span>
              <span className="text-3xl font-extrabold text-amber-600 font-heading tabular-nums">
                {Object.keys(activeChild.masterTestResults).length} Milestones
              </span>
              <p className="text-xs text-slate-500 mt-1">
                80% (12/15) standard rigorously evaluated
              </p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
                Screen Time Today
              </span>
              <span className="text-3xl font-extrabold text-indigo-600 font-heading tabular-nums">
                18 / {parentSettings.dailyLimitMinutes}m
              </span>
              <p className="text-xs text-slate-500 mt-1">
                Safe learning window within limit
              </p>
            </div>
          </div>

          {/* Master Test History Table */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 font-heading mb-1">
              Master Test Records
            </h3>
            <p className="text-xs text-slate-500 mb-6">
              Milestone tests taken every 5 levels.
            </p>

            {Object.keys(activeChild.masterTestResults).length === 0 ? (
              <div className="p-6 text-center text-xs text-slate-400 border border-dashed border-slate-200 rounded-2xl">
                No Master Tests taken yet. {activeChild.name} is currently progressing through Level {activeChild.currentLevel}.
              </div>
            ) : (
              <div className="space-y-3">
                {Object.values(activeChild.masterTestResults).map((mt) => (
                  <div
                    key={mt.id}
                    className="p-4 rounded-2xl border border-slate-200 bg-slate-50 flex items-center justify-between"
                  >
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">
                        {mt.testId.replace('_', ' ').toUpperCase()}
                      </h4>
                      <span className="text-xs text-slate-500">
                        Score: {mt.score}/15 · Grade: {mt.grade}
                      </span>
                    </div>

                    <span
                      className={`text-xs font-bold px-3 py-1 rounded-full ${
                        mt.passed
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-rose-100 text-rose-800'
                      }`}
                    >
                      {mt.passed ? 'Passed (80%+)' : 'Needs Practice'}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Tab 2: Real Reward Approvals */}
      {activeTab === 'rewards' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm">
          <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-100">
            <div>
              <h3 className="text-lg font-bold text-slate-900 font-heading">
                Child Reward Approval Queue
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Approve or reject real-world prizes requested by {activeChild.name} using their Wonder Coins.
              </p>
            </div>
            <span className="text-xs font-bold text-amber-800 bg-amber-50 border border-amber-200 px-3 py-1 rounded-full">
              Child Balance: {activeChild.coins} Coins
            </span>
          </div>

          {activeChild.realRewardRequests.length === 0 ? (
            <div className="p-8 text-center text-xs text-slate-400 border border-dashed border-slate-200 rounded-2xl">
              No reward requests currently in the queue.
            </div>
          ) : (
            <div className="space-y-4">
              {activeChild.realRewardRequests.map((req) => (
                <div
                  key={req.id}
                  className="p-5 rounded-2xl border border-slate-200 bg-slate-50 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-bold text-slate-900">{req.title}</span>
                      <span className="text-[11px] font-mono text-amber-700 bg-amber-100 px-2 py-0.5 rounded font-bold">
                        {req.cost} Coins
                      </span>
                    </div>
                    {req.description && (
                      <p className="text-xs text-slate-600 mb-1 leading-relaxed">
                        "{req.description}"
                      </p>
                    )}
                    <span className="text-[11px] text-slate-400">
                      Requested on {req.requestedAt} · Status: <strong>{req.status}</strong>
                    </span>
                  </div>

                  {req.status === 'pending' ? (
                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => approveRealReward(req.id)}
                        className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5"
                      >
                        <ThumbsUp className="w-3.5 h-3.5" />
                        <span>Approve & Deduct</span>
                      </button>
                      <button
                        onClick={() => rejectRealReward(req.id)}
                        className="px-3 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-xl text-xs font-semibold transition-colors cursor-pointer"
                      >
                        Decline
                      </button>
                    </div>
                  ) : (
                    <span
                      className={`text-xs font-bold px-3 py-1.5 rounded-xl uppercase tracking-wider shrink-0 ${
                        req.status === 'approved'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-slate-200 text-slate-600'
                      }`}
                    >
                      {req.status}
                    </span>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab 3: Screen Time & Security Settings */}
      {activeTab === 'settings' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm max-w-2xl">
          <h3 className="text-lg font-bold text-slate-900 font-heading mb-1">
            Parental Controls & Screen Limits
          </h3>
          <p className="text-xs text-slate-500 mb-6">
            Configure safety restrictions and change your 4-digit master PIN.
          </p>

          {pinNotice && (
            <div className="p-3.5 mb-6 rounded-xl bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-800 animate-fadeIn">
              {pinNotice}
            </div>
          )}

          <div className="space-y-6">
            {/* Daily limit */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Daily Educational Limit: <span className="text-blue-600">{dailyLimit} Minutes</span>
              </label>
              <input
                type="range"
                min="15"
                max="120"
                step="5"
                value={dailyLimit}
                onChange={(e) => setDailyLimit(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
              <div className="flex justify-between text-[11px] text-slate-400 mt-1 font-mono">
                <span>15m</span>
                <span>45m</span>
                <span>60m</span>
                <span>120m</span>
              </div>
            </div>

            {/* Change PIN */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Change 4-Digit Parent PIN (Current: {parentSettings.parentPin})
              </label>
              <input
                type="password"
                maxLength={4}
                placeholder="New 4 digits (e.g. 5678)"
                value={pinChange}
                onChange={(e) => setPinChange(e.target.value.replace(/\D/g, ''))}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button
              onClick={handleSaveSettings}
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-sm transition-colors cursor-pointer"
            >
              Save Parental Preferences
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
