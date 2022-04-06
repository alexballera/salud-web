/// BASE IMPORTS
import { useEffect, useState } from 'react';
import { useTranslation, withTranslation } from 'react-i18next';
/// BASE IMPORTS END

/// MATERIAL UI
import { Box, Grid, Tab, Tabs, Typography } from '@material-ui/core';
/// MATERIAL UI - END

import { NAMESPACE_KEY as i18Forms } from '../../i18n/forms/i18n';
import { NAMESPACE_KEY as i18nGeneralData } from '../../i18n/generalData/i18n';
/// i18n END

/// OWN COMPONENTS
import { withAppContext } from '../../context';
import TabContent from '../../containers/GeneralData/TabContent';
import MeasurementGraphic from '@/src/components/common/Graphics/Measurement';
/// OWN COMPONENTS END

/// STYLES & TYPES
import generalDataStyles from './styles.module';
import type { IMeasurement } from '@/src/services/getMeasurementsData.service';
/// STYLES & TYPES END

/// SERVICES
import { getDataFromLocalStorage } from '@/src/services/localStorage.service';
import { useGetMeasurementsQuery } from '@/src/services/apiBFF';
import { CircularProgress } from '@mui/material';
/// SERVICES END

function GeneralDataPage(): JSX.Element {
  const classes = generalDataStyles();
  const { t } = useTranslation([i18nGeneralData, i18Forms]);
  const [tab, setTab] = useState<number>(parseInt(getDataFromLocalStorage('cardSelected')) || 0);
  const [measurement, setMeasurement] = useState<IMeasurement>(null);
  const [seleted, setSeleted] = useState<number>(0);
  const { data, isLoading } = useGetMeasurementsQuery('1');

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

  useEffect(() => {
    if (data) {
      let measurement;
      switch (tab) {
        case 0:
          measurement = data.records.find(x => x.type === 'arterialPressure');
          break;
        case 1:
          measurement = data.records.find(x => x.type === 'weight');
          break;
        case 2:
          measurement = data.records.find(x => x.type === 'bloodGlocuse');
          break;
      }
      const result = measurement || [];
      setMeasurement(result);
    }
    selectedDate('', true, 0);
  }, [tab, isLoading, data]);

  const selectedDate = (date, enabled = false, index): void => {
    if (enabled) {
      setSeleted(index);
      /** This function interacts with the dates of the calendar and allows filtering
       * the information so that it can be sent to the TabContent component.
       */
    }
  };

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
          <Tab label={item.label} key={i} onClick={() => setTab(i)} />
        ))}
      </Tabs>
      <Grid container className={classes.mainGrid}>
        <Grid item xs={12}>
          <Box role="tabpanel" m={3}>
            {data && <TabContent tab={tab} />}
            <Box mt={3} mb={1}>
              <Typography variant="body2" className={classes.typography16}>
                {tab === 0
                  ? t('pressureChart', { ns: i18nGeneralData })
                  : tab === 1
                  ? t('weightChart', { ns: i18nGeneralData })
                  : tab === 2 && t('bloodGlucoseGraph', { ns: i18nGeneralData })}
              </Typography>
            </Box>
            {data && (
              <MeasurementGraphic
                dataGraphic={measurement}
                onSelected={selectedDate}
                selected={seleted}
                tab={tab}
              />
            )}
          </Box>
        </Grid>
      </Grid>
    </>
  );
}

export default withTranslation([i18nGeneralData, i18Forms])(withAppContext(GeneralDataPage));
