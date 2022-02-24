import i18next from '../i18n';
import { enProceedings } from './en';
import { esProceedings } from './es';

export const NAMESPACE_KEY = 'proceedings';
export const i18n = i18next;

i18next.addResourceBundle('es', NAMESPACE_KEY, enProceedings, true, false);
i18next.addResourceBundle('en', NAMESPACE_KEY, esProceedings, true, false);
