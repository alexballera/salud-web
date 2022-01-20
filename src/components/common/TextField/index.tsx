import React, { useState, ReactNode } from 'react';
/// MATERIAL - UI
import FormLabel from '@material-ui/core/FormLabel';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import FormControl from '@material-ui/core/FormControl';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FormHelperText from '@material-ui/core/FormHelperText';
import InputAdornment from '@material-ui/core/InputAdornment';
import CircularProgress from '@material-ui/core/CircularProgress';
/// MATERIAL - UI END

/// TYPES
import { FormControlProps, FormLabelProps, OutlinedInputProps } from '@material-ui/core';

/// TYPES END
/// i18n
import { useTranslation } from 'react-i18next';
import { NAMESPACE_KEY } from '../../../i18n/forms/i18n';
/// i18n END

type Props = {
  label: string;
  loading?: boolean;
  touched?: boolean;
  helperText: string;
  labelProps?: FormLabelProps;
  errorType?: string;
  handleLblError?: boolean;
  formControlProps?: { 'data-testid'?: string } & FormControlProps;
} & OutlinedInputProps;

function CustomTextField({
  label,
  loading,
  labelProps,
  helperText,
  formControlProps,
  errorType,
  handleLblError,
  ...props
}: Props): JSX.Element {
  const { t } = useTranslation(NAMESPACE_KEY);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handlerType = () => {
    switch (props.type) {
      case 'password':
        return showPassword ? 'text' : 'password';
      default:
        return props.type;
    }
  };
  const _renderEndAdornment = (): ReactNode => {
    switch (props.type) {
      case 'text':
        return (
          <InputAdornment position="end">
            {loading ? <CircularProgress size={20} /> : <></>}
          </InputAdornment>
        );

      case 'password':
        return (
          <InputAdornment position="end">
            <IconButton aria-label="toggle password visibility" onClick={handleClickShowPassword}>
              {showPassword ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        );
      default:
    }
  };

  const showErrorTypeMessage = (val: string) => {
    const type = {
      NotFound: `${t('validations.document.invalid')}`,
      default: ''
    };
    return type[val] || type['default'];
  };

  return (
    <FormControl fullWidth {...formControlProps}>
      <FormLabel
        htmlFor={props.id}
        error={(props.error || errorType) && handleLblError}
        style={{ marginBottom: 10 }}
        {...labelProps}
      >
        {label}
      </FormLabel>
      <OutlinedInput {...props} type={handlerType()} endAdornment={_renderEndAdornment()} />
      {(props.error || errorType) && (
        <FormHelperText error component="div">
          {helperText || showErrorTypeMessage(errorType)}
        </FormHelperText>
      )}
    </FormControl>
  );
}

CustomTextField.defaultProps = {
  color: 'secondary',
  labelProps: { margin: 'normal' },
  formControlProps: { margin: 'normal' }
};

export default CustomTextField;
