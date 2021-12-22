import React from 'react';
import { FormikProps } from 'formik';
/// TYPES
import { IPasswordDataForm } from '../../../types/recover.types';
/// MATERIAL-UI
import { Box } from '@material-ui/core';
/// MATERIAL-UI END
import TextField from '../../../components/common/TextField';
import SecurityPasswordIndicator from '../../../components/common/SecurityPasswordIndicator';

/// i18n
import { useTranslation } from 'react-i18next';
import { NAMESPACE_KEY } from '../../../i18n/globals/i18n';
/// i18n END

function PasswordData({
  values,
  errors,
  touched,
  handleBlur,
  handleChange
}: FormikProps<IPasswordDataForm>): JSX.Element {
  const { t } = useTranslation(NAMESPACE_KEY);
  return (
    <Box>
      <TextField
        fullWidth
        id="newPassword"
        data-testid="password-input"
        name="newPassword"
        label={t('label.password.new')}
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
        label={t('label.password.confirm')}
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

export default PasswordData;
