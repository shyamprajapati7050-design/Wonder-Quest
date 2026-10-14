import React, { useState } from 'react';
import { useGame } from '../context/GameContext';
import { useGlobalLanguage } from '../context/GlobalLanguageContext';
import { SUPPORTED_LANGUAGES } from '../data/languages';
import {
  SUBJECTS,
  getLocalizedSubjectName,
  getLocalizedSubjectShortName,
  getLocalizedSubjectTagline,
} from '../data/subjects';
import { GRADES_METADATA, getGradeDetails } from '../data/gradesData';
import { getChapters, getAllChaptersForGrade, ChapterInfo } from '../data/chaptersData';
import { GradeLevel, SubjectId } from '../types';
import { soundEngine } from '../utils/audio';
import {
  BookOpen,
  Calculator,
  FlaskConical,
  Cpu,
  Globe,
  Glasses,
  Lightbulb,
  Sparkles,
  ArrowLeft,
  Play,
  CheckCircle2,
  Trophy,
  Timer,
  School,
  Flame,
  Award,
  Filter,
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
  Puzzle,
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

export const ChapterQuizzesScreen: React.FC = () => {
  const {
    activeChild,
    setCurrentScreen,
    startChapterQuiz,
    setGradeLevel,
  } = useGame();

  const { language, setIsLanguageModalOpen, t } = useGlobalLanguage();

  // Selected Class & Subject filters
  const [selectedGrade, setSelectedGrade] = useState<GradeLevel>(
    activeChild.gradeLevel || 'class_5'
  );
  const [selectedSubjectId, setSelectedSubjectId] = useState<SubjectId>('math');
  const [searchQuery, setSearchQuery] = useState('');

  const gradeMeta = getGradeDetails(selectedGrade);
  const selectedSubject = SUBJECTS.find((s) => s.id === selectedSubjectId) || SUBJECTS[0];

  // Fetch chapters for selected class & subject
  const chapters = getChapters(selectedGrade, selectedSubjectId);

  // Filter by search query if any
  const filteredChapters = chapters.filter(
    (c) =>
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.keyConcepts.some((kc) => kc.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleGradeChange = (newGrade: GradeLevel) => {
    setSelectedGrade(newGrade);
    soundEngine.playCardFlip();
  };

  const handleSubjectChange = (subId: SubjectId) => {
    setSelectedSubjectId(subId);
    soundEngine.playCardFlip();
  };

  const handleStartQuiz = (chapter: ChapterInfo) => {
    soundEngine.playCorrect();
    startChapterQuiz(chapter);
  };

  // Get score if already attempted
  const getChapterScore = (chapterId: string) => {
    return activeChild.chapterQuizScores?.[chapterId];
  };

  return (
    <div className="space-y-6 sm:space-y-8 animate-fadeIn pb-16">
      {/* Top Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <button
          onClick={() => setCurrentScreen('home_dashboard')}
          className="flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-white border border-slate-200 px-3.5 py-2 rounded-xl transition-colors cursor-pointer shadow-2xs"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Dashboard</span>
        </button>

        <div className="flex items-center gap-2">
          {/* Language Switcher */}
          <button
            onClick={() => setIsLanguageModalOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 rounded-xl text-xs font-black text-indigo-900 transition-colors cursor-pointer shadow-2xs hover:scale-105"
            title={`Language: ${SUPPORTED_LANGUAGES[language]?.name}`}
          >
            <Globe className="w-3.5 h-3.5 text-indigo-600" />
            <span>{SUPPORTED_LANGUAGES[language]?.nativeName}</span>
          </button>

          {/* Current Active Class Badge */}
          <button
            onClick={() => {
              setGradeLevel(selectedGrade);
              soundEngine.playCorrect();
            }}
            className="flex items-center gap-1.5 text-xs font-bold text-slate-800 bg-slate-100 border border-slate-200 px-3.5 py-1.5 rounded-xl hover:bg-slate-200 transition-colors cursor-pointer"
            title="Set as My Default Class"
          >
            <span>{gradeMeta.icon}</span>
            <span>{gradeMeta.label}</span>
          </button>
        </div>
      </div>

      {/* Main Title Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20 text-amber-700 text-xs font-bold">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span>Complete 25-Question Chapter-Wise Quizzes (Nursery to 12th Class)</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-heading">
          Chapter-Wise 25-Question Quizzes
        </h1>
        <p className="text-sm text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Select any Class from <strong>Nursery to 12th Class</strong> and pick any subject. Every single chapter is packed with exactly <strong>25 interactive questions</strong> (MCQ, True/False, Match Pairs, Ordering, Memory & Problem Solving)!
        </p>
      </div>

      {/* 1. All Classes Horizontal Selector Bar (Nursery to Class 12) */}
      <div className="bg-white rounded-3xl border border-slate-200 p-4 sm:p-5 shadow-xs space-y-3">
        <div className="flex items-center justify-between text-xs text-slate-500 px-1 font-semibold">
          <span className="flex items-center gap-1.5 text-slate-700 font-bold uppercase tracking-wider">
            <School className="w-4 h-4 text-indigo-600" />
            <span>Select Class / Grade (सभी 14 कक्षाएं)</span>
          </span>
          <span className="text-[11px] text-indigo-600 font-bold">
            Selected: {gradeMeta.label} ({gradeMeta.stageName})
          </span>
        </div>

        {/* Classes Horizontal Scroll */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 pt-1 scrollbar-none">
          {GRADES_METADATA.map((g) => {
            const isSelected = selectedGrade === g.id;
            return (
              <button
                key={g.id}
                onClick={() => handleGradeChange(g.id)}
                className={`flex items-center gap-2 px-3 py-2 rounded-2xl text-xs font-bold transition-all shrink-0 cursor-pointer border ${
                  isSelected
                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm scale-102 ring-2 ring-indigo-500/20'
                    : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                }`}
              >
                <span className="text-sm">{g.icon}</span>
                <span>{g.shortLabel}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Subjects Filter Tabs (All 19 Subjects) */}
      <div className="bg-white rounded-3xl border border-slate-200 p-3 sm:p-4 shadow-xs">
        <div className="flex items-center justify-between text-xs text-slate-500 px-1 pb-2 font-semibold border-b border-slate-100 mb-2">
          <span className="flex items-center gap-1.5 text-slate-700 font-bold uppercase tracking-wider text-[11px]">
            <Filter className="w-3.5 h-3.5 text-indigo-600" />
            <span>Select Subject (सभी 19 विषय)</span>
          </span>
          <span className="text-[11px] text-indigo-600 font-bold">
            Active: {getLocalizedSubjectName(selectedSubject, language)}
          </span>
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 pt-1 scrollbar-none">
          {SUBJECTS.map((sub) => {
            const isSelected = selectedSubjectId === sub.id;
            const IconComp = ICON_MAP[sub.icon] || Sparkles;
            const localizedShort = getLocalizedSubjectShortName(sub, language);

            return (
              <button
                key={sub.id}
                onClick={() => handleSubjectChange(sub.id)}
                className={`flex items-center gap-2 px-3 py-2 rounded-2xl text-xs font-bold transition-all shrink-0 cursor-pointer border ${
                  isSelected
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-blue-600 shadow-md shadow-blue-500/25 scale-102 ring-2 ring-blue-500/20'
                    : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                }`}
                title={getLocalizedSubjectName(sub, language)}
              >
                <div
                  className={`w-5 h-5 rounded-lg flex items-center justify-center ${
                    isSelected ? 'bg-white/20 text-white' : 'text-slate-600'
                  }`}
                >
                  <IconComp className="w-3.5 h-3.5" />
                </div>
                <span>{localizedShort}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Selected Subject Header & Search */}
      <div className="bg-gradient-to-br from-indigo-50/70 via-white to-amber-50/60 rounded-3xl p-6 sm:p-8 text-slate-900 shadow-xs border border-slate-200 relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-1.5 max-w-xl">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-400 text-slate-950">
              {gradeMeta.label}
            </span>
            <span className="text-xs text-slate-600 font-semibold">
              · {getLocalizedSubjectName(selectedSubject, language)}
            </span>
            {language !== 'en' && (
              <span className="text-[10px] bg-slate-100 px-2 py-0.5 rounded-full text-slate-600 border border-slate-200">
                {selectedSubject.name}
              </span>
            )}
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading">
            {getLocalizedSubjectName(selectedSubject, language)} - 25-Q Chapters
          </h2>
          <p className="text-xs text-slate-600 leading-relaxed">
            {selectedSubject.description} Every chapter includes exactly 25 questions curated for {gradeMeta.stageName}.
          </p>
        </div>

        {/* Search input */}
        <div className="w-full md:w-72 shrink-0">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search chapters or topics..."
            className="w-full bg-white border border-slate-300 focus:border-indigo-500 rounded-xl px-4 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 shadow-2xs"
          />
        </div>
      </div>

      {/* 4. Chapters Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredChapters.map((chapter) => {
          const scoreRecord = getChapterScore(chapter.id);
          const hasPassed = scoreRecord?.passed;

          return (
            <div
              key={chapter.id}
              className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group hover:border-blue-400/60"
            >
              <div>
                {/* Chapter Meta Top */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-8 h-8 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center font-bold text-xs">
                      {chapter.icon || '📚'}
                    </span>
                    <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
                      Chapter {chapter.chapterNumber}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 flex-wrap justify-end">
                    {chapter.ncertBookName && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-200 shadow-2xs">
                        📖 {chapter.ncertBookName}
                      </span>
                    )}
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-200">
                      25 Questions
                    </span>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                      chapter.difficulty === 'easy'
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : chapter.difficulty === 'medium'
                        ? 'bg-blue-50 text-blue-700 border border-blue-200'
                        : 'bg-purple-50 text-purple-700 border border-purple-200'
                    }`}>
                      {chapter.difficulty}
                    </span>
                  </div>
                </div>

                {/* Chapter Title */}
                <h3 className="text-lg font-bold text-slate-900 font-heading group-hover:text-blue-600 transition-colors">
                  {chapter.title}
                </h3>
                {chapter.hindiTitle && (
                  <p className="text-xs text-slate-500 font-medium mt-0.5">
                    {chapter.hindiTitle}
                  </p>
                )}

                {/* Description */}
                <p className="text-xs text-slate-600 mt-2 line-clamp-2 leading-relaxed">
                  {chapter.description}
                </p>

                {/* Key Concepts Pills */}
                <div className="mt-4 pt-3 border-t border-slate-100">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
                    Topics Tested in 25 Questions:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {chapter.keyConcepts.map((concept, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[10px] font-medium"
                      >
                        {concept}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Actions & Previous Score */}
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                <div>
                  {scoreRecord ? (
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className={`w-4 h-4 ${hasPassed ? 'text-emerald-500' : 'text-amber-500'}`} />
                      <span className="text-xs font-bold text-slate-800">
                        Score: {scoreRecord.score}/25 ({scoreRecord.accuracy}%)
                      </span>
                    </div>
                  ) : (
                    <span className="text-xs text-slate-400 font-medium">
                      Not attempted yet
                    </span>
                  )}
                </div>

                <button
                  onClick={() => handleStartQuiz(chapter)}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-xs shadow-md shadow-blue-500/20 flex items-center gap-2 transform active:scale-95 transition-all cursor-pointer shrink-0"
                >
                  <Play className="w-3.5 h-3.5 fill-white" />
                  <span>Start 25-Q Quiz</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {filteredChapters.length === 0 && (
        <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center max-w-md mx-auto space-y-3">
          <BookOpen className="w-10 h-10 text-slate-300 mx-auto" />
          <h3 className="text-base font-bold text-slate-900">No matching chapters found</h3>
          <p className="text-xs text-slate-500">
            Try adjusting your search query or switch to another subject tab.
          </p>
          <button
            onClick={() => setSearchQuery('')}
            className="px-4 py-2 bg-blue-50 text-blue-600 text-xs font-bold rounded-xl hover:bg-blue-100 transition cursor-pointer"
          >
            Clear Search
          </button>
        </div>
      )}
    </div>
  );
};
