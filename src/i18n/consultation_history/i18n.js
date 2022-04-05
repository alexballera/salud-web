import i18next from '../i18n';
import { esConsultationHistory } from './es';
import { enConsultationHistory } from './en';

export const NAMESPACE_KEY = 'consultation_history';
export const i18n = i18next;

i18next.addResourceBundle('es', NAMESPACE_KEY, esConsultationHistory, true, false);
i18next.addResourceBundle('en', NAMESPACE_KEY, enConsultationHistory, true, false);
