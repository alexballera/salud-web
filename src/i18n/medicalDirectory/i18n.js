import i18next from '../i18n';
import { enMedicalDirectory } from './en';
import { esMedicalDirectory } from './es';

export const NAMESPACE_KEY = 'medicalDirectory';
export const i18n = i18next;

i18next.addResourceBundle('es', NAMESPACE_KEY, esMedicalDirectory, true, false);
i18next.addResourceBundle('en', NAMESPACE_KEY, enMedicalDirectory, true, false);
