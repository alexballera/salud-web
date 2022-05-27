import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { ThemeProvider } from '@material-ui/styles';
import { useTranslation, withTranslation } from 'react-i18next';
import {
  Divider,
  Typography,
  Box,
  Grid,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  List,
  styled
} from '@material-ui/core';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import MuiCircularProgress from '@material-ui/core/CircularProgress';
import CardActionImage from '@/src/components/common/Card/CardActionImage';
import SvgSpecialty from '@/src/components/common/Svg/SvgSpecialty.component';
import SvgDoctors from '@/src/components/common/Svg/SvgDoctors.component';
import SearchWithGeolocation from '@/src/containers/SearchWithGeolocation';
import { scrollTop } from '@/src/utils/helpers';
import { secondaryMainColor } from '@/src/styles/js/theme';
import { useGetSearchHistoryQuery } from '@/src/services/apiBFF';
import muiTheme from '../../styles/js/muiTheme';
import { primaryLightColor } from '../../styles/js/theme';
import { NAMESPACE_KEY as i18Global } from '../../i18n/globals/i18n';
import { NAMESPACE_KEY as i18Forms } from '../../i18n/forms/i18n';
import { NAMESPACE_KEY as i18nMedicalDirectory } from '../../i18n/medicalDirectory/i18n';
import { withAppContext } from '../../context';
import medicalDirectoryStyles from './style.module';

const CircularProgress = styled(MuiCircularProgress)({
  color: secondaryMainColor
});

function MedicalDirectoryPage(): JSX.Element {
  const classes = medicalDirectoryStyles();
  const router = useRouter();
  const { t } = useTranslation([i18Global, i18Forms, i18nMedicalDirectory]);
  const { data, isLoading } = useGetSearchHistoryQuery();

  const itemsCard = [
    {
      title: t('searchBySection.specialty', { ns: i18nMedicalDirectory }),
      action: '/medicalDirectory/searchBy/search_by_specialty',
      icon: <SvgSpecialty />
    },
    {
      title: t('searchBySection.doctors', { ns: i18nMedicalDirectory }),
      action: '/medicalDirectory/searchBy/search_by_doctor',
      icon: <SvgDoctors width={34} heigth={34} />
    }
  ];

  useEffect(() => {
    scrollTop();
  }, []);

  return (
    <ThemeProvider theme={muiTheme}>
      <Grid className={classes.mainGrid}>
        <Box pt={6} px={3} className={classes.mainArea}>
          <Grid container direction="column">
            <Grid item>
              <Typography className={classes.title}>
                {t('items.title', { ns: i18nMedicalDirectory })}
              </Typography>
            </Grid>
          </Grid>
          <SearchWithGeolocation
            labelText={t('items.labelSearch', { ns: i18nMedicalDirectory })}
            placeHolderText={t('items.placeholderSearch', { ns: i18nMedicalDirectory })}
            path="/medicalDirectory/searchResults"
          />
          <Box mt={1}>
            <Grid container direction="column">
              <Grid item xs={12}>
                <Box mb={3}>
                  <Typography className={classes.subTitle} variant="subtitle2">
                    {t('searchBySection.searchBy', { ns: i18nMedicalDirectory })}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Grid container alignItems="center" justify="center" spacing={3}>
                  {itemsCard.map(item => (
                    <Grid item xs={6} key={item.title}>
                      <CardActionImage title={item.title} route={item.action} icon={item.icon} />
                    </Grid>
                  ))}
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Box className={classes.listWrapper}>
          <Typography variant="h2" className={classes.historyTextTitle}>
            {t('searchBySection.history', { ns: i18nMedicalDirectory })}
          </Typography>
          {isLoading && (
            <Grid container justify="center" alignItems="center">
              <CircularProgress color="secondary" />
            </Grid>
          )}
          <List component="nav" className={classes.root} aria-label="menubox history filter items">
            {!isLoading &&
              data?.searches &&
              data.searches.map((item, idx) => (
                <ListItem
                  button
                  key={idx}
                  className={classes.listItem}
                  onClick={() => router.push(`doctor_profile/${item.doctorId}`)}
                >
                  <ListItemText
                    primary={
                      <Typography variant="body2" className={classes.listMenuTextPrimary}>
                        {item.doctorName}
                      </Typography>
                    }
                    secondary={
                      <Typography variant="body2" className={classes.listMenuTextSecondary}>
                        {item.medicalSpeciality}
                      </Typography>
                    }
                  />
                  <ListItemSecondaryAction>
                    <IconButton
                      edge="end"
                      aria-label="arrow"
                      onClick={() => router.push(`/doctor_profile/${item.doctorId}`)}
                    >
                      <ArrowForwardIosIcon fontSize="small" htmlColor={primaryLightColor} />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
          </List>
          {!isLoading && !data.searches?.length && (
            <Box px={3}>
              <Typography variant="h2" className={classes.historyTextTitle}>
                {t('searchBySection.noRecentSearch', { ns: i18nMedicalDirectory })}
              </Typography>
            </Box>
          )}
        </Box>
      </Grid>
      <Divider />
    </ThemeProvider>
  );
}

export default withTranslation([i18Global, i18Forms])(withAppContext(MedicalDirectoryPage));
