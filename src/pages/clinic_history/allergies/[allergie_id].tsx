import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

/// SLICE SERVICE
import { useGetAllergiesQuery } from '../../../services/apiBFF';
/// SLICE SERVICE END

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

type TAllergie = {
  description: string;
  isActive: boolean;
  comments: string;
  performer: string;
  specialization: string;
};

const initialState = {
  description: '',
  isActive: null,
  comments: '',
  performer: '',
  specialization: ''
};

const AllergieDetail = (): JSX.Element => {
  const classes = allergieStyles();
  const { t } = useTranslation(i18Allergies);

  const router = useRouter();
  const { allergie_id: id } = router.query;

  const [allergie, setAllergie] = useState<TAllergie>(initialState);
  const { data, isLoading } = useGetAllergiesQuery();

  useEffect(() => {
    if (data) {
      const result = data.allergies.find(allergie => allergie.description === id);
      setAllergie(result);
    }
  }, [isLoading]);

  return (
    <>
      {data && (
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
      )}
    </>
  );
};

export default AllergieDetail;
