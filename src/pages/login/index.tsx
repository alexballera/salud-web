/// BASE IMPORTS
import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Formik, FormikErrors, FormikProps } from 'formik';
import Link from 'next/link';
import * as yup from 'yup';
/// BASE IMPORTS

/// i18n
import { useTranslation, withTranslation } from 'react-i18next';
import { NAMESPACE_KEY as i18Global, i18n } from '../../i18n/globals/i18n';
import { NAMESPACE_KEY as i18Forms } from '../../i18n/forms/i18n';
/// i18n END

import { uiOnAlert } from '@/src/store/slice/ui.slice';
import { useDispatch } from 'react-redux';

/// MATERIAL UI
import { Box, Button, Divider, Hidden } from '@material-ui/core';
/// MATERIAL UI END

/// OWN COMPONENTS
import { withAppContext } from '../../context';
import { TitleContent } from '../../components/common/TitleContent';
import TextField from '../../components/common/TextField';
/// OWN COMPONENTS END

/// STYLES & TYPES
import { TProps, TLoginData } from '../../types/login.types';
import LoginStyles from '../../styles/js/LoginPageStyles.module';
/// STYLES & TYPES END

/// SERVICES
import api from '../../api/api';
import {
  getDataFromSessionStorage,
  removeDataFromSessionStorage
} from '../../services/localStorage.service';
/// SERVICES END

/// LAYOUT
import Layout from '../../layouts/LayoutFormBasic';
import { UserContext } from '../../context/UserContext';
/// LAYOUT END

/// FORM STATES & VALIDATIONS
const INITIAL_STATE: TLoginData = { email: '', password: '' };
/// FORM STATES & VALIDATIONS END

function LoginPage({ fetching, handleLoading }: TProps): JSX.Element {
  const { t } = useTranslation([i18Global, i18Forms]);
  const { handleUserSignIn, initializeSession, initializeGuestSession } = useContext(UserContext);
  const [updatedPassword, setUpdatedPassword] = useState<string>();
  const [fetchHasError, setFetchHasError] = useState(false);
  const classes = LoginStyles();
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    updatedPasswordNotification();
  }, [updatedPassword]);

  const updatedPasswordNotification = () => {
    setUpdatedPassword(getDataFromSessionStorage('updated_password'));
    if (updatedPassword) {
      dispatch(
        uiOnAlert({
          type: 'success',
          message: `${t('message.password.updated', { ns: i18Forms })}`
        })
      );
      removeDataFromSessionStorage('updated_password');
    }
  };

  const ValidationSchema = yup.object().shape({
    email: yup
      .string()
      .required(`${t('validations.email.required', { ns: i18Forms })}`)
      .email(`${t('validations.email.incorrect', { ns: i18Forms })}`),
    password: yup.string().required(`${t('validations.password.required', { ns: i18Forms })}`)
  });

  const handleSubmit = async ({ email, password }: TLoginData) => {
    try {
      setFetchHasError(false);
      handleLoading(true);
      const { session, account } = await handleUserSignIn(email, password);
      if (account.emailVerification) {
        initializeSession(session, account);
        handleLoading(false);
        router.push('/main');
      } else {
        api.emailVerification();
        initializeGuestSession(session);
        handleLoading(false);
        router.push('/signup/email_verification');
      }
    } catch (e) {
      setFetchHasError(true);
      dispatch(
        uiOnAlert({
          type: 'error',
          message: mapFetchErrors(e.code)
        })
      );
    } finally {
      handleLoading && handleLoading(false);
    }
  };

  const mapFetchErrors = (code: -1) => {
    const i18nKey = `responses.signin.error_${code}`;
    if (i18n.exists(i18nKey, { ns: i18Global })) {
      return t(i18nKey, { ns: i18Global });
    }
    return t('message.error.submit', { ns: i18Forms });
  };

  const getGlobalFormErrors = (values: TLoginData, errors: FormikErrors<TLoginData>) => {
    const { email, password } = values;
    if (!email.length && !password.length && Object.values(errors).length) {
      return 'message.error.fields_required';
    }
    if (!email.length && password.length) {
      return 'validations.email.required';
    }
    if (email.length && !password.length) {
      return 'validations.password.required';
    }
    if (errors.email === t('validations.email.incorrect', { ns: i18Forms })) {
      return 'validations.email.incorrect';
    }
    return null;
  };

  const handleGlobalFormErrors = (values: TLoginData, errors: FormikErrors<TLoginData>) => {
    const i18Key = getGlobalFormErrors(values, errors);
    if (i18Key) {
      dispatch(
        uiOnAlert({
          type: 'error',
          message: t(i18Key, { ns: i18Forms })
        })
      );
    }
  };

  return (
    <Layout
      header={
        <>
          <TitleContent titleWithSubtitle title={t('title.login_title', { ns: i18Global })} />
          <TitleContent paragraph title={t('description.login', { ns: i18Global })} />
        </>
      }
      form={
        <Formik
          initialValues={INITIAL_STATE}
          validationSchema={ValidationSchema}
          onSubmit={handleSubmit}
        >
          {({
            errors,
            handleChange,
            values,
            handleSubmit: formikSubmit,
            touched,
            submitCount,
            validateForm,
            handleBlur
          }: FormikProps<TLoginData>) => {
            useEffect(() => {
              validateForm();
              handleGlobalFormErrors(values, errors);
            }, [submitCount]);

            useEffect(() => {
              if (fetchHasError === true) {
                setFetchHasError(false);
              }
            }, [values]);

            return (
              <form onSubmit={formikSubmit} noValidate={true}>
                <Box>
                  <TextField
                    inputProps={{
                      'aria-label': `${t('label.email.email', { ns: i18Global })}`
                    }}
                    label={t('label.email.email')}
                    name="email"
                    type="email"
                    fullWidth={true}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                    error={(touched.email && Boolean(errors.email)) || fetchHasError}
                    data-testid="email-field"
                    helperText={errors.email}
                    handleLblError
                  />
                </Box>
                <Box>
                  <TextField
                    inputProps={{
                      'aria-label': `${t('label.password.password', {
                        ns: i18Global
                      })}`
                    }}
                    aria-label={t('label.password.password', { ns: i18Global })}
                    label={t('label.password.password', { ns: i18Global })}
                    name="password"
                    type="password"
                    fullWidth={true}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                    error={(touched.password && Boolean(errors.password)) || fetchHasError}
                    data-testid="password-field"
                    helperText={errors.password}
                    handleLblError
                  />
                </Box>
                <Box className={classes.recoverContainer}>
                  <TitleContent
                    paragraph
                    title={
                      <>
                        <span>{t('label.password.forget', { ns: i18Global })}</span>
                        <Link href="/recover_password" passHref>
                          <a>{t('button.recover', { ns: i18Global })}</a>
                        </Link>
                      </>
                    }
                  />
                </Box>
                <Box width={{ xs: '100%' }} mt={6}>
                  <Button
                    type="submit"
                    variant="contained"
                    fullWidth={true}
                    color="primary"
                    disabled={fetching}
                    data-testid="login-button"
                    className={`${classes.button} ${classes.buttonSubmit}`}
                  >
                    {t('button.login', { ns: i18Global })}
                  </Button>
                </Box>
                <Hidden only={['xs', 'sm']}>
                  <Divider className={classes.divider} />
                </Hidden>
                <Box
                  display={{ xs: 'block', md: 'flex' }}
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Box mt={{ xs: 3, md: 0 }}>
                    <TitleContent paragraph title={t('label.no_register', { ns: i18Global })} />
                  </Box>
                  <Box mt={{ xs: 2, md: 0 }}>
                    <Button
                      variant="outlined"
                      fullWidth={true}
                      color="primary"
                      onClick={() => router.push('/signup')}
                      className={classes.button}
                    >
                      {t('button.create_account', { ns: i18Global })}
                    </Button>
                  </Box>
                </Box>
              </form>
            );
          }}
        </Formik>
      }
    />
  );
}

export default withTranslation([i18Global, i18Forms])(withAppContext(LoginPage));
