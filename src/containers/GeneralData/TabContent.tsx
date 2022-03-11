import React, { useState } from 'react';

/// MATERIAL UI
import { Grid, makeStyles, Typography } from '@material-ui/core';
import { poppinsFontFamily, textValueCardColor } from '../../styles/js/theme';
import MeasurementCard from '../../components/common/Card/MeasurementCard';
/// MATERIAL UI END

/// i18n
import { useTranslation, withTranslation } from 'react-i18next';
import { NAMESPACE_KEY as i18nGeneralData } from '../../i18n/generalData/i18n';
import { NAMESPACE_KEY as i18nGlobalsData } from '../../i18n/globals/i18n';
import { mockData } from '../../services/getGeneralData.service';
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

const TabContent = ({ tab }: IProps): JSX.Element => {
  const classes = useStyles();
  const { t } = useTranslation([i18nGeneralData]);
  const [data, setData] = useState(mockData);

  const renderDoctor = () => {
    let dr = [];
    switch (tab) {
      case 1:
        if (data.weight.generalData.performer) {
          dr = data.weight.generalData.performer.split(' ');
        }
        break;
      case 2:
        if (data.bloodGlocuse.generalData.performer) {
          dr = data.bloodGlocuse.generalData.performer.split(' ');
        }
        break;
      default:
        if (data.arterialPressure.generalData.performer) {
          dr = data.arterialPressure.generalData.performer.split(' ');
        }
        break;
    }
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
              value={`${
                data.arterialPressure.generalData.systolic > 0
                  ? data.arterialPressure.generalData.systolic.toString()
                  : '-'
              }/${
                data.arterialPressure.generalData.diastolic > 0
                  ? data.arterialPressure.generalData.diastolic.toString()
                  : '-'
              }`}
            />
          )}
          {tab === 1 && (
            <MeasurementCard
              title={t('tabs.weight', { ns: i18nGeneralData })}
              noSVG
              value={data.weight.generalData.value.toString()}
            />
          )}
          {tab === 2 && (
            <MeasurementCard
              title={t('tabs.bloodGlucose', { ns: i18nGeneralData })}
              noSVG
              value={
                data.bloodGlocuse.generalData.value > 0
                  ? data.bloodGlocuse.generalData.value.toString()
                  : '-'
              }
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
