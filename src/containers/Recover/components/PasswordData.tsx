import React from 'react';
import { FormikProps } from 'formik';
import * as yup from 'yup';
/// TYPES
import { IPasswordDataForm } from '../../../types/recover.types';
/// MATERIAL-UI
import FormControl from '@material-ui/core/FormControl';
import { Box } from '@material-ui/core';
/// MATERIAL-UI END
import TextField from '../../../components/common/TextField';
import SecurityPasswordIndicator from '../../../components/common/SecurityPasswordIndicator';

function PasswordData({
  values,
  errors,
  touched,
  handleBlur,
  handleChange
}: FormikProps<IPasswordDataForm>): JSX.Element {
  return (
    <Box>
      <TextField
        fullWidth
        id="newPassword"
        data-testid="password-input"
        name="newPassword"
        label="Nueva contraseña"
        type="password"
        onBlur={handleBlur}
        value={values.newPassword}
        error={touched.newPassword && Boolean(errors.newPassword)}
        onChange={handleChange}
        helperText={touched.newPassword && errors.newPassword}
      />
      <SecurityPasswordIndicator value={values.newPassword} />
      <TextField
        fullWidth
        id="newPasswordConfirm"
        data-testid="password-confirm-input"
        name="newPasswordConfirm"
        label="Confirmar contraseña"
        type="password"
        onBlur={handleBlur}
        value={values.newPasswordConfirm}
        error={touched.newPasswordConfirm && Boolean(errors.newPasswordConfirm)}
        onChange={handleChange}
        helperText={touched.newPasswordConfirm && errors.newPasswordConfirm}
      />
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
