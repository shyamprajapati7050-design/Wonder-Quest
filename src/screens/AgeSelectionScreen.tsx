import React, { useState } from 'react';
import { useGame } from '../context/GameContext';
import { AgeGroup, GradeLevel } from '../types';
import { GRADES_METADATA, getGradeDetails } from '../data/gradesData';
import { soundEngine } from '../utils/audio';
import {
  Check,
  Sparkles,
  BookOpen,
  Compass,
  Brain,
  Cpu,
  ArrowLeft,
  GraduationCap,
  Layers,
  ChevronRight,
  School,
  Award,
} from 'lucide-react';

export const AgeSelectionScreen: React.FC = () => {
  const { activeChild, setAgeGroup, setGradeLevel, setCurrentScreen } = useGame();
  const [activeTab, setActiveTab] = useState<'grades' | 'ages'>('grades');
  const [selectedStageFilter, setSelectedStageFilter] = useState<string>('all');

  const currentGradeMeta = getGradeDetails(activeChild.gradeLevel);

  const ageGroups: {
    id: AgeGroup;
    title: string;
    range: string;
    subtitle: string;
    icon: any;
    color: string;
    bgAccent: string;
    borderAccent: string;
    gradesIncluded: string;
    highlights: string[];
  }[] = [
    {
      id: '3-5',
      title: 'Tiny Explorers (Nursery & KG)',
      range: '3–5 Years',
      subtitle: 'Early phonics, colors, counting 1 to 10, big vs small, and animal friends.',
      icon: Sparkles,
      color: 'from-pink-400 to-rose-500',
      bgAccent: 'bg-pink-50/70',
      borderAccent: 'border-pink-300',
      gradesIncluded: 'Nursery, LKG, UKG',
      highlights: ['Phonics A-Z', 'Counting 1-10', 'Colors & Shapes', 'Animal Sounds & Homes'],
    },
    {
      id: '6-8',
      title: 'Curious Seedlings (Primary 1–3)',
      range: '6–8 Years',
      subtitle: 'Early foundational literacy, addition, geometry, and living nature.',
      icon: Sparkles,
      color: 'from-amber-400 to-orange-400',
      bgAccent: 'bg-amber-50/70',
      borderAccent: 'border-amber-300',
      gradesIncluded: 'Class 1, Class 2, Class 3',
      highlights: ['Addition & Shapes', 'Animal Life Cycles', 'Phonics & Sight Words', 'Picture Puzzles'],
    },
    {
      id: '9-11',
      title: 'Star Voyagers (Primary 4–6)',
      range: '9–11 Years',
      subtitle: 'Multiplication, planetary systems, grammar rules, and computer basics.',
      icon: Compass,
      color: 'from-blue-500 to-indigo-600',
      bgAccent: 'bg-blue-50/70',
      borderAccent: 'border-blue-300',
      gradesIncluded: 'Class 4, Class 5, Class 6',
      highlights: ['Fractions & Decimals', 'Solar System & Forces', 'Parts of Speech', 'Intro to Algorithms'],
    },
    {
      id: '12-14',
      title: 'Logic Navigators (Middle 7–9)',
      range: '12–14 Years',
      subtitle: 'Pre-algebra, cell anatomy, deductive logic, and network principles.',
      icon: Brain,
      color: 'from-purple-500 to-violet-600',
      bgAccent: 'bg-purple-50/70',
      borderAccent: 'border-purple-300',
      gradesIncluded: 'Class 7, Class 8, Class 9',
      highlights: ['Linear Equations', 'Cell Organelles', 'Syllogisms & Analogies', 'Binary & Cyber Safety'],
    },
    {
      id: '15-16',
      title: 'Academic Masters (Secondary 10–11)',
      range: '15–16 Years',
      subtitle: 'Advanced algebra, genetics, critical rhetoric, and data algorithms.',
      icon: Cpu,
      color: 'from-emerald-500 to-teal-600',
      bgAccent: 'bg-emerald-50/70',
      borderAccent: 'border-emerald-300',
      gradesIncluded: 'Class 10 (Board Exam), Class 11',
      highlights: ['Quadratic Roots', 'DNA & Particle Physics', 'Rhetorical Analysis', 'Data Structures'],
    },
    {
      id: '17-18',
      title: 'Senior Scholars (Class 11–12)',
      range: '17–18 Years',
      subtitle: 'Calculus derivatives, organic mechanisms, electromagnetism, and collegiate logic.',
      icon: GraduationCap,
      color: 'from-rose-500 to-red-600',
      bgAccent: 'bg-rose-50/70',
      borderAccent: 'border-rose-300',
      gradesIncluded: 'Class 11, Class 12 (Graduation Ready)',
      highlights: ['Calculus & Integrals', 'Electromagnetism', 'Organic Synthesis', 'Algorithms & Big-O'],
    },
  ];

  const handleSelectGrade = (gradeId: GradeLevel) => {
    soundEngine.playCorrect();
    setGradeLevel(gradeId);
    setCurrentScreen('home_dashboard');
  };

  const handleSelectAgeGroup = (group: AgeGroup) => {
    soundEngine.playCorrect();
    setAgeGroup(group);
    setCurrentScreen('home_dashboard');
  };

  const stages = [
    { id: 'all', label: 'All Classes (Nursery–12th)' },
    { id: 'pre_primary', label: 'Pre-Primary (Nursery, KG)' },
    { id: 'primary', label: 'Primary (Classes 1–5)' },
    { id: 'middle', label: 'Middle (Classes 6–8)' },
    { id: 'secondary', label: 'Secondary (Classes 9–10)' },
    { id: 'senior_secondary', label: 'Senior (Classes 11–12)' },
  ];

  const filteredGrades =
    selectedStageFilter === 'all'
      ? GRADES_METADATA
      : GRADES_METADATA.filter((g) => g.stage === selectedStageFilter);

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 flex flex-col justify-between">
      <div className="max-w-6xl mx-auto w-full">
        {/* Top Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => setCurrentScreen('home_dashboard')}
            className="flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-white border border-slate-200 px-3.5 py-2 rounded-xl transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Dashboard</span>
          </button>
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500">Configuring for</span>
            <span className="text-xs font-bold text-slate-900 bg-white border border-slate-200 px-2.5 py-1 rounded-lg">
              {activeChild.name} ({currentGradeMeta.shortLabel})
            </span>
          </div>
        </div>

        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold mb-3">
            <School className="w-3.5 h-3.5" />
            <span>Nursery to 12th Class Play & Learn Platform</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-heading tracking-tight">
            Select Your Class or Learning Stage
          </h1>
          <p className="mt-2 text-sm sm:text-base text-slate-600">
            WonderQuest automatically calibrates all 25-question levels, Read & Learn lessons, vocabulary, and 15-question Master Tests for your exact class level!
          </p>

          {/* Mode Switcher Tabs */}
          <div className="inline-flex items-center p-1 bg-slate-200/80 rounded-2xl mt-6 shadow-inner">
            <button
              onClick={() => setActiveTab('grades')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'grades'
                  ? 'bg-white text-blue-700 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <School className="w-4 h-4" />
              <span>Browse by Class (Nursery to 12th)</span>
            </button>
            <button
              onClick={() => setActiveTab('ages')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'ages'
                  ? 'bg-white text-blue-700 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>Browse by Age Group (3–18 Years)</span>
            </button>
          </div>
        </div>

        {/* Tab 1: Grades / Classes (Nursery to 12th) */}
        {activeTab === 'grades' && (
          <div className="space-y-6">
            {/* Stage filter pills */}
            <div className="flex flex-wrap items-center justify-center gap-2 pb-2">
              {stages.map((stage) => (
                <button
                  key={stage.id}
                  onClick={() => setSelectedStageFilter(stage.id)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    selectedStageFilter === stage.id
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  {stage.label}
                </button>
              ))}
            </div>

            {/* Grid of Grades */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredGrades.map((grade) => {
                const isSelected = activeChild.gradeLevel === grade.id;

                return (
                  <div
                    key={grade.id}
                    onClick={() => handleSelectGrade(grade.id)}
                    className={`relative rounded-3xl p-5 sm:p-6 border-2 transition-all duration-200 cursor-pointer bg-white flex flex-col justify-between hover:shadow-lg ${
                      isSelected
                        ? 'border-blue-600 ring-2 ring-blue-500/20 shadow-md'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div>
                      {/* Top Header of Card */}
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${grade.color} flex items-center justify-center text-2xl shadow-sm text-white`}
                          >
                            {grade.icon}
                          </div>
                          <div>
                            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                              {grade.stageName} · {grade.ageRange}
                            </span>
                            <h3 className="text-base sm:text-lg font-bold text-slate-900 font-heading">
                              {grade.label}
                            </h3>
                          </div>
                        </div>

                        {isSelected && (
                          <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                            <Check className="w-3.5 h-3.5" /> Active
                          </span>
                        )}
                      </div>

                      <p className="text-xs text-slate-600 mb-4 leading-relaxed">
                        {grade.description}
                      </p>

                      {/* Sample Topics */}
                      <div className="space-y-1.5 mb-5 bg-slate-50 p-3 rounded-2xl border border-slate-100">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                          Core Curriculum Focus
                        </span>
                        <div className="grid grid-cols-2 gap-1.5 text-[11px] text-slate-700">
                          {grade.sampleTopics.map((topic, i) => (
                            <div key={i} className="flex items-center gap-1.5 truncate">
                              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
                              <span className="truncate">{topic}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSelectGrade(grade.id);
                      }}
                      className={`w-full py-2.5 text-xs font-bold rounded-xl transition-colors cursor-pointer text-center ${
                        isSelected
                          ? 'bg-blue-600 text-white hover:bg-blue-700'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      {isSelected ? 'Currently Selected Class' : `Play & Learn in ${grade.shortLabel}`}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Tab 2: Age Group Cards */}
        {activeTab === 'ages' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {ageGroups.map((ag) => {
              const isSelected = activeChild.ageGroup === ag.id;
              const IconComponent = ag.icon;

              return (
                <div
                  key={ag.id}
                  onClick={() => handleSelectAgeGroup(ag.id)}
                  className={`relative rounded-3xl p-6 border-2 transition-all duration-200 cursor-pointer bg-white flex flex-col justify-between hover:shadow-lg ${
                    isSelected
                      ? `${ag.borderAccent} shadow-md ring-2 ring-blue-500/20`
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div>
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${ag.color} flex items-center justify-center text-white shadow-sm`}
                        >
                          <IconComponent className="w-6 h-6" />
                        </div>
                        <div>
                          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                            {ag.range}
                          </span>
                          <h3 className="text-base sm:text-lg font-bold text-slate-900 font-heading">
                            {ag.title}
                          </h3>
                        </div>
                      </div>

                      {isSelected && (
                        <span className="flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                          <Check className="w-3.5 h-3.5" /> Active
                        </span>
                      )}
                    </div>

                    <div className="text-[11px] font-semibold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-lg inline-block mb-3">
                      Includes: {ag.gradesIncluded}
                    </div>

                    <p className="text-xs text-slate-600 mb-5 leading-relaxed">
                      {ag.subtitle}
                    </p>

                    {/* Highlights */}
                    <div className="space-y-1.5 mb-6">
                      <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                        Curriculum Focus
                      </span>
                      <div className="grid grid-cols-2 gap-2 text-xs text-slate-700">
                        {ag.highlights.map((h, i) => (
                          <div key={i} className="flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                            <span className="truncate">{h}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSelectAgeGroup(ag.id);
                    }}
                    className={`w-full py-2.5 text-xs font-bold rounded-xl transition-colors cursor-pointer text-center ${
                      isSelected
                        ? 'bg-blue-600 text-white hover:bg-blue-700'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {isSelected ? 'Currently Selected' : `Choose ${ag.range}`}
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <div className="text-center text-xs text-slate-400 mt-8">
        You can change your class or age group anytime. All coins, earned badges, stars, and XP remain safely saved!
      </div>
    </div>
  );
};
