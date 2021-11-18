import i18next from '../i18n';
import en from './en.json';
import es from './es.json';

export const NAMESPACE_KEY = 'menu';
export const i18n = i18next;

i18next.addResourceBundle('es', NAMESPACE_KEY, es, true, false);
i18next.addResourceBundle('en', NAMESPACE_KEY, en, true, false);
