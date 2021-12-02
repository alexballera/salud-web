import React, { useState } from 'react';

/// MATERIAL UI
import { Grid, Typography } from '@material-ui/core';
/// MATERIAL UI END

/// i18n
import { useTranslation } from 'react-i18next';
import { NAMESPACE_KEY } from '../../i18n/forms/i18n';
/// i18n END

/// STYLES & TYPES
import ProfileStyles from './styles.module';
/// STYLES & TYPES END

/// OWN COMPONENTS
import { SectionTitle } from './components/SectionTitle';
import TermsAndConditions from '../../components/TermsAndConditions';
import InformedConsent from '../../components/InformedConsent';
import ModalCustom from '../../components/common/Modal';
/// OWN COMPONENTS END

export const LegalProfile = (): JSX.Element => {
  const { t } = useTranslation(NAMESPACE_KEY, { keyPrefix: 'forms' });
  const classes = ProfileStyles();
  const [termsAndConditionOpen, setTermsAndConditionOpen] = useState(false);
  const [informedConsentOpen, setInformedConsentOpen] = useState(false);
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <SectionTitle title={t('legal_title')} />
        </Grid>
        <Grid item xs={12}>
          <Typography onClick={() => setTermsAndConditionOpen(true)} className={classes.terms}>
            {t('label_term_text')}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography onClick={() => setInformedConsentOpen(true)} className={classes.terms}>
            {t('label_consent_text')}
          </Typography>
        </Grid>
      </Grid>
      <ModalCustom open={termsAndConditionOpen} onClose={() => setTermsAndConditionOpen(false)}>
        <TermsAndConditions />
      </ModalCustom>
      <ModalCustom open={informedConsentOpen} onClose={() => setInformedConsentOpen(false)}>
        <InformedConsent />
      </ModalCustom>
    </>
  );
};
