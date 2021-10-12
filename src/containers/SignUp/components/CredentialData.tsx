import React, { useState, useEffect } from 'react';
/// FORM
import * as yup from 'yup';
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
            message: 'Este correo ya fue registrado previamente',
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
          type="text"
          label="Correo electrónico"
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
            label={updatePassword ? 'Contraseña nueva' : 'Contraseña'}
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
            label={updatePassword ? 'Confirmación de nueva contraseña' : 'Contraseña'}
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

      {!updatePassword ||
        (!updateEmail && (
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
                    Acepto{' '}
                    <Link
                      underline="always"
                      component="span"
                      variant="body1"
                      onClick={() => setTermsAndConditionOpen(true)}
                      style={{ cursor: 'pointer' }}
                    >
                      términos y condiciones
                    </Link>
                  </Typography>
                }
              />
              {!values.terms && <FormHelperText error>{errors.terms}</FormHelperText>}

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
                    Acepto{' '}
                    <Link
                      underline="always"
                      component="span"
                      variant="body1"
                      onClick={() => setInformedConsentOpen(true)}
                      style={{ cursor: 'pointer' }}
                    >
                      consentimiento informado
                    </Link>
                  </Typography>
                }
              />
            </FormGroup>
            {!values.services && <FormHelperText error>{errors.services}</FormHelperText>}
          </FormControl>
        ))}

      <Modal open={termsAndConditionOpen} onClose={() => setTermsAndConditionOpen(false)}>
        <TermsAndConditions />
      </Modal>
      <Modal open={informedConsentOpen} onClose={() => setInformedConsentOpen(false)}>
        <InformedConsent />
      </Modal>
    </>
  );
}

/// STEP VALIDATIONS
CredentialData.title = 'Credenciales de ingreso';
CredentialData.description =
  'Estos datos se usarán únicamente con propósitos médicos dentro de la plataforma';
CredentialData.validations = {
  name: 'CredentialStep',
  schema: yup.object().shape({
    terms: yup.bool().oneOf([true], 'Campo requerido').required('Campo requerido'),
    services: yup.bool().oneOf([true], 'Campo requerido').required('Campo requerido'),
    email: yup.string().email('Formato de correo incorrecto').required('Email requerido'),
    password: yup
      .string()
      .required('Contraseña requerida')
      .min(8, 'La contraseña debe ser de al menos 8 caracteres')
      .max(16, 'La contraseña debe ser máximo de 16 caracteres')
      .matches(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/,
        'La contraseña debe contener al menos una letra mayúscula, una letra minúscula y un número'
      ),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password'), null], 'La contraseña no coincide')
      .required('Campo Requerido')
      .min(8, 'La contraseña debe ser de al menos 8 caracteres')
      .max(16, 'La contraseña debe ser máximo de 16 caracteres')
  })
};
/// STEP VALIDATIONS END

export default CredentialData;
