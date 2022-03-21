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
import { enProceedings } from './proceedings/en';
import { esProceedings } from './proceedings/es';
import { enClinicHistory } from './clinic_history/en';
import { esClinicHistory } from './clinic_history/es';
import { enAllergies } from './allergies/en';
import { esAllergies } from './allergies/es';
import { enDiseases } from './diseases/en';
import { esDiseases } from './diseases/es';
import { enExamResult } from './exam_result/en';
import { esExamResult } from './exam_result/es';
import { enHabits } from './habits/en';
import { esHabits } from './habits/es';

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
    generalData: enGeneralData,
    habits: enHabits,
    proceedings: enProceedings,
    clinic_history: enClinicHistory,
    allergies: enAllergies,
    diseases: enDiseases,
    exam_result: enExamResult
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
    generalData: esGeneralData,
    habits: esHabits,
    proceedings: esProceedings,
    clinic_history: esClinicHistory,
    allergies: esAllergies,
    diseases: esDiseases,
    exam_result: esExamResult
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

if (typeof window !== 'undefined') {
  const i18nextLng = localStorage.getItem('i18nextLng');
  if (i18nextLng !== 'es' && i18nextLng !== 'enUS') {
    i18n.changeLanguage('es');
  }
}

export default i18n;
