import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

import es from './locales/es.json';
import en from './locales/en.json';

// ==========================================
// LANGUAGE CHANGE
// ==========================================

i18n.on('languageChanged', (language) => {
  document.documentElement.lang = language.split('-')[0] ?? 'en';
});

// ==========================================
// I18N CONFIGURATION
// ==========================================

void i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      es: { translation: es },
      en: { translation: en },
    },

    supportedLngs: ['es', 'en'],

    fallbackLng: 'en',

    load: 'languageOnly',

    initAsync: false,

    detection: {
      order: ['localStorage', 'navigator'],

      lookupLocalStorage: 'phishguard-extension-language',

      caches: ['localStorage'],
    },

    interpolation: {
      escapeValue: false,
    },

    react: {
      useSuspense: false,
    },
  });

export default i18n;
