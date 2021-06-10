import React from 'react';
import { FormikProps } from 'formik';
import * as yup from 'yup';
/// TYPES
import { IPasswordDataForm } from '../../../types/recover.types';
/// MATERIAL-UI
import FormControl from '@material-ui/core/FormControl';
import { Box, TextField } from '@material-ui/core';
/// MATERIAL-UI END

function PasswordData({
  values,
  errors,
  touched,
  handleChange
}: FormikProps<IPasswordDataForm>): JSX.Element {
  return (
    <Box>
      <FormControl fullWidth margin="normal">
        <TextField
          fullWidth
          id="newPassword"
          name="newPassword"
          label="Nueva contraseña"
          type="password"
          value={values.newPassword}
          error={touched.newPassword && Boolean(errors.newPassword)}
          variant="filled"
          onChange={handleChange}
          helperText={touched.newPassword && errors.newPassword}
        />
      </FormControl>
      <FormControl fullWidth margin="normal">
        <TextField
          fullWidth
          id="newPasswordConfirm"
          name="newPasswordConfirm"
          label="Confirmar contraseña"
          type="password"
          value={values.newPasswordConfirm}
          error={touched.newPasswordConfirm && Boolean(errors.newPasswordConfirm)}
          variant="filled"
          onChange={handleChange}
          helperText={touched.newPasswordConfirm && errors.newPasswordConfirm}
        />
      </FormControl>
    </Box>
  );
}

PasswordData.title = 'Recuperar contraseña';
PasswordData.description = 'Para recuperar su contraseña requerimos verificar su identidad';

PasswordData.validations = {
  name: 'PasswordStep',
  schema: yup.object().shape({
    newPassword: yup
      .string()
      .required('Contraseña requerida')
      .min(8, 'La contraseña debe ser de al menos 8 caracteres')
      .matches(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/,
        'La contraseña debe contener al menos una letra mayúscula, una letra minúscula y un número'
      ),
    newPasswordConfirm: yup
      .string()
      .oneOf([yup.ref('newPassword'), null], 'La contraseña no coincide')
      .required('Campo Requerido')
  })
};

export default PasswordData;
