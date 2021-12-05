import React from 'react';

/// CONTEXT
import { withAppContext } from '../../context';
import LayoutBasic from '../../layouts/LayoutBasic';
import UpdateActions from './components/UpdateActions';
import UpdateContent from './components/UpdateContent';
import UpdateHeader from './components/UpdateHeader';
/// CONTEXT END

/// i18n
import { useTranslation } from 'react-i18next';
import { NAMESPACE_KEY } from '../../i18n/globals/i18n';
/// i18n END

/// MATERIAL - UI
/// MATERIAL - UI END

/// SERVICES
/// SERVICES END

/// OWN COMPONENTS
/// OWN COMPONENTS END

/// STYLES & TYPES
/// STYLES & TYPES END

/// FORM STATES & VALIDATIONS
/// FORM STATES & VALIDATIONS END

const UpdatePhone = (): JSX.Element => {
  const { t } = useTranslation(NAMESPACE_KEY);
  return (
    <LayoutBasic
      contentDivider
      header={
        <UpdateHeader title={t('phone.change')} description={t('phone.change_description')} />
      }
      content={<UpdateContent label={t('actual')} data="(+506) 8888-8888" />}
      form={<UpdateActions />}
    />
  );
};

export default withAppContext(UpdatePhone);
