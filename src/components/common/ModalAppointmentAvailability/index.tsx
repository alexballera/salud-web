import * as dateFnsLocale from 'date-fns/locale';
import React from 'react';
import i18next from 'i18next';
import MuiArrowBackIcon from '@material-ui/icons/ArrowBack';
import { Modal, Box, TextField, Grid, IconButton, Typography, styled, Button } from '@mui/material';
import { makeStyles } from '@material-ui/core/styles';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import { poppinsFontFamily, secondaryMainColor, titlePageColor } from '@/src/styles/js/theme';
import { useTranslation } from 'react-i18next';
import { NAMESPACE_KEY as i18nMedicalDirectory } from '../../../i18n/medicalDirectory/i18n';
import { NAMESPACE_KEY as i18nGlobal } from '../../../i18n/globals/i18n';

type Tprops = {
  isOpen: boolean;
  handleAction: any; // TODO: Add a valid type
};

const useStyles = makeStyles({
  main: {
    backgroundColor: 'white',
    height: '100vh',
    width: '100%'
  },
  navBar: {
    backgroundColor: 'white',
    padding: '8px 28px',
    height: 56
  },
  actions: {
    paddingLeft: 24,
    paddingRight: 24
  },
  // TODO: Remove !important
  btn: {
    backgroundColor: `${secondaryMainColor} !important`,
    fontFamily: `${poppinsFontFamily} !important`,
    fontSize: '15px !important'
  },
  hourBox: {
    borderRadius: 10,
    padding: '8px 10px',
    boxShadow:
      '0px 3px 1px -2px rgba(77, 90, 97, 0.2), 0px 2px 2px rgba(77, 90, 97, 0.14), 0px 1px 5px rgba(77, 90, 97, 0.12)'
  }
});

const ArrowBackIcon = styled(MuiArrowBackIcon)({
  color: titlePageColor
});

function ModalAppointmentAvailability({ isOpen, handleAction }: Tprops): JSX.Element {
  const classes = useStyles();
  const { t } = useTranslation([i18nMedicalDirectory, i18nGlobal]);
  const [value, setValue] = React.useState<Date | null>(new Date());
  const currentI18nKey = i18next.language || window.localStorage.i18nextLng;
  const locale = dateFnsLocale[currentI18nKey || 'enUS'];

  console.log(dateFnsLocale['es']);

  return (
    <Modal
      open={isOpen}
      aria-labelledby="parent-modal-title"
      aria-describedby="parent-modal-description"
    >
      <Box className={classes.main}>
        <Grid
          container
          alignItems="center"
          justifyContent="space-between"
          className={classes.navBar}
        >
          <Grid item>
            <Grid container alignItems="center">
              <Grid item mr={3}>
                <IconButton
                  edge="start"
                  color="inherit"
                  aria-label="arrow-back"
                  onClick={() => handleAction(value)}
                >
                  <ArrowBackIcon width={16} height={16} />
                </IconButton>
              </Grid>
              <Grid item>{t('title.appoint_availability', { ns: i18nGlobal })}</Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item>
            <LocalizationProvider dateAdapter={AdapterDateFns} dateFormats={{}} locale={locale}>
              <StaticDatePicker
                disablePast
                inputFormat="DD-MM-YYYY"
                displayStaticWrapperAs="desktop"
                label="Week picker"
                toolbarFormat="MMM DDDD yyyy"
                value={value}
                onChange={newValue => {
                  setValue(newValue);
                }}
                renderInput={params => <TextField {...params} />}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={12} className={classes.actions}>
            <Typography variant="body1">
              {t('filters.appointAvailable.availableDatesCaption', { ns: i18nMedicalDirectory })}
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <Box className={classes.hourBox}>item</Box>
              </Grid>
              <Grid item xs={4}>
                <Box className={classes.hourBox}>item</Box>
              </Grid>
              <Grid item xs={4}>
                <Box className={classes.hourBox}>item</Box>
              </Grid>
              <Grid item xs={4}>
                <Box className={classes.hourBox}>item</Box>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} className={classes.actions}>
            <Button
              fullWidth
              variant="contained"
              disableElevation
              className={classes.btn}
              sx={{ textTransform: 'inherit' }}
              onClick={() => null}
            >
              {t('button.save', { ns: i18nGlobal })}
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
}

export default ModalAppointmentAvailability;
