/// BASE IMPORTS
import React, { useEffect, useState } from 'react';
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
import { Autocomplete, TextField } from '@mui/material';
import {
  Divider,
  makeStyles,
  InputAdornment,
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
import CardActionImage from '@/src/components/common/Card/CardActionImage';
import SvgSpecialty from '@/src/components/common/Svg/SvgSpecialty.component';
import SvgDoctors from '@/src/components/common/Svg/SvgDoctors.component';
import muiTheme from '../../styles/js/muiTheme';
import { getPosition } from '@/src/utils/helpers';

import usePlacesAutocomplete, { getGeocode, getLatLng } from 'use-places-autocomplete';

const FAKE_SEARCH_HISTORY_LIST = [
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
    marginTop: '18px'
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
    height: '425px',
    width: '100%',
    borderBottomLeftRadius: '32px',
    borderBottomRightRadius: '32px'
  },
  inputColor: {
    '& .MuiOutlinedInput-root:hover': {
      '& > fieldset': { borderColor: secondaryMainColor }
    },
    '& label.Mui-focused': {
      color: secondaryMainColor
    },
    '& .MuiOutlinedInput-root.Mui-focused': {
      '& > fieldset': { borderColor: secondaryMainColor }
    }
  },
  listWrapper: {
    width: '100%',
    padding: 24
  },
  listItem: {
    paddingLeft: 12,
    paddingRight: 12
  },
  historyTextTitle: {
    fontFamily: poppinsFontFamily,
    fontStyle: 'normal',
    fontWeight: 500,
    fontSize: 14,
    lineHeight: '157%',
    letterSpacing: '0.1px',
    color: title2Color
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
  },
  subTitle: {
    fontFamily: poppinsFontFamily
  },
  popupIndicator: {
    transform: 'none !important'
  }
});

/// SERVICES END
function MedicalDirectoryPage(): JSX.Element {
  const classes = useStyles();
  const router = useRouter();

  const { t } = useTranslation([i18Global, i18Forms, i18nMedicalDirectory]);

  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions
  } = usePlacesAutocomplete({
    requestOptions: {
      /* Define search scope here */
    },
    debounce: 300
  });

  const handleInput = e => {
    // Update the keyword of the input element
    setValue(e.target.value);
    handleSelect(e.target.value);
  };

  const handleSelect =
    ({ description }) =>
    () => {
      setValue(description, false);
      clearSuggestions();

      getGeocode({ address: description })
        .then(results => getLatLng(results[0]))
        .then(({ lat, lng }) => {
          console.log('📍 Coordinates: ', { lat, lng });
        })
        .catch(error => {
          console.log('😱 Error: ', error);
        });
    };

  const [searchField, setSearchField] = useState('');
  const [searchShow, setSearchShow] = useState(false);

  const [locationField, setLocationField] = useState('');
  const [locationShow, setLocationShow] = useState(false);

  useEffect(() => {
    gpsPosition();
    console.log(data);
  }, [data]);

  const gpsPosition = async () => {
    await getPosition()
      .then(function (result) {
        console.log(result);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    setSearchField(e.target.value);
    if (e.target.value === '') {
      setSearchShow(false);
    } else {
      setSearchShow(true);
    }
  };

  const handleChangeLocation = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocationField(e.target.value);
    if (e.target.value === '') {
      setLocationShow(false);
    } else {
      setLocationShow(true);
    }
  };

  const itemsCard = [
    {
      title: t('searchBySection.specialty', { ns: i18nMedicalDirectory }),
      action: '/medicalDirectory/searchBy',
      icon: <SvgSpecialty />
    },
    {
      title: t('searchBySection.doctors', { ns: i18nMedicalDirectory }),
      action: '/medicalDirectory/searchBy',
      icon: <SvgDoctors />
    }
  ];

  const top100Films = [
    { title: 'The Shawshank Redemption', year: 1994 },
    { title: 'The Godfather', year: 1972 },
    { title: 'The Godfather: Part II', year: 1974 },
    { title: 'The Dark Knight', year: 2008 },
    { title: '12 Angry Men', year: 1957 },
    { title: "Schindler's List", year: 1993 },
    { title: 'Pulp Fiction', year: 1994 }
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
            <Grid className={classes.inputOutline} item>
              <Box mt={1}>
                <TextField
                  id="outlined-location"
                  label={t('items.labelSearch', { ns: i18nMedicalDirectory })}
                  placeholder={t('items.placeholderSearch', { ns: i18nMedicalDirectory })}
                  type="text"
                  className={classes.inputColor}
                  fullWidth
                  onChange={handleChangeLocation}
                  InputLabelProps={{
                    shrink: true
                  }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <a onClick={() => gpsPosition()}>
                          <SearchOutlinedIcon className={classes.icon} />
                        </a>
                      </InputAdornment>
                    )
                  }}
                />
              </Box>
            </Grid>
            <Grid className={classes.inputOutline} item>
              <Box mt={1}>
                <Autocomplete
                  id="free-solo-demo"
                  freeSolo
                  options={data.map(option => option.description)}
                  forcePopupIcon={true}
                  popupIcon={<LocationOnOutlinedIcon className={classes.icon} />}
                  renderInput={params => (
                    <TextField
                      {...params}
                      label={t('items.labelLocation', { ns: i18nMedicalDirectory })}
                      defaultValue={t('items.placeholderLocation', { ns: i18nMedicalDirectory })}
                      placeholder={t('items.placeholderLocation', { ns: i18nMedicalDirectory })}
                      className={`${classes.popupIndicator} ${classes.inputColor}`}
                      value={value}
                      onChange={handleInput}
                      InputLabelProps={{
                        shrink: true
                      }}
                    />
                  )}
                />
              </Box>
            </Grid>
          </Grid>
          <Box mt={3}>
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
        </Box>
      </Grid>
      <Divider />
    </ThemeProvider>
  );
}

export default withTranslation([i18Global, i18Forms])(withAppContext(MedicalDirectoryPage));
