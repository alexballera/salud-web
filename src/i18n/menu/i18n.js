import i18next from '../i18n';
import { enMenu } from './en';
import { esMenu } from './es';

export const NAMESPACE_KEY = 'menu';
export const i18n = i18next;

i18next.addResourceBundle('es', NAMESPACE_KEY, esMenu, true, false);
i18next.addResourceBundle('en', NAMESPACE_KEY, enMenu, true, false);
