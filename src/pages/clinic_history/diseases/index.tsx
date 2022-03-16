/// BASE IMPORTS
import React, { useState } from 'react';
/// BASE IMPORTS

/// i18n
import { useTranslation } from 'react-i18next';
import { NAMESPACE_KEY as i18Diseases } from '@/src/i18n/diseases/i18n';
/// i18n END

/// MATERIAL UI
import { Box, Tab, Tabs, Typography, Card, Divider, Grid } from '@material-ui/core';
/// MATERIAL UI END

/// STYLES
import diseasesStyles from './styles.module';
/// STYLES END

type TDiseases = {
  name: string;
  status: boolean;
  demographic: number;
};

type TProps = {
  diseases: TDiseases[];
};

const Diseases = ({ diseases }: TProps): JSX.Element => {
  const classes = diseasesStyles();
  const { t } = useTranslation(i18Diseases);

  const [demographic, setDemographic] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setDemographic(newValue);
  };

  return (
    <>
      <Box>
        <Tabs
          variant="fullWidth"
          textColor="secondary"
          value={demographic}
          onChange={handleChange}
          className={classes.shadow}
        >
          <Tab label={t('tabs.adulthood', { ns: i18Diseases })} className={classes.typography14} />
          <Tab label={t('tabs.childhood', { ns: i18Diseases })} className={classes.typography14} />
        </Tabs>

        <Box role="tabpanel" m={3}>
          <Typography paragraph className={classes.typography14}>
            {demographic === 0
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
            {!diseases.filter(filter => filter.demographic === demographic).length && (
              <Box my={3} ml={2}>
                <Typography paragraph className={classes.typography14}>
                  {t('content.unregistered', { ns: i18Diseases })}
                </Typography>
              </Box>
            )}
            {diseases
              .filter(filter => filter.demographic === demographic)
              .map((disease, index) => (
                <Box my={2.5} ml={2} key={index}>
                  <Grid container>
                    <Grid item xs={8}>
                      <Typography paragraph className={classes.typography16}>
                        {disease.name}
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
              ))}
          </Card>
        </Box>
      </Box>
    </>
  );
};

Diseases.getInitialProps = async () => {
  const diseases: TDiseases[] = [
    {
      name: 'Asma intrínseca',
      status: true,
      demographic: 0
    },
    {
      name: 'Diabetes',
      status: true,
      demographic: 0
    },
    {
      name: 'Asma intrínseca',
      status: true,
      demographic: 1
    },
    {
      name: 'Varicela',
      status: true,
      demographic: 1
    },
    {
      name: 'Sarampión',
      status: true,
      demographic: 1
    }
  ];
  return {
    diseases
  };
};

export default Diseases;
