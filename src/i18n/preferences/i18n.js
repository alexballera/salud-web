import i18next from '../i18n';
import { enPreferences } from './en';
import { esPreferences } from './es';

export const NAMESPACE_KEY = 'preferences';
export const i18n = i18next;

i18next.addResourceBundle('es', NAMESPACE_KEY, esPreferences, true, false);
i18next.addResourceBundle('en', NAMESPACE_KEY, enPreferences, true, false);
