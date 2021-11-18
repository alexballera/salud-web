import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import en from './en.json';
import es from './es.json';
import esHome from './home/es.json';
import enHome from './home/en.json';

// the translations
// (tip move them in a JSON file and import them)
const resources = {
  en: {
    translation: en,
    home: enHome
  },
  es: {
    translation: es,
    home: esHome
  }
};

const namespaces = ['translation', 'home'];

const DETECTION_OPTIONS = {
  order: ['navigator']
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    detection: DETECTION_OPTIONS,
    resources,
    lng: 'es',
    fallbackLng: 'es',
    keySeparator: false, // we do not use keys in form messages.welcome
    interpolation: {
      escapeValue: false // react already safes from xss
    },
    ns: namespaces,
    debug: false
  });

export default i18n;
