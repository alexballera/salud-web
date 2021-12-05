import React from 'react';

/// CONTEXT
import { withAppContext } from '../../context';
import LayoutBasic from '../../layouts/LayoutBasic';
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
import UpdateActions from './components/UpdateActions';
import UpdateContent from './components/UpdateContent';
import UpdateHeader from './components/UpdateHeader';
/// OWN COMPONENTS END

/// STYLES & TYPES
/// STYLES & TYPES END

/// FORM STATES & VALIDATIONS
/// FORM STATES & VALIDATIONS END

const UpdateEmail = (): JSX.Element => {
  const { t } = useTranslation(NAMESPACE_KEY);
  return (
    <LayoutBasic
      contentDivider
      header={
        <UpdateHeader
          title={t('label.email.new')}
          description={t('label.email.change_description')}
        />
      }
      content={<UpdateContent label={t('label.email.actual')} data="mmorales@gmail.com" />}
      form={<UpdateActions />}
    />
  );
};

export default withAppContext(UpdateEmail);
