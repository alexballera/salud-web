import React, { useState } from 'react';
import { Form, Formik } from 'formik';
import * as yup from 'yup';
import { useRouter } from 'next/router';
import _ from 'lodash';

/// MATERIAL UI
import { Box, Button, Grid } from '@material-ui/core';
/// MATERIAL UI END

/// OWN COMPONENTS
import EmailDataForm from '../../containers/Recover/components/EmailData';
import ValidationDataForm from '../../containers/Recover/components/ValidationData';
import PasswordDataForm from '../../containers/Recover/components/PasswordData';
import { withAppContext } from '../../context';
import { forgotPasswordChangePassword } from '../../services/auth.service';
/// OWN COMPONENTS END

/// i18n
import { useTranslation } from 'react-i18next';
import { NAMESPACE_KEY } from '../../i18n/globals/i18n';
/// i18n END

/// CONTEXT
/// CONTEXT END

/// SERVICES
/// SERVICES END

/// STYLES & TYPES
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';
/// STYLES & TYPES END

/// FORM STATES & VALIDATIONS
/// FORM STATES & VALIDATIONS END

/// TYPES
import { IFormData } from '../../types/recover.types';
import Wizard, { IWizardDataSourceItem } from '../../components/common/Wizard';

type IProps = {
  handleLoading: (loading: boolean) => void;
  handleError: (open: boolean, message?: string, type?: 'success' | 'error' | 'warning') => void;
};
/// TYPES END

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    containerButton: {
      backgroundColor: 'white',
      bottom: 6,
      left: 4,
      padding: 36,
      position: 'fixed',
      zIndex: 1000,
      width: '100%',
      [theme.breakpoints.up('md')]: {
        paddingLeft: 'calc(20% + 24px)',
        paddingRight: 'calc(20% + 24px)'
      }
    }
  })
);

const initialValues: IFormData = {
  email: '',
  pinCode: '',
  validPin: '0',
  newPassword: '',
  newPasswordConfirm: ''
};

function RecoverView(props: IProps): JSX.Element {
  const classes = useStyles();
  const { t } = useTranslation([NAMESPACE_KEY, 'forms']);
  const [currentStep, setCurrentState] = useState<number>(0);

  const router = useRouter();

  const EmailData = {
    name: 'EmailStep',
    schema: yup.object().shape({
      email: yup
        .string()
        .email(`${t('validations.email.incorrect', { ns: 'forms' })}`)
        .matches(/(.*\.[a-zA-Z]{2,}){1,}$/, `${t('validations.email.incorrect', { ns: 'forms' })}`)
        .required(`${t('validations.email.required', { ns: 'forms' })}`)
    })
  };

  const ValidationData = {
    name: 'ValidationStep',
    schema: yup.object().shape({
      pinCode: yup
        .string()
        .required(`${t('validations.code.required', { ns: 'forms' })}`)
        .min(6, `${t('validations.code.min', { ns: 'forms' })}`)
        .matches(/^[0-9]{0,6}$/, `${t('validations.code.number', { ns: 'forms' })}`),
      validPin: yup.string().equals(['1'], `${t('validations.code.incorrect', { ns: 'forms' })}`)
    })
  };

  const PasswordData = {
    name: 'PasswordStep',
    schema: yup.object().shape({
      newPassword: yup
        .string()
        .required(`${t('validations.password.required_short', { ns: 'forms' })}`)
        .min(8, `${t('validations.password.min_8', { ns: 'forms' })}`)
        .max(16, `${t('validations.password.max_16', { ns: 'forms' })}`)
        .matches(
          /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/,
          `${t('validations.password.regex', { ns: 'forms' })}`
        ),
      newPasswordConfirm: yup
        .string()
        .oneOf(
          [yup.ref('newPassword'), null],
          `${t('validations.password.matched', { ns: 'forms' })}`
        )
        .required('Campo Requerido')
    })
  };

  const validationSchema = [EmailData.schema, ValidationData.schema, PasswordData.schema];

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
          props.handleError(
            true,
            `${t('message.password.change_success', { ns: 'forms' })}`,
            'success'
          );
          router.replace('/');
        } else {
          props.handleError(true, `${t('message.error.submit', { ns: 'forms' })}`);
        }
      })
      .catch(err => {
        if (err.response) props.handleError(true, err.response.data.error.message);
        else props.handleError(true, `${t('message.error.submit', { ns: 'forms' })}`);
      })
      .finally(() => props.handleLoading(false));
  };

  return (
    <Formik
      validateOnMount
      initialValues={initialValues}
      validationSchema={validationSchema[currentStep]}
      onSubmit={(values: IFormData) => {
        if (currentStep === 2) _handleSubmit(values);
        else setCurrentState(currentStep + 1);
      }}
    >
      {formik => {
        const dataSource: IWizardDataSourceItem[] = [
          {
            title: `${t('title.recover.forget', { ns: NAMESPACE_KEY })}`,
            description: `${t('description.recover.forget', { ns: NAMESPACE_KEY })}`,
            component: <EmailDataForm {...formik} />
          },
          {
            title: `${t('title.recover.forget', { ns: NAMESPACE_KEY })}`,
            description: `${t('description.recover.forget', { ns: NAMESPACE_KEY })}`,
            component: (
              <ValidationDataForm
                {...formik}
                handleLoading={props.handleLoading}
                handleError={props.handleError}
              />
            )
          },
          {
            title: `${t('title.recover.forget', { ns: NAMESPACE_KEY })}`,
            description: `${t('description.recover.forget', { ns: NAMESPACE_KEY })}`,
            component: <PasswordDataForm {...formik} />
          }
        ];

        return (
          <Form autoComplete="off">
            <Wizard
              footer={
                <Box p={3} className={classes.containerButton}>
                  <Grid container item xs={12} md={8}>
                    <Button
                      fullWidth
                      type="submit"
                      color="primary"
                      variant="contained"
                      size="medium"
                    >
                      {
                        {
                          0: `${t('button.send_email', { ns: NAMESPACE_KEY })}`,
                          1: `${t('button.continue', { ns: NAMESPACE_KEY })}`,
                          2: `${t('button.save_changes', { ns: NAMESPACE_KEY })}`
                        }[currentStep]
                      }
                    </Button>
                  </Grid>
                </Box>
              }
              activeStep={currentStep}
              dataSource={dataSource}
            />
          </Form>
        );
      }}
    </Formik>
  );
}

export default withAppContext(RecoverView);
