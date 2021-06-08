import React, { useState, useEffect } from 'react';
/// FORM
import * as yup from 'yup';
import { FormikProps } from 'formik';
/// TYPES
import { ICredentialDataForm, IEmailStates } from '../index.types';
/// SERVICES
import { getPersonalData } from '../../../services/getPersonalData.service';
/// OWN COMPONENTS
import SecurityPasswordIdicator from '../../../components/common/SecurityPasswordIndicator';
/// MATERIAL-UI
import Input from '@material-ui/core/Input';
import Switch from '@material-ui/core/Switch';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import InputLabel from '@material-ui/core/InputLabel';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import FormControl from '@material-ui/core/FormControl';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import FormHelperText from '@material-ui/core/FormHelperText';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import CircularProgress from '@material-ui/core/CircularProgress';
/// MATERIAL-UI END

/// INITIAL STATES
const initialEmailStates: IEmailStates = {
  message: '',
  fetching: false
};
/// INITIAL STATES END

function CredentialData({
  values,
  errors,
  touched,
  handleBlur,
  handleChange
}: FormikProps<ICredentialDataForm>): JSX.Element {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [inputEmailStates, setInputEmailStates] = useState(initialEmailStates);
  const handleClickShowPassword = (): void => {
    setShowPassword(!showPassword);
  };

  /// USE EFFECTS
  useEffect(() => {
    const regexp = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    if (regexp.test(values.email)) {
      setInputEmailStates({ ...inputEmailStates, fetching: true });
      getPersonalData(values.email)
        .then(() => {
          setInputEmailStates({
            message: 'Este correo ya fue registrado previamente',
            fetching: false
          });
        })
        .catch(() => {
          setInputEmailStates({
            message: '',
            fetching: false
          });
        });
    }
  }, [values.email]);
  /// USE EFFECTS END

  return (
    <div>
      <FormControl variant="filled" fullWidth margin="normal">
        <InputLabel htmlFor="email">Correo electrónico</InputLabel>
        <Input
          fullWidth
          id="email"
          name="email"
          value={values.email}
          error={touched.email && (Boolean(errors.email) || Boolean(inputEmailStates.message))}
          onBlur={handleBlur}
          onChange={handleChange}
          endAdornment={
            <InputAdornment position="end">
              {inputEmailStates.fetching && <CircularProgress size={20} />}
            </InputAdornment>
          }
        />
        {touched.email && (errors.email || inputEmailStates.message) && (
          <FormHelperText error>
            {errors.email ? errors.email : inputEmailStates.message}
          </FormHelperText>
        )}
      </FormControl>
      <FormControl variant="filled" fullWidth margin="normal">
        <InputLabel htmlFor="password">Contraseña</InputLabel>
        <Input
          fullWidth
          id="password"
          name="password"
          type={showPassword ? 'text' : 'password'}
          value={values.password}
          error={touched.password && Boolean(errors.password)}
          onBlur={handleBlur}
          onChange={handleChange}
          endAdornment={
            <InputAdornment position="end">
              <IconButton aria-label="toggle password visibility" onClick={handleClickShowPassword}>
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          }
        />
        {touched.password && errors.password && (
          <FormHelperText error>{errors.password}</FormHelperText>
        )}
      </FormControl>
      <SecurityPasswordIdicator value={values.password} />
      <FormControl variant="filled" fullWidth margin="normal">
        <InputLabel htmlFor="confirmPassword">Contraseña</InputLabel>
        <Input
          fullWidth
          id="confirmPassword"
          name="confirmPassword"
          type={showPassword ? 'text' : 'password'}
          value={values.confirmPassword}
          error={touched.confirmPassword && Boolean(errors.confirmPassword)}
          onBlur={handleBlur}
          onChange={handleChange}
          endAdornment={
            <InputAdornment position="end">
              <IconButton aria-label="toggle password visibility" onClick={handleClickShowPassword}>
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          }
        />
        {touched.confirmPassword && errors.confirmPassword && (
          <FormHelperText error>{errors.confirmPassword}</FormHelperText>
        )}
      </FormControl>
      <FormGroup>
        <FormControlLabel
          name="superappUser"
          value={values.superappUser}
          label="¿Sos usuario de OMNI La SuperApp?"
          control={<Switch onChange={handleChange} color="primary" />}
          labelPlacement="start"
        />
        <FormControlLabel
          control={
            <Checkbox checked={values.terms} onChange={handleChange} name="terms" color="primary" />
          }
          label="Acepto terminos y condiciones"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={values.services}
              onChange={handleChange}
              name="services"
              color="primary"
            />
          }
          label="Acepto consentimiento informado"
        />
      </FormGroup>
    </div>
  );
}

/// STEP VALIDATIONS
CredentialData.title = 'Credenciales de ingreso';
CredentialData.description =
  'Estos datos se usarán unicamente con propósitos médicos dentro de la plataforma';
CredentialData.validations = {
  name: 'CredentialStep',
  schema: yup.object().shape({
    terms: yup.bool().oneOf([true], 'Campo requerido').required('Campo requerido'),
    email: yup.string().email('Formato de correo incorrecto').required('Email requerido'),
    services: yup.bool().oneOf([true], 'Campo requerido').required('Campo requerido'),
    password: yup
      .string()
      .required('Contraseña requerida')
      .min(8, 'La contraseña debe ser de al menos 8 caracteres')
      .matches(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/,
        'La contraseña debe contener al menos una letra mayúscula, una letra minúscula y un número'
      ),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password'), null], 'La contraseña no coincide')
      .required('Campo Requerido')
  })
};
/// STEP VALIDATIONS END

export default CredentialData;
