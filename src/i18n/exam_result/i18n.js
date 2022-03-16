import i18next from '../i18n';
import { esExamResult } from './es';
import { enExamResult } from './en';

export const NAMESPACE_KEY = 'exam_result';
export const i18n = i18next;

i18next.addResourceBundle('es', NAMESPACE_KEY, esExamResult, true, false);
i18next.addResourceBundle('en', NAMESPACE_KEY, enExamResult, true, false);
