import React from 'react';
import ReactCodeInput, { ReactCodeInputProps } from 'react-code-input';
/// MATERIAL - UI
import theme from '../../../utils/theme';
import FormControl from '@material-ui/core/FormControl';
import { FormControlProps, makeStyles } from '@material-ui/core';
/// MATERIAL - UI END

/// TYPES
type IProps = {
  label: string;
  formLabelProps?: any;
  formControlProps?: FormControlProps;
} & ReactCodeInputProps;
/// TYPES END

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex'
  }
}));

function CodeInput({ label, formControlProps, formLabelProps, ...props }: IProps): JSX.Element {
  const classes = useStyles();

  return (
    <FormControl {...formControlProps} fullWidth margin="normal" className={classes.root}>
      <label
        style={{ color: 'rgba(0,0,0,.54)', display: 'flex', flexDirection: 'column' }}
        {...formLabelProps}
      >
        <p style={{ marginBottom: 10 }}>{label}</p>
        <ReactCodeInput
          inputStyle={{
            width: 43,
            height: 43,
            fontSize: 20,
            textAlign: 'center',
            marginRight: 5,
            borderColor: 'rgba(0,0,0,.23)',
            borderWidth: 1,
            borderRadius: 4,
            outlineColor: theme.palette.secondary.main
          }}
          {...props}
        />
      </label>
    </FormControl>
  );
}

export default CodeInput;
