import React, { useState } from 'react';
import { Grid, Modal, Typography } from '@material-ui/core';
import { SectionTitle } from './components/SectionTitle';
import TermsAndConditions from '../../components/TermsAndConditions';
import InformedConsent from '../../components/InformedConsent';
import ProfileStyles from './styles.module';

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
      <Modal open={termsAndConditionOpen} onClose={() => setTermsAndConditionOpen(false)}>
        <TermsAndConditions />
      </Modal>
      <Modal open={informedConsentOpen} onClose={() => setInformedConsentOpen(false)}>
        <InformedConsent />
      </Modal>
    </>
  );
};
