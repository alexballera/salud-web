import React from 'react';
import { FormikProps } from 'formik';
import * as yup from 'yup';
/// TYPES
import { IEmailDataForm } from '../../../types/recover.types';
/// MATERIAL-UI
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import { Box } from '@material-ui/core';
/// MATERIAL-UI END

function EmailData({
  values,
  errors,
  touched,
  handleChange
}: FormikProps<IEmailDataForm>): JSX.Element {
  return (
    <Box>
      <FormControl fullWidth margin="normal">
        <TextField
          fullWidth
          id="email"
          name="email"
          data-testid="email-input"
          label="Correo electrónico"
          value={values.email}
          error={touched.email && Boolean(errors.email)}
          variant="filled"
          onChange={handleChange}
          helperText={touched.email && errors.email}
        />
      </FormControl>
    </Box>
  );
}

EmailData.title = 'Recuperar contraseña';
EmailData.description = 'Para recuperar su contraseña requerimos verificar su identidad';

EmailData.validations = {
  name: 'EmailStep',
  schema: yup.object().shape({
    email: yup
      .string()
      .email('Formato de correo incorrecto')
      .matches(/(.*\.[a-zA-Z]{2,}){1,}$/, 'Formato de correo incorrecto')
      .required('Email requerido')
  })
};

export default EmailData;
