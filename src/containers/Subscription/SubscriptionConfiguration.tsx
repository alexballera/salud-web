import React from 'react';
/// i18n
import { useTranslation } from 'react-i18next';
import { NAMESPACE_KEY } from '../../i18n/subscriptions/i18n';
/// i18n END

const SubscriptionConfiguration = (): JSX.Element => {
  const { t } = useTranslation(NAMESPACE_KEY, { keyPrefix: 'subscriptions' });
  return <h1>Configuraciones</h1>;
};

export default SubscriptionConfiguration;
