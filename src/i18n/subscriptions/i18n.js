import i18next from '../i18n';
import { enSubscriptions } from './en';
import { esSubscriptions } from './es';

export const NAMESPACE_KEY = 'subscriptions';
export const i18n = i18next;

i18next.addResourceBundle('es', NAMESPACE_KEY, esSubscriptions, true, false);
i18next.addResourceBundle('en', NAMESPACE_KEY, enSubscriptions, true, false);
