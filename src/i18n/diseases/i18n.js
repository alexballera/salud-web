import i18next from '../i18n';
import { enDiseases } from './en';
import { esDiseases } from './es';

export const NAMESPACE_KEY = 'diseases';
export const i18n = i18next;

i18next.addResourceBundle('es', NAMESPACE_KEY, esDiseases, true, false);
i18next.addResourceBundle('en', NAMESPACE_KEY, enDiseases, true, false);
