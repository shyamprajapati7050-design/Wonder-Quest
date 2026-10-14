import React, { useState } from 'react';
import { useGame } from '../context/GameContext';
import { Shield, Lock, X, Check, KeyRound } from 'lucide-react';

export const ParentPinModal: React.FC = () => {
  const {
    showPinModal,
    setShowPinModal,
    verifyParentPin,
    pinSuccessCallback,
    parentSettings,
  } = useGame();

  const [enteredPin, setEnteredPin] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  if (!showPinModal) return null;

  const handleDigit = (digit: string) => {
    if (enteredPin.length < 4) {
      const next = enteredPin + digit;
      setEnteredPin(next);
      setError(null);
      if (next.length === 4) {
        verifyAndSubmit(next);
      }
    }
  };

  const handleBackspace = () => {
    setEnteredPin((prev) => prev.slice(0, -1));
    setError(null);
  };

  const verifyAndSubmit = (pinToCheck: string) => {
    if (verifyParentPin(pinToCheck)) {
      setShowPinModal(false);
      setEnteredPin('');
      setError(null);
      if (pinSuccessCallback) {
        pinSuccessCallback();
      }
    } else {
      setError('Incorrect Parent PIN. Please try again.');
      setEnteredPin('');
    }
  };

  const closeModal = () => {
    setShowPinModal(false);
    setEnteredPin('');
    setError(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-slate-200 text-center relative">
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 p-1 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="w-14 h-14 bg-indigo-50 border border-indigo-100 text-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm">
          <Shield className="w-7 h-7" />
        </div>

        <h3 className="text-xl font-bold text-slate-900 font-heading">Parent & Guardian Gate</h3>
        <p className="text-xs text-slate-500 mt-1 mb-5">
          Enter your 4-digit PIN to access parent analytics, screen time limits, and admin settings.
        </p>

        {/* PIN Dots */}
        <div className="flex items-center justify-center gap-3 mb-6">
          {[0, 1, 2, 3].map((idx) => {
            const isFilled = enteredPin.length > idx;
            return (
              <div
                key={idx}
                className={`w-4 h-4 rounded-full transition-all duration-200 ${
                  isFilled
                    ? 'bg-indigo-600 scale-110 shadow-sm'
                    : 'bg-slate-200 border border-slate-300'
                }`}
              />
            );
          })}
        </div>

        {error && (
          <p className="text-xs font-semibold text-rose-600 mb-4 animate-shake">
            {error}
          </p>
        )}

        {/* Keypad */}
        <div className="grid grid-cols-3 gap-2.5 max-w-[240px] mx-auto mb-4">
          {['1', '2', '3', '4', '5', '6', '7', '8', '9', 'C', '0', '⌫'].map((val) => {
            if (val === 'C') {
              return (
                <button
                  key={val}
                  onClick={() => setEnteredPin('')}
                  className="h-12 rounded-xl text-xs font-bold text-slate-500 hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  Clear
                </button>
              );
            }
            if (val === '⌫') {
              return (
                <button
                  key={val}
                  onClick={handleBackspace}
                  className="h-12 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  ⌫
                </button>
              );
            }
            return (
              <button
                key={val}
                onClick={() => handleDigit(val)}
                className="h-12 rounded-xl text-lg font-bold text-slate-800 bg-slate-50 hover:bg-indigo-50 hover:text-indigo-600 border border-slate-200 transition-colors cursor-pointer"
              >
                {val}
              </button>
            );
          })}
        </div>

        <div className="text-[11px] text-slate-400 bg-slate-50 py-1.5 px-3 rounded-lg border border-slate-100 inline-block">
          Default PIN is <span className="font-mono font-bold text-slate-700">{parentSettings.parentPin}</span>
        </div>
      </div>
    </div>
  );
};
