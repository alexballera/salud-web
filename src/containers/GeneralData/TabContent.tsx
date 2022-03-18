import React, { useEffect, useState } from 'react';

/// MATERIAL UI
import { Grid, makeStyles, Typography } from '@material-ui/core';
import { poppinsFontFamily, textValueCardColor } from '../../styles/js/theme';
import MeasurementCard from '../../components/common/Card/MeasurementCard';
/// MATERIAL UI END

/// i18n
import { useTranslation, withTranslation } from 'react-i18next';
import { NAMESPACE_KEY as i18nGeneralData } from '../../i18n/generalData/i18n';
import { NAMESPACE_KEY as i18nGlobalsData } from '../../i18n/globals/i18n';
import { IMeasurementRecord } from '../../services/getMeasurementsData.service';
import { useGetMeasurementsQuery } from '../../services/apiBFF';
/// i18n END

type IProps = {
  tab: number;
};
const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    backgroundColor: 'red',
    flex: 1
  },
  control: {
    padding: theme.spacing(2)
  },
  smallText: {
    marginTop: 15,
    fontFamily: poppinsFontFamily,
    fontStyle: 'normal',
    fontSize: 16,
    color: textValueCardColor,
    paddingRight: 40
  },
  paddingContainer: {
    padding: 20
  }
}));

const initialState = {
  systolic: null,
  diastolic: null,
  time: null,
  value: null,
  performer: ''
};

const TabContent = ({ tab }: IProps): JSX.Element => {
  const classes = useStyles();
  const { t } = useTranslation([i18nGeneralData]);
  const [measurement, setMeasurement] = useState<IMeasurementRecord>(initialState);

  const { data, isLoading } = useGetMeasurementsQuery();

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
      const result =
        measurement && measurement.measurements.length > 0 ? measurement.measurements[0] : null;
      setMeasurement(result);
    }
  }, [isLoading]);

  const renderDoctor = () => {
    let dr = [];
    dr = measurement?.performer.split(' ');
    return (
      <Typography className={classes.smallText}>
        {t('content.lastMeasurement', { ns: i18nGeneralData })}
        <br />
        <br />
        <br />
        {dr.length > 0 && dr[0]}{' '}
        {dr.length > 0 ? dr[1] : t('content.noRegistry', { ns: i18nGeneralData })}
      </Typography>
    );
  };
  return (
    <>
      <Grid container className={classes.paddingContainer} justify="space-around">
        <Grid item xs={5}>
          {tab === 0 && (
            <MeasurementCard
              title={t('tabs.pressure', { ns: i18nGeneralData })}
              noSVG
              value={`${measurement?.systolic > 0 ? measurement?.systolic.toString() : '-'}/${
                measurement?.diastolic > 0 ? measurement?.diastolic.toString() : '-'
              }`}
            />
          )}
          {tab === 1 && (
            <MeasurementCard
              title={t('tabs.weight', { ns: i18nGeneralData })}
              noSVG
              value={measurement?.value.toString()}
            />
          )}
          {tab === 2 && (
            <MeasurementCard
              title={t('tabs.bloodGlucose', { ns: i18nGeneralData })}
              noSVG
              value={measurement?.value > 0 ? measurement?.value.toString() : '-'}
            />
          )}
        </Grid>
        <Grid item xs={5}>
          {renderDoctor()}
        </Grid>
      </Grid>
    </>
  );
};

export default withTranslation([i18nGeneralData, i18nGlobalsData])(TabContent);
