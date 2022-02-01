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
import { NAMESPACE_KEY as i18nGlobals } from '../../../i18n/globals/i18n';
/// i18n END

export type TPass = {
  passwordConfirmError: string;
};

function PasswordData({
  values,
  handleBlur,
  handleChange,
  passwordConfirmError
}: FormikProps<IPasswordDataForm> & TPass): JSX.Element {
  const { t } = useTranslation(i18nGlobals);
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
        onChange={handleChange}
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
        onChange={handleChange}
        error={Boolean(passwordConfirmError)}
        helperText={passwordConfirmError}
        handleLblError
      />
    </Box>
  );
}

export default PasswordData;
