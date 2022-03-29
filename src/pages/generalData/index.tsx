import React, { useState } from 'react';
import { useTranslation, withTranslation } from 'react-i18next';
import { Box, Grid, Tab, Tabs, Typography } from '@material-ui/core';

import { NAMESPACE_KEY as i18Forms } from '../../i18n/forms/i18n';
import { NAMESPACE_KEY as i18nGeneralData } from '../../i18n/generalData/i18n';
import { withAppContext } from '../../context';
import TabContent from '../../containers/GeneralData/TabContent';
import generalDataStyles from './styles.module';
import {
  getDataFromLocalStorage,
  removeDataFromLocalStorage
} from '@/src/services/localStorage.service';
import MeasurementGraphic from '@/src/components/common/Graphics/Measurement';

function GeneralDataPage(): JSX.Element {
  const classes = generalDataStyles();
  const { t } = useTranslation([i18nGeneralData, i18Forms]);
  const [tab, setTab] = useState<number>(parseInt(getDataFromLocalStorage('cardSelected')) || 0);
  removeDataFromLocalStorage('cardSelected');

  const handleChange = (event, newValue) => {
    setTab(newValue);
  };

  const items = [
    {
      label: t('tabs.pressure', { ns: i18nGeneralData })
    },
    {
      label: t('tabs.weight', { ns: i18nGeneralData })
    },
    {
      label: t('tabs.bloodGlucose', { ns: i18nGeneralData })
    }
  ];

  return (
    <>
      <Tabs
        className={classes.shadow}
        value={tab}
        indicatorColor="secondary"
        textColor="secondary"
        variant="fullWidth"
        onChange={handleChange}
        aria-label="tabs-general-data"
      >
        {items.map((item, i) => (
          // eslint-disable-next-line react/jsx-key
          <Tab key={i} label={item.label} onClick={() => setTab(i)} />
        ))}
      </Tabs>
      <Grid container className={classes.mainGrid}>
        <Grid item xs={12}>
          <Box role="tabpanel" m={3}>
            <TabContent tab={tab} />
            <Box mt={3} mb={1}>
              <Typography variant="body2" className={classes.typography16}>
                Gráfico de presión
              </Typography>
            </Box>
            <MeasurementGraphic />
          </Box>
        </Grid>
      </Grid>
    </>
  );
}

export default withTranslation([i18nGeneralData, i18Forms])(withAppContext(GeneralDataPage));
