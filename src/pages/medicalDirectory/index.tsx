/// BASE IMPORTS
import React, { useState } from 'react';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import { useRouter } from 'next/router';
/// BASE IMPORTS

/// i18n
import { useTranslation, withTranslation } from 'react-i18next';
import { NAMESPACE_KEY as i18Global } from '../../i18n/globals/i18n';
import { NAMESPACE_KEY as i18Forms } from '../../i18n/forms/i18n';
import { NAMESPACE_KEY as i18nMedicalDirectory } from '../../i18n/medicalDirectory/i18n';
/// i18n END

/// OWN COMPONENTS
import { withAppContext } from '../../context';
/// OWN COMPONENTS END

/// LAYOUT
/// LAYOUT END

/// SERVICES
import { ThemeProvider } from '@material-ui/styles';
import {
  Divider,
  makeStyles,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  Typography,
  Box,
  Grid,
  TextField,
  ThemeOptions,
  createMuiTheme,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  List
} from '@material-ui/core';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

import {
  background3Color,
  poppinsFontFamily,
  primaryContrastTextColor,
  secondaryMainColor,
  background2Color,
  title2Color,
  titlePageColor,
  primaryLightColor
} from '../../styles/js/theme';

const useStyles = makeStyles({
  root: {
    minWidth: 164,
    minHeight: 28,
    flexGrow: 1
  },
  title: {
    position: 'absolute',
    width: '312px',
    height: '32px',
    left: '24px',
    top: '84px',
    fontFamily: poppinsFontFamily,
    fontStyle: 'normal',
    fontWeight: 500,
    fontSize: 20,
    lineHeight: '160%',
    letterSpacing: '0.15px',
    color: secondaryMainColor
  },
  container: {
    background: background3Color
  },
  cardContainer: {
    background: primaryContrastTextColor,
    position: 'absolute',
    width: '360px',
    height: '516px',
    borderRadius: '32px 32px 0px 0px',
    padding: 20
  },
  inputOutline: {
    marginTop: '24px'
  },
  icon: {
    color: 'rgba(0, 0, 0, 0.54)'
  },
  mainGrid: {
    backgroundColor: background2Color,
    height: '100%'
  },
  mainArea: {
    backgroundColor: primaryContrastTextColor,
    height: '500px',
    width: '100%',
    borderRadius: '32px',
    backgroundClip: 'padding-box'
  },
  listWrapper: {
    width: '100%'
  },
  listMenuTextPrimary: {
    fontFamily: poppinsFontFamily,
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: 14,
    lineHeight: '143%',
    letterSpacing: '0.15px',
    color: titlePageColor
  },
  listMenuTextSecondary: {
    fontFamily: poppinsFontFamily,
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: 14,
    lineHeight: '143%',
    letterSpacing: '0.15px',
    color: 'rgba(0, 0, 0, 0.54)'
  }
});

const inputsOutlined = createMuiTheme({
  overrides: {
    MuiInputLabel: {
      root: {
        '&$outlined': {
          background: primaryContrastTextColor,
          padding: '0px 10px'
        }
      }
    },
    MuiOutlinedInput: {
      root: {
        '& fieldset': {
          top: 0
        }
      }
    }
  }
} as ThemeOptions);

/// SERVICES END
function MedicalDirectoryPage(): JSX.Element {
  const classes = useStyles();
  const router = useRouter();

  const { t } = useTranslation([i18Global, i18Forms, i18nMedicalDirectory]);

  const [search, setSearch] = useState('');
  return (
    <>
      {/* {isLoading && (
        <Box mt={6}>
          <Grid container direction="column" justify="center" alignItems="center">
            <CircularProgress color="inherit" />
          </Grid>
        </Box>
      )} */}
      {/* {!isLoading && ( */}
      <ThemeProvider theme={inputsOutlined}>
        <Grid container className={classes.mainGrid}>
          <Box pt={6} px={3} className={classes.mainArea}>
            {/* There is already an h1 in the page, let's not duplicate it. */}
            <Grid container direction="column">
              <Grid item>
                <Typography className={classes.title}>
                  {t('items.title', { ns: i18nMedicalDirectory })}
                </Typography>
              </Grid>
              <Grid className={classes.inputOutline} item>
                <FormControl variant="outlined">
                  <InputLabel htmlFor="search">
                    {t('items.labelSearch', { ns: i18nMedicalDirectory })}
                  </InputLabel>
                  <OutlinedInput
                    id="search"
                    defaultValue="busqueda"
                    autoFocus={true}
                    // onChange={handleChange}
                    label={t('items.labelSearch', { ns: i18nMedicalDirectory })}
                    placeholder={t('items.labelSearch', { ns: i18nMedicalDirectory })}
                    endAdornment={
                      <InputAdornment position="end">
                        <SearchOutlinedIcon className={classes.icon} />
                      </InputAdornment>
                    }
                  />
                </FormControl>
              </Grid>
              <Grid className={classes.inputOutline} item>
                <FormControl variant="outlined">
                  <InputLabel htmlFor="location">
                    {t('items.labelLocation', { ns: i18nMedicalDirectory })}
                  </InputLabel>
                  <OutlinedInput
                    id="location"
                    defaultValue={t('items.placeholderLocation', { ns: i18nMedicalDirectory })}
                    // onChange={handleChange}
                    label={t('items.labelLocation', { ns: i18nMedicalDirectory })}
                    // placeholder={t('items.placeholderLocation', { ns: i18nMedicalDirectory })}
                    endAdornment={
                      <InputAdornment position="end">
                        <LocationOnOutlinedIcon className={classes.icon} />
                      </InputAdornment>
                    }
                  />
                </FormControl>
              </Grid>
            </Grid>
            <Box mt={6}>
              <Grid container direction="column">
                <Grid item xs={12}>
                  <Typography variant="subtitle2">Busca por</Typography>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Box pt={6} px={3} className={classes.listWrapper}>
            <Typography variant="h2" className={classes.listMenuTextPrimary}>
              Búsquedas recientes
            </Typography>
            <List component="nav" className={classes.root} aria-label="menubox proceedings">
              <ListItem
                style={{ paddingLeft: '12px', paddingRight: '12px' }}
                button
                onClick={() => router.push('doctor_profile/1')}
              >
                <ListItemText
                  primary={
                    <Typography variant="body2" className={classes.listMenuTextPrimary}>
                      Dr. Orlando Carazo
                    </Typography>
                  }
                  secondary={
                    <Typography variant="body2" className={classes.listMenuTextSecondary}>
                      Medicina general
                    </Typography>
                  }
                />
                <ListItemSecondaryAction>
                  <IconButton
                    edge="end"
                    aria-label="arrow"
                    onClick={() => router.push('doctor_profile/1')}
                  >
                    <ArrowForwardIosIcon fontSize="small" htmlColor={primaryLightColor} />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            </List>
          </Box>
        </Grid>
        <Divider />
      </ThemeProvider>
      {/* )} */}
    </>
  );
}

export default withTranslation([i18Global, i18Forms])(withAppContext(MedicalDirectoryPage));
