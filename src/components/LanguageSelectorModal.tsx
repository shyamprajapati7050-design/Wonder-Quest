import React from 'react';
import { AppLanguage } from '../types';
import { SUPPORTED_LANGUAGES } from '../data/languages';
import { useGlobalLanguage } from '../context/GlobalLanguageContext';
import { useGame } from '../context/GameContext';
import { soundEngine } from '../utils/audio';
import { Globe, Check, Volume2, X, Sparkles } from 'lucide-react';

interface LanguageSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LanguageSelectorModal: React.FC<LanguageSelectorModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { language, setLanguage } = useGlobalLanguage();
  const { activeChild } = useGame();

  if (!isOpen) return null;

  const handleSelectLanguage = (langCode: AppLanguage) => {
    soundEngine.playCardFlip();
    setLanguage(langCode);

    // Speak a celebratory greeting in the chosen language!
    const langMeta = SUPPORTED_LANGUAGES[langCode];
    if (langMeta) {
      setTimeout(() => {
        soundEngine.speakText(langMeta.greeting, {
          lang: langMeta.voiceLangCode,
          pitch: 1.15,
          rate: 0.95,
        });
      }, 150);
    }
    onClose();
  };

  const handlePreviewVoice = (e: React.MouseEvent, langCode: AppLanguage) => {
    e.stopPropagation();
    const langMeta = SUPPORTED_LANGUAGES[langCode];
    if (langMeta) {
      soundEngine.speakText(langMeta.greeting, {
        lang: langMeta.voiceLangCode,
        pitch: 1.15,
        rate: 0.95,
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fadeIn">
      <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl border border-slate-100 space-y-5 text-slate-800">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-indigo-500 to-purple-600 text-white flex items-center justify-center shadow-md">
              <Globe className="w-6 h-6 animate-spin-slow" />
            </div>
            <div>
              <h3 className="text-lg font-black text-slate-900 font-heading">
                Choose Language / भाषा चुनें
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                Switch anytime • जब चाहें तब बदलें
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-xs text-slate-600 bg-indigo-50/70 p-3 rounded-2xl border border-indigo-100/80 leading-relaxed">
          🧒 <strong>{activeChild.name}</strong> can learn in 5 Indian languages! Tap any language to switch questions, lessons, and mentor voice instantly.
        </p>

        {/* 5 Language Buttons Grid */}
        <div className="space-y-2.5">
          {(Object.values(SUPPORTED_LANGUAGES) as typeof SUPPORTED_LANGUAGES[AppLanguage][]).map((item) => {
            const isSelected = language === item.code;
            return (
              <div
                key={item.code}
                onClick={() => handleSelectLanguage(item.code)}
                className={`flex items-center justify-between p-3.5 rounded-2xl border-2 transition-all cursor-pointer ${
                  isSelected
                    ? 'border-indigo-600 bg-indigo-50/80 shadow-md ring-2 ring-indigo-500/20'
                    : 'border-slate-200 bg-white hover:border-indigo-300 hover:bg-slate-50 shadow-2xs'
                }`}
              >
                <div className="flex items-center gap-3.5">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm shadow-xs ${
                    isSelected ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-700'
                  }`}>
                    <span className="text-base select-none">{item.scriptLabel}</span>
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-extrabold text-sm sm:text-base text-slate-900 font-heading">
                        {item.nativeName}
                      </span>
                      <span className="text-xs text-slate-500">
                        ({item.name})
                      </span>
                      {isSelected && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-black bg-indigo-600 text-white px-2 py-0.5 rounded-full">
                          <Sparkles className="w-2.5 h-2.5" /> Active
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      "{item.greeting}"
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={(e) => handlePreviewVoice(e, item.code)}
                    title={`Hear pronunciation in ${item.name}`}
                    className="p-2 rounded-xl text-indigo-600 hover:bg-indigo-100 active:scale-95 transition"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>

                  <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                    isSelected ? 'bg-indigo-600 text-white' : 'border border-slate-300'
                  }`}>
                    {isSelected && <Check className="w-3.5 h-3.5" />}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <button
          onClick={onClose}
          className="w-full py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs shadow-md active:scale-98 transition"
        >
          Done • खेलें और सीखें
        </button>
      </div>
    </div>
  );
};
