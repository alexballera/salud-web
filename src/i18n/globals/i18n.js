import i18next from '../i18n';
import { enGlobals } from './en';
import { esGlobals } from './es';

export const NAMESPACE_KEY = 'globals';
export const i18n = i18next;

i18next.addResourceBundle('es', NAMESPACE_KEY, esGlobals, true, false);
i18next.addResourceBundle('en', NAMESPACE_KEY, enGlobals, true, false);
