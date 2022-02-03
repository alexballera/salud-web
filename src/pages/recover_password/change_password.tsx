import React, { useState } from 'react';
import Link from 'next/link';
import { Form, Formik } from 'formik';
import { useRouter } from 'next/router';
import * as yup from 'yup';

/// MATERIAL UI
import { Box, Button } from '@material-ui/core';
/// MATERIAL UI END

/// OWN COMPONENTS
import LayoutFormBasic from '../../layouts/LayoutFormBasic';
import { TitleContent } from '../../components/common/TitleContent';
import PasswordData from '../../containers/Recover/components/PasswordData';
/// OWN COMPONENTS END

/// i18n
import { useTranslation } from 'react-i18next';
import { NAMESPACE_KEY as i18nGlobal } from '../../i18n/globals/i18n';
import { NAMESPACE_KEY as i18nForms } from '../../i18n/forms/i18n';
/// i18n END

/// CONTEXT
import { withAppContext } from '../../context';
/// CONTEXT END

/// SERVICES
import api from '../../api/api';
/// SERVICES END

/// STYLES & TYPES
import recoverStyles from '../../styles/js/RecoverPageStyles.module';
import { INotificationProps } from '../../context/types';
/// STYLES & TYPES END

/// FORM STATES & VALIDATIONS
/// FORM STATES & VALIDATIONS END

/// TYPES

type IFormData = {
  newPassword: string;
  newPasswordConfirm: string;
  handleLoading?: (loading: boolean) => void;
  handleNotifications: (props: INotificationProps) => void;
};

/// TYPES END

const initialValues: any = {
  newPassword: '',
  newPasswordConfirm: ''
};

function ChangePassword({ handleNotifications, handleLoading }: IFormData): JSX.Element {
  const { t } = useTranslation([i18nGlobal, i18nForms]);
  const [notMatchMsg, setNotMatchMsg] = useState<string>();
  const classes = recoverStyles();
  const router = useRouter();

  const VALIDATIONS = {
    name: 'ChangePassword',
    schema: yup.object().shape({
      newPassword: yup
        .string()
        .min(8)
        .max(16)
        .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/),
      newPasswordConfirm: yup.string()
    })
  };

  const getErrorMessage = (code: number): string => {
    const message = {
      401: actionsToError401(),
      default: t('message.email.general_fetch', { ns: i18nForms })
    };
    return message[code] || message['default'];
  };

  const actionsToError401 = () => {
    // TODO por verificar e flujo con UX
    // router.push('/recover_password/forward_email');
    return t('responses.recover.error_401', { ns: i18nGlobal });
  };

  const handleSubmit = ({ newPassword, newPasswordConfirm }: IFormData) => {
    const { secret, userId } = router.query;
    if (newPassword && newPasswordConfirm) {
      if (newPassword !== newPasswordConfirm) {
        setNotMatchMsg(`${t('validations.password.matched', { ns: i18nForms })}`);
        handleNotifications({
          open: true,
          message: `${t('message.error.field_incorrect', { ns: i18nForms })}`,
          severity: 'error'
        });
        return;
      }
      api
        .restorePasswordConfirmation(
          userId as string,
          secret as string,
          newPassword,
          newPasswordConfirm
        )
        .then(() => {
          router.push('/login');
          handleNotifications({
            open: true,
            message: `${t('message.password.updated', { ns: i18nForms })}`,
            severity: 'success'
          });
        })
        .catch(err => {
          handleNotifications({
            open: true,
            message: getErrorMessage(err.code),
            severity: 'error'
          });
        })
        .finally(() => handleLoading && handleLoading(false));
    } else {
      handleNotifications({
        open: true,
        message: `${t('message.error.field_incorrect', { ns: i18nForms })}`,
        severity: 'error'
      });
    }
  };

  return (
    <LayoutFormBasic
      header={
        <>
          <TitleContent titleWithSubtitle title={t('title.new_password', { ns: i18nGlobal })} />
          <TitleContent paragraph title={t('description.new_password', { ns: i18nGlobal })} />
        </>
      }
      form={
        <Formik
          validateOnMount
          initialValues={initialValues}
          validationSchema={VALIDATIONS.schema}
          onSubmit={handleSubmit}
        >
          {formik => {
            return (
              <Form autoComplete="off" className={classes.containerForm}>
                <PasswordData passwordConfirmError={notMatchMsg} {...formik} />
                <Box p={3} className={classes.containerButton}>
                  <Box mb={2}>
                    <Button
                      fullWidth
                      type="submit"
                      color="primary"
                      variant="contained"
                      size="large"
                    >
                      {t('button.save', { ns: i18nGlobal })}
                    </Button>
                  </Box>
                  <Box>
                    <Link href="/login" passHref>
                      <Button
                        fullWidth
                        type="button"
                        color="primary"
                        variant="outlined"
                        size="large"
                      >
                        {t('button.cancel', { ns: i18nGlobal })}
                      </Button>
                    </Link>
                  </Box>
                </Box>
              </Form>
            );
          }}
        </Formik>
      }
    />
  );
}

export default withAppContext(ChangePassword);
