import React from 'react';
import { useTranslation } from 'react-i18next';

import { withAppContext } from '../../context';
import { NAMESPACE_KEY } from '../../i18n/globals/i18n';
import LayoutInner from '../../layouts/LayoutInner';
/// OWN COMPONENTS END

function MainPage(): JSX.Element {
  const { t } = useTranslation(NAMESPACE_KEY);
  return (
    <LayoutInner>
      <h1>{t('welcome')}</h1>
    </LayoutInner>
  );
}
export default withAppContext(MainPage);
