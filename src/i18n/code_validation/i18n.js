import i18next from '../i18n';
import { enCode } from './en';
import { esCode } from './es';

export const NAMESPACE_KEY = 'code';
export const i18n = i18next;

i18next.addResourceBundle('es', NAMESPACE_KEY, esCode, true, false);
i18next.addResourceBundle('en', NAMESPACE_KEY, enCode, true, false);
