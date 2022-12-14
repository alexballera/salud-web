import React from 'react';

/// CONTEXT
import { withAppContext } from '../../context';
/// CONTEXT END

/// i18n
import { useTranslation } from 'react-i18next';
import { NAMESPACE_KEY as i18nGlobals } from '../../i18n/globals/i18n';
/// i18n END

/// SERVICES
import api from '../../api/api';
/// SERVICES END

/// OWN COMPONENTS
import SvgBanner from '../../components/common/Svg/SvgBanner.component';
import ForwardEmailComponent from '../../components/common/ForwardEmailComponent';
/// OWN COMPONENTS END

/// STYLES & TYPES
import { IProps } from '../../types/recover.types';
/// STYLES & TYPES END

function EmailVaidationPage({ handleLoading }: IProps): JSX.Element {
  const { t } = useTranslation(i18nGlobals);

  const forwardEmail = () => {
    handleLoading(true);
    api
      .emailVerification()
      .then()
      .catch(err => console.log(err))
      .finally(() => handleLoading && handleLoading(false));
  };

  return (
    <ForwardEmailComponent
      title={t('title.forward_email', { ns: i18nGlobals })}
      description={t('description.email_verification', { ns: i18nGlobals })}
      imageMobile={<SvgBanner />}
      imageDesktop={<SvgBanner device="desktop" />}
      timerTitle={t('forward_email.messages.dont_recive', { ns: i18nGlobals })}
      timerLabel={t('forward_email.messages.resend_label', { ns: i18nGlobals })}
      handleClickForwardEmail={forwardEmail}
      showTimer
    />
  );
}

export default withAppContext(EmailVaidationPage);
