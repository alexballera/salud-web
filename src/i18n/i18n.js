import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import esHome from './home/es.json';
import enHome from './home/en.json';
import esMenu from './menu/es.json';
import enMenu from './menu/en.json';
import esForms from './forms/es.json';
import enForms from './forms/en.json';
import esSubscriptions from './subscriptions/es.json';
import enSubscriptions from './subscriptions/en.json';

const resources = {
  en: {
    home: enHome,
    menu: enMenu,
    forms: enForms,
    subscriptions: enSubscriptions
  },
  es: {
    home: esHome,
    menu: esMenu,
    forms: esForms,
    subscriptions: esSubscriptions
  }
};

const namespaces = ['home', 'menu', 'forms', 'subscriptions'];

const DETECTION_OPTIONS = {
  order: ['localStorage', 'navigator'],
  caches: ['localStorage']
};

function navigatorLanguageDetector() {
  if (typeof window !== 'undefined') {
    const ln = window.navigator.language;
    const lang = {
      en: 'en',
      'en-US': 'en',
      es: 'es',
      'es-CR': 'es',
      default: 'es'
    };
    return lang[ln] || lang['default'];
  }
}

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    detection: DETECTION_OPTIONS,
    resources,
    lng: navigatorLanguageDetector(),
    fallbackLng: navigatorLanguageDetector(),
    keySeparator: true,
    interpolation: {
      escapeValue: false
    },
    ns: namespaces,
    debug: false
  });

export default i18n;
