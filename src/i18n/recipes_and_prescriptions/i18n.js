import i18next from '../i18n';
import { enRecipesAndPrescriptions } from './en';
import { esRecipesAndPrescriptions } from './es';

export const NAMESPACE_KEY = 'recipes-and-prescriptions';
export const i18n = i18next;

i18next.addResourceBundle('es', NAMESPACE_KEY, esRecipesAndPrescriptions, true, false);
i18next.addResourceBundle('en', NAMESPACE_KEY, enRecipesAndPrescriptions, true, false);
