import i18next from '../i18n';
import en from './en';
import es from './es';

export const NAMESPACE_KEY = 'globals';
export const i18n = i18next;

i18next.addResourceBundle('es', NAMESPACE_KEY, es, true, false);
i18next.addResourceBundle('en', NAMESPACE_KEY, en, true, false);
