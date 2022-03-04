import React from 'react';

/// MATERIAL UI
import { Box, Typography, Card, Divider, Chip, Container, Grid } from '@material-ui/core';
/// MATERIAL UI END

/// STYLES & TYPES
import allergieStyles from './styles.module';
/// STYLES & TYPES END

/// i18n
import { useTranslation } from 'react-i18next';
import { NAMESPACE_KEY as i18Allergies } from '@/src/i18n/allergies/i18n';
/// i18n END

/// TYPES
import type { NextPageContext } from 'next/';

type TAllergie = {
  name: string;
  isActive: boolean;
  description: string;
  comments: string;
  performer: string;
  specialization: string;
};

type TProps = {
  allergie: TAllergie;
};
/// TYPES END

const AllergieDetail = ({ allergie }: TProps): JSX.Element => {
  const classes = allergieStyles();
  const { t } = useTranslation(i18Allergies);

  return (
    <Container>
      <Box mt={3} mb={2}>
        <Typography paragraph className={classes.typography16}>
          {t('allergies', { ns: i18Allergies })}
        </Typography>
      </Box>
      <Card className={classes.cardAllergie}>
        <Box m={2}>
          <Grid container>
            <Grid item xs={12}>
              <Chip
                label={
                  allergie.isActive
                    ? t('active', { ns: i18Allergies })
                    : t('inactive', { ns: i18Allergies })
                }
                className={[
                  classes.chipStatus,
                  allergie.isActive ? classes.chipActive : classes.chipInative
                ].join(' ')}
              />
              <Box mt={2} mb={2}>
                <Typography variant="body2" className={classes.colorTitle}>
                  {t('detail.allergen', { ns: i18Allergies })}
                </Typography>
                <Grid item xs={12}>
                  Gluten
                </Grid>
              </Box>
            </Grid>

            <Grid item xs={12}>
              <Divider />
            </Grid>
            <Grid item xs={12} className={classes.spacingRow}>
              <Typography variant="body2" className={classes.colorTitle}>
                {t('detail.doctor', { ns: i18Allergies })}
              </Typography>
              <Grid item xs={12}>
                {allergie.performer}
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Divider />
            </Grid>
            <Grid item xs={12} className={classes.spacingRow}>
              <Typography variant="body2" className={classes.colorTitle}>
                {t('detail.specialty', { ns: i18Allergies })}
              </Typography>
              <Grid item xs={12}>
                {allergie.specialization}
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Divider />
            </Grid>
            <Grid item xs={12} className={classes.spacingRow}>
              <Typography variant="body2" className={classes.colorTitle}>
                {t('detail.description', { ns: i18Allergies })}
              </Typography>
              <Grid item xs={12}>
                {allergie.description}
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Divider />
            </Grid>
            <Grid item xs={12} className={classes.spacingRow}>
              <Typography variant="body2" className={classes.colorTitle}>
                {t('detail.comments', { ns: i18Allergies })}
              </Typography>
              <Grid item xs={12}>
                {allergie.comments}
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Card>
    </Container>
  );
};

AllergieDetail.getInitialProps = async ({ query }: NextPageContext) => {
  // eslint-disable-next-line camelcase
  const { allergie_id } = query;
  const allergies: TAllergie[] = [
    {
      name: 'Penicilina',
      isActive: true,
      description: 'Se presenta hipersensibilidad a la benactizina después de las últimas semanas.',
      comments:
        'Reacción alérgica al paciente se visualiza en forma ronchas y enrojecimiento en la piel',
      performer: 'Dr. Lorem Ipsum',
      specialization: 'Allergologist'
    },
    {
      name: 'Celiaquía',
      isActive: false,
      description: 'Se presenta hipersensibilidad a la benactizina después de las últimas semanas.',
      comments: 'Alergia al polvo, a la humedad, al frío',
      performer: 'Dr. Lorem Ipsum',
      specialization: 'Allergologist'
    },
    {
      name: 'Aleve',
      isActive: true,
      description: 'Se presenta hipersensibilidad a la benactizina después de las últimas semanas.',
      comments: 'Alergia al polvo, a la humedad, al frío',
      performer: 'Dr. Lorem Ipsum',
      specialization: 'Allergologist'
    }
  ];

  // eslint-disable-next-line camelcase
  const allergie = allergies.find(allergie => allergie.name === allergie_id);

  return {
    allergie
  };
};

export default AllergieDetail;
