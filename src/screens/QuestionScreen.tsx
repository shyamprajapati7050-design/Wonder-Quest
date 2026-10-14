import React, { useState, useEffect, useRef } from 'react';
import { useGame } from '../context/GameContext';
import { soundEngine } from '../utils/audio';
import { MatchPair, MemoryCard, Question } from '../types';
import {
  Timer,
  Volume2,
  VolumeX,
  Lightbulb,
  Edit3,
  CheckCircle2,
  ArrowRight,
  HelpCircle,
  Sparkles,
  RotateCcw,
  X,
  Calculator,
  Globe,
} from 'lucide-react';
import { SUPPORTED_LANGUAGES } from '../data/languages';
import { useDeviceDetect } from '../hooks/useDeviceDetect';

export const QuestionScreen: React.FC = () => {
  const {
    currentQuestions,
    currentQuestionIndex,
    questionTimeRemaining,
    setQuestionTimeRemaining,
    recordAnswer,
    activeLevel,
    activeChapter,
    setCurrentScreen,
    language,
    setIsLanguageModalOpen,
    t,
  } = useGame();

  const { isLaptop, isMobile, isTablet, hapticFeedback } = useDeviceDetect();

  const currentQ: Question | undefined = currentQuestions[currentQuestionIndex];

  // TTS state
  const [isReadingPrompt, setIsReadingPrompt] = useState(false);

  // Scratchpad drawer
  const [showScratchpad, setShowScratchpad] = useState(false);
  const [scratchpadText, setScratchpadText] = useState('');

  // Hint state
  const [showHint, setShowHint] = useState(false);

  // Interactive Question State
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  // Match Question State
  const [matchSelectedLeft, setMatchSelectedLeft] = useState<string | null>(null);
  const [matchedPairs, setMatchedPairs] = useState<Record<string, string>>({}); // left -> right

  // Drag & Drop State
  const [dragCurrentOrder, setDragCurrentOrder] = useState<string[]>([]);

  // Memory Game State
  const [memoryFlipped, setMemoryFlipped] = useState<string[]>([]); // active flipped card ids
  const [memoryMatchedIds, setMemoryMatchedIds] = useState<string[]>([]); // solved card ids

  // Reset interactive states when question index changes
  useEffect(() => {
    setSelectedOption(null);
    setMatchSelectedLeft(null);
    setMatchedPairs({});
    setShowHint(false);
    setIsReadingPrompt(false);
    soundEngine.stopSpeech();

    if (currentQ?.type === 'drag_drop' && currentQ.dragItems) {
      // Shuffle drag items initially
      setDragCurrentOrder([...currentQ.dragItems].sort(() => Math.random() - 0.5));
    }

    if (currentQ?.type === 'memory') {
      setMemoryFlipped([]);
      setMemoryMatchedIds([]);
    }
  }, [currentQuestionIndex, currentQ]);

  // 60-Second Timer per question
  useEffect(() => {
    const timer = setInterval(() => {
      setQuestionTimeRemaining((prev) => {
        if (prev <= 1) {
          // Time expired for this question! Auto-record current state or wrong answer
          handleTimeout();
          return 60;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [currentQuestionIndex]);

  const handleTimeout = () => {
    // Record current selection or timeout mark
    if (currentQ?.type === 'drag_drop') {
      recordAnswer(dragCurrentOrder);
    } else if (currentQ?.type === 'match') {
      const isComplete =
        currentQ.matchPairs &&
        Object.keys(matchedPairs).length === currentQ.matchPairs.length;
      recordAnswer(isComplete ? 'matched_all' : 'timeout');
    } else if (currentQ?.type === 'memory') {
      const isAllMatched =
        currentQ.memoryCards &&
        memoryMatchedIds.length === currentQ.memoryCards.length;
      recordAnswer(isAllMatched ? 'all_matched' : 'timeout');
    } else {
      recordAnswer(selectedOption || 'timeout');
    }
  };

  if (!currentQ) {
    return (
      <div className="text-center py-20">
        <p className="text-slate-500">Preparing question session...</p>
      </div>
    );
  }

  // Audio Speech Reader with Regional Language Support
  const toggleSpeech = () => {
    if (isReadingPrompt) {
      soundEngine.stopSpeech();
      setIsReadingPrompt(false);
    } else {
      setIsReadingPrompt(true);
      const voiceLang = SUPPORTED_LANGUAGES[language]?.voiceLangCode || 'en-IN';
      soundEngine.speakText(currentQ.prompt, {
        lang: voiceLang,
        onEnd: () => setIsReadingPrompt(false),
      });
    }
  };

  // Submit Answer Handlers
  const handleStandardSubmit = (answer: string) => {
    hapticFeedback('light');
    setSelectedOption(answer);
    setTimeout(() => {
      recordAnswer(answer);
    }, 350);
  };

  // Keyboard Shortcuts for Laptops & Desktop Computers (keys 1-4, A-D, Space for audio, H for hint)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't intercept if user is typing in scratchpad textarea
      if (document.activeElement?.tagName === 'TEXTAREA' || document.activeElement?.tagName === 'INPUT') {
        return;
      }

      if (e.key === ' ' || e.code === 'Space') {
        e.preventDefault();
        toggleSpeech();
        return;
      }

      if (e.key.toLowerCase() === 'h') {
        setShowHint(true);
        return;
      }

      // Check MCQ/Options keys
      if (
        (currentQ?.type === 'mcq' ||
          currentQ?.type === 'true_false' ||
          currentQ?.type === 'image' ||
          currentQ?.type === 'problem_solving') &&
        currentQ.options &&
        currentQ.options.length > 0 &&
        !selectedOption
      ) {
        let optIndex = -1;
        if (e.key === '1') optIndex = 0;
        else if (e.key === '2') optIndex = 1;
        else if (e.key === '3') optIndex = 2;
        else if (e.key === '4') optIndex = 3;
        else if (e.key.toLowerCase() === 'a') optIndex = 0;
        else if (e.key.toLowerCase() === 'b') optIndex = 1;
        else if (e.key.toLowerCase() === 'c') optIndex = 2;
        else if (e.key.toLowerCase() === 'd') optIndex = 3;

        if (optIndex >= 0 && optIndex < currentQ.options.length) {
          e.preventDefault();
          handleStandardSubmit(currentQ.options[optIndex]);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentQ, selectedOption, isReadingPrompt]);

  // Match question click logic
  const handleMatchLeftClick = (leftText: string) => {
    soundEngine.playCardFlip();
    setMatchSelectedLeft(leftText);
  };

  const handleMatchRightClick = (rightText: string) => {
    if (!matchSelectedLeft || !currentQ.matchPairs) return;
    soundEngine.playCardFlip();

    // Check if this pair matches the actual key
    const targetPair = currentQ.matchPairs.find((p) => p.left === matchSelectedLeft);
    if (targetPair && targetPair.right === rightText) {
      soundEngine.playCorrect();
      const updated = { ...matchedPairs, [matchSelectedLeft]: rightText };
      setMatchedPairs(updated);
      setMatchSelectedLeft(null);

      // If all matched
      if (Object.keys(updated).length === currentQ.matchPairs.length) {
        setTimeout(() => {
          recordAnswer('matched_all');
        }, 600);
      }
    } else {
      soundEngine.playIncorrect();
      setMatchSelectedLeft(null);
    }
  };

  // Drag & Drop move logic
  const handleMoveDragItem = (fromIdx: number, toIdx: number) => {
    if (toIdx < 0 || toIdx >= dragCurrentOrder.length) return;
    soundEngine.playCardFlip();
    const copy = [...dragCurrentOrder];
    const item = copy.splice(fromIdx, 1)[0];
    copy.splice(toIdx, 0, item);
    setDragCurrentOrder(copy);
  };

  const handleDragSubmit = () => {
    recordAnswer(dragCurrentOrder);
  };

  // Memory Card Flip Logic
  const handleCardClick = (card: MemoryCard) => {
    if (memoryFlipped.includes(card.id) || memoryMatchedIds.includes(card.id)) return;
    if (memoryFlipped.length >= 2) return;

    soundEngine.playCardFlip();
    const newFlipped = [...memoryFlipped, card.id];
    setMemoryFlipped(newFlipped);

    if (newFlipped.length === 2) {
      const firstCard = currentQ.memoryCards?.find((c) => c.id === newFlipped[0]);
      const secondCard = card;

      if (firstCard && firstCard.matchId === secondCard.matchId) {
        // Matched!
        soundEngine.playCorrect();
        const updatedMatched = [...memoryMatchedIds, firstCard.id, secondCard.id];
        setMemoryMatchedIds(updatedMatched);
        setMemoryFlipped([]);

        // If all cards matched
        if (
          currentQ.memoryCards &&
          updatedMatched.length === currentQ.memoryCards.length
        ) {
          setTimeout(() => {
            recordAnswer('all_matched');
          }, 700);
        }
      } else {
        // Did not match -> unflip after delay
        soundEngine.playIncorrect();
        setTimeout(() => {
          setMemoryFlipped([]);
        }, 900);
      }
    }
  };

  const timerFraction = questionTimeRemaining / 60;
  const isTimeCritical = questionTimeRemaining <= 15;

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-fadeIn pb-16">
      {/* Top Header Bar: Question Counter & 60s Timer */}
      <div className="bg-white rounded-3xl border border-slate-200 p-4 sm:p-5 shadow-sm flex items-center justify-between gap-4">
        {/* Progress & Counter */}
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 truncate max-w-[220px] sm:max-w-xs">
              {activeChapter ? activeChapter.title : (activeLevel ? `Level ${activeLevel.id}` : 'Level Session')}
            </span>
            <span className="text-xs text-slate-300">·</span>
            <span className="text-xs font-bold text-slate-900 font-mono">
              {t.questionOf} {currentQ.questionNumber} / 25
            </span>
          </div>

          <div className="w-32 sm:w-48 bg-slate-100 h-2 rounded-full overflow-hidden mt-1.5">
            <div
              className="bg-blue-600 h-full rounded-full transition-all duration-300"
              style={{
                width: `${(currentQ.questionNumber / 25) * 100}%`,
              }}
            />
          </div>
        </div>

        {/* 60s Countdown Circular / Pill Timer */}
        <div
          className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full border transition-colors ${
            isTimeCritical
              ? 'bg-rose-50 border-rose-300 text-rose-700 animate-pulse'
              : 'bg-slate-50 border-slate-200 text-slate-700'
          }`}
        >
          <Timer
            className={`w-4 h-4 ${isTimeCritical ? 'text-rose-600' : 'text-slate-500'}`}
          />
          <span className="text-sm font-bold font-mono tabular-nums">
            {questionTimeRemaining}s
          </span>
          <span className="text-[11px] text-slate-400 hidden sm:inline">limit</span>
        </div>

        {/* Action icons: Language Switcher, Audio & Scratchpad */}
        <div className="flex items-center gap-2">
          {/* Quick Language Switcher Button (Child can switch language anytime mid-quiz) */}
          <button
            onClick={() => setIsLanguageModalOpen(true)}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 text-xs font-bold transition-all cursor-pointer shadow-2xs hover:scale-105"
            title={`Switch Question Language (Current: ${SUPPORTED_LANGUAGES[language]?.name})`}
          >
            <Globe className="w-4 h-4 text-indigo-600" />
            <span className="hidden sm:inline font-heading">{SUPPORTED_LANGUAGES[language]?.nativeName}</span>
          </button>

          <button
            onClick={toggleSpeech}
            className={`p-2 rounded-xl transition-colors cursor-pointer ${
              isReadingPrompt
                ? 'bg-amber-400 text-slate-950'
                : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100'
            }`}
            title="Read question out loud"
            aria-label="Read prompt aloud"
          >
            {isReadingPrompt ? (
              <VolumeX className="w-5 h-5" />
            ) : (
              <Volume2 className="w-5 h-5 text-blue-600" />
            )}
          </button>

          <button
            onClick={() => setShowScratchpad(!showScratchpad)}
            className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
            title="Open Scratchpad / Calculator"
            aria-label="Scratchpad"
          >
            <Edit3 className="w-5 h-5 text-indigo-600" />
          </button>
        </div>
      </div>

      {/* Question Prompt Card */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm">
        <div className="flex items-center justify-between mb-3 text-xs text-slate-400">
          <span className="font-semibold uppercase tracking-wider text-slate-500">
            {currentQ.topic}
          </span>
          <span className="font-mono">+{currentQ.points} Points</span>
        </div>

        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-heading leading-snug">
          {currentQ.prompt}
        </h2>

        {/* Optional Image for Image Questions */}
        {currentQ.imageUrl && (
          <div className="mt-5 rounded-2xl overflow-hidden border border-slate-200 max-h-64 sm:max-h-72 bg-slate-50 flex items-center justify-center">
            <img
              src={currentQ.imageUrl}
              alt="Visual Clue"
              referrerPolicy="no-referrer"
              className="w-full h-full object-contain"
            />
          </div>
        )}

        {/* Hint Box (if opened) */}
        {showHint && currentQ.hints && currentQ.hints.length > 0 && (
          <div className="mt-4 p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900 animate-fadeIn flex items-start gap-2.5">
            <Lightbulb className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold">Explorer Hint:</span> {currentQ.hints[0]}
            </div>
          </div>
        )}

        {!showHint && currentQ.hints && (
          <button
            onClick={() => setShowHint(true)}
            className="mt-3 text-xs font-semibold text-amber-600 hover:text-amber-700 flex items-center gap-1 cursor-pointer"
          >
            <Lightbulb className="w-3.5 h-3.5" />
            <span>Need a clue? Tap for hint</span>
          </button>
        )}
      </div>

      {/* Question Interaction Zone by Type */}

      {/* 1. MCQ / True-False / Image Question Options */}
      {(currentQ.type === 'mcq' ||
        currentQ.type === 'true_false' ||
        currentQ.type === 'image' ||
        currentQ.type === 'problem_solving') &&
        currentQ.options && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {currentQ.options.map((opt, idx) => {
              const isSelected = selectedOption === opt;

              return (
                <button
                  key={idx}
                  onClick={() => handleStandardSubmit(opt)}
                  className={`p-4 sm:p-5 rounded-2xl border-2 text-left font-bold text-sm sm:text-base transition-all transform active:scale-98 cursor-pointer flex items-center justify-between touch-press ${
                    isSelected
                      ? 'border-blue-600 bg-blue-50 text-blue-900 shadow-sm ring-2 ring-blue-500/20'
                      : 'border-slate-200 bg-white text-slate-800 hover:border-blue-300 hover:bg-slate-50 laptop-hover'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-xl bg-slate-100 text-slate-700 font-mono text-xs flex items-center justify-center font-bold border border-slate-200">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span className="leading-snug">{opt}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {isLaptop && (
                      <kbd className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-mono text-slate-400 bg-slate-100 rounded border border-slate-200">
                        {idx + 1}
                      </kbd>
                    )}
                    {isSelected && <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0" />}
                  </div>
                </button>
              );
            })}
          </div>
        )}

      {/* 2. Match the Following */}
      {currentQ.type === 'match' && currentQ.matchPairs && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
          <p className="text-xs text-slate-500 mb-4">
            Tap a card on the left, then tap its matching counterpart on the right to connect them!
          </p>

          <div className="grid grid-cols-2 gap-4">
            {/* Left Items */}
            <div className="space-y-2.5">
              <span className="text-xs font-bold uppercase text-slate-400 tracking-wider block mb-1">
                Item
              </span>
              {currentQ.matchPairs.map((pair) => {
                const isSelected = matchSelectedLeft === pair.left;
                const isMatched = !!matchedPairs[pair.left];

                return (
                  <button
                    key={pair.id}
                    disabled={isMatched}
                    onClick={() => handleMatchLeftClick(pair.left)}
                    className={`w-full p-3.5 rounded-2xl border-2 text-left text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                      isMatched
                        ? 'border-emerald-300 bg-emerald-50 text-emerald-800 opacity-80'
                        : isSelected
                        ? 'border-blue-600 bg-blue-50 text-blue-900 ring-2 ring-blue-500/20 shadow-sm'
                        : 'border-slate-200 bg-slate-50 hover:bg-white hover:border-slate-300'
                    }`}
                  >
                    <span>{pair.left}</span>
                    {isMatched && <CheckCircle2 className="w-4 h-4 text-emerald-600 float-right mt-0.5" />}
                  </button>
                );
              })}
            </div>

            {/* Right Items */}
            <div className="space-y-2.5">
              <span className="text-xs font-bold uppercase text-slate-400 tracking-wider block mb-1">
                Matching Partner
              </span>
              {currentQ.matchPairs.map((pair) => {
                const isMatched = Object.values(matchedPairs).includes(pair.right);

                return (
                  <button
                    key={pair.id}
                    disabled={isMatched}
                    onClick={() => handleMatchRightClick(pair.right)}
                    className={`w-full p-3.5 rounded-2xl border-2 text-left text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                      isMatched
                        ? 'border-emerald-300 bg-emerald-50 text-emerald-800 opacity-80'
                        : matchSelectedLeft
                        ? 'border-blue-300 bg-blue-50/50 hover:border-blue-500 hover:bg-blue-100'
                        : 'border-slate-200 bg-slate-50 hover:bg-white hover:border-slate-300'
                    }`}
                  >
                    <span>{pair.right}</span>
                    {isMatched && <CheckCircle2 className="w-4 h-4 text-emerald-600 float-right mt-0.5" />}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* 3. Drag & Drop Ordering */}
      {currentQ.type === 'drag_drop' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
          <p className="text-xs text-slate-500 mb-4">
            Arrange items into correct sequence from top (1st) to bottom. Use the arrow buttons to rearrange:
          </p>

          <div className="space-y-2.5 mb-6">
            {dragCurrentOrder.map((item, idx) => (
              <div
                key={item}
                className="p-3.5 rounded-2xl border-2 border-slate-200 bg-slate-50 flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-xl bg-blue-100 text-blue-700 font-bold font-mono text-xs flex items-center justify-center">
                    {idx + 1}
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-slate-800">{item}</span>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    disabled={idx === 0}
                    onClick={() => handleMoveDragItem(idx, idx - 1)}
                    className="p-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed text-xs font-bold text-slate-700"
                    title="Move Up"
                  >
                    ▲
                  </button>
                  <button
                    disabled={idx === dragCurrentOrder.length - 1}
                    onClick={() => handleMoveDragItem(idx, idx + 1)}
                    className="p-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed text-xs font-bold text-slate-700"
                    title="Move Down"
                  >
                    ▼
                  </button>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={handleDragSubmit}
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-sm transition-colors cursor-pointer flex items-center justify-center gap-2"
          >
            <span>Confirm Sequence</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* 4. Memory Card Flip Game */}
      {currentQ.type === 'memory' && currentQ.memoryCards && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <p className="text-xs text-slate-500">
              Tap cards to flip them over and discover the matching pairs!
            </p>
            <span className="text-xs font-mono font-bold text-blue-600">
              {memoryMatchedIds.length / 2} of {currentQ.memoryCards.length / 2} Pairs Found
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {currentQ.memoryCards.map((card) => {
              const isFlipped =
                memoryFlipped.includes(card.id) || memoryMatchedIds.includes(card.id);
              const isMatched = memoryMatchedIds.includes(card.id);

              return (
                <button
                  key={card.id}
                  onClick={() => handleCardClick(card)}
                  disabled={isMatched}
                  className={`h-28 rounded-2xl border-2 transition-all duration-300 flex flex-col items-center justify-center p-2 text-center cursor-pointer ${
                    isMatched
                      ? 'border-emerald-300 bg-emerald-50 text-emerald-900 opacity-90'
                      : isFlipped
                      ? 'border-indigo-500 bg-indigo-50 text-indigo-900 shadow-md transform rotate-0'
                      : 'border-amber-200 bg-gradient-to-br from-amber-50 to-amber-100 text-amber-800 hover:border-amber-300 shadow-2xs'
                  }`}
                >
                  {isFlipped ? (
                    <div>
                      {card.icon && <span className="text-2xl block mb-1">{card.icon}</span>}
                      <span className="text-xs font-bold leading-tight line-clamp-2">
                        {card.label}
                      </span>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-1">
                      <Sparkles className="w-5 h-5 text-amber-400" />
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-300">
                        Flip Me
                      </span>
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Scratchpad & Calculator Drawer (Toggleable) */}
      {showScratchpad && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xl animate-fadeIn">
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <Calculator className="w-4 h-4 text-indigo-600" />
              <h4 className="text-xs font-bold uppercase text-slate-800 tracking-wider">
                Explorer Scratchpad & Quick Math
              </h4>
            </div>
            <button
              onClick={() => setShowScratchpad(false)}
              className="text-slate-400 hover:text-slate-600"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <textarea
            value={scratchpadText}
            onChange={(e) => setScratchpadText(e.target.value)}
            placeholder="Type formulas, notes, rough work, or calculations here..."
            className="w-full h-24 p-3 rounded-xl border border-slate-200 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <div className="flex justify-between items-center mt-2">
            <span className="text-[11px] text-slate-400">Notes stay for this question</span>
            <button
              onClick={() => setScratchpadText('')}
              className="text-[11px] font-semibold text-rose-600 hover:underline"
            >
              Clear
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
