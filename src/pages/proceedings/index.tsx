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
import {
  Container,
  Divider,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  makeStyles,
  Typography
} from '@material-ui/core';
import {
  background2Color,
  poppinsFontFamily,
  secondaryMainColor,
  title2Color,
  titlePageColor
} from '../../styles/js/theme';
import ProceedingsCard from '../../components/common/Card/ProceedingsCard';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

const useStyles = makeStyles({
  root: {
    minWidth: 164,
    minHeight: 28,
    flexGrow: 1
  },
  title: {
    fontFamily: poppinsFontFamily,
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 16,
    letterSpacing: '0.15px',
    color: titlePageColor,
    paddingLeft: 24
  },
  cardContainer: {
    background: background2Color,
    padding: 20
  },
  title2: {
    fontFamily: poppinsFontFamily,
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 12,
    letterSpacing: '0.15px',
    color: title2Color,
    paddingBottom: 15,
    textTransform: 'uppercase'
  },
  cardContainer2: {
    padding: 20
  },
  textMenuItem: {
    fontFamily: poppinsFontFamily,
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 14,
    letterSpacing: '0.15px',
    color: title2Color
  },
  alignRight: {
    marginRight: 0
  }
});

/// SERVICES END
function ProceedingsPage({ handleNotifications }: TPersonalDataProps): JSX.Element {
  const classes = useStyles();

  const { t } = useTranslation([i18Global, i18Forms, i18nProceedings]);
  const [measurementData, setMeasurementData] = useState<IMeasurementsData>(mockData);
  const i18nPopUpError = t('message.error.general_fetch', { ns: i18Forms });
  const router = useRouter();

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
      <Container maxWidth="sm" className={classes.cardContainer2}>
        <List component="nav" className={classes.root} aria-label="menubox proceedings">
          <ListItem button divider onClick={() => router.push('/generalData')}>
            <ListItemText
              className={classes.textMenuItem}
              primary={t('proceedings.generalData', { ns: i18nProceedings })}
            />
            <ListItemSecondaryAction>
              <IconButton edge="end" aria-label="arrow">
                <ArrowForwardIosIcon fontSize="small" htmlColor={secondaryMainColor} />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        </List>
      </Container>
      <MeasurementCardContainer generalData={measurementData} />
      <Divider />
      <Container maxWidth="sm" className={classes.cardContainer}>
        <Typography variant="body2" className={classes.title2}>
          {t('proceedings.title2', { ns: i18nProceedings })}
        </Typography>
        <Grid container alignItems="center" justify="center" spacing={3}>
          <Grid item xs={6}>
            <ProceedingsCard
              title={t('proceedings.prescriptions', { ns: i18nProceedings })}
              route="/recipes_and_prescriptions/2022"
            />
          </Grid>
          <Grid item xs={6}>
            <ProceedingsCard
              title={t('proceedings.examResults', { ns: i18nProceedings })}
              route="/examResults"
            />
          </Grid>
        </Grid>
      </Container>
      <Divider />
      <Container maxWidth="sm" className={classes.cardContainer2}>
        <Typography variant="body2" className={classes.title2}>
          {t('proceedings.title3', { ns: i18nProceedings })}
        </Typography>
        <List component="nav" className={classes.root} aria-label="menubox proceedings">
          <ListItem button divider onClick={() => router.push('/medicalData')}>
            <ListItemText
              className={classes.textMenuItem}
              primary={t('proceedings.generalMedicalData', { ns: i18nProceedings })}
            />
            <ListItemSecondaryAction>
              <IconButton edge="end" aria-label="arrow">
                <ArrowForwardIosIcon fontSize="small" htmlColor={secondaryMainColor} />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
          <Divider />
          <ListItem button divider onClick={() => router.push('/clinicHistory')}>
            <ListItemText
              className={classes.textMenuItem}
              primary={t('proceedings.clinicHistory', { ns: i18nProceedings })}
            />
            <ListItemSecondaryAction>
              <IconButton edge="end" aria-label="arrow">
                <ArrowForwardIosIcon fontSize="small" htmlColor={secondaryMainColor} />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
          <ListItem button onClick={() => router.push('/historyOfConsultations')}>
            <ListItemText
              className={classes.textMenuItem}
              primary={t('proceedings.historyOfConsultations', { ns: i18nProceedings })}
            />
            <ListItemSecondaryAction>
              <IconButton edge="end" aria-label="arrow">
                <ArrowForwardIosIcon fontSize="small" htmlColor={secondaryMainColor} />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        </List>
      </Container>
    </>
  );
}

export default withTranslation([i18Global, i18Forms])(withAppContext(ProceedingsPage));
