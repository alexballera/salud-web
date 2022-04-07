/// BASE IMPORTS
import React, { useState } from 'react';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
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
  createMuiTheme
} from '@material-ui/core';
import {
  background3Color,
  poppinsFontFamily,
  primaryContrastTextColor,
  secondaryMainColor
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
    marginLeft: '24px',
    marginRight: '24px',
    marginTop: '24px'
  },
  icon: {
    color: 'rgba(0, 0, 0, 0.54)'
  }
});

const inputsOutlined = createMuiTheme({
  typography: {
    fontFamily: poppinsFontFamily
  },
  overrides: {
    MuiInputLabel: {
      root: {
        '&$outlined': {
          background: 'white',
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
        <Box mt={6}>
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
                <TextField
                  className={classes.inputOutline}
                  type="text"
                  label="Test"
                  variant="outlined"
                  autoFocus={true}
                />
              </FormControl>
            </Grid>
          </Grid>
        </Box>
        <Divider />
      </ThemeProvider>
      {/* )} */}
    </>
  );
}

export default withTranslation([i18Global, i18Forms])(withAppContext(MedicalDirectoryPage));
