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

const customtMaterialTheme = createMuiTheme({
  overrides: {
    MuiButton: {
      label: {
        textTransform: 'capitalize'
      }
    },
    MuiFormLabel: {
      root: {
        fontFamily: 'Poppins, Roboto, sans-serif'
      }
    },
    MuiFormHelperText: {
      root: {
        fontFamily: 'Poppins, Roboto, sans-serif',
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
    <ThemeProvider theme={customtMaterialTheme}>
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
