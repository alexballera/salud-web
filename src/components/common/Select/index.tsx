/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef } from 'react';
/// MATERIAL - UI
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import Autocomplete from '@material-ui/lab/Autocomplete';
import FormHelperText from '@material-ui/core/FormHelperText';
import LinearProgress from '@material-ui/core/LinearProgress';
import TextField from '@material-ui/core/TextField';
/// MATERIAL - UI END

/// TYPES
import { AutocompleteProps } from '@material-ui/lab';
import { FormControlProps, LinearProgressProps } from '@material-ui/core';
/// TYPES END

// STYLES
import { makeStyles } from '@material-ui/core/styles';
/// STYLES END

type TProps = Omit<AutocompleteProps<any, any, any, any>, 'renderInput'> & {
  label: string;
  error: boolean;
  loading: boolean;
  helperText: any;
  formControlProps?: FormControlProps;
  linearProgressProps?: { 'data-testid': string } & LinearProgressProps;
};

const useStyles = makeStyles({
  customTextField: {
    '& input::placeholder': {
      fontSize: '16px',
      opacity: 1
    }
  }
});

function CustomSelect({
  error,
  label,
  loading,
  helperText,
  formControlProps,
  linearProgressProps,
  ...props
}: TProps): JSX.Element {
  const inputRef = useRef<any>(null);
  const classes = useStyles();

  // Currently the placeholder with i18n does not work, this hook fix that issue
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.placeholder = props.placeholder;
    }
  }, [props.placeholder]);

  return (
    <FormControl {...formControlProps} fullWidth margin="normal">
      <FormLabel htmlFor={props.id} error={error} style={{ marginBottom: 10 }}>
        {label}
      </FormLabel>
      <Autocomplete
        placeholder="asdfas"
        renderInput={params => (
          <TextField
            {...params}
            error={error}
            inputRef={inputRef}
            className={classes.customTextField}
            variant="outlined"
            color="secondary"
          />
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
