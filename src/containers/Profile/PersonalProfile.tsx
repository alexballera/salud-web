import React, { useState } from 'react';

/// MATERIAL UI
import { Grid } from '@material-ui/core';
import styles from '../../styles/scss/PersonalProfile.module.scss';
/// MATERIAL UI END

/// i18n
import { useTranslation } from 'react-i18next';
import { NAMESPACE_KEY } from '../../i18n/forms/i18n';
/// i18n END

/// OWN COMPONENTS
import { SectionTitle } from './components/SectionTitle';
import { FieldTextData } from './components/FieldTextData';
import UpdatePersonalData from './components/UpdatePersonalData';
/// OWN COMPONENTS END

export const PersonalProfile = (): JSX.Element => {
  const { t } = useTranslation(NAMESPACE_KEY, { keyPrefix: 'forms' });
  const [showForm, setShowForm] = useState<boolean>(false);
  const onClickLink = () => {
    setShowForm(!showForm);
  };
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <SectionTitle
          title={t('personal_title')}
          linkText={t('label_edit')}
          onClickLink={onClickLink}
        />
      </Grid>
      <Grid item xs={12}>
        <FieldTextData title={t('label_birthdate')} data="23/07/1992" />
      </Grid>
      {!showForm && (
        <>
          <Grid item xs={12} className={styles.fadeIn}>
            <FieldTextData title={t('label_gender')} data="Femenino" />
          </Grid>
          <Grid item xs={12} className={styles.fadeIn}>
            <FieldTextData title={t('label_address')} data="San José, San José, Carmen" />
          </Grid>
        </>
      )}
      {showForm && (
        <Grid item xs={12} className={styles.fadeIn}>
          <UpdatePersonalData onClickLink={onClickLink} />
        </Grid>
      )}
    </Grid>
  );
};
