import i18next from '../i18n';
import { enAllergies } from './en';
import { esAllergies } from './es';

export const NAMESPACE_KEY = 'allergies';
export const i18n = i18next;

i18next.addResourceBundle('es', NAMESPACE_KEY, esAllergies, true, false);
i18next.addResourceBundle('en', NAMESPACE_KEY, enAllergies, true, false);
