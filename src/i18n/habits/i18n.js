import i18next from '../i18n';
import { enHabits } from './en';
import { esHabits } from './es';

export const NAMESPACE_KEY = 'habits';
export const i18n = i18next;

i18next.addResourceBundle('es', NAMESPACE_KEY, esHabits, true, false);
i18next.addResourceBundle('en', NAMESPACE_KEY, enHabits, true, false);
