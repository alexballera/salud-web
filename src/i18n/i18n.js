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
import { enPreferences } from './preferences/en';
import { esPreferences } from './preferences/es';
import { esRecipesAndPrescriptions } from './recipes_and_prescriptions/es';
import { enRecipesAndPrescriptions } from './recipes_and_prescriptions/en';
import { enProfile } from './profile/en';
import { esProfile } from './profile/es';
import { enGeneralData } from './generalData/en';
import { esGeneralData } from './generalData/es';

const resources = {
  enUS: {
    globals: enGlobals,
    home: enHome,
    menu: enMenu,
    forms: enForms,
    code: enCode,
    subscriptions: enSubscriptions,
    preferences: enPreferences,
    recipesAndPrescriptions: enRecipesAndPrescriptions,
    profile: enProfile,
    generalData: enGeneralData
  },
  es: {
    globals: esGlobals,
    home: esHome,
    menu: esMenu,
    forms: esForms,
    code: esCode,
    subscriptions: esSubscriptions,
    preferences: esPreferences,
    recipesAndPrescriptions: esRecipesAndPrescriptions,
    profile: esProfile,
    generalData: esGeneralData
  }
};

const namespaces = [
  'globals',
  'home',
  'menu',
  'forms',
  'code',
  'subscriptions',
  'preferences',
  'recipes-and-prescriptions',
  'profile',
  'generalData'
];

const DETECTION_OPTIONS = {
  order: ['localStorage', 'navigator'],
  caches: ['localStorage']
};

function navigatorLanguageDetector() {
  if (typeof window !== 'undefined') {
    const ln = window.navigator.language;
    const lang = {
      en: 'enUS',
      'en-US': 'enUS',
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
    fallbackLng: navigatorLanguageDetector(),
    interpolation: {
      escapeValue: false
    },
    ns: namespaces,
    debug: false
  });

export default i18n;
