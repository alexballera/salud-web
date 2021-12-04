import i18next from '../i18n';
import { enForms } from './en';
import { esForms } from './es';

export const NAMESPACE_KEY = 'forms';
export const i18n = i18next;

i18next.addResourceBundle('es', NAMESPACE_KEY, esForms, true, false);
i18next.addResourceBundle('en', NAMESPACE_KEY, enForms, true, false);
