import React, { useState, useEffect } from 'react';
import { Form, Formik } from 'formik';
import { useRouter } from 'next/router';
import _ from 'lodash';

/// TYPES
import { IFormData } from '../types/recover.types';
import Wizard, { IWizardDataSourceItem } from '../components/common/Wizard';
/// TYPES END

/// MATERIAL UI
import { Box, Button, Typography } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
/// MATERIAL UI END

/// OWN COMPONENTS
import EmailDataForm from '../containers/Recover/components/EmailData';
import ValidationDataForm from '../containers/Recover/components/ValidationData';
import PasswordDataForm from '../containers/Recover/components/PasswordData';
import { withAppContext } from '../context';
import { forgotPasswordChangePassword, forgotPasswordResendPin } from '../services/auth.service';

/// OWN COMPONENTS END

type IProps = {
  handleLoading: (loading: boolean) => void;
  handleError: (open: boolean, message?: string, type?: 'success' | 'error' | 'warning') => void;
};

const initialValues: IFormData = {
  email: '',
  pinCode: '',
  validPin: '0',
  newPassword: '',
  newPasswordConfirm: ''
};

const stepValidations = [
  EmailDataForm.validations.schema,
  ValidationDataForm.validations.schema,
  PasswordDataForm.validations.schema
];

const ResendButton = props => {
  const [modifiedDate, setModifiedDate] = useState(new Date(0));
  const [restTime, setRestTime] = useState('');

  useEffect(() => {
    let continued = true;

    const loopFunction = () => {
      const modified = modifiedDate.getTime();
      const now = Date.now();
      console.log({ modified, now, rest: modified - now, rest2: now - modified });

      const rest = (now - modified) / 1000;

      if (rest < 60) {
        setRestTime(` (Vuelve a probar en ${60 - Math.floor(rest)} segundos)`);
      } else {
        setRestTime('');
      }
      if (continued) setTimeout(loopFunction, 1000);
    };

    loopFunction();

    return () => {
      continued = false;
    };
  }, [modifiedDate]);

  const _handleClick = () => {
    props.onClick();
    setModifiedDate(new Date(Date.now()));
  };

  return (
    <Button disabled={restTime !== ''} onClick={_handleClick}>
      Reenviar correo{restTime}
    </Button>
  );
};

function RecoverView(props: IProps): JSX.Element {
  const [currentStep, setCurrentState] = useState<number>(0);

  const router = useRouter();

  const _handleBack = () => {
    if (currentStep === 0) router.back();
    else setCurrentState(currentStep - 1);
  };

  const _handleSubmit = (values: IFormData) => {
    props.handleLoading(true);
    forgotPasswordChangePassword(
      values.email,
      values.pinCode,
      values.newPassword,
      values.newPasswordConfirm
    )
      .then(res => {
        console.log({ res });
        if (res.data.result.passwordChanged === 1) {
          router.replace('/');
          props.handleError(true, 'La contraseña se ha cambiado correctamente.', 'success');
        } else {
          props.handleError(
            true,
            'Ha ocurrido un error desconocido. Vuelve a intentarlo o contacta a un administrador.'
          );
        }
      })
      .catch(err => {
        if (err.response) props.handleError(true, err.response.data.error.message);
        else
          props.handleError(
            true,
            'Ha ocurrido un error desconocido. Vuelve a intentarlo o contacta a un administrador.'
          );
      })
      .finally(() => props.handleLoading(false));
  };

  return (
    <>
      <Button startIcon={<ArrowBackIcon />} onClick={_handleBack}>
        Volver
      </Button>
      <section className="container signup-wrapper">
        <Formik
          validateOnMount
          initialValues={initialValues}
          validationSchema={stepValidations[currentStep]}
          onSubmit={(values: IFormData) => {
            if (currentStep === 2) {
              _handleSubmit(values);
            } else {
              setCurrentState(currentStep + 1);
            }
          }}
        >
          {formik => {
            const dataSource: IWizardDataSourceItem[] = [
              {
                title: EmailDataForm.title,
                description: EmailDataForm.description,
                component: <EmailDataForm {...formik} />
              },
              {
                title: ValidationDataForm.title,
                description: ValidationDataForm.description,
                component: (
                  <ValidationDataForm
                    {...formik}
                    handleLoading={props.handleLoading}
                    handleError={props.handleError}
                  />
                )
              },
              {
                title: PasswordDataForm.title,
                description: PasswordDataForm.description,
                component: <PasswordDataForm {...formik} />
              }
            ];

            return (
              <Form autoComplete="off">
                <Wizard
                  footer={
                    <>
                      <Button
                        fullWidth
                        type="submit"
                        color="primary"
                        variant="contained"
                        disabled={!_.isEmpty(formik.errors)}
                      >
                        {
                          {
                            0: 'Enviar correo',
                            1: 'Continuar',
                            2: 'Guardar Cambios'
                          }[currentStep]
                        }
                      </Button>
                    </>
                  }
                  activeStep={currentStep}
                  dataSource={dataSource}
                />
              </Form>
            );
          }}
        </Formik>
      </section>
    </>
  );
}

export default withAppContext(RecoverView);
