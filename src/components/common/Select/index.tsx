import React from 'react';
/// MATERIAL - UI
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import Autocomplete, { AutocompleteRenderInputParams } from '@material-ui/lab/Autocomplete';
import FormHelperText from '@material-ui/core/FormHelperText';
import LinearProgress from '@material-ui/core/LinearProgress';
/// MATERIAL - UI END

/// TYPES
import { FormControlProps, LinearProgressProps, TextField } from '@material-ui/core';
import { AutocompleteProps } from '@material-ui/lab';

/// TYPES END

type Props = {
  label: string;
  error: boolean;
  loading: boolean;
  helperText: any;
  formControlProps?: FormControlProps;
  linearProgressProps?: { 'data-testid': string } & LinearProgressProps;
  renderInput?: (params: AutocompleteRenderInputParams) => React.ReactNode;
} & AutocompleteProps<any, any, any, any>;

function CustomSelect({
  error,
  label,
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
      <Autocomplete
        renderInput={params => (
          <TextField {...params} error={error} variant="outlined" color="secondary" />
        )}
        {...props}
        id={props.id}
      />
      {loading && <LinearProgress {...linearProgressProps} color="secondary" />}
      {error && <FormHelperText error>{helperText}</FormHelperText>}
    </FormControl>
  );
}

export default CustomSelect;
