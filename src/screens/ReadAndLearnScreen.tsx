import React, { useState, useEffect, useRef } from 'react';
import { useGame } from '../context/GameContext';
import { LESSONS } from '../data/lessonsData';
import { getGradeDetails } from '../data/gradesData';
import { getStudyBuddy } from '../data/buddiesData';
import { soundEngine } from '../utils/audio';
import { ASSET_PATHS } from '../assets/assetRegistry';
import { FloatingStudyBuddy } from '../components/FloatingStudyBuddy';
import { BuddySelectorModal } from '../components/BuddySelectorModal';
import { BuddyAvatar } from '../components/BuddyAvatar';
import {
  Volume2,
  VolumeX,
  BookOpen,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Sparkles,
  HelpCircle,
  Play,
  RotateCcw,
  School,
  GraduationCap,
  Users,
  Compass,
  Check,
} from 'lucide-react';

export const ReadAndLearnScreen: React.FC = () => {
  const {
    activeLessonId,
    setActiveLessonId,
    setCurrentScreen,
    startLevelQuiz,
    levels,
    activeChild,
    activeBuddyId,
  } = useGame();

  const studyBuddy = getStudyBuddy(activeBuddyId);

  // If toddler in Nursery and default lesson is lesson_1, provide nursery lesson
  const initialLessonId =
    activeChild.ageGroup === '3-5' && activeLessonId === 'lesson_1'
      ? 'lesson_nursery'
      : activeChild.ageGroup === '17-18' && activeLessonId === 'lesson_1'
      ? 'lesson_senior'
      : activeLessonId;

  const [currentId, setCurrentId] = useState<string>(initialLessonId);

  useEffect(() => {
    if (activeLessonId && LESSONS[activeLessonId]) {
      setCurrentId(activeLessonId);
    }
  }, [activeLessonId]);

  const lesson = LESSONS[currentId] || LESSONS['lesson_1'];
  const gradeMeta = getGradeDetails(activeChild.gradeLevel);

  const [isSpeaking, setIsSpeaking] = useState(false);
  const [selectedWord, setSelectedWord] = useState<number | null>(null);
  const [miniActivityAnswer, setMiniActivityAnswer] = useState<string | null>(null);
  const [activitySubmitted, setActivitySubmitted] = useState<boolean>(false);
  const [activeSectionIndex, setActiveSectionIndex] = useState<number>(0);
  const [exploredSections, setExploredSections] = useState<Set<number>>(new Set([0]));
  const [progressTrigger, setProgressTrigger] = useState<number>(0);
  const [isBuddyModalOpen, setIsBuddyModalOpen] = useState<boolean>(false);

  const matchedLevel =
    levels.find((l) => l.lessonId === lesson.id) ||
    levels.find((l) => l.id === lesson.levelId) ||
    levels[0];

  // Helper to scroll smoothly to elements
  const scrollTo = (elementId: string) => {
    const el = document.getElementById(elementId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const handleSpeak = (text: string) => {
    if (isSpeaking) {
      soundEngine.stopSpeech();
      setIsSpeaking(false);
    } else {
      setIsSpeaking(true);
      soundEngine.speakText(text, {
        pitch: studyBuddy.voiceConfig.pitch,
        rate: studyBuddy.voiceConfig.rate,
        onEnd: () => setIsSpeaking(false),
      });
    }
  };

  const handleMiniActivityOption = (option: string) => {
    setMiniActivityAnswer(option);
    setActivitySubmitted(true);
    const isCorrect = option === lesson.miniActivity.correctOption;

    if (isCorrect) {
      soundEngine.playCorrect();
      // Trigger progress celebration on correct answer!
      setProgressTrigger((prev) => prev + 1);
    } else {
      soundEngine.playIncorrect();
    }
  };

  const handleSelectSection = (idx: number) => {
    setActiveSectionIndex(idx);
    if (!exploredSections.has(idx)) {
      setExploredSections((prev) => new Set([...prev, idx]));
      // Trigger buddy celebrate spin on discovering new concept!
      setProgressTrigger((prev) => prev + 1);
    }
    scrollTo(`lesson-section-${idx}`);
  };

  const handleSelectWord = (idx: number) => {
    const nextIdx = selectedWord === idx ? null : idx;
    setSelectedWord(nextIdx);
    if (nextIdx !== null) {
      setProgressTrigger((prev) => prev + 1);
    }
  };

  const allLessonsList = [
    { id: 'lesson_nursery', title: 'Nursery & KG: Phonics & Animals', badge: '🧸 Nursery/KG' },
    { id: 'lesson_1', title: 'Lesson 1: Numbers & Living World', badge: 'Primary (Class 1–3)' },
    { id: 'lesson_2', title: 'Lesson 2: States of Matter & Water', badge: 'Primary (Class 3–5)' },
    { id: 'lesson_3', title: 'Lesson 3: Synonyms & Punctuation', badge: 'Middle (Class 6–7)' },
    { id: 'lesson_4', title: 'Lesson 4: Bits, Bytes & Logic', badge: 'Middle (Class 7–8)' },
    { id: 'lesson_5', title: 'Lesson 5: Deductive Detective', badge: 'Secondary (Class 9–10)' },
    { id: 'lesson_senior', title: 'Class 11 & 12: Calculus & Physics', badge: '🎓 Class 11–12' },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8 animate-fadeIn pb-28 relative">
      {/* Top Navigation & Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <button
          onClick={() => setCurrentScreen('home_dashboard')}
          className="flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-white border border-slate-200 px-3.5 py-2 rounded-xl transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Dashboard</span>
        </button>

        <div className="flex items-center gap-2">
          {/* Study Buddy Quick Status Pill */}
          <button
            onClick={() => setIsBuddyModalOpen(true)}
            className="flex items-center gap-2 px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 rounded-xl text-xs font-bold text-indigo-900 transition-colors cursor-pointer shadow-xs"
            title="Choose or change your Study Buddy"
          >
            <BuddyAvatar
              buddyId={studyBuddy.id}
              size="sm"
              showReactionBadge={false}
              animationState="idle"
            />
            <span className="hidden sm:inline">Mentor:</span>
            <span>{studyBuddy.name}</span>
            <Users className="w-3.5 h-3.5 text-indigo-500 ml-0.5" />
          </button>

          {/* Audio narration button */}
          <button
            onClick={() => handleSpeak(lesson.sections.map((s) => s.speechText || s.content).join(' '))}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer shadow-sm ${
              isSpeaking
                ? 'bg-amber-500 text-slate-950 animate-pulse'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            {isSpeaking ? (
              <>
                <VolumeX className="w-4 h-4" />
                <span>Pause Readout</span>
              </>
            ) : (
              <>
                <Volume2 className="w-4 h-4" />
                <span>Listen with {studyBuddy.name}</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Grade & Lesson Selector Strip */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-500">Student Class:</span>
          <button
            onClick={() => setCurrentScreen('age_select')}
            className="flex items-center gap-1.5 text-xs font-bold text-blue-700 bg-blue-50 border border-blue-200 px-2.5 py-1 rounded-lg hover:bg-blue-100 transition-colors cursor-pointer"
          >
            <span>{gradeMeta.icon}</span>
            <span>{gradeMeta.label}</span>
          </button>
        </div>

        {/* Horizontal scroll of lessons from Nursery to 12th */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 scrollbar-none">
          {allLessonsList.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setCurrentId(item.id);
                setActiveLessonId(item.id);
                setActivitySubmitted(false);
                setMiniActivityAnswer(null);
                soundEngine.stopSpeech();
                setIsSpeaking(false);
                setActiveSectionIndex(0);
                setExploredSections(new Set([0]));
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                currentId === item.id
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {item.badge}
            </button>
          ))}
        </div>
      </div>

      {/* Lesson Header Card */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm">
        <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 mb-2">
          <span className="font-bold text-blue-600 uppercase tracking-wider">
            Read & Learn Module
          </span>
          <span>·</span>
          <span>Interactive Lesson</span>
          <span>·</span>
          <span>~{lesson.estimatedMinutes} min read</span>
          <span>·</span>
          <span className="text-indigo-600 font-semibold">Guided by {studyBuddy.name}</span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading">
          {lesson.title}
        </h1>

        <p className="mt-2 text-sm text-slate-600 leading-relaxed max-w-2xl">
          {lesson.summary}
        </p>

        {/* Visual Illustration */}
        <div className="mt-6 rounded-2xl overflow-hidden border border-slate-200 bg-slate-100 max-h-64 sm:max-h-72 relative">
          <img
            src={lesson.levelId % 2 === 1 ? ASSET_PATHS.scienceLab : ASSET_PATHS.worldMap}
            alt={lesson.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent flex items-end p-4">
            <span className="text-xs font-semibold text-white/90">
              Interactive Concept Exploration: {lesson.title}
            </span>
          </div>
        </div>

        {/* Lesson Roadmap Navigation Strip */}
        <div className="mt-6 pt-5 border-t border-slate-100">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Compass className="w-4 h-4 text-indigo-600" />
              <span className="text-xs font-bold text-slate-800">Lesson Roadmap</span>
            </div>
            <span className="text-[11px] font-semibold text-slate-500">
              {exploredSections.size} of {lesson.sections.length} concepts explored
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {lesson.sections.map((sec, idx) => {
              const isExplored = exploredSections.has(idx);
              const isActive = activeSectionIndex === idx;

              return (
                <button
                  key={idx}
                  onClick={() => handleSelectSection(idx)}
                  className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                    isActive
                      ? 'border-indigo-500 bg-indigo-50/70 shadow-xs'
                      : isExplored
                      ? 'border-emerald-200 bg-emerald-50/40 text-emerald-950'
                      : 'border-slate-200 bg-slate-50/50 hover:bg-white text-slate-700'
                  }`}
                >
                  <span className="text-xs font-semibold truncate mr-2">
                    {sec.heading}
                  </span>
                  {isExplored ? (
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  ) : (
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Lesson Content Sections */}
      <div className="space-y-4">
        {lesson.sections.map((section, idx) => {
          const isActive = activeSectionIndex === idx;

          return (
            <div
              key={idx}
              id={`lesson-section-${idx}`}
              onClick={() => {
                setActiveSectionIndex(idx);
                if (!exploredSections.has(idx)) {
                  setExploredSections((prev) => new Set([...prev, idx]));
                  setProgressTrigger((prev) => prev + 1);
                }
              }}
              className={`bg-white rounded-3xl border p-6 sm:p-7 shadow-sm transition-all cursor-pointer ${
                isActive
                  ? 'border-indigo-400 ring-2 ring-indigo-100 shadow-md'
                  : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-700 text-xs font-bold flex items-center justify-center">
                    {idx + 1}
                  </span>
                  <h2 className="text-base sm:text-lg font-bold text-slate-900 font-heading">
                    {section.heading}
                  </h2>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSpeak(section.speechText || section.content);
                    }}
                    className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors cursor-pointer"
                    title="Read section with mentor voice"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                {section.content}
              </p>
            </div>
          );
        })}
      </div>

      {/* Key Words & Vocabulary Vault */}
      <div id="vocabulary-vault" className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-7 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-500" />
            <h3 className="text-base font-bold text-slate-900 font-heading">
              Key Vocabulary & Concepts
            </h3>
          </div>
          <span className="text-xs text-slate-400">
            Click words to inspect & hear explanations
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {lesson.keyWords.map((item, idx) => {
            const isOpen = selectedWord === idx;

            return (
              <div
                key={idx}
                onClick={() => handleSelectWord(idx)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                  isOpen
                    ? 'border-indigo-500 bg-indigo-50/50 shadow-sm ring-1 ring-indigo-200'
                    : 'border-slate-200 bg-slate-50/50 hover:bg-white'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 font-heading">
                    {item.word}
                  </h4>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSpeak(`${item.word}. Meaning: ${item.meaning}. Example: ${item.example}`);
                    }}
                    className="p-1 text-slate-400 hover:text-indigo-600 cursor-pointer"
                    title="Listen to word explanation"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <p className="text-xs text-slate-600 mb-2 leading-relaxed">
                  {item.meaning}
                </p>

                {isOpen && (
                  <div className="pt-2 border-t border-indigo-200/60 text-[11px] text-indigo-900 italic">
                    Example: "{item.example}"
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Interactive Mini Activity */}
      <div id="mini-activity" className="bg-gradient-to-br from-amber-50 to-orange-50/50 rounded-3xl border border-amber-200 p-6 sm:p-7 shadow-sm">
        <div className="flex items-center gap-2 text-amber-800 mb-2">
          <HelpCircle className="w-5 h-5 text-amber-600" />
          <span className="text-xs font-bold uppercase tracking-wider">
            Interactive Mini-Check
          </span>
        </div>

        <h3 className="text-base font-bold text-slate-900 font-heading mb-1">
          {lesson.miniActivity.title}
        </h3>
        <p className="text-xs sm:text-sm text-slate-700 mb-5">
          {lesson.miniActivity.prompt}
        </p>

        {lesson.miniActivity.options && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
            {lesson.miniActivity.options.map((opt) => {
              const isSelected = miniActivityAnswer === opt;
              const isCorrect = opt === lesson.miniActivity.correctOption;

              let btnStyle = 'bg-white border-slate-200 hover:border-amber-300';
              if (activitySubmitted) {
                if (isCorrect) btnStyle = 'bg-emerald-100 border-emerald-500 text-emerald-950 font-bold';
                else if (isSelected) btnStyle = 'bg-rose-100 border-rose-400 text-rose-950';
              } else if (isSelected) {
                btnStyle = 'bg-amber-100 border-amber-400 text-amber-950 font-bold';
              }

              return (
                <button
                  key={opt}
                  onClick={() => handleMiniActivityOption(opt)}
                  className={`p-3.5 rounded-2xl border-2 text-xs font-semibold text-left transition-all cursor-pointer flex items-center justify-between ${btnStyle}`}
                >
                  <span>{opt}</span>
                  {activitySubmitted && isCorrect && (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>
        )}

        {activitySubmitted && (
          <div className="p-4 bg-white/90 rounded-2xl border border-amber-200 text-xs text-slate-800 leading-relaxed animate-fadeIn">
            {lesson.miniActivity.feedback}
          </div>
        )}
      </div>

      {/* Bottom CTA: Ready for 25 Questions */}
      <div id="quiz-cta" className="bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-white text-slate-900 rounded-3xl p-6 sm:p-8 border border-amber-200/80 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold text-amber-800 uppercase tracking-wider">
              Ready for the Big Quest
            </span>
          </div>
          <h3 className="text-lg font-bold font-heading text-slate-900">
            Lesson Completed! Test your skills with {studyBuddy.name}
          </h3>
          <p className="text-xs text-slate-600 mt-0.5">
            Answer 25 questions in Level {matchedLevel.id} to earn stars, coins, and unlock new challenges!
          </p>
        </div>

        <button
          onClick={() => startLevelQuiz(matchedLevel)}
          className="px-6 py-3.5 bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-400 hover:from-amber-400 hover:to-yellow-300 text-slate-950 font-bold text-xs rounded-xl shadow-md transition-all cursor-pointer flex items-center gap-2 shrink-0 transform active:scale-95"
        >
          <Play className="w-4 h-4 fill-slate-950" />
          <span>Start 25 Questions (Level {matchedLevel.id})</span>
        </button>
      </div>

      {/* Floating Study Buddy Mentor Component */}
      <FloatingStudyBuddy
        lesson={lesson}
        activeSectionIndex={activeSectionIndex}
        totalSections={lesson.sections.length}
        activityCompleted={activitySubmitted}
        activityCorrect={miniActivityAnswer === lesson.miniActivity.correctOption}
        onJumpToSection={handleSelectSection}
        onJumpToKeywords={() => scrollTo('vocabulary-vault')}
        onJumpToActivity={() => scrollTo('mini-activity')}
        onStartQuiz={() => startLevelQuiz(matchedLevel)}
        lastProgressTrigger={progressTrigger}
      />

      {/* Buddy Selection Modal */}
      <BuddySelectorModal
        isOpen={isBuddyModalOpen}
        onClose={() => setIsBuddyModalOpen(false)}
      />
    </div>
  );
};
