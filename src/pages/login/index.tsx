/// BASE IMPORTS
import { useEffect, useState } from 'react';
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

/// MATERIAL UI
import { Box, Button, Divider, Hidden } from '@material-ui/core';
/// MATERIAL UI END

/// OWN COMPONENTS
import { withAppContext } from '../../context';
import { TitleContent } from '../../components/common/TitleContent';
import TextField from '../../components/common/TextField';
import SnackbarAlert from '../../components/common/SnackbarAlert';
/// OWN COMPONENTS END

/// STYLES & TYPES
import { TProps, TLoginData } from '../../types/login.types';
import LoginStyles from '../../styles/js/LoginPageStyles.module';
/// STYLES & TYPES END

/// SERVICES
import api from '../../api/api';
import { setDataToLocalstorage } from '../../services/auth.service';
/// SERVICES END

/// LAYOUT
import Layout from '../../layouts/LayoutFormBasic';
/// LAYOUT END

/// FORM STATES & VALIDATIONS
const INITIAL_STATE: TLoginData = { email: '', password: '' };
/// FORM STATES & VALIDATIONS END

function LoginPage({ fetching, handleLogin, handleLoading }: TProps): JSX.Element {
  const { t } = useTranslation([i18Global, i18Forms]);
  const [error, setError] = useState<string | null>(null);
  const classes = LoginStyles();
  const router = useRouter();

  const ValidationSchema = yup.object().shape({
    email: yup
      .string()
      .required(`${t('validations.email.required', { ns: i18Forms })}`)
      .email(`${t('validations.email.incorrect', { ns: i18Forms })}`),
    password: yup.string().required(`${t('validations.password.required', { ns: i18Forms })}`)
  });

  const handleSubmit = async ({ email, password }: TLoginData) => {
    try {
      handleLoading(true);
      const session = await api.createSession(email, password);
      // TODO: Change all this arguments types, we need remove all [as any]
      handleLogin(session as any);
      setDataToLocalstorage('user', session as any);
      handleLoading(false);
      router.replace('/main');
    } catch (e) {
      setError(mapFetchErrors(e.code));
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

  const mapPopUpErrors = (values: TLoginData, errors: FormikErrors<TLoginData>) => {
    const { email, password } = values;
    if (!email.length && !password.length && Object.values(errors).length) {
      setError(t('message.error.fields_required', { ns: i18Forms }));
      return;
    }
    if (!email.length && password.length) {
      setError(t('validations.email.required', { ns: i18Forms }));
      return;
    }
    if (email.length && !password.length) {
      setError(t('validations.password.required', { ns: i18Forms }));
      return;
    }
    if (errors.email === t('validations.email.incorrect', { ns: i18Forms })) {
      setError(t('validations.email.incorrect', { ns: i18Forms }));
    }
  };

  return (
    <Layout
      form={
        <Box className={classes.mainContainer}>
          <Hidden only={['md', 'lg', 'xl']}>
            <Box mb={2}>
              <SnackbarAlert
                message={error}
                severity="error"
                duration={20000}
                removeMessage={setError}
              />
            </Box>
          </Hidden>
          <TitleContent titleWithSubtitle title={t('title.login_title', { ns: i18Global })} />
          <TitleContent paragraph title={t('description.login', { ns: i18Global })} />
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
              validateForm
            }: FormikProps<TLoginData>) => {
              useEffect(() => {
                validateForm();
                mapPopUpErrors(values, errors);
              }, [submitCount]);

              return (
                <form onSubmit={formikSubmit} noValidate={true}>
                  <Hidden only={['xs', 'sm']}>
                    <SnackbarAlert
                      mb={2}
                      mt={2}
                      message={error}
                      severity="error"
                      duration={20000}
                      removeMessage={setError}
                    />
                  </Hidden>
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
                      value={values.email}
                      error={touched.email && Boolean(errors.email)}
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
                      value={values.password}
                      error={touched.password && Boolean(errors.password)}
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
                          <Link href="/recover" passHref>
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
        </Box>
      }
    />
  );
}

export default withTranslation([i18Global, i18Forms])(withAppContext(LoginPage));
