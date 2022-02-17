/// IMPORTS
import { useEffect, useState } from 'react';
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
import { FormControl, FormHelperText, Link, Typography } from '@material-ui/core';
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
  touched,
  setCustomPopUpError
}: TCredentialDataProps & FormikProps<TCredentialDataForm | TFormData>): JSX.Element {
  const { t } = useTranslation([i18nGlobal, i18Forms]);
  const [inputEmailStates, setInputEmailStates] = useState(initialEmailStates);
  const [termsAndConditionOpen, setTermsAndConditionOpen] = useState(false);
  const [informedConsentOpen, setInformedConsentOpen] = useState(false);

  const handleGlobalFormErrors = () => {
    if (errors.confirmPassword) {
      setCustomPopUpError(t('validations.password.matched', { ns: i18Forms }));
      return;
    }
    if (errors.terms) {
      setCustomPopUpError(t('validations.terms', { ns: i18Forms }));
      return;
    }
    if (errors.services) {
      setCustomPopUpError(t('validations.services', { ns: i18Forms }));
    }
  };

  useEffect(() => {
    const flatErrors = Object.values(errors);
    if (flatErrors.includes(t('validations.required', { ns: i18Forms }))) {
      setCustomPopUpError(null);
      return;
    }
    handleGlobalFormErrors();
  }, [errors.terms, errors.services, errors.confirmPassword]);

  return (
    <>
      <Input
        fullWidth
        id="email"
        name="email"
        type="email"
        label={t('label.email.email', { ns: i18nGlobal })}
        value={values.email}
        error={errors.email && touched.email}
        helperText={errors.email}
        onBlur={handleBlur}
        loading={inputEmailStates.fetching}
        handleLblError
        onChange={handleChange}
      />
      <Input
        fullWidth
        id="password"
        name="password"
        type="password"
        label={t('label.password.password', { ns: i18nGlobal })}
        value={values.password}
        error={errors.password && touched.password}
        helperText={errors.password}
        onBlur={handleBlur}
        onChange={handleChange}
        handleLblError
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
        error={errors.confirmPassword && touched.confirmPassword}
        onBlur={handleBlur}
        onChange={handleChange}
        helperText={errors.confirmPassword}
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
              <Typography
                component="label"
                variant="body1"
                style={{
                  fontSize: '14px'
                }}
              >
                {t('label.accept', { ns: i18nGlobal })}{' '}
                <Link
                  underline="always"
                  component="span"
                  variant="body1"
                  onClick={() => setTermsAndConditionOpen(true)}
                  style={{ cursor: 'pointer', color: '#FF4003', fontSize: '14px' }}
                >
                  {t('label.terms', { ns: i18nGlobal })}
                </Link>
              </Typography>
            }
          />
          {touched.terms && !values.terms && <FormHelperText error>{errors.terms}</FormHelperText>}

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
              <Typography
                component="label"
                variant="body1"
                style={{
                  fontSize: '14px'
                }}
              >
                {t('label.accept', { ns: i18nGlobal })}{' '}
                <Link
                  underline="always"
                  component="span"
                  variant="body1"
                  onClick={() => setInformedConsentOpen(true)}
                  style={{ cursor: 'pointer', color: '#FF4003', fontSize: '14px' }}
                >
                  {t('label.consent', { ns: i18nGlobal })}
                </Link>
              </Typography>
            }
          />
          {touched.services && !values.services && (
            <FormHelperText error>{errors.services}</FormHelperText>
          )}
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
