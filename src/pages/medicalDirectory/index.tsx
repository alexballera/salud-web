import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useTranslation, withTranslation } from 'react-i18next';

import { NAMESPACE_KEY as i18Global } from '../../i18n/globals/i18n';
import { NAMESPACE_KEY as i18Forms } from '../../i18n/forms/i18n';
import { NAMESPACE_KEY as i18nMedicalDirectory } from '../../i18n/medicalDirectory/i18n';

import { withAppContext } from '../../context';
import { ThemeProvider } from '@material-ui/styles';
import {
  Divider,
  Typography,
  Box,
  Grid,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  List
} from '@material-ui/core';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

import { primaryLightColor } from '../../styles/js/theme';
import CardActionImage from '@/src/components/common/Card/CardActionImage';
import SvgSpecialty from '@/src/components/common/Svg/SvgSpecialty.component';
import SvgDoctors from '@/src/components/common/Svg/SvgDoctors.component';
import muiTheme from '../../styles/js/muiTheme';

import medicalDirectoryStyles from './style.module';
import SearchWithGeolocation from '@/src/containers/SearchWithGeolocation';

export const FAKE_SEARCH_HISTORY_LIST = [
  {
    idx: '1',
    title: 'Dr. Orlando Carazo',
    subTitle: 'Medicina general'
  },
  {
    idx: '2',
    title: 'Dra. Andrea Duarte',
    subTitle: 'Oncología'
  },
  {
    idx: '3',
    title: 'Dr. Gabriel González',
    subTitle: 'Psicología'
  }
];

/// SERVICES END
function MedicalDirectoryPage(): JSX.Element {
  const classes = medicalDirectoryStyles();
  const router = useRouter();

  const { t } = useTranslation([i18Global, i18Forms, i18nMedicalDirectory]);

  const [search, setSearch] = useState({});

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
            searchObject={setSearch}
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
          <List component="nav" className={classes.root} aria-label="menubox history filter items">
            {FAKE_SEARCH_HISTORY_LIST.map((item, idx) => (
              <ListItem
                button
                key={idx}
                className={classes.listItem}
                onClick={() => router.push(`doctor_profile/${item.idx}`)}
              >
                <ListItemText
                  primary={
                    <Typography variant="body2" className={classes.listMenuTextPrimary}>
                      {item.title}
                    </Typography>
                  }
                  secondary={
                    <Typography variant="body2" className={classes.listMenuTextSecondary}>
                      {item.subTitle}
                    </Typography>
                  }
                />
                <ListItemSecondaryAction>
                  <IconButton
                    edge="end"
                    aria-label="arrow"
                    onClick={() => router.push(`/doctor_profile/${item.idx}`)}
                  >
                    <ArrowForwardIosIcon fontSize="small" htmlColor={primaryLightColor} />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
          {!FAKE_SEARCH_HISTORY_LIST.length && (
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
