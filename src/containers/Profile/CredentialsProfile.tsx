import React from 'react';

/// MATERIAL UI
import { Grid } from '@material-ui/core';
/// MATERIAL UI END

/// OWN COMPONENTS
import { SectionTitle } from './components/SectionTitle';
import { FieldTextData } from './components/FieldTextData';
/// OWN COMPONENTS END

/// i18n
import { useTranslation } from 'react-i18next';
import { NAMESPACE_KEY } from '../../i18n/forms/i18n';
/// i18n END

export const CredentialsProfile = (): JSX.Element => {
  const { t } = useTranslation(NAMESPACE_KEY, { keyPrefix: 'forms' });
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <SectionTitle title={t('credential_profile_title')} />
      </Grid>
      <Grid item xs={12}>
        <FieldTextData
          title={t('label_phone')}
          data="(+506) 8888-8888"
          text={t('label_change')}
          href="/update/phone"
        />
      </Grid>
      <Grid item xs={12}>
        <FieldTextData
          title={t('label_email')}
          data="mmorales@gmail.com"
          text={t('label_change')}
          href="/update/email"
        />
      </Grid>
      <Grid item xs={12}>
        <FieldTextData
          title={t('label_password')}
          data="••••••••••"
          text={t('label_change')}
          href="/update/password"
        />
      </Grid>
    </Grid>
  );
};
