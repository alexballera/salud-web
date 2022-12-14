/// BASE IMPORTS
import React, { Fragment } from 'react';
import { useRouter } from 'next/router';
import clsx from 'clsx';
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

/// LAYOUT
/// LAYOUT END

/// SERVICES
import { MeasurementCardContainer } from '../../containers/MeasurementCardContainer/MeasurementCardContainer';
import { useGetMeasurementsQuery } from '../../services/apiBFF';

import {
  Box,
  CircularProgress,
  Container,
  Divider,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  makeStyles,
  Typography,
  Link,
  styled
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

const CustomMuiLink = styled(Link)({
  fontFamily: poppinsFontFamily,
  fontStyle: 'normal',
  fontWeight: 500,
  fontSize: 14,
  lineHeight: '24px',
  letterSpacing: '0.4px',
  color: secondaryMainColor,
  textUnderlineOffset: '4px',
  '&:hover': {
    color: secondaryMainColor
  }
});

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
  },
  hidden: {
    display: 'none'
  }
});

/// SERVICES END
function ProceedingsPage(): JSX.Element {
  const classes = useStyles();

  const { t } = useTranslation([i18Global, i18Forms, i18nProceedings]);
  // const i18nPopUpError = t('message.error.general_fetch', { ns: i18Forms });
  const router = useRouter();

  const userId = '1';
  const { data, isLoading } = useGetMeasurementsQuery(userId);
  const items = [
    {
      title: t('proceedings.generalMedicalData', { ns: i18nProceedings }),
      action: '/medicalData'
    },
    {
      title: t('proceedings.clinicHistory', { ns: i18nProceedings }),
      action: '/clinic_history'
    },
    {
      title: t('proceedings.consultationHistory', { ns: i18nProceedings }),
      action: '/consultationHistory'
    }
  ];

  const itemsCard = [
    {
      title: t('proceedings.prescriptions', { ns: i18nProceedings }),
      action: '/recipes_and_prescriptions'
    },
    {
      title: t('proceedings.examResults', { ns: i18nProceedings }),
      action: '/exam_results'
    }
  ];

  return (
    <>
      {isLoading && (
        <Box mt={6}>
          <Grid container direction="column" justify="center" alignItems="center">
            <CircularProgress color="inherit" />
          </Grid>
        </Box>
      )}
      {!isLoading && (
        <>
          <Container maxWidth="sm" className={classes.cardContainer2}>
            <List component="nav" className={classes.root} aria-label="menubox proceedings">
              <ListItem>
                <ListItemText
                  className={classes.textMenuItem}
                  primary={t('proceedings.generalData', { ns: i18nProceedings })}
                />
                <CustomMuiLink underline="always" href="/generalData">
                  {t('button.show_more')}
                </CustomMuiLink>
              </ListItem>
            </List>
            <MeasurementCardContainer generalData={data} />
          </Container>
          <Divider />
          <Container maxWidth="sm" className={classes.cardContainer}>
            <Typography variant="body2" className={classes.title2}>
              {t('proceedings.title2', { ns: i18nProceedings })}
            </Typography>
            <Grid container alignItems="center" justify="center" spacing={3}>
              {itemsCard.map(item => (
                <Fragment key={item.title}>
                  <Grid item xs={6}>
                    <ProceedingsCard title={item.title} route={item.action} />
                  </Grid>
                </Fragment>
              ))}
            </Grid>
          </Container>
          <Divider />
          <Container maxWidth="sm" className={classes.cardContainer2}>
            <Typography variant="body2" className={classes.title2}>
              {t('proceedings.title3', { ns: i18nProceedings })}
            </Typography>
            <List component="nav" className={classes.root} aria-label="menubox proceedings">
              {items.map((item, i) => (
                <Fragment key={item.title}>
                  <ListItem button onClick={() => router.push(item.action)}>
                    <ListItemText className={classes.textMenuItem} primary={item.title} />
                    <ListItemSecondaryAction>
                      <IconButton
                        edge="end"
                        aria-label="arrow"
                        onClick={() => router.push(item.action)}
                      >
                        <ArrowForwardIosIcon fontSize="small" htmlColor={secondaryMainColor} />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                  <Divider
                    className={clsx({
                      [classes.hidden]: i === items.length - 1
                    })}
                  />
                </Fragment>
              ))}
            </List>
          </Container>
        </>
      )}
    </>
  );
}

export default withTranslation([i18Global, i18Forms])(withAppContext(ProceedingsPage));
