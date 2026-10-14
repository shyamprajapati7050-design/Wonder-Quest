import React, { useState, useEffect } from 'react';
import { useGame } from '../context/GameContext';
import { soundEngine } from '../utils/audio';
import { Question } from '../types';
import {
  Timer,
  Trophy,
  Volume2,
  VolumeX,
  CheckCircle2,
  ArrowRight,
  Shield,
  Sparkles,
} from 'lucide-react';

export const MasterTestScreen: React.FC = () => {
  const {
    activeMasterTest,
    currentQuestions,
    currentQuestionIndex,
    questionTimeRemaining,
    setQuestionTimeRemaining,
    recordMasterTestAnswer,
    setCurrentScreen,
  } = useGame();

  const currentQ: Question | undefined = currentQuestions[currentQuestionIndex];
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isReadingPrompt, setIsReadingPrompt] = useState(false);

  // Match Question State
  const [matchSelectedLeft, setMatchSelectedLeft] = useState<string | null>(null);
  const [matchedPairs, setMatchedPairs] = useState<Record<string, string>>({});

  // Drag & drop
  const [dragCurrentOrder, setDragCurrentOrder] = useState<string[]>([]);

  useEffect(() => {
    setSelectedOption(null);
    setMatchSelectedLeft(null);
    setMatchedPairs({});
    setIsReadingPrompt(false);
    soundEngine.stopSpeech();

    if (currentQ?.type === 'drag_drop' && currentQ.dragItems) {
      setDragCurrentOrder([...currentQ.dragItems].sort(() => Math.random() - 0.5));
    }
  }, [currentQuestionIndex, currentQ]);

  // 60-Second Timer
  useEffect(() => {
    const timer = setInterval(() => {
      setQuestionTimeRemaining((prev) => {
        if (prev <= 1) {
          handleTimeout();
          return 60;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [currentQuestionIndex]);

  const handleTimeout = () => {
    if (currentQ?.type === 'drag_drop') {
      recordMasterTestAnswer(dragCurrentOrder);
    } else if (currentQ?.type === 'match') {
      const isComplete =
        currentQ.matchPairs &&
        Object.keys(matchedPairs).length === currentQ.matchPairs.length;
      recordMasterTestAnswer(isComplete ? 'matched_all' : 'timeout');
    } else {
      recordMasterTestAnswer(selectedOption || 'timeout');
    }
  };

  if (!currentQ || !activeMasterTest) {
    return (
      <div className="text-center py-20">
        <p className="text-slate-500">Preparing Master Test arena...</p>
      </div>
    );
  }

  const toggleSpeech = () => {
    if (isReadingPrompt) {
      soundEngine.stopSpeech();
      setIsReadingPrompt(false);
    } else {
      setIsReadingPrompt(true);
      soundEngine.speakText(currentQ.prompt, () => {
        setIsReadingPrompt(false);
      });
    }
  };

  const handleSelectOption = (opt: string) => {
    setSelectedOption(opt);
    setTimeout(() => {
      recordMasterTestAnswer(opt);
    }, 350);
  };

  const handleMatchLeft = (leftText: string) => {
    soundEngine.playCardFlip();
    setMatchSelectedLeft(leftText);
  };

  const handleMatchRight = (rightText: string) => {
    if (!matchSelectedLeft || !currentQ.matchPairs) return;
    soundEngine.playCardFlip();

    const targetPair = currentQ.matchPairs.find((p) => p.left === matchSelectedLeft);
    if (targetPair && targetPair.right === rightText) {
      soundEngine.playCorrect();
      const updated = { ...matchedPairs, [matchSelectedLeft]: rightText };
      setMatchedPairs(updated);
      setMatchSelectedLeft(null);

      if (Object.keys(updated).length === currentQ.matchPairs.length) {
        setTimeout(() => {
          recordMasterTestAnswer('matched_all');
        }, 600);
      }
    } else {
      soundEngine.playIncorrect();
      setMatchSelectedLeft(null);
    }
  };

  const handleMoveDrag = (fromIdx: number, toIdx: number) => {
    if (toIdx < 0 || toIdx >= dragCurrentOrder.length) return;
    soundEngine.playCardFlip();
    const copy = [...dragCurrentOrder];
    const item = copy.splice(fromIdx, 1)[0];
    copy.splice(toIdx, 0, item);
    setDragCurrentOrder(copy);
  };

  const isTimeCritical = questionTimeRemaining <= 15;

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-fadeIn pb-16">
      {/* High-Stakes Master Test Top Banner */}
      <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 rounded-3xl p-5 text-white shadow-lg flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center">
            <Trophy className="w-5 h-5 text-white" />
          </div>
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-amber-100 block">
              Level {activeMasterTest.milestoneLevel} Milestone Test
            </span>
            <h1 className="text-base font-bold font-heading text-white">
              Question {currentQ.questionNumber} of 15 (Passing: 12/15)
            </h1>
          </div>
        </div>

        {/* 60s Countdown Timer */}
        <div
          className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full border ${
            isTimeCritical
              ? 'bg-rose-600 text-white border-white animate-pulse'
              : 'bg-white/20 backdrop-blur-md border-white/30 text-white'
          }`}
        >
          <Timer className="w-4 h-4" />
          <span className="text-sm font-bold font-mono tabular-nums">
            {questionTimeRemaining}s
          </span>
        </div>
      </div>

      {/* Question Prompt Card */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm">
        <div className="flex items-center justify-between mb-3 text-xs text-slate-400">
          <span className="font-semibold uppercase tracking-wider text-amber-700">
            {currentQ.topic}
          </span>
          <button
            onClick={toggleSpeech}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
            title="Read aloud"
          >
            {isReadingPrompt ? (
              <VolumeX className="w-4 h-4 text-amber-600" />
            ) : (
              <Volume2 className="w-4 h-4 text-blue-600" />
            )}
          </button>
        </div>

        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-heading leading-snug">
          {currentQ.prompt}
        </h2>

        {currentQ.imageUrl && (
          <div className="mt-5 rounded-2xl overflow-hidden border border-slate-200 max-h-60 bg-slate-50 flex items-center justify-center">
            <img
              src={currentQ.imageUrl}
              alt="Clue"
              referrerPolicy="no-referrer"
              className="w-full h-full object-contain"
            />
          </div>
        )}
      </div>

      {/* Answer Options */}
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
                  onClick={() => handleSelectOption(opt)}
                  className={`p-5 rounded-2xl border-2 text-left font-bold text-sm sm:text-base transition-all transform active:scale-98 cursor-pointer flex items-center justify-between ${
                    isSelected
                      ? 'border-amber-500 bg-amber-50 text-amber-950 shadow-sm ring-2 ring-amber-400/20'
                      : 'border-slate-200 bg-white text-slate-800 hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-xl bg-slate-100 text-slate-600 font-mono text-xs flex items-center justify-center font-bold">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span>{opt}</span>
                  </div>
                  {isSelected && <CheckCircle2 className="w-5 h-5 text-amber-600" />}
                </button>
              );
            })}
          </div>
        )}

      {/* Match Type */}
      {currentQ.type === 'match' && currentQ.matchPairs && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
          <p className="text-xs text-slate-500 mb-4">
            Connect each item on the left to its matching partner on the right:
          </p>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2.5">
              {currentQ.matchPairs.map((pair) => (
                <button
                  key={pair.id}
                  disabled={!!matchedPairs[pair.left]}
                  onClick={() => handleMatchLeft(pair.left)}
                  className={`w-full p-3.5 rounded-2xl border-2 text-left text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                    matchedPairs[pair.left]
                      ? 'border-emerald-300 bg-emerald-50 text-emerald-800 opacity-80'
                      : matchSelectedLeft === pair.left
                      ? 'border-amber-500 bg-amber-50 text-amber-900 ring-2 ring-amber-400/20 shadow-sm'
                      : 'border-slate-200 bg-slate-50 hover:bg-white'
                  }`}
                >
                  {pair.left}
                </button>
              ))}
            </div>

            <div className="space-y-2.5">
              {currentQ.matchPairs.map((pair) => {
                const isMatched = Object.values(matchedPairs).includes(pair.right);
                return (
                  <button
                    key={pair.id}
                    disabled={isMatched}
                    onClick={() => handleMatchRight(pair.right)}
                    className={`w-full p-3.5 rounded-2xl border-2 text-left text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                      isMatched
                        ? 'border-emerald-300 bg-emerald-50 text-emerald-800 opacity-80'
                        : matchSelectedLeft
                        ? 'border-amber-300 bg-amber-50/50 hover:border-amber-500 hover:bg-amber-100'
                        : 'border-slate-200 bg-slate-50 hover:bg-white'
                    }`}
                  >
                    {pair.right}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Drag & Drop */}
      {currentQ.type === 'drag_drop' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
          <p className="text-xs text-slate-500 mb-4">
            Arrange in proper order from smallest to largest:
          </p>
          <div className="space-y-2.5 mb-6">
            {dragCurrentOrder.map((item, idx) => (
              <div
                key={item}
                className="p-3.5 rounded-2xl border-2 border-slate-200 bg-slate-50 flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-xl bg-amber-100 text-amber-800 font-bold font-mono text-xs flex items-center justify-center">
                    {idx + 1}
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-slate-800">{item}</span>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    disabled={idx === 0}
                    onClick={() => handleMoveDrag(idx, idx - 1)}
                    className="p-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-100 disabled:opacity-30 text-xs font-bold"
                  >
                    ▲
                  </button>
                  <button
                    disabled={idx === dragCurrentOrder.length - 1}
                    onClick={() => handleMoveDrag(idx, idx + 1)}
                    className="p-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-100 disabled:opacity-30 text-xs font-bold"
                  >
                    ▼
                  </button>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={() => recordMasterTestAnswer(dragCurrentOrder)}
            className="w-full py-3 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs rounded-xl shadow-sm transition-colors cursor-pointer"
          >
            Confirm Sequence
          </button>
        </div>
      )}
    </div>
  );
};
