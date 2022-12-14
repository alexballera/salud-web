import React, { useEffect, useState } from 'react';
import { Box, Tab, Tabs, Typography, Card, Divider, Grid } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

import { NAMESPACE_KEY as i18Diseases } from '@/src/i18n/diseases/i18n';
import diseasesStyles from './styles.module';
import { useGetDiseasesQuery } from '../../../services/apiBFF';

const Diseases = (): JSX.Element => {
  const classes = diseasesStyles();
  const { t } = useTranslation(i18Diseases);
  const [demographic, setDemographic] = useState('adulthood');
  const [dataDiseases, setDataDiseases] = useState([]);
  const { data, isLoading } = useGetDiseasesQuery();

  useEffect(() => {
    if (data && demographic === 'adulthood') {
      setDataDiseases(data.adulthood);
    }
  }, [isLoading]);

  const handleChange = (event: React.SyntheticEvent, newValue) => {
    setDemographic(newValue);
    setDataDiseases(data[newValue]);
  };

  return (
    <>
      <Grid container>
        <Grid item xs={12}>
          <Box>
            <Tabs
              variant="fullWidth"
              textColor="secondary"
              value={demographic}
              onChange={handleChange}
              className={classes.shadow}
            >
              <Tab
                value="adulthood"
                label={t('tabs.adulthood', { ns: i18Diseases })}
                className={classes.typography14}
              />
              <Tab
                value="childhood"
                label={t('tabs.childhood', { ns: i18Diseases })}
                className={classes.typography14}
              />
            </Tabs>
          </Box>
        </Grid>
      </Grid>
      <Grid container className={classes.mainGrid}>
        <Grid item xs={12}>
          <Box role="tabpanel" m={3}>
            <Typography paragraph className={classes.typography14}>
              {demographic === 'adulthood'
                ? t('content.adulthood_description', { ns: i18Diseases })
                : t('content.childhood_description', { ns: i18Diseases })}
            </Typography>
            <Card className={classes.cardDiseases}>
              <Box mt={2} ml={2}>
                <Typography paragraph color="secondary" className={classes.typography16}>
                  {t('content.diseases', { ns: i18Diseases })}
                </Typography>
              </Box>
              <Divider />
              {dataDiseases && dataDiseases.length === 0 && (
                <Box my={3} ml={2}>
                  <Typography paragraph className={classes.typography14}>
                    {t('content.unregistered', { ns: i18Diseases })}
                  </Typography>
                </Box>
              )}

              {dataDiseases &&
                dataDiseases.map((disease, index) => (
                  <Box my={2.5} ml={2} key={index}>
                    <Grid container>
                      <Grid item xs={8}>
                        <Typography paragraph className={classes.typography16}>
                          {disease}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Box>
                ))}
            </Card>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default Diseases;
