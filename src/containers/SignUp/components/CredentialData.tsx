/// IMPORTS
import { useState } from 'react';
/// IMPORTS END

/// FORM
import { FormikProps } from 'formik';
/// FORM END

/// TYPES
import { TCredentialDataProps, IEmailStates, TCredentialDataForm, TFormData } from '../index.types';
/// TYPES END

/// SERVICES
/// SERVICES END

/// OWN COMPONENTS
import Input from '../../../components/common/TextField';
import SecurityPasswordIdicator from '../../../components/common/SecurityPasswordIndicator';
import Modal from '../../../components/common/Modal';
import TermsAndConditions from '../../../components/TermsAndConditions';
import InformedConsent from '../../../components/InformedConsent';
/// OWN COMPONENTS END

/// MATERIAL-UI
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { FormControl, Link, Typography } from '@material-ui/core';
/// MATERIAL-UI END

/// i18n
import { useTranslation } from 'react-i18next';
import { NAMESPACE_KEY as i18nGlobal } from '../../../i18n/globals/i18n';
import { NAMESPACE_KEY as i18Forms } from '../../../i18n/forms/i18n';

/// i18n END

/// INITIAL STATES
const initialEmailStates: IEmailStates = {
  message: '',
  fetching: false
};
/// INITIAL STATES END

function CredentialData({
  values,
  errors,
  handleBlur,
  handleChange,
  errorConfirmPassword
}: TCredentialDataProps & FormikProps<TCredentialDataForm | TFormData>): JSX.Element {
  const { t } = useTranslation([i18nGlobal, i18Forms]);
  const [inputEmailStates, setInputEmailStates] = useState(initialEmailStates);
  const [termsAndConditionOpen, setTermsAndConditionOpen] = useState(false);
  const [informedConsentOpen, setInformedConsentOpen] = useState(false);

  const setErrorMsgConfirmPassword = (): string => {
    if (errorConfirmPassword) {
      return t('validations.password.matched', { ns: i18Forms });
    }
  };

  const setErrorInputConfirmPassword = (): boolean => {
    if (errorConfirmPassword) {
      return true;
    }
  };

  return (
    <>
      <Input
        fullWidth
        id="email"
        name="email"
        type="email"
        label={t('label.email.email', { ns: i18nGlobal })}
        value={values.email}
        onBlur={handleBlur}
        loading={inputEmailStates.fetching}
        onChange={handleChange}
      />
      <Input
        fullWidth
        id="password"
        name="password"
        type="password"
        label={t('label.password.password', { ns: i18nGlobal })}
        value={values.password}
        onBlur={handleBlur}
        onChange={handleChange}
        inputProps={{
          maxLength: 16
        }}
      />
      <SecurityPasswordIdicator value={values.password} />
      <Input
        fullWidth
        id="confirmPassword"
        name="confirmPassword"
        type="password"
        label={t('label.password.confirm_password', { ns: i18nGlobal })}
        value={values.confirmPassword}
        error={setErrorInputConfirmPassword()}
        onBlur={handleBlur}
        onChange={handleChange}
        helperText={setErrorMsgConfirmPassword()}
        handleLblError
        inputProps={{
          maxLength: 16
        }}
      />
      <FormControl>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                id="termsandconditions"
                checked={values.terms}
                onChange={handleChange}
                name="terms"
                color="primary"
                style={{ zIndex: 3 }}
              />
            }
            label={
              <Typography component="label" variant="body1">
                {t('label.accept', { ns: i18nGlobal })}{' '}
                <Link
                  underline="always"
                  component="span"
                  variant="body1"
                  onClick={() => setTermsAndConditionOpen(true)}
                  style={{ cursor: 'pointer', color: '#FF4003' }}
                >
                  {t('label.terms', { ns: i18nGlobal })}
                </Link>
              </Typography>
            }
          />

          <FormControlLabel
            control={
              <Checkbox
                id="consent"
                checked={values.services}
                onChange={handleChange}
                name="services"
                color="primary"
              />
            }
            label={
              <Typography component="label" variant="body1">
                {t('label.accept', { ns: i18nGlobal })}{' '}
                <Link
                  underline="always"
                  component="span"
                  variant="body1"
                  onClick={() => setInformedConsentOpen(true)}
                  style={{ cursor: 'pointer', color: '#FF4003' }}
                >
                  {t('label.consent', { ns: i18nGlobal })}
                </Link>
              </Typography>
            }
          />
        </FormGroup>
      </FormControl>

      <Modal open={termsAndConditionOpen} onClose={() => setTermsAndConditionOpen(false)}>
        <TermsAndConditions />
      </Modal>
      <Modal open={informedConsentOpen} onClose={() => setInformedConsentOpen(false)}>
        <InformedConsent />
      </Modal>
    </>
  );
}

export default CredentialData;
