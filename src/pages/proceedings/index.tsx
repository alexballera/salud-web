/// BASE IMPORTS
import React, { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
/// BASE IMPORTS

/// i18n
import { useTranslation, withTranslation } from 'react-i18next';
import { NAMESPACE_KEY as i18Global } from '../../i18n/globals/i18n';
import { NAMESPACE_KEY as i18Forms } from '../../i18n/forms/i18n';
import { NAMESPACE_KEY as i18nProceedings } from '../../i18n/proceedings/i18n';
/// i18n END

/// OWN COMPONENTS
import { withAppContext } from '../../context';
/// OWN COMPONENTS END

/// STYLES & TYPES
import { TPersonalDataProps } from '../../containers/SignUp/index.types';

/// LAYOUT
/// LAYOUT END

/// SERVICES
import { MeasurementCardContainer } from '../../containers/MeasurementCardContainer/MeasurementCardContainer';
import {
  getMeasurementsData,
  IMeasurementsData,
  mockData
} from '../../services/getMeasurementsData.service';
import { makeStyles, Typography } from '@material-ui/core';
import { poppinsFontFamily } from '../../styles/js/theme';

const useStyles = makeStyles({
  root: {
    minWidth: 164,
    minHeight: 28
  },
  title: {
    fontFamily: poppinsFontFamily,
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 20,
    letterSpacing: '0.15px',
    color: '#455255',
    paddingLeft: 24,
    paddingBottom: 20
  }
});

/// SERVICES END
function ProceedingsPage({ handleNotifications }: TPersonalDataProps): JSX.Element {
  const classes = useStyles();

  const { t } = useTranslation([i18Global, i18Forms, i18nProceedings]);
  const [measurementData, setMeasurementData] = useState<IMeasurementsData>(mockData);
  const i18nPopUpError = t('message.error.general_fetch', { ns: i18Forms });

  const fetchMeasurementsData = () => {
    getMeasurementsData()
      .then(response => {
        const { result } = response.data;
        setMeasurementData(result);
      })
      .catch(err =>
        handleNotifications({ open: true, message: i18nPopUpError, severity: 'error' })
      );
  };
  useEffect(() => {
    // TODO CONECTAR CON API REAL
    /* fetchGeneralData() */
  }, []);

  return (
    <>
      <Typography variant="body2" className={classes.title}>
        {t('proceedings.generalData', { ns: i18nProceedings })}
      </Typography>
      <MeasurementCardContainer generalData={measurementData} />
    </>
  );
}

export default withTranslation([i18Global, i18Forms])(withAppContext(ProceedingsPage));
