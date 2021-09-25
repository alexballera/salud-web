import React, { useState } from 'react';

/// MATERIAL UI
import { Grid, Typography } from '@material-ui/core';
/// MATERIAL UI END

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
  const classes = ProfileStyles();
  const [termsAndConditionOpen, setTermsAndConditionOpen] = useState(false);
  const [informedConsentOpen, setInformedConsentOpen] = useState(false);
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <SectionTitle title="Legal" />
        </Grid>
        <Grid item xs={12}>
          <Typography onClick={() => setTermsAndConditionOpen(true)} className={classes.terms}>
            Términos y condiciones
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography onClick={() => setInformedConsentOpen(true)} className={classes.terms}>
            Consentimiento informado
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
