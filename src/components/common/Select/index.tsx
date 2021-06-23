import React from 'react';
/// MATERIAL - UI
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import Autocomplete from '@material-ui/lab/Autocomplete';
import FormHelperText from '@material-ui/core/FormHelperText';
import LinearProgress from '@material-ui/core/LinearProgress';
/// MATERIAL - UI END

/// TYPES
import { FormControlProps, LinearProgressProps } from '@material-ui/core';
import { AutocompleteProps } from '@material-ui/lab';

/// TYPES END

type Props = {
  label: string;
  error: boolean;
  loading: boolean;
  touched: boolean;
  helperText: string;
  formControlProps?: FormControlProps;
  linearProgressProps?: { 'data-testid': string } & LinearProgressProps;
} & AutocompleteProps<any, any, any, any>;

function CustomSelect({
  error,
  label,
  touched,
  loading,
  helperText,
  formControlProps,
  linearProgressProps,
  ...props
}: Props): JSX.Element {
  return (
    <FormControl {...formControlProps} fullWidth margin="normal">
      <FormLabel htmlFor={props.id} style={{ marginBottom: 10 }}>
        {label}
      </FormLabel>
      <Autocomplete {...props} id={props.id} />
      {loading && <LinearProgress {...linearProgressProps} color="secondary" />}
      {touched && error && <FormHelperText error>{helperText}</FormHelperText>}
    </FormControl>
  );
}

export default CustomSelect;
