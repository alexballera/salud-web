import * as dateFnsLocale from 'date-fns/locale';
import React from 'react';
import i18next from 'i18next';
import MuiArrowBackIcon from '@material-ui/icons/ArrowBack';
import {
  Modal,
  Box,
  TextField,
  Grid,
  IconButton,
  Typography,
  styled,
  Button,
  ToggleButton
} from '@mui/material';
import { makeStyles } from '@material-ui/core/styles';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import { poppinsFontFamily, secondaryMainColor, titlePageColor } from '@/src/styles/js/theme';
import { useTranslation } from 'react-i18next';
import { NAMESPACE_KEY as i18nMedicalDirectory } from '../../../i18n/medicalDirectory/i18n';
import { NAMESPACE_KEY as i18nGlobal } from '../../../i18n/globals/i18n';

import MuiToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { useDispatch } from 'react-redux';
import { searchOnFilter } from '@/src/store/slice/search.slice';
const ToggleButtonGroup = styled(MuiToggleButtonGroup)({
  '& .MuiToggleButton-root': {
    fontSize: 12,
    fontWeight: 400,
    width: 136,
    borderRadius: 10,
    padding: '8px 10px',
    border: '1px solid #e0e0e000 !important',
    boxShadow:
      '0px 3px 1px -2px rgba(77, 90, 97, 0.2), 0px 2px 2px rgba(77, 90, 97, 0.14), 0px 1px 5px rgba(77, 90, 97, 0.12);',
    color: 'black !important'
  },
  '& .Mui-selected': {
    backgroundColor: 'rgba(0, 151, 167, 0.08) !important',
    border: '1px solid #56C8D8 !important',
    color: '#0097A7 !important'
  },
  '& .MuiToggleButtonGroup-grouped': {
    borderTopRightRadius: '10px !important',
    borderTopLeftRadius: '10px !important',
    borderBottomRightRadius: '10px !important',
    borderBottomLeftRadius: '10px !important'
  }
});

type Tprops = {
  isOpen: boolean;
  isClose: any; // TODO: Add a valid type
};

const useStyles = makeStyles({
  main: {
    backgroundColor: 'white',
    height: '100vh',
    width: '100%',
    overflowY: 'scroll'
  },
  navBar: {
    padding: '8px 28px',
    zIndex: 2,
    position: 'fixed',
    boxShadow: '0px 4px 8px rgb(207 225 227 / 50%)',
    height: '56px',
    backgroundColor: 'white'
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
  datePicker: {
    '& > div': {
      minWidth: 355,
      height: 400
    },
    '& > div > div, & > div > div > div, & .MuiCalendarPicker-root': {
      width: 355,
      maxHeight: 600
    },
    '& .MuiTypography-caption': {
      width: 48,
      margin: 0
    },
    '& .PrivatePickersSlideTransition-root': {
      minHeight: 285,
      overflowY: 'hidden !important'
    },
    '& .MuiPickersDay-root': {
      width: 44,
      height: 43,
      padding: '5px 0px 5px 0px',
      border: '0px !important'
    },
    '& .Mui-selected': {
      backgroundColor: `${secondaryMainColor} !important`
    }
  }
});

const ArrowBackIcon = styled(MuiArrowBackIcon)({
  color: titlePageColor
});

function ModalAppointmentAvailability({ isOpen, isClose }: Tprops): JSX.Element {
  const classes = useStyles();
  const { t } = useTranslation([i18nMedicalDirectory, i18nGlobal]);
  const [value, setValue] = React.useState<Date | null>(null);
  const [selected, setSelected] = React.useState('');
  const currentI18nKey = i18next.language || window.localStorage.i18nextLng;
  const locale = dateFnsLocale[currentI18nKey || 'enUS'];
  const dispatch = useDispatch();

  const timeOptions = [
    { key: '6:00 am - 11:59 am' },
    { key: '12:00 pm - 5:59 pm' },
    { key: '6:00 pm - 11:59 pm' },
    { key: '12:00 am - 5:50 am' },
    { key: 'Cualquier hora' }
  ];

  const handleChange = (event: React.MouseEvent<HTMLElement>, newAlignment: string) => {
    setSelected(newAlignment);
  };

  const closeModal = () => {
    isClose(false);
  };
  const handlerSubmit = () => {
    dispatch(
      searchOnFilter({
        appointmentAvailability: {
          date: value.toISOString(),
          time: selected
        }
      })
    );
    isClose(false);
  };

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
                  onClick={() => closeModal()}
                >
                  <ArrowBackIcon width={16} height={16} />
                </IconButton>
              </Grid>
              <Grid item>{t('title.appoint_availability', { ns: i18nGlobal })}</Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid container pt={10}>
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <LocalizationProvider dateAdapter={AdapterDateFns} dateFormats={{}} locale={locale}>
                <Box className={classes.datePicker}>
                  <StaticDatePicker
                    disablePast
                    inputFormat="DD-MM-YYYY"
                    displayStaticWrapperAs="desktop"
                    label="Week picker"
                    toolbarFormat="MMM DDDD yyyy"
                    value={value}
                    onChange={newValue => {
                      setValue(newValue);
                      setSelected('');
                    }}
                    renderInput={params => <TextField {...params} />}
                  />
                </Box>
              </LocalizationProvider>
            </Box>
          </Grid>
          {value && (
            <Grid item xs={12} className={classes.actions}>
              <Typography variant="body1">
                {t('filters.optionsOrder.availableDatesCaption', { ns: i18nMedicalDirectory })}
              </Typography>
              <Box mt={2}>
                <ToggleButtonGroup
                  color="primary"
                  value={selected}
                  exclusive
                  onChange={handleChange}
                  sx={{ display: 'flex', flexWrap: 'wrap' }}
                >
                  {timeOptions.map((time, i) => (
                    <ToggleButton
                      key={i}
                      value={time.key}
                      sx={{
                        mr: 2,
                        mb: 2
                      }}
                    >
                      {time.key}
                    </ToggleButton>
                  ))}
                </ToggleButtonGroup>
              </Box>
            </Grid>
          )}

          <Grid item xs={12} className={classes.actions} mt={3} pb={3}>
            {selected && (
              <Button
                fullWidth
                variant="contained"
                disableElevation
                className={classes.btn}
                sx={{ textTransform: 'inherit' }}
                onClick={() => handlerSubmit()}
              >
                {t('button.save', { ns: i18nGlobal })}
              </Button>
            )}
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
}

export default ModalAppointmentAvailability;
