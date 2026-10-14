import React, { useState, useMemo } from 'react';
import { useGame } from '../context/GameContext';
import { useGlobalLanguage } from '../context/GlobalLanguageContext';
import { SUPPORTED_LANGUAGES } from '../data/languages';
import {
  SUBJECTS,
  getLocalizedSubjectName,
  getLocalizedSubjectShortName,
  getLocalizedSubjectTagline,
  getLocalizedSubjectDescription,
} from '../data/subjects';
import { SubjectId, GradeLevel } from '../types';
import { getGradeDetails, GRADES_METADATA } from '../data/gradesData';
import {
  Calculator,
  FlaskConical,
  BookOpen,
  Glasses,
  Cpu,
  Lightbulb,
  Globe,
  Puzzle,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Play,
  School,
  Check,
  Languages,
  Users,
  Atom,
  Leaf,
  Map,
  Hourglass,
  TrendingUp,
  Shield,
  Home,
  Microscope,
  ScrollText,
  Search,
  Filter,
} from 'lucide-react';

const ICON_MAP: Record<string, any> = {
  Calculator,
  FlaskConical,
  BookOpen,
  Glasses,
  Cpu,
  Lightbulb,
  Globe,
  Puzzle,
  Languages,
  Users,
  Atom,
  Leaf,
  Map,
  Hourglass,
  TrendingUp,
  Shield,
  Home,
  Microscope,
  ScrollText,
};

type SubjectCategory = 'all' | 'languages' | 'science_tech' | 'social_humanities' | 'culture_home' | 'math_logic';

export const SubjectsScreen: React.FC = () => {
  const { activeChild, setCurrentScreen, levels, selectLevel, setGradeLevel } = useGame();
  const { language, setIsLanguageModalOpen, t } = useGlobalLanguage();

  const [selectedSubjectId, setSelectedSubjectId] = useState<SubjectId>('hindi');
  const [activeCategory, setActiveCategory] = useState<SubjectCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [previewGrade, setPreviewGrade] = useState<GradeLevel>(
    activeChild.gradeLevel || 'class_5'
  );

  const gradeMeta = getGradeDetails(previewGrade);
  const selectedSubject = SUBJECTS.find((s) => s.id === selectedSubjectId) || SUBJECTS[0];

  // Category mapping
  const categoryMap: Record<SubjectCategory, SubjectId[]> = {
    all: SUBJECTS.map((s) => s.id),
    languages: ['hindi', 'english', 'sanskrit'],
    science_tech: ['physics', 'chemistry', 'biology', 'science', 'computer'],
    social_humanities: ['social_science', 'geography', 'history', 'economy'],
    culture_home: ['mahabharat', 'home_science'],
    math_logic: ['math', 'gk', 'logic', 'reading', 'puzzles'],
  };

  // Filtered subjects by category and search query
  const filteredSubjects = useMemo(() => {
    const allowedIds = categoryMap[activeCategory];
    return SUBJECTS.filter((sub) => {
      if (!allowedIds.includes(sub.id)) return false;
      if (!searchQuery.trim()) return true;

      const q = searchQuery.toLowerCase();
      const locName = getLocalizedSubjectName(sub, language).toLowerCase();
      const enName = sub.name.toLowerCase();
      const hiName = (sub.translations.hi?.name || '').toLowerCase();
      const tagline = getLocalizedSubjectTagline(sub, language).toLowerCase();

      return locName.includes(q) || enName.includes(q) || hiName.includes(q) || tagline.includes(q);
    });
  }, [activeCategory, searchQuery, language]);

  // Get topics for previewed grade age group
  const activeTopics =
    selectedSubject.topicsByAge[gradeMeta.ageGroup] ||
    selectedSubject.topicsByAge[activeChild.ageGroup] ||
    selectedSubject.topicsByAge['9-11'] || [
      'Foundational Principles',
      'Applied Concepts',
      'Advanced Problem Solving',
      'Mastery Questions',
    ];

  // Find levels related to this subject or first available
  const matchingLevels = levels.filter((l) => l.subjectId === selectedSubjectId);

  const handleApplyGrade = (gradeId: GradeLevel) => {
    setPreviewGrade(gradeId);
    setGradeLevel(gradeId);
  };

  return (
    <div className="space-y-6 sm:space-y-8 animate-fadeIn pb-16">
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setCurrentScreen('home_dashboard')}
          className="flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-white border border-slate-200 px-3.5 py-2 rounded-xl transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Dashboard</span>
        </button>

        <div className="flex items-center gap-2">
          {/* Active 5-Language Switcher */}
          <button
            onClick={() => setIsLanguageModalOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 rounded-xl text-xs font-black text-indigo-900 transition-colors cursor-pointer shadow-2xs hover:scale-105"
            title={`Current Language: ${SUPPORTED_LANGUAGES[language]?.name} · Click to switch`}
          >
            <Globe className="w-3.5 h-3.5 text-indigo-600" />
            <span className="font-heading">{SUPPORTED_LANGUAGES[language]?.nativeName}</span>
          </button>

          {/* Active Class Badge */}
          <button
            onClick={() => setCurrentScreen('age_select')}
            className="flex items-center gap-1.5 text-xs font-bold text-blue-700 bg-blue-50 border border-blue-200 px-3 py-1.5 rounded-xl hover:bg-blue-100 transition-colors cursor-pointer"
            title="Switch Class in Settings"
          >
            <span>{gradeMeta.icon}</span>
            <span>{gradeMeta.label}</span>
          </button>
        </div>
      </div>

      {/* Main Title & Class Filter Bar */}
      <div className="text-center max-w-3xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 text-blue-700 text-xs font-bold">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span>Complete Curriculum: All 19 Academic & Cultural Subjects (Available in 5 Languages)</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-heading">
          Explore All Subjects
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Comprehensive curriculum spanning <strong>Hindi, Social Science, Physics, Chemistry, Biology, English, Geography, History, Economy, Mahabharat, Home Science, Science, Computer Science Basic, Sanskrit, Mathematics</strong> and more. Fully translated in <strong>English, Hindi, Telugu, Kannada, and Malayalam</strong>.
        </p>

        {/* Quick Class Selector Horizontal Scroll */}
        <div className="mt-4 flex items-center justify-start sm:justify-center gap-1.5 overflow-x-auto pb-2 pt-1 scrollbar-none">
          <span className="text-xs font-bold text-slate-400 mr-1 shrink-0 flex items-center gap-1">
            <School className="w-3.5 h-3.5" /> Class:
          </span>
          {GRADES_METADATA.map((g) => {
            const isSelected = previewGrade === g.id;
            return (
              <button
                key={g.id}
                onClick={() => handleApplyGrade(g.id)}
                className={`px-3 py-1 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                  isSelected
                    ? 'bg-indigo-600 text-white shadow-xs font-extrabold scale-105'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                <span>{g.icon}</span> <span className="ml-0.5">{g.shortLabel}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Category Tabs & Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-3.5 rounded-3xl border border-slate-200 shadow-xs">
        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 scrollbar-none text-xs">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-3 py-1.5 rounded-xl font-bold shrink-0 transition-all cursor-pointer ${
              activeCategory === 'all'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
            }`}
          >
            All Subjects (19)
          </button>
          <button
            onClick={() => setActiveCategory('languages')}
            className={`px-3 py-1.5 rounded-xl font-bold shrink-0 transition-all cursor-pointer ${
              activeCategory === 'languages'
                ? 'bg-orange-600 text-white shadow-xs'
                : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
            }`}
          >
            📖 Languages (Hindi, English, Sanskrit)
          </button>
          <button
            onClick={() => setActiveCategory('science_tech')}
            className={`px-3 py-1.5 rounded-xl font-bold shrink-0 transition-all cursor-pointer ${
              activeCategory === 'science_tech'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
            }`}
          >
            🔬 Sciences & Tech
          </button>
          <button
            onClick={() => setActiveCategory('social_humanities')}
            className={`px-3 py-1.5 rounded-xl font-bold shrink-0 transition-all cursor-pointer ${
              activeCategory === 'social_humanities'
                ? 'bg-amber-700 text-white shadow-xs'
                : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
            }`}
          >
            🏛️ Social Sciences
          </button>
          <button
            onClick={() => setActiveCategory('culture_home')}
            className={`px-3 py-1.5 rounded-xl font-bold shrink-0 transition-all cursor-pointer ${
              activeCategory === 'culture_home'
                ? 'bg-rose-600 text-white shadow-xs'
                : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
            }`}
          >
            🏹 Mahabharat & Home Science
          </button>
          <button
            onClick={() => setActiveCategory('math_logic')}
            className={`px-3 py-1.5 rounded-xl font-bold shrink-0 transition-all cursor-pointer ${
              activeCategory === 'math_logic'
                ? 'bg-purple-600 text-white shadow-xs'
                : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
            }`}
          >
            🔢 Math & Logic
          </button>
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-64 shrink-0">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search subjects in any language..."
            className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
          />
        </div>
      </div>

      {/* Subject Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
        {filteredSubjects.map((sub) => {
          const isSelected = sub.id === selectedSubjectId;
          const IconComp = ICON_MAP[sub.icon] || Sparkles;
          const localizedName = getLocalizedSubjectName(sub, language);
          const localizedTagline = getLocalizedSubjectTagline(sub, language);

          return (
            <button
              key={sub.id}
              onClick={() => setSelectedSubjectId(sub.id)}
              className={`p-4 sm:p-5 rounded-3xl border-2 transition-all cursor-pointer text-left flex flex-col justify-between group touch-press ${
                isSelected
                  ? 'border-blue-600 bg-white shadow-md ring-2 ring-blue-500/20 scale-[1.02]'
                  : 'border-slate-200 bg-white/80 hover:bg-white hover:border-blue-300'
              }`}
            >
              <div>
                <div
                  className={`w-11 h-11 rounded-2xl bg-gradient-to-tr ${sub.color} flex items-center justify-center text-white mb-3 shadow-xs group-hover:scale-105 transition-transform`}
                >
                  <IconComp className="w-5 h-5" />
                </div>
                <h3 className="text-xs sm:text-sm font-bold text-slate-900 font-heading leading-tight group-hover:text-blue-600 transition-colors">
                  {localizedName}
                </h3>
                {language !== 'en' && (
                  <span className="text-[10px] text-slate-400 block truncate mt-0.5">
                    {sub.name}
                  </span>
                )}
              </div>

              <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[10px] text-slate-500 truncate block max-w-[110px]">
                  {localizedTagline}
                </span>
                {isSelected && (
                  <span className="w-2 h-2 rounded-full bg-blue-600 animate-ping shrink-0" />
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected Subject Deep Dive Card */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
                {getLocalizedSubjectTagline(selectedSubject, language)}
              </span>
              <span className="text-xs text-slate-400">·</span>
              <span className="text-xs font-semibold text-slate-500">
                Calibrated for {gradeMeta.label} ({gradeMeta.ageRange})
              </span>
              <span className="text-xs text-slate-400">·</span>
              <span className="text-[10px] bg-indigo-50 text-indigo-700 font-bold px-2 py-0.5 rounded-full border border-indigo-200">
                {SUPPORTED_LANGUAGES[language]?.nativeName} Active
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading">
              {getLocalizedSubjectName(selectedSubject, language)}
            </h2>
            {language !== 'en' && (
              <p className="text-xs text-slate-400 font-medium">{selectedSubject.name}</p>
            )}
            <p className="text-xs sm:text-sm text-slate-600 mt-2 max-w-2xl leading-relaxed">
              {getLocalizedSubjectDescription(selectedSubject, language)}
            </p>
          </div>

          <div className="flex items-center gap-2 flex-wrap shrink-0">
            <button
              onClick={() => setCurrentScreen('chapter_quizzes')}
              className="px-5 py-3 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-slate-950 font-bold text-xs rounded-xl shadow-xs transition-transform active:scale-95 cursor-pointer flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4 fill-slate-950" />
              <span>Chapter-Wise 25-Q Quizzes</span>
            </button>

            <button
              onClick={() => {
                if (matchingLevels.length > 0) {
                  selectLevel(matchingLevels[0]);
                } else {
                  selectLevel(levels[0]);
                }
              }}
              className="px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-xs transition-transform active:scale-95 cursor-pointer flex items-center gap-2"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>Practice Levels</span>
            </button>
          </div>
        </div>

        {/* Core Topics for Previewed Grade in Selected Subject */}
        <div className="mt-6">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Curriculum Topics in {gradeMeta.label} ({gradeMeta.ageRange})
            </h4>
            <span className="text-[11px] font-semibold text-blue-600">
              Stage: {gradeMeta.stageName}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
            {activeTopics.map((topic, i) => (
              <div
                key={i}
                className="p-3.5 rounded-2xl border border-slate-200 bg-slate-50/60 hover:bg-white transition-colors"
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-2 h-2 rounded-full bg-blue-500 shrink-0" />
                  <span className="text-xs font-bold text-slate-800 truncate">{topic}</span>
                </div>
                <span className="text-[11px] text-slate-500">25 Questions Tested</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
