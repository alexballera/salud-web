import React, { useEffect, useState } from 'react';
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
import { IMeasurementRecord } from '../../services/getMeasurementsData.service';
import { useGetMeasurementsQuery } from '../../services/apiBFF';

const initialState = {
  systolic: null,
  diastolic: null,
  time: null,
  value: null,
  performer: ''
};

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

  const [measurement, setMeasurement] = useState<IMeasurementRecord>(initialState);
  const { data, isLoading } = useGetMeasurementsQuery('1');

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
  }, [tab, isLoading, data]);

  const selectedDate = (date, enabled = false): void => {
    console.log(enabled);
    if (enabled) {
      console.log(measurement.measurements.filter(item => item.time === date));
      console.log(measurement.measurements.filter(item => item.time === date));
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
          <Tab key={i} label={item.label} onClick={() => setTab(i)} />
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
            {data && <MeasurementGraphic datos={measurement} onSelected={selectedDate} />}
          </Box>
        </Grid>
      </Grid>
    </>
  );
}

export default withTranslation([i18nGeneralData, i18Forms])(withAppContext(GeneralDataPage));
