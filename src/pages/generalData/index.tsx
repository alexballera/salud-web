/// BASE IMPORTS
import { useEffect, useState } from 'react';
import { useTranslation, withTranslation } from 'react-i18next';
/// BASE IMPORTS END

/// MATERIAL UI
import { Box, Grid, Tab, Tabs, Typography, CircularProgress } from '@material-ui/core';
/// MATERIAL UI - END

import { NAMESPACE_KEY as i18Forms } from '../../i18n/forms/i18n';
import { NAMESPACE_KEY as i18nGeneralData } from '../../i18n/generalData/i18n';
/// i18n END

/// OWN COMPONENTS
import { withAppContext } from '../../context';
import MeasurementGraphic from '@/src/components/common/Graphics/Measurement';
import GeneralDataCard from '../../../src/components/common/Card/GeneralDataCard';
/// OWN COMPONENTS END

/// SVG ICONS
import SvgWater from '../../../src/components/common/Svg/SvgWater.component';
import SvgWeight from '../../../src/components/common/Svg/SvgWeight.component';
import SvgArterialPressure from '../../../src/components/common/Svg/SvgArterialPressure.component';
/// SVG ICONS END

/// HELPERS
import { i18nDateFormat } from '../../utils/helpers';
/// HELPERS END

/// STYLES & TYPES
import type { IMeasurement } from '@/src/services/getMeasurementsData.service';
import generalDataStyles from './styles.module';
/// STYLES & TYPES END

/// SERVICES
import { getDataFromLocalStorage } from '@/src/services/localStorage.service';
import { useGetMeasurementsQuery } from '@/src/services/apiBFF';
/// SERVICES END

const INITIAL_STATE: IMeasurement = {
  name: '',
  unit: '',
  type: '',
  measurements: []
};

const TAB_CARD_ICONS = {
  weight: <SvgWeight />,
  bloodGlocuse: <SvgWater />,
  arterialPressure: <SvgArterialPressure />
};

function GeneralDataPage(): JSX.Element {
  const classes = generalDataStyles();
  const { t } = useTranslation([i18nGeneralData, i18Forms]);
  const [tab, setTab] = useState<number>(parseInt(getDataFromLocalStorage('cardSelected')) || 0);
  const [measurement, setMeasurement] = useState<IMeasurement>(INITIAL_STATE);
  const [selected, setSelected] = useState<number>(0);
  const { data, isLoading, isFetching } = useGetMeasurementsQuery('1');

  const tabList = [
    {
      label: t('tabs.pressure', { ns: i18nGeneralData }),
      chartLabel: t('pressureChart', { ns: i18nGeneralData })
    },
    {
      label: t('tabs.weight', { ns: i18nGeneralData }),
      chartLabel: t('weightChart', { ns: i18nGeneralData })
    },
    {
      label: t('tabs.bloodGlucose', { ns: i18nGeneralData }),
      chartLabel: t('bloodGlucoseGraph', { ns: i18nGeneralData })
    }
  ];

  useEffect(() => {
    if (data && data.records) {
      groupRecordsByType(tab);
      selectedDate('', true, 6);
    }
  }, [isFetching, tab]);

  const groupRecordsByType = (tab: number) => {
    switch (tab) {
      case 0:
        setMeasurement(filterRecordByType('arterialPressure'));
        break;
      case 1:
        setMeasurement(filterRecordByType('weight'));
        break;
      case 2:
        setMeasurement(filterRecordByType('bloodGlocuse'));
        break;
      default:
        setMeasurement(INITIAL_STATE);
    }
  };

  const filterRecordByType = (typeKey: string) => {
    if (!data || !data.records) {
      return INITIAL_STATE;
    }
    return data.records.find(item => item.type === typeKey);
  };

  const getLatestMeasurement = (idx: number) => {
    const { measurements } = measurement;
    const cloneMeasurements = [...measurements];
    return cloneMeasurements[idx];
  };

  const buildCardData = (idx: number) => {
    if (!measurement || !measurement?.measurements.length) {
      return {
        title: '-',
        unit: '',
        doctorName: null,
        time: null,
        value: '-'
      };
    }
    const lastMeasurement = getLatestMeasurement(idx);
    const cardData = {
      title: tabList[tab].label,
      unit: measurement.unit,
      doctorName: lastMeasurement.performer,
      time: i18nDateFormat(lastMeasurement.time, 'dd MMM, yyyy - HH:mm aaaa')
    };

    if (lastMeasurement.systolic) {
      const { systolic, diastolic } = lastMeasurement;
      return {
        ...cardData,
        value: `${systolic > 0 ? systolic : '-'}/${diastolic > 0 ? diastolic : '-'}`
      };
    }

    return {
      ...cardData,
      value: lastMeasurement.value
    };
  };

  const handleChange = (event, newValue) => {
    setTab(newValue);
  };

  const selectedDate = (date, enabled = false, index): void => {
    if (enabled) {
      setSelected(index);
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
        {tabList.map((item, i) => (
          <Tab label={item.label} key={i} onClick={() => setTab(i)} />
        ))}
      </Tabs>
      <Grid container className={classes.mainGrid}>
        <Grid item xs={12}>
          {isLoading && (
            <Grid
              container
              direction="column"
              justify="center"
              alignItems="center"
              className={classes.loading}
            >
              <CircularProgress color="inherit" />
            </Grid>
          )}
          {!isLoading && (
            <Box role="tabpanel" m={3}>
              <Box mt={3} mb={1}>
                <Typography variant="body2" gutterBottom className={classes.lastMeasurementText}>
                  {t('content.last_measurement')}
                </Typography>
              </Box>
              <GeneralDataCard
                tab={tab}
                icon={measurement?.type ? TAB_CARD_ICONS[measurement.type] : <></>}
                {...buildCardData(selected)}
              />
              {measurement && measurement?.measurements.length && (
                <>
                  <Box mt={3} mb={1}>
                    <Typography variant="body2" className={classes.typography16}>
                      {tabList[tab].chartLabel}
                    </Typography>
                  </Box>
                  <MeasurementGraphic
                    dataGraphic={measurement}
                    onSelected={selectedDate}
                    selected={selected}
                    tab={tab}
                  />
                </>
              )}
            </Box>
          )}
        </Grid>
      </Grid>
    </>
  );
}

export default withTranslation([i18nGeneralData, i18Forms])(withAppContext(GeneralDataPage));
