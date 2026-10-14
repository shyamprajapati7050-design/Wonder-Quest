import React, { useState } from 'react';
import { useGame } from '../context/GameContext';
import { AgeGroup, GradeLevel } from '../types';
import {
  GRADES_METADATA,
  getGradeDetails,
  getGradeFromAge,
  getAgeGroupFromGrade,
} from '../data/gradesData';
import { soundEngine } from '../utils/audio';
import {
  UserPlus,
  Check,
  Sparkles,
  ArrowLeft,
  Trophy,
  Flame,
  School,
  GraduationCap,
} from 'lucide-react';

export const ChildProfileSelect: React.FC = () => {
  const { allChildren, activeChild, switchChild, createChildProfile, setCurrentScreen } =
    useGame();

  const [isAdding, setIsAdding] = useState(false);
  const [name, setName] = useState('');
  const [age, setAge] = useState(10);
  const [gradeLevel, setGradeLevelState] = useState<GradeLevel>('class_5');
  const [ageGroup, setAgeGroupState] = useState<AgeGroup>('9-11');
  const [avatar, setAvatar] = useState('🦉');

  const avatarChoices = [
    '🧸',
    '🎨',
    '🎒',
    '🌱',
    '⭐',
    '🦉',
    '🤖',
    '🦁',
    '🦊',
    '🐰',
    '🐼',
    '🚀',
    '🔬',
    '🎓',
  ];

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    soundEngine.playCorrect();
    createChildProfile(name.trim(), Number(age), ageGroup, avatar, gradeLevel);
    setIsAdding(false);
    setName('');
  };

  const handleAgeChange = (selectedAge: number) => {
    setAge(selectedAge);
    const mappedGrade = getGradeFromAge(selectedAge);
    setGradeLevelState(mappedGrade);
    setAgeGroupState(getAgeGroupFromGrade(mappedGrade));
  };

  const handleGradeChange = (newGrade: GradeLevel) => {
    setGradeLevelState(newGrade);
    const meta = getGradeDetails(newGrade);
    setAgeGroupState(meta.ageGroup);

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

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 flex flex-col justify-between">
      <div className="max-w-5xl mx-auto w-full">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => setCurrentScreen('home_dashboard')}
            className="flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-white border border-slate-200 px-3.5 py-2 rounded-xl transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Dashboard</span>
          </button>
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            Nursery to 12th Class Profiles
          </span>
        </div>

        <div className="text-center max-w-xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold mb-2">
            <School className="w-3.5 h-3.5" />
            <span>Nursery to 12th Learning Adventure</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-heading">
            Who is Playing Today?
          </h1>
          <p className="mt-2 text-sm text-slate-600">
            Select an existing profile or add a student from Nursery to 12th Class to start!
          </p>
        </div>

        {/* Existing Profiles Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
          {allChildren.map((child) => {
            const isActive = child.id === activeChild.id;
            const childGrade = getGradeDetails(child.gradeLevel);

            return (
              <div
                key={child.id}
                onClick={() => switchChild(child.id)}
                className={`bg-white rounded-3xl p-6 border-2 transition-all cursor-pointer relative hover:shadow-lg flex flex-col justify-between ${
                  isActive
                    ? 'border-blue-600 ring-2 ring-blue-500/20 shadow-md'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div>
                  <div className="flex items-start justify-between mb-3">
                    <div className="w-16 h-16 rounded-2xl bg-slate-100 border border-slate-200 flex items-center justify-center text-3xl shadow-inner">
                      {child.avatar}
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      {isActive && (
                        <span className="flex items-center gap-1 text-[11px] font-bold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200">
                          <Check className="w-3 h-3" /> Active
                        </span>
                      )}
                      <span className="text-[11px] font-bold text-slate-700 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded-md flex items-center gap-1">
                        <span>{childGrade.icon}</span>
                        <span>{childGrade.shortLabel}</span>
                      </span>
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 font-heading">{child.name}</h3>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-xs text-slate-500">
                      Level {child.currentLevel} Explorer
                    </span>
                    <span className="text-xs text-slate-300">·</span>
                    <span className="text-xs text-indigo-600 font-medium">
                      {childGrade.stageName}
                    </span>
                  </div>

                  {/* Quick stats */}
                  <div className="grid grid-cols-3 gap-2 mt-4 pt-4 border-t border-slate-100 text-center">
                    <div>
                      <span className="text-xs font-bold text-slate-800 tabular-nums block">
                        {child.xp}
                      </span>
                      <span className="text-[10px] text-slate-400 uppercase">XP</span>
                    </div>
                    <div>
                      <span className="text-xs font-bold text-amber-600 tabular-nums block">
                        {child.coins}
                      </span>
                      <span className="text-[10px] text-slate-400 uppercase">Coins</span>
                    </div>
                    <div>
                      <span className="text-xs font-bold text-orange-600 tabular-nums block flex items-center justify-center gap-0.5">
                        <Flame className="w-3 h-3 fill-orange-500 text-orange-500" />
                        {child.streakDays}d
                      </span>
                      <span className="text-[10px] text-slate-400 uppercase">Streak</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    switchChild(child.id);
                  }}
                  className={`w-full mt-6 py-2.5 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                    isActive
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {isActive ? 'Continue Quest' : 'Play as ' + child.name.split(' ')[0]}
                </button>
              </div>
            );
          })}

          {/* Add Profile Card */}
          {!isAdding && (
            <div
              onClick={() => setIsAdding(true)}
              className="border-2 border-dashed border-slate-300 hover:border-blue-400 bg-white/50 rounded-3xl p-6 flex flex-col items-center justify-center text-center cursor-pointer min-h-[220px] transition-colors hover:bg-white group"
            >
              <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <UserPlus className="w-7 h-7" />
              </div>
              <h4 className="text-sm font-bold text-slate-800">Add New Explorer</h4>
              <p className="text-xs text-slate-500 mt-1 max-w-[200px]">
                Create a student profile from Nursery through 12th Class.
              </p>
            </div>
          )}
        </div>

        {/* Add Child Form Modal */}
        {isAdding && (
          <div className="bg-white rounded-3xl border border-slate-200 shadow-xl p-6 sm:p-8 max-w-2xl mx-auto mb-8 animate-fadeIn">
            <h3 className="text-xl font-bold text-slate-900 font-heading mb-1">
              Create Student Profile
            </h3>
            <p className="text-xs text-slate-500 mb-6">
              Select your child or student's class (Nursery to 12th) to calibrate lessons and 25-question levels.
            </p>

            <form onSubmit={handleCreate} className="space-y-5">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
                  Student Name or Screen Nickname
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Maya Explorer"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  maxLength={25}
                />
              </div>

              {/* Class Selection Dropdown / Grid */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
                  Select Class / Grade (Nursery to 12th Class)
                </label>
                <select
                  value={gradeLevel}
                  onChange={(e) => handleGradeChange(e.target.value as GradeLevel)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-white font-medium"
                >
                  <optgroup label="Pre-Primary (Ages 3–5)">
                    <option value="nursery">🧸 Nursery (Early Explorers · Ages 3–4)</option>
                    <option value="lkg_ukg">🎨 LKG / UKG (Kindergarten · Ages 4–6)</option>
                  </optgroup>
                  <optgroup label="Primary School (Classes 1–5 · Ages 6–11)">
                    <option value="class_1">🎒 Class 1 (Ages 6–7)</option>
                    <option value="class_2">🌱 Class 2 (Ages 7–8)</option>
                    <option value="class_3">⭐ Class 3 (Ages 8–9)</option>
                    <option value="class_4">🚀 Class 4 (Ages 9–10)</option>
                    <option value="class_5">🌍 Class 5 (Ages 10–11)</option>
                  </optgroup>
                  <optgroup label="Middle School (Classes 6–8 · Ages 11–14)">
                    <option value="class_6">🔬 Class 6 (Ages 11–12)</option>
                    <option value="class_7">⚡ Class 7 (Ages 12–13)</option>
                    <option value="class_8">🔮 Class 8 (Ages 13–14)</option>
                  </optgroup>
                  <optgroup label="Secondary School (Classes 9–10 · Ages 14–16)">
                    <option value="class_9">📐 Class 9 (Ages 14–15)</option>
                    <option value="class_10">🏆 Class 10 (Board Exam Prep · Ages 15–16)</option>
                  </optgroup>
                  <optgroup label="Senior Secondary (Classes 11–12 · Ages 16–18)">
                    <option value="class_11">🧬 Class 11 (Higher Secondary · Ages 16–17)</option>
                    <option value="class_12">🎓 Class 12 (Graduation Ready · Ages 17–18)</option>
                  </optgroup>
                </select>
                <div className="mt-2 text-xs font-semibold text-blue-700 bg-blue-50 px-3 py-1.5 rounded-lg flex items-center justify-between">
                  <span>Curriculum: {getGradeDetails(gradeLevel).stageName}</span>
                  <span>Age Tier: {ageGroup} Years</span>
                </div>
              </div>

              {/* Age Slider (3 to 18) */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
                  Student Age: <span className="text-blue-600 font-extrabold">{age} years old</span>
                </label>
                <input
                  type="range"
                  min="3"
                  max="18"
                  value={age}
                  onChange={(e) => handleAgeChange(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
                <div className="flex justify-between text-[11px] text-slate-400 mt-1 font-mono">
                  <span>3 yrs (Nursery)</span>
                  <span>6 yrs (Class 1)</span>
                  <span>10 yrs (Class 5)</span>
                  <span>14 yrs (Class 9)</span>
                  <span>18 yrs (Class 12)</span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-wider">
                  Choose Starting Mascot
                </label>
                <div className="flex flex-wrap gap-2">
                  {avatarChoices.map((choice) => (
                    <button
                      type="button"
                      key={choice}
                      onClick={() => setAvatar(choice)}
                      className={`w-11 h-11 rounded-xl text-xl flex items-center justify-center border transition-transform cursor-pointer ${
                        avatar === choice
                          ? 'border-blue-600 bg-blue-50 scale-110 shadow-sm'
                          : 'border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      {choice}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsAdding(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-sm transition-colors cursor-pointer"
                >
                  Save & Start Quest
                </button>
              </div>
            </form>
          </div>
        )}
      </div>

      <div className="text-center text-xs text-slate-400">
        WonderQuest is strictly COPPA compliant · Safe offline storage
      </div>
    </div>
  );
};
