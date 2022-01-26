import React, { useState } from 'react';
import { Form, Formik } from 'formik';
import * as yup from 'yup';
import { useRouter } from 'next/router';
import _ from 'lodash';

/// MATERIAL UI
import { Button } from '@material-ui/core';
/// MATERIAL UI END

/// OWN COMPONENTS
import PasswordDataForm from '../../containers/Recover/components/PasswordData';
import { withAppContext } from '../../context';
/// OWN COMPONENTS END

/// i18n
import { useTranslation } from 'react-i18next';
import { NAMESPACE_KEY } from '../../i18n/globals/i18n';
/// i18n END

/// CONTEXT
/// CONTEXT END

/// SERVICES
import api from '../../api/api';
/// SERVICES END

/// STYLES & TYPES
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';
/// STYLES & TYPES END

/// FORM STATES & VALIDATIONS
/// FORM STATES & VALIDATIONS END

/// TYPES

type IProps = {
  handleLoading: (loading: boolean) => void;
  handleError: (open: boolean, message?: string, type?: 'success' | 'error' | 'warning') => void;
};

type IFormData = {
  newPassword: string;
  newPasswordConfirm: string;
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

const initialValues: any = {
  newPassword: '',
  newPasswordConfirm: ''
};

function RecoverView(): JSX.Element {
  const { t } = useTranslation([NAMESPACE_KEY, 'forms']);

  const router = useRouter();

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

  const _handleSubmit = async ({ newPassword, newPasswordConfirm }: IFormData) => {
    const { secret, userId } = router.query;
    try {
      await api.restorePasswordConfirmation(
        userId as string,
        secret as string,
        newPassword,
        newPasswordConfirm
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Formik
      validateOnMount
      initialValues={initialValues}
      validationSchema={PasswordData.schema}
      onSubmit={(values: IFormData) => {
        _handleSubmit(values);
      }}
    >
      {formik => {
        return (
          <Form autoComplete="off">
            <PasswordDataForm {...formik} />
            <Button fullWidth type="submit" color="primary" variant="contained" size="medium">
              Submit
            </Button>
          </Form>
        );
      }}
    </Formik>
  );
}

export default withAppContext(RecoverView);
