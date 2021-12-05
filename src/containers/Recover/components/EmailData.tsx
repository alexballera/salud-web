import React from 'react';
import { FormikProps } from 'formik';
import * as yup from 'yup';
/// TYPES
import { IEmailDataForm } from '../../../types/recover.types';
/// MATERIAL-UI
import TextField from '../../../components/common/TextField';
import { Box } from '@material-ui/core';
/// i18n
import { useTranslation } from 'react-i18next';
import { NAMESPACE_KEY } from '../../../i18n/globals/i18n';
/// i18n END

/// MATERIAL-UI END
function EmailData({
  values,
  errors,
  touched,
  handleBlur,
  handleChange
}: FormikProps<IEmailDataForm>): JSX.Element {
  const { t } = useTranslation(NAMESPACE_KEY);
  return (
    <Box>
      <TextField
        fullWidth
        id="email"
        name="email"
        formControlProps={{
          'data-testid': 'email-input'
        }}
        label={t('label.email.email')}
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
