import i18next from '../i18n';
import { enGeneralData } from './en';
import { esGeneralData } from './es';

export const NAMESPACE_KEY = 'generalData';
export const i18n = i18next;

i18next.addResourceBundle('en', NAMESPACE_KEY, enGeneralData, true, false);
i18next.addResourceBundle('es', NAMESPACE_KEY, esGeneralData, true, false);
