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
import { NAMESPACE_KEY } from '../../i18n/globals/i18n';
/// i18n END

export const CredentialsProfile = (): JSX.Element => {
  const { t } = useTranslation(NAMESPACE_KEY);
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <SectionTitle title={t('title.credential_profile')} />
      </Grid>
      <Grid item xs={12}>
        <FieldTextData
          title={t('label.phone.phone')}
          data="(+506) 8888-8888"
          text={t('label.change')}
          href="/update/phone"
        />
      </Grid>
      <Grid item xs={12}>
        <FieldTextData
          title={t('label.email.email')}
          data="mmorales@gmail.com"
          text={t('label.change')}
          href="/update/email"
        />
      </Grid>
      <Grid item xs={12}>
        <FieldTextData
          title={t('label.password.password')}
          data="••••••••••"
          text={t('label.change')}
          href="/update/password"
        />
      </Grid>
    </Grid>
  );
};
