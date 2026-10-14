import React, { useState, useEffect, useRef } from 'react';
import { useGame } from '../context/GameContext';
import { getStudyBuddy } from '../data/buddiesData';
import { BuddyAvatar } from './BuddyAvatar';
import { BuddySelectorModal } from './BuddySelectorModal';
import { soundEngine } from '../utils/audio';
import { Lesson, BuddyAnimationState } from '../types';
import {
  Volume2,
  VolumeX,
  Sparkles,
  ArrowRight,
  BookOpen,
  HelpCircle,
  Play,
  RotateCcw,
  Minimize2,
  Maximize2,
  Users,
  Compass,
} from 'lucide-react';

interface FloatingStudyBuddyProps {
  lesson: Lesson;
  activeSectionIndex: number;
  totalSections: number;
  activityCompleted: boolean;
  activityCorrect?: boolean;
  onJumpToSection?: (index: number) => void;
  onJumpToKeywords?: () => void;
  onJumpToActivity?: () => void;
  onStartQuiz?: () => void;
  lastProgressTrigger?: number; // increments on student progress
}

export const FloatingStudyBuddy: React.FC<FloatingStudyBuddyProps> = ({
  lesson,
  activeSectionIndex,
  totalSections,
  activityCompleted,
  activityCorrect,
  onJumpToSection,
  onJumpToKeywords,
  onJumpToActivity,
  onStartQuiz,
  lastProgressTrigger = 0,
}) => {
  const { activeBuddyId, activeChild } = useGame();
  const buddy = getStudyBuddy(activeBuddyId);

  const [isMinimized, setIsMinimized] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [animationState, setAnimationState] = useState<BuddyAnimationState>('waving');
  const [currentMessage, setCurrentMessage] = useState<string>('');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isHintMode, setIsHintMode] = useState(false);

  const prevTriggerRef = useRef(lastProgressTrigger);
  const prevActivityRef = useRef(activityCompleted);

  // Initial wave & greeting on appear
  useEffect(() => {
    setAnimationState('waving');
    setCurrentMessage(
      `Hi ${activeChild.name}! I'm ${buddy.name}. Ready to discover "${lesson.title}" together?`
    );

    const timer = setTimeout(() => {
      setAnimationState('idle');
    }, 1800);

    return () => clearTimeout(timer);
  }, [lesson.id, buddy.id, activeChild.name]);

  // Celebrate with a subtle spin whenever student makes progress in a lesson!
  useEffect(() => {
    if (lastProgressTrigger > prevTriggerRef.current) {
      prevTriggerRef.current = lastProgressTrigger;
      // Trigger celebrate animation (subtle spin + jump)
      setAnimationState('celebrating');
      soundEngine.playBuddyChime();

      // Pick encouraging celebrate message
      const cheers = [
        `Fantastic progress, ${activeChild.name}! You're mastering this concept!`,
        `Superb focus! Notice how everything in this lesson connects together!`,
        `Whoo-hoo! Another concept unlocked! Look at that brilliant brain at work!`,
        buddy.dialogue.progressEncouragement,
      ];
      setCurrentMessage(cheers[Math.floor(Math.random() * cheers.length)]);

      const timer = setTimeout(() => {
        setAnimationState('idle');
      }, 1600);

      return () => clearTimeout(timer);
    }
  }, [lastProgressTrigger, activeChild.name, buddy]);

  // Celebrate when activity is completed
  useEffect(() => {
    if (activityCompleted && !prevActivityRef.current) {
      prevActivityRef.current = true;
      setAnimationState('celebrating');
      soundEngine.playBuddyChime();

      if (activityCorrect) {
        setCurrentMessage(
          `Awesome job, ${activeChild.name}! You solved the mini-check! You're ready for the 25 questions!`
        );
      } else {
        setCurrentMessage(
          `Great attempt, ${activeChild.name}! Making mistakes is how our brain grows stronger!`
        );
      }

      const timer = setTimeout(() => {
        setAnimationState('idle');
      }, 1600);

      return () => clearTimeout(timer);
    }
  }, [activityCompleted, activityCorrect, activeChild.name]);

  // Text-To-Speech speech handler
  const handleSpeakSpeech = (textToSpeak: string) => {
    if (isSpeaking) {
      soundEngine.stopSpeech();
      setIsSpeaking(false);
      setAnimationState('idle');
    } else {
      setIsSpeaking(true);
      setAnimationState('speaking');
      soundEngine.playBuddyChime();

      soundEngine.speakText(textToSpeak, {
        pitch: buddy.voiceConfig.pitch,
        rate: buddy.voiceConfig.rate,
        onEnd: () => {
          setIsSpeaking(false);
          setAnimationState('idle');
        },
      });
    }
  };

  // Provide mentor audio hint
  const handleProvideHint = () => {
    setIsHintMode(true);
    const activeSection = lesson.sections[activeSectionIndex] || lesson.sections[0];
    const hintText = activeSection
      ? `${buddy.name}'s Hint: In ${activeSection.heading}, remember: ${activeSection.speechText || activeSection.content.slice(0, 160)}.`
      : buddy.dialogue.hintLead;

    setCurrentMessage(hintText);
    handleSpeakSpeech(hintText);
  };

  // Determine navigation cue
  const getNavigationCue = () => {
    if (activeSectionIndex < totalSections - 1) {
      const nextHeading = lesson.sections[activeSectionIndex + 1]?.heading || 'Next Section';
      return {
        label: `Next: ${nextHeading}`,
        action: () => onJumpToSection && onJumpToSection(activeSectionIndex + 1),
        type: 'section',
      };
    }
    if (!activityCompleted) {
      return {
        label: 'Ready for Concept Check Mini-Activity',
        action: () => onJumpToActivity && onJumpToActivity(),
        type: 'activity',
      };
    }
    return {
      label: 'Level 25 Questions Quiz Ready!',
      action: () => onStartQuiz && onStartQuiz(),
      type: 'quiz',
    };
  };

  const navCue = getNavigationCue();

  return (
    <>
      {/* Floating Buddy Widget */}
      <aside
        aria-label="Study Buddy Mentor"
        className="fixed bottom-4 right-4 z-40 max-w-sm sm:max-w-md w-[calc(100vw-2rem)] sm:w-auto animate-buddy-pop"
      >
        {isMinimized ? (
          /* Minimized Docked Bubble */
          <div
            onClick={() => setIsMinimized(false)}
            className="flex items-center gap-2.5 p-2 pr-4 bg-white/95 backdrop-blur-md rounded-full shadow-xl border-2 border-indigo-300 hover:border-indigo-500 transition-all cursor-pointer group float-right"
          >
            <div className="relative">
              <BuddyAvatar
                buddyId={buddy.id}
                size="sm"
                animationState={animationState}
                showReactionBadge={false}
              />
            </div>
            <div className="text-left">
              <span className="block text-xs font-bold text-slate-800 group-hover:text-indigo-600 transition-colors">
                {buddy.name}
              </span>
              <span className="block text-[10px] text-slate-500 font-medium">
                Tap for Hint & Navigation
              </span>
            </div>
            <Maximize2 className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-600 ml-1" />
          </div>
        ) : (
          /* Expanded Floating Mentor Card */
          <div className="bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl border-2 border-indigo-200 overflow-hidden flex flex-col transition-all">
            {/* Top Toolbar */}
            <div className="px-3.5 py-2.5 bg-gradient-to-r from-indigo-50 via-white to-purple-50 border-b border-indigo-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                <span className="text-xs font-bold text-indigo-950 font-heading">
                  {buddy.name} · Study Buddy
                </span>
                <span className="text-[11px] text-indigo-600 font-medium hidden sm:inline">
                  ({buddy.title})
                </span>
              </div>

              <div className="flex items-center gap-1">
                {/* Switch Buddy Button */}
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="px-2 py-1 text-[11px] font-semibold text-indigo-700 hover:text-indigo-900 hover:bg-indigo-100/70 rounded-lg transition-colors cursor-pointer flex items-center gap-1"
                  title="Choose another mentor"
                >
                  <Users className="w-3.5 h-3.5" />
                  <span>Change</span>
                </button>

                {/* Minimize Button */}
                <button
                  onClick={() => setIsMinimized(true)}
                  className="p-1 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                  title="Minimize"
                  aria-label="Minimize Study Buddy"
                >
                  <Minimize2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Main Interactive Stage */}
            <div className="p-3.5 sm:p-4 space-y-3">
              {/* Character + Speech Bubble Row */}
              <div className="flex items-start gap-3">
                {/* Animated Character Avatar */}
                <div
                  onClick={() => {
                    // Waving reaction on click
                    setAnimationState('waving');
                    soundEngine.playBuddyChime();
                    setTimeout(() => setAnimationState('idle'), 1400);
                  }}
                  className="cursor-pointer shrink-0"
                  title={`Click to wave at ${buddy.name}!`}
                >
                  <BuddyAvatar
                    buddyId={buddy.id}
                    size="md"
                    animationState={animationState}
                  />
                </div>

                {/* Speech Bubble */}
                <div className="flex-1 bg-indigo-50/70 border border-indigo-100 rounded-2xl p-3 relative text-left">
                  {/* Bubble Pointer Arrow */}
                  <div className="absolute top-4 -left-1.5 w-3 h-3 bg-indigo-50 border-b border-l border-indigo-100 transform rotate-45" />

                  <p className="text-xs text-slate-800 leading-relaxed font-medium">
                    {currentMessage || buddy.dialogue.greeting}
                  </p>

                  {/* Speech Audio Trigger */}
                  <div className="mt-2 flex items-center justify-between pt-1.5 border-t border-indigo-100/80">
                    <button
                      onClick={() => handleSpeakSpeech(currentMessage || buddy.dialogue.greeting)}
                      className={`inline-flex items-center gap-1.5 text-[11px] font-bold px-2 py-0.5 rounded-lg transition-all cursor-pointer ${
                        isSpeaking
                          ? 'bg-amber-500 text-slate-950 animate-pulse'
                          : 'bg-indigo-600 text-white hover:bg-indigo-700'
                      }`}
                    >
                      {isSpeaking ? (
                        <>
                          <VolumeX className="w-3 h-3" />
                          <span>Stop Voice</span>
                        </>
                      ) : (
                        <>
                          <Volume2 className="w-3 h-3" />
                          <span>Hear Buddy</span>
                        </>
                      )}
                    </button>

                    <button
                      onClick={handleProvideHint}
                      className="text-[11px] font-semibold text-indigo-700 hover:text-indigo-900 hover:underline cursor-pointer flex items-center gap-1"
                    >
                      <Sparkles className="w-3 h-3 text-amber-500" />
                      <span>Ask Hint</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Navigation Cue Banner */}
              <div className="p-2.5 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 min-w-0">
                  <Compass className="w-4 h-4 text-blue-600 shrink-0" />
                  <span className="text-[11px] font-bold text-slate-800 truncate">
                    {navCue.label}
                  </span>
                </div>

                <button
                  onClick={navCue.action}
                  className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-[11px] font-bold rounded-lg transition-colors cursor-pointer shrink-0 flex items-center gap-1"
                >
                  <span>Go</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>

              {/* Quick Navigation Pills */}
              <div className="flex items-center justify-between gap-1 pt-1 border-t border-slate-100">
                <button
                  onClick={() => onJumpToSection && onJumpToSection(0)}
                  className="flex-1 py-1 text-[11px] font-medium text-slate-600 hover:text-indigo-700 hover:bg-slate-50 rounded-lg transition-colors text-center cursor-pointer flex items-center justify-center gap-1"
                >
                  <BookOpen className="w-3 h-3 text-slate-400" />
                  <span>Start</span>
                </button>

                <button
                  onClick={() => onJumpToKeywords && onJumpToKeywords()}
                  className="flex-1 py-1 text-[11px] font-medium text-slate-600 hover:text-indigo-700 hover:bg-slate-50 rounded-lg transition-colors text-center cursor-pointer flex items-center justify-center gap-1"
                >
                  <Sparkles className="w-3 h-3 text-amber-500" />
                  <span>Words</span>
                </button>

                <button
                  onClick={() => onJumpToActivity && onJumpToActivity()}
                  className="flex-1 py-1 text-[11px] font-medium text-slate-600 hover:text-indigo-700 hover:bg-slate-50 rounded-lg transition-colors text-center cursor-pointer flex items-center justify-center gap-1"
                >
                  <HelpCircle className="w-3 h-3 text-blue-500" />
                  <span>Activity</span>
                </button>

                <button
                  onClick={() => onStartQuiz && onStartQuiz()}
                  className="flex-1 py-1 text-[11px] font-bold text-amber-700 hover:text-amber-900 hover:bg-amber-50 rounded-lg transition-colors text-center cursor-pointer flex items-center justify-center gap-1"
                >
                  <Play className="w-3 h-3 text-amber-600 fill-amber-600" />
                  <span>Quiz</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </aside>

      {/* Choose Buddy Modal */}
      <BuddySelectorModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSelectBuddy={() => {
          // Play wave on mentor switch
          setAnimationState('waving');
          setTimeout(() => setAnimationState('idle'), 1600);
        }}
      />
    </>
  );
};
