import React, { useState } from 'react';

/// MATERIAL UI
import { Grid } from '@material-ui/core';
import styles from '../../styles/scss/PersonalProfile.module.scss';
/// MATERIAL UI END

/// i18n
import { useTranslation } from 'react-i18next';
import { NAMESPACE_KEY } from '../../i18n/globals/i18n';
/// i18n END

/// OWN COMPONENTS
import { SectionTitle } from './components/SectionTitle';
import { FieldTextData } from './components/FieldTextData';
import UpdatePersonalData from './components/UpdatePersonalData';
import { useGetGeneralDataQuery } from '@/src/services/apiBFF';
import { format } from 'date-fns';
/// OWN COMPONENTS END

export const PersonalProfile = (): JSX.Element => {
  const { t } = useTranslation(NAMESPACE_KEY);
  const [showForm, setShowForm] = useState<boolean>(false);
  const { data } = useGetGeneralDataQuery();

  const onClickLink = () => {
    setShowForm(!showForm);
  };
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <SectionTitle
          title={t('title.personal_data')}
          linkText={t('label.edit')}
          onClickLink={onClickLink}
        />
      </Grid>
      <Grid item xs={12}>
        {data && (
          <FieldTextData
            title={t('label.birthdate')}
            data={format(new Date(data?.birthDate), 'dd/MM/yyyy')}
          />
        )}
      </Grid>
      {!showForm && (
        <>
          <Grid item xs={12} className={styles.fadeIn}>
            <FieldTextData title={t('label.gender.gender')} data={data?.biologicSex} />
          </Grid>
          <Grid item xs={12} className={styles.fadeIn}>
            <FieldTextData title={t('label.address.address')} data={data?.address} />
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
