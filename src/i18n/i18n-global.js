import i18next from 'i18next';
import en from './en.json';
import es from './es.json';

export const NAMESPACE_KEY = '';

i18next.addResourceBundle('en', NAMESPACE_KEY, en, true, true);
i18next.addResourceBundle('es', NAMESPACE_KEY, es, true, true);
