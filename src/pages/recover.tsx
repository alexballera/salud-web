import React, { useState } from 'react';
import { Form, Formik } from 'formik';
import { useRouter } from 'next/router';
import _ from 'lodash';

/// MATERIAL UI
import { Button } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
/// MATERIAL UI END

/// OWN COMPONENTS
import EmailDataForm from '../containers/Recover/components/EmailData';
import ValidationDataForm from '../containers/Recover/components/ValidationData';
import PasswordDataForm from '../containers/Recover/components/PasswordData';
import { withAppContext } from '../context';
import { forgotPasswordChangePassword } from '../services/auth.service';
/// OWN COMPONENTS END

/// CONTEXT
/// CONTEXT END

/// SERVICES
/// SERVICES END

/// STYLES & TYPES
/// STYLES & TYPES END

/// FORM STATES & VALIDATIONS
/// FORM STATES & VALIDATIONS END

/// TYPES
import { IFormData } from '../types/recover.types';
import Wizard, { IWizardDataSourceItem } from '../components/common/Wizard';

type IProps = {
  handleLoading: (loading: boolean) => void;
  handleError: (open: boolean, message?: string, type?: 'success' | 'error' | 'warning') => void;
};
/// TYPES END

const initialValues: IFormData = {
  email: '',
  pinCode: '',
  validPin: '0',
  newPassword: '',
  newPasswordConfirm: ''
};

const steps = [EmailDataForm, ValidationDataForm, PasswordDataForm];

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
          validationSchema={steps[currentStep].validations.schema}
          onSubmit={(values: IFormData) => {
            if (currentStep === 2) _handleSubmit(values);
            else setCurrentState(currentStep + 1);
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
