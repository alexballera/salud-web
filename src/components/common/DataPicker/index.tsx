import DateFnsUtils from '@date-io/date-fns';
import { es } from 'date-fns/locale';

/// MATERIAL - UI
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import { FormControlProps, FormLabelProps, createMuiTheme } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import { DatePicker, DatePickerProps, MuiPickersUtilsProvider } from '@material-ui/pickers';
/// MATERIAL - UI

type IProps = {
  labelProps?: FormLabelProps;
  formControlProps?: FormControlProps;
} & DatePickerProps;

const datepickerTheme = createMuiTheme({
  palette: {
    primary: {
      light: '#56c8d8',
      main: '#0097a7',
      dark: '#006978',
      contrastText: '#ffffff'
    }
  },
  typography: {
    fontFamily: 'Poppins, Roboto, sans-serif'
  },
  overrides: {
    MuiButton: {
      label: {
        textTransform: 'capitalize'
      }
    },
    MuiFormHelperText: {
      root: {
        '&$error': {
          textAlign: 'right'
        },
        '&$contained': {
          margin: 0
        }
      }
    }
  }
});

function DataPicker({ label, formControlProps, labelProps, ...props }: IProps): JSX.Element {
  return (
    <ThemeProvider theme={datepickerTheme}>
      <FormControl fullWidth {...formControlProps}>
        <FormLabel style={{ marginBottom: 10 }} {...labelProps}>
          {label}
        </FormLabel>
        <MuiPickersUtilsProvider utils={DateFnsUtils} locale={es}>
          <DatePicker {...props} margin="none" />
        </MuiPickersUtilsProvider>
      </FormControl>
    </ThemeProvider>
  );
}

export default DataPicker;
