import React, { useState, useEffect } from 'react';
/// FORM
import { FormikProps } from 'formik';

/// TYPES
import { ICredentialDataForm, ICredentialDataProps, IEmailStates } from '../index.types';

/// SERVICES
import { getPersonalData } from '../../../services/getPersonalData.service';

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
import { NAMESPACE_KEY } from '../../../i18n/globals/i18n';
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
  touched,
  handleBlur,
  handleChange,
  updatePassword,
  updateEmail
}: ICredentialDataProps & FormikProps<ICredentialDataForm>): JSX.Element {
  const { t } = useTranslation([NAMESPACE_KEY, 'forms']);
  const [inputEmailStates, setInputEmailStates] = useState(initialEmailStates);
  const [termsAndConditionOpen, setTermsAndConditionOpen] = useState(false);
  const [informedConsentOpen, setInformedConsentOpen] = useState(false);
  /// USE EFFECTS
  useEffect(() => {
    const regexp = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    if (regexp.test(values.email)) {
      setInputEmailStates({ ...inputEmailStates, fetching: true });
      getPersonalData(values.email)
        .then(() => {
          setInputEmailStates({
            message: `${t('message.email.is_register', { ns: 'forms' })}`,
            fetching: false
          });
        })
        .catch(() => {
          setInputEmailStates({
            message: '',
            fetching: false
          });
        });
    }
  }, [values.email]);
  /// USE EFFECTS END

  return (
    <>
      {!updatePassword && (
        <Input
          fullWidth
          id="email"
          name="email"
          type="email"
          label={t('label.email.email', { ns: NAMESPACE_KEY })}
          value={values.email}
          error={touched.email && (Boolean(errors.email) || Boolean(inputEmailStates.message))}
          onBlur={handleBlur}
          loading={inputEmailStates.fetching}
          onChange={handleChange}
          helperText={errors.email ? errors.email : inputEmailStates.message}
        />
      )}
      {!updateEmail && (
        <>
          <Input
            fullWidth
            id="password"
            name="password"
            type="password"
            label={
              updatePassword
                ? `${t('label.password.new', { ns: NAMESPACE_KEY })}`
                : `${t('label.password.password', { ns: NAMESPACE_KEY })}`
            }
            value={values.password}
            error={touched.password && Boolean(errors.password)}
            onBlur={handleBlur}
            onChange={handleChange}
            helperText={errors.password}
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
            label={
              updatePassword
                ? `${t('label.password.label', { ns: NAMESPACE_KEY })}`
                : `${t('label.password.confirm', { ns: NAMESPACE_KEY })}`
            }
            value={values.confirmPassword}
            error={touched.confirmPassword && Boolean(errors.confirmPassword)}
            onBlur={handleBlur}
            onChange={handleChange}
            helperText={errors.confirmPassword}
            inputProps={{
              maxLength: 16
            }}
          />
        </>
      )}

      {!updateEmail && !updatePassword && (
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
                  {t('label.accept', { ns: NAMESPACE_KEY })}{' '}
                  <Link
                    underline="always"
                    component="span"
                    variant="body1"
                    onClick={() => setTermsAndConditionOpen(true)}
                    style={{ cursor: 'pointer' }}
                  >
                    {t('label.terms', { ns: NAMESPACE_KEY })}
                  </Link>
                </Typography>
              }
            />
            {touched.terms && !values.terms && (
              <FormHelperText error>{errors.terms}</FormHelperText>
            )}

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
                  {t('label.accept', { ns: NAMESPACE_KEY })}{' '}
                  <Link
                    underline="always"
                    component="span"
                    variant="body1"
                    onClick={() => setInformedConsentOpen(true)}
                    style={{ cursor: 'pointer' }}
                  >
                    {t('label.consent', { ns: NAMESPACE_KEY })}
                  </Link>
                </Typography>
              }
            />
          </FormGroup>
          {touched.services && !values.services && (
            <FormHelperText error>{errors.services}</FormHelperText>
          )}
        </FormControl>
      )}

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
