import React, { useState } from 'react';
import { useGame } from '../context/GameContext';
import { ALL_BUDDIES, getStudyBuddy } from '../data/buddiesData';
import { BuddyAvatar } from './BuddyAvatar';
import { soundEngine } from '../utils/audio';
import { StudyBuddy } from '../types';
import {
  X,
  Volume2,
  VolumeX,
  Check,
  Sparkles,
  Heart,
  Star,
  Award,
} from 'lucide-react';

interface BuddySelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectBuddy?: (buddyId: string) => void;
}

export const BuddySelectorModal: React.FC<BuddySelectorModalProps> = ({
  isOpen,
  onClose,
  onSelectBuddy,
}) => {
  const { activeBuddyId, setActiveBuddyId, activeChild } = useGame();
  const [selectedId, setSelectedId] = useState<string>(activeBuddyId || 'owl_pip');
  const [previewSpeakingId, setPreviewSpeakingId] = useState<string | null>(null);

  if (!isOpen) return null;

  const currentBuddy = getStudyBuddy(selectedId);

  const handleTestVoice = (buddy: StudyBuddy) => {
    if (previewSpeakingId === buddy.id) {
      soundEngine.stopSpeech();
      setPreviewSpeakingId(null);
      return;
    }

    soundEngine.playBuddyChime();
    setPreviewSpeakingId(buddy.id);
    soundEngine.speakText(
      `Hi ${activeChild.name}! I am ${buddy.name}. ${buddy.catchphrase}`,
      {
        pitch: buddy.voiceConfig.pitch,
        rate: buddy.voiceConfig.rate,
        onEnd: () => setPreviewSpeakingId(null),
      }
    );
  };

  const handleConfirmChoice = (buddyId: string) => {
    soundEngine.stopSpeech();
    setPreviewSpeakingId(null);
    soundEngine.playCorrect();
    setActiveBuddyId(buddyId);
    if (onSelectBuddy) {
      onSelectBuddy(buddyId);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh] animate-scaleUp">
        {/* Header */}
        <div className="px-6 py-5 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center backdrop-blur-xs">
              <Sparkles className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <h2 className="text-xl font-bold font-heading">Choose Your Study Buddy</h2>
              <p className="text-xs text-blue-100">
                Your virtual animated mentor gives encouraging audio hints and celebrates your progress!
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              soundEngine.stopSpeech();
              onClose();
            }}
            className="p-2 text-white/80 hover:text-white hover:bg-white/20 rounded-full transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6">
          {/* Active Highlight Card */}
          <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-indigo-50/80 via-white to-purple-50/60 border border-indigo-100 flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
            <div className="relative">
              <BuddyAvatar
                buddyId={currentBuddy.id}
                size="lg"
                animationState={previewSpeakingId === currentBuddy.id ? 'speaking' : 'waving'}
              />
            </div>

            <div className="flex-1 text-center sm:text-left">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-1">
                <h3 className="text-lg font-bold text-slate-900 font-heading">
                  {currentBuddy.name}
                </h3>
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-indigo-100 text-indigo-800">
                  {currentBuddy.title}
                </span>
              </div>

              <p className="text-xs text-slate-600 mb-2 italic">
                "{currentBuddy.catchphrase}"
              </p>

              {/* Strengths */}
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-1.5 mb-3">
                {currentBuddy.strengths.map((str, idx) => (
                  <span
                    key={idx}
                    className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-700"
                  >
                    ✦ {str}
                  </span>
                ))}
              </div>

              {/* Hear Voice Button */}
              <button
                onClick={() => handleTestVoice(currentBuddy)}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-bold bg-indigo-100 text-indigo-700 hover:bg-indigo-200 transition-colors cursor-pointer"
              >
                {previewSpeakingId === currentBuddy.id ? (
                  <>
                    <VolumeX className="w-3.5 h-3.5" />
                    <span>Pause Voice Sample</span>
                  </>
                ) : (
                  <>
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>Hear {currentBuddy.name}'s Voice</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* All Buddy Cards Grid */}
          <div>
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
              Select Your Learning Mentor
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {ALL_BUDDIES.map((buddy) => {
                const isSelected = selectedId === buddy.id;
                const isCurrentActive = activeBuddyId === buddy.id;
                const isPreviewSpeaking = previewSpeakingId === buddy.id;

                return (
                  <div
                    key={buddy.id}
                    onClick={() => setSelectedId(buddy.id)}
                    className={`p-4 rounded-2xl border-2 transition-all cursor-pointer relative flex flex-col justify-between ${
                      isSelected
                        ? 'border-indigo-600 bg-indigo-50/40 shadow-sm'
                        : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/50'
                    }`}
                  >
                    {isCurrentActive && (
                      <span className="absolute top-2.5 right-2.5 flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                        <Check className="w-3 h-3" />
                        <span>Active</span>
                      </span>
                    )}

                    <div className="flex items-center gap-3 mb-3">
                      <BuddyAvatar
                        buddyId={buddy.id}
                        size="md"
                        animationState={isPreviewSpeaking ? 'speaking' : isSelected ? 'waving' : 'idle'}
                      />

                      <div className="min-w-0">
                        <h4 className="text-sm font-bold text-slate-900 font-heading truncate">
                          {buddy.name}
                        </h4>
                        <p className="text-[11px] text-slate-500 truncate">{buddy.species}</p>
                        <p className="text-[10px] font-medium text-indigo-600 truncate">{buddy.title}</p>
                      </div>
                    </div>

                    <p className="text-xs text-slate-600 line-clamp-2 mb-3">
                      {buddy.personality}
                    </p>

                    <div className="flex items-center justify-between pt-2 border-t border-slate-100 gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleTestVoice(buddy);
                        }}
                        className="p-1.5 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors cursor-pointer"
                        title={`Listen to ${buddy.name}`}
                      >
                        {isPreviewSpeaking ? (
                          <VolumeX className="w-4 h-4 text-amber-600" />
                        ) : (
                          <Volume2 className="w-4 h-4" />
                        )}
                      </button>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleConfirmChoice(buddy.id);
                        }}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                          isCurrentActive
                            ? 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                            : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs'
                        }`}
                      >
                        {isCurrentActive ? 'Selected' : `Choose ${buddy.name}`}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <span className="text-xs text-slate-500">
            Current Mentor: <strong className="text-slate-800">{getStudyBuddy(activeBuddyId).name}</strong>
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                soundEngine.stopSpeech();
                onClose();
              }}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={() => handleConfirmChoice(selectedId)}
              className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-md transition-all cursor-pointer flex items-center gap-1.5"
            >
              <Check className="w-4 h-4" />
              <span>Confirm & Keep Learning</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
