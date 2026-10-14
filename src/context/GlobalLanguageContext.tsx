import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { AppLanguage, LanguageOption } from '../types';
import { SUPPORTED_LANGUAGES, TRANSLATIONS, TranslationDictionary, getTranslation } from '../data/languages';
import { soundEngine } from '../utils/audio';

export interface GlobalLanguageContextType {
  // Current active language code
  language: AppLanguage;
  // Function to set language by code
  setLanguage: (lang: AppLanguage, speakGreeting?: boolean) => void;
  // Function to cycle to next language
  toggleLanguage: () => void;
  // List of all supported languages
  availableLanguages: LanguageOption[];
  // Current language metadata (name, flag, native name, etc.)
  currentLanguageMeta: LanguageOption;
  // Strongly-typed translations dictionary for current language
  t: TranslationDictionary;
  // Helper to get string with optional fallback
  translate: (key: keyof TranslationDictionary, fallback?: string) => string;
  // Language selection modal state
  isLanguageModalOpen: boolean;
  setIsLanguageModalOpen: (open: boolean) => void;
  // Pronounce text in the active language
  speakInLanguage: (text: string, options?: { pitch?: number; rate?: number; onEnd?: () => void }) => void;
}

const GlobalLanguageContext = createContext<GlobalLanguageContextType | null>(null);

const STORAGE_KEY = 'wq_global_language';
const LANGUAGE_CODES: AppLanguage[] = ['en', 'hi', 'te', 'kn', 'ml'];

export const GlobalLanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Read persisted language from localStorage or default to English
  const [language, setLanguageState] = useState<AppLanguage>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem(STORAGE_KEY) || localStorage.getItem('wq_language');
        if (saved && LANGUAGE_CODES.includes(saved as AppLanguage)) {
          return saved as AppLanguage;
        }
      } catch {}
    }
    return 'en';
  });

  const [isLanguageModalOpen, setIsLanguageModalOpen] = useState<boolean>(false);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, language);
      localStorage.setItem('wq_language', language);
    } catch {}
  }, [language]);

  // Set language with optional audio greeting feedback
  const setLanguage = useCallback((newLang: AppLanguage, speakGreeting: boolean = false) => {
    if (!LANGUAGE_CODES.includes(newLang)) return;
    setLanguageState(newLang);

    if (speakGreeting) {
      soundEngine.playCardFlip();
      const meta = SUPPORTED_LANGUAGES[newLang];
      if (meta) {
        setTimeout(() => {
          soundEngine.speakText(meta.greeting, {
            lang: meta.voiceLangCode,
            pitch: 1.15,
            rate: 0.95,
          });
        }, 120);
      }
    }
  }, []);

  // Cycle through languages in order: en -> hi -> te -> kn -> ml -> en
  const toggleLanguage = useCallback(() => {
    setLanguageState((prev) => {
      const idx = LANGUAGE_CODES.indexOf(prev);
      const nextIdx = (idx + 1) % LANGUAGE_CODES.length;
      const nextLang = LANGUAGE_CODES[nextIdx];
      const meta = SUPPORTED_LANGUAGES[nextLang];
      if (meta) {
        soundEngine.speakText(meta.greeting, {
          lang: meta.voiceLangCode,
          pitch: 1.15,
          rate: 0.95,
        });
      }
      return nextLang;
    });
  }, []);

  // Current language metadata & translations
  const currentLanguageMeta = useMemo(() => {
    return SUPPORTED_LANGUAGES[language] || SUPPORTED_LANGUAGES.en;
  }, [language]);

  const t = useMemo(() => {
    return getTranslation(language);
  }, [language]);

  const translate = useCallback(
    (key: keyof TranslationDictionary, fallback?: string): string => {
      const dict = TRANSLATIONS[language] || TRANSLATIONS.en;
      return dict[key] || fallback || TRANSLATIONS.en[key] || String(key);
    },
    [language]
  );

  const availableLanguages = useMemo(() => {
    return Object.values(SUPPORTED_LANGUAGES);
  }, []);

  // Text-to-Speech in the selected language
  const speakInLanguage = useCallback(
    (text: string, options?: { pitch?: number; rate?: number; onEnd?: () => void }) => {
      soundEngine.speakText(text, {
        lang: currentLanguageMeta.voiceLangCode,
        pitch: options?.pitch ?? 1.1,
        rate: options?.rate ?? 0.95,
        onEnd: options?.onEnd,
      });
    },
    [currentLanguageMeta.voiceLangCode]
  );

  const contextValue = useMemo<GlobalLanguageContextType>(
    () => ({
      language,
      setLanguage,
      toggleLanguage,
      availableLanguages,
      currentLanguageMeta,
      t,
      translate,
      isLanguageModalOpen,
      setIsLanguageModalOpen,
      speakInLanguage,
    }),
    [
      language,
      setLanguage,
      toggleLanguage,
      availableLanguages,
      currentLanguageMeta,
      t,
      translate,
      isLanguageModalOpen,
      speakInLanguage,
    ]
  );

  return (
    <GlobalLanguageContext.Provider value={contextValue}>
      {children}
    </GlobalLanguageContext.Provider>
  );
};

// Hook to access global language state
export const useGlobalLanguage = (): GlobalLanguageContextType => {
  const context = useContext(GlobalLanguageContext);
  if (!context) {
    throw new Error('useGlobalLanguage must be used within a GlobalLanguageProvider');
  }
  return context;
};

// Aliases for convenience
export const useLanguage = useGlobalLanguage;
export const useTranslation = () => {
  const { t, translate, language, currentLanguageMeta } = useGlobalLanguage();
  return { t, translate, language, currentLanguageMeta };
};
