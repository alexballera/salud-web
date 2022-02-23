import i18next from '../i18n';
import { enProfile } from './en';
import { esProfile } from './es';

export const NAMESPACE_KEY = 'profile';
export const i18n = i18next;

i18next.addResourceBundle('es', NAMESPACE_KEY, enProfile, true, false);
i18next.addResourceBundle('en', NAMESPACE_KEY, esProfile, true, false);
