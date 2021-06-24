import React, { useEffect } from 'react';
import { FormikProps } from 'formik';
import * as yup from 'yup';
/// TYPES
import { IEmailDataForm } from '../../../types/recover.types';
/// MATERIAL-UI
import TextField from '../../../components/common/TextField';
import FormControl from '@material-ui/core/FormControl';
import { Box } from '@material-ui/core';

/// MATERIAL-UI END

function EmailData({
  values,
  errors,
  touched,
  handleBlur,
  handleChange
}: FormikProps<IEmailDataForm>): JSX.Element {
  return (
    <Box>
      <TextField
        fullWidth
        id="email"
        name="email"
<<<<<<< HEAD
        formControlProps={{
          'data-testid': 'email-input'
        }}
=======
        data-testid="email-input"
>>>>>>> SLD-589 step 1 high fidelity
        label="Correo electrónico"
        onBlur={handleBlur}
        value={values.email}
        error={touched.email && Boolean(errors.email)}
        onChange={handleChange}
        helperText={touched.email && errors.email}
      />
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
