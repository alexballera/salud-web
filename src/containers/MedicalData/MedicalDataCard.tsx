import React, { useState } from 'react';

/// MATERIAL UI
import { Card, Box, Typography, Grid } from '@material-ui/core';
import MedicalStyles from './styles.module';
/// MATERIAL UI END

/// i18n
import { useTranslation } from 'react-i18next';
import { NAMESPACE_KEY as i18nProfile } from '../../i18n/profile/i18n';
import { IMedicalData } from '../../services/getMedicalData.service';
import { calculate_age } from '../../utils/helpers';
/// i18n END

type IProps = {
  generalData: IMedicalData;
};

export const MedicalDataCard = ({ generalData }: IProps): JSX.Element => {
  const { t } = useTranslation(i18nProfile);
  const classes = MedicalStyles();
  const { birthDate, address, civilStatus, biologicSex, weight, height, pronoun, ocupation } =
    generalData;
  const heightSplitted = height.toString().split('');
  return (
    <Box className={classes.root}>
      <Card className={classes.cardContainer}>
        <Grid container justify="space-between" className={classes.containerData}>
          <Typography variant="body2" className={classes.title}>
            {t('medicalData.age', { ns: i18nProfile })}
          </Typography>
          <Typography variant="body2" className={classes.textValue}>
            {calculate_age(birthDate)}
          </Typography>
        </Grid>
        <Grid container justify="space-between" className={classes.containerData}>
          <Typography variant="body2" className={classes.title}>
            {t('medicalData.height', { ns: i18nProfile })}
          </Typography>
          <Typography variant="body2" className={classes.textValue}>
            {heightSplitted[0] + '.' + heightSplitted[1] + heightSplitted[2] + 'm'}
          </Typography>
        </Grid>
        <Grid container justify="space-between" className={classes.containerData}>
          <Typography variant="body2" className={classes.title}>
            {t('medicalData.weight', { ns: i18nProfile })}
          </Typography>
          <Typography variant="body2" className={classes.textValue}>
            {weight + 'kg'}
          </Typography>
        </Grid>
        <Grid container justify="space-between" className={classes.containerData}>
          <Typography variant="body2" className={classes.title}>
            {t('medicalData.biologicSex', { ns: i18nProfile })}
          </Typography>
          <Typography variant="body2" className={classes.textValue}>
            {biologicSex}
          </Typography>
        </Grid>
        <Grid container justify="space-between" className={classes.containerData}>
          <Typography variant="body2" className={classes.title}>
            {t('medicalData.pronoun', { ns: i18nProfile })}
          </Typography>
          <Typography variant="body2" className={classes.textValue}>
            {pronoun}
          </Typography>
        </Grid>
        <Grid container justify="space-between" className={classes.containerData}>
          <Typography variant="body2" className={classes.title}>
            {t('medicalData.civilStatus', { ns: i18nProfile })}
          </Typography>
          <Typography variant="body2" className={classes.textValue}>
            {civilStatus}
          </Typography>
        </Grid>
        <Grid container justify="space-between" className={classes.containerData}>
          <Typography variant="body2" className={classes.title}>
            {t('medicalData.ocupation', { ns: i18nProfile })}
          </Typography>
          <Typography variant="body2" className={classes.textValue}>
            {ocupation}
          </Typography>
        </Grid>
        <Grid
          container
          justify="space-between"
          className={classes.containerData}
          style={{ border: 'none' }}
        >
          <Typography variant="body2" className={classes.title}>
            {t('medicalData.address', { ns: i18nProfile })}
          </Typography>
          <Typography variant="body2" className={classes.textValue}>
            {address}
          </Typography>
        </Grid>
      </Card>
    </Box>
  );
};
