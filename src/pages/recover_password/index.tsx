import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Form, Formik } from 'formik';
import * as yup from 'yup';

/// MATERIAL UI
import { Box, Button, Collapse, Grid } from '@material-ui/core';
/// MATERIAL UI END

/// OWN COMPONENTS
import TextField from '../../components/common/TextField';
import Layout from '../../layouts/LayoutFormBasic';
import { TitleContent } from '../../components/common/TitleContent';
/// OWN COMPONENTS END

/// i18n
import { useTranslation } from 'react-i18next';
import { NAMESPACE_KEY as i18Global } from '../../i18n/globals/i18n';
import { NAMESPACE_KEY as i18Forms } from '../../i18n/forms/i18n';
/// i18n END

/// CONTEXT
import { withAppContext } from '../../context';
/// CONTEXT END

/// SERVICES
import api from '../../api/api';
/// SERVICES END

/// TYPES
import { IProps } from '../../types/recover.types';
/// TYPES END

/// STYLES
import recoverStyles from '../../styles/js/RecoverPageStyles.module';
import { setDataToSessionStorage } from '../../services/localStorage.service';
/// STYLES END

/// FORM STATES & VALIDATIONS
const initialValues: IProps = {
  email: ''
};
/// FORM STATES & VALIDATIONS END

function RecoverPasswordPage({ handleLoading, handleNotifications }: IProps): JSX.Element {
  const classes = recoverStyles();
  const { t } = useTranslation([i18Global, i18Forms]);
  const [msgError, setMsgError] = useState<string>();
  const [codeError, setCodeError] = useState<number>();
  const router = useRouter();

  const VALIDATIONS = {
    schema: yup.object().shape({
      email: yup.string().email(`${t('validations.email.incorrect', { ns: i18Forms })}`)
    })
  };

  const getErrorMessage = (code: number): string => {
    const message = {
      400: t('validations.email.invalid', { ns: i18Forms }),
      404: t('message.email.not_found', { ns: i18Forms }),
      429: t('message.email.too_many_request', { ns: i18Forms }),
      default: t('message.error.general_fetch', { ns: i18Forms })
    };
    setCodeError(code);
    return message[code] || message['default'];
  };

  const setErrorMessage = (code: number): void => {
    switch (code) {
      case 404:
        setMsgError(t('message.email.email_not_found', { ns: i18Forms }));
        break;

      default:
        break;
    }
  };

  const handleSubmit = ({ email }: IProps) => {
    handleLoading(true);
    api
      .restorePassword(email)
      .then(() => {
        setDataToSessionStorage('email', email);
        router.push('/recover_password/forward_email');
      })
      .catch(err => {
        setErrorMessage(err.code);
        handleNotifications({
          open: true,
          message: getErrorMessage(err.code),
          severity: 'error'
        });
      })
      .finally(() => handleLoading && handleLoading(false));
  };

  return (
    <Layout
      header={
        <>
          <TitleContent titleWithSubtitle title={t('title.recover.forget', { ns: i18Global })} />
          <TitleContent paragraph title={t('description.recover.forget', { ns: i18Global })} />
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
                <Box pb={3} pt={3}>
                  <TextField
                    fullWidth
                    id="email"
                    name="email"
                    formControlProps={{
                      'data-testid': 'email-input'
                    }}
                    label={t('label.email.email')}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                    error={Boolean(codeError)}
                    onChange={formik.handleChange}
                    helperText={msgError}
                    handleLblError
                  />
                </Box>
                <Box p={3} className={classes.containerButton}>
                  <Grid container item sm={12} md={4}>
                    <Button
                      fullWidth
                      type="submit"
                      color="primary"
                      variant="contained"
                      size="large"
                    >
                      {t('button.send_email', { ns: i18Global })}
                    </Button>
                    <Collapse in={Boolean(codeError)} className={classes.containerLink}>
                      <Link href="/login" passHref>
                        <a>{t('button.goto_login', { ns: i18Global })}</a>
                      </Link>
                    </Collapse>
                  </Grid>
                </Box>
              </Form>
            );
          }}
        </Formik>
      }
    />
  );
}

export default withAppContext(RecoverPasswordPage);
