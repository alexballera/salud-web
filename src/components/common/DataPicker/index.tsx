import DateFnsUtils from '@date-io/date-fns';

/// MATERIAL - UI
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import { FormControlProps, FormLabelProps } from '@material-ui/core';
import { DatePicker, DatePickerProps, MuiPickersUtilsProvider } from '@material-ui/pickers';
/// MATERIAL - UI

type IProps = {
  labelProps?: FormLabelProps;
  formControlProps?: FormControlProps;
} & DatePickerProps;

function DataPicker({ label, formControlProps, labelProps, ...props }: IProps): JSX.Element {
  return (
    <FormControl fullWidth {...formControlProps}>
      <FormLabel style={{ marginBottom: 10 }} {...labelProps}>
        {label}
      </FormLabel>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <DatePicker {...props} />
      </MuiPickersUtilsProvider>
    </FormControl>
  );
}

export default DataPicker;
