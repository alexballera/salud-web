import i18next from '../i18n';
import { enClinicHistory } from './en';
import { esClinicHistory } from './es';

export const NAMESPACE_KEY = 'clinicHistory';
export const i18n = i18next;

i18next.addResourceBundle('es', NAMESPACE_KEY, esClinicHistory, true, false);
i18next.addResourceBundle('en', NAMESPACE_KEY, enClinicHistory, true, false);
