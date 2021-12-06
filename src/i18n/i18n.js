import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { enHome } from './home/en';
import { esHome } from './home/es';
import { enMenu } from './menu/en';
import { esMenu } from './menu/es';
import { enGlobals } from './globals/en';
import { esGlobals } from './globals/es';
import { enForms } from './forms/en';
import { esForms } from './forms/es';
import { enCode } from './code_validation/en';
import { esCode } from './code_validation/es';
import { enSubscriptions } from './subscriptions/en';
import { esSubscriptions } from './subscriptions/es';

const resources = {
  en: {
    globals: enGlobals,
    home: enHome,
    menu: enMenu,
    forms: enForms,
    code: enCode,
    subscriptions: enSubscriptions
  },
  es: {
    globals: esGlobals,
    home: esHome,
    menu: esMenu,
    forms: esForms,
    code: esCode,
    subscriptions: esSubscriptions
  }
};

const namespaces = ['globals', 'home', 'menu', 'forms', 'code', 'subscriptions'];

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
    interpolation: {
      escapeValue: false
    },
    ns: namespaces,
    debug: false
  });

export default i18n;