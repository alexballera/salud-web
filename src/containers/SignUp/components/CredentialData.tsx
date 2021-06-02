import React from 'react';
import { FormikProps } from 'formik';
/// TYPES
import { ICredentialDataForm } from '../index.types';
/// MATERIAL-UI
import Switch from '@material-ui/core/Switch';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import FormGroup from '@material-ui/core/FormGroup';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
/// MATERIAL-UI END

function ExtraData({
  values,
  errors,
  touched,
  handleChange
}: FormikProps<ICredentialDataForm>): JSX.Element {
  return (
    <div>
      <FormControl fullWidth margin="normal">
        <TextField
          fullWidth
          id="email"
          name="email"
          label="Correo electrónico"
          value={values.email}
          error={touched.email && Boolean(errors.email)}
          variant="filled"
          onChange={handleChange}
          helperText={touched.email && errors.email}
        />
      </FormControl>
      <FormControl fullWidth margin="normal">
        <TextField
          fullWidth
          id="password"
          name="password"
          label="Contraseña"
          value={values.password}
          error={touched.password && Boolean(errors.password)}
          variant="filled"
          onChange={handleChange}
          helperText={touched.password && errors.password}
        />
      </FormControl>
      <FormControl fullWidth margin="normal">
        <TextField
          fullWidth
          id="confirmPassword"
          name="confirmPassword"
          label="Confirmar contraseña"
          value={values.confirmPassword}
          error={touched.confirmPassword && Boolean(errors.confirmPassword)}
          variant="filled"
          onChange={handleChange}
          helperText={touched.confirmPassword && errors.confirmPassword}
        />
      </FormControl>
      <FormGroup>
        <FormControlLabel
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

export default ExtraData;
