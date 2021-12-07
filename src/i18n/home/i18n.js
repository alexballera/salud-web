import i18next from '../i18n';
import { enHome } from './en';
import { esHome } from './es';

export const NAMESPACE_KEY = 'home';
export const i18n = i18next;

i18next.addResourceBundle('es', NAMESPACE_KEY, esHome, true, false);
i18next.addResourceBundle('en', NAMESPACE_KEY, enHome, true, false);
