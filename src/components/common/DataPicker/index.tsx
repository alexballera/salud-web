/// DATE-FNS
import DateFnsUtils from '@date-io/date-fns';
import * as dateFnsLocale from 'date-fns/locale';
/// DATE-FNS END

/// i18n
import i18next from 'i18next';
/// i18n END

/// MATERIAL - UI
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import { FormControlProps, FormLabelProps, createMuiTheme, ThemeOptions } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import { DatePicker, DatePickerProps, MuiPickersUtilsProvider } from '@material-ui/pickers';
/// MATERIAL - UI

/// THEME
import {
  poppinsFontFamily,
  secondaryContrastTextColor,
  primaryLightColor,
  primaryDarkColor,
  primaryMainColor,
  secondaryMainColor
} from '../../../styles/js/theme';
/// THEME END

type IProps = {
  labelProps?: FormLabelProps;
  formControlProps?: FormControlProps;
} & DatePickerProps;

const datepickerTheme = createMuiTheme({
  palette: {
    primary: {
      light: primaryLightColor,
      main: primaryMainColor,
      dark: primaryDarkColor,
      contrastText: secondaryContrastTextColor
    }
  },
  typography: {
    fontFamily: poppinsFontFamily
  },
  overrides: {
    MuiPickersToolbar: {
      toolbar: {
        backgroundColor: primaryMainColor
      }
    },
    MuiButton: {
      label: {
        textTransform: 'capitalize'
      }
    },
    MuiFormLabel: {
      root: {
        fontSize: '14px',
        lineHeight: '12px',
        color: 'rgba(0, 0, 0, 0.87)'
      }
    },
    MuiFormHelperText: {
      root: {
        '&$contained': {
          margin: 0
        }
      }
    },
    MuiOutlinedInput: {
      root: {
        '& fieldset': {
          top: 0
        },
        '&$focused': {
          '& fieldset': {
            borderColor: `${secondaryMainColor} !important`
          }
        }
      }
    }
  }
} as ThemeOptions);

function DataPicker({ label, formControlProps, labelProps, ...props }: IProps): JSX.Element {
  const currentI18nKey = i18next.language || window.localStorage.i18nextLng;
  const locale = dateFnsLocale[currentI18nKey || 'enUS'];

  return (
    <ThemeProvider theme={datepickerTheme}>
      <FormControl fullWidth {...formControlProps}>
        <FormLabel style={{ marginBottom: 10 }} {...labelProps}>
          {label}
        </FormLabel>
        <MuiPickersUtilsProvider utils={DateFnsUtils} locale={locale}>
          <DatePicker {...props} color="primary" />
        </MuiPickersUtilsProvider>
      </FormControl>
    </ThemeProvider>
  );
}

export default DataPicker;
