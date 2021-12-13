import React from 'react';

import { useRouter } from 'next/router';
import Link from 'next/link';
import { Formik } from 'formik';
import * as Yup from 'yup';

/// i18n
import { useTranslation, withTranslation } from 'react-i18next';
import { NAMESPACE_KEY } from '../i18n/globals/i18n';
/// i18n END

/// MATERIAL UI
import { Box, Button, Divider, Hidden, Grid } from '@material-ui/core';
/// MATERIAL UI END

/// OWN COMPONENTS
import { withAppContext } from '../context';
import { loginService, setDataToLocalstorage } from '../services/auth.service';
import { TitleContent } from '../components/common/TitleContent';
import TextField from '../components/common/TextField';
/// OWN COMPONENTS END

/// STYLES & TYPES
// import styles from '../styles/scss/Login.module.scss';
import { IProps } from '../types/login.types';
import LoginStyles from '../styles/js/LoginPageStyles.module';
import { getPersonalData } from '../services/getPersonalData.service';
/// STYLES & TYPES END

/// SERVICES
/// SERVICES END

/// FORM STATES & VALIDATIONS
const InitialState = {
  email: '',
  password: ''
};

/// FORM STATES & VALIDATIONS END

function LoginPage({
  handleLogin,
  handleLoading,
  fetching: isLoading,
  handleError
}: IProps): JSX.Element {
  const { t } = useTranslation([NAMESPACE_KEY, 'forms']);
  const classes = LoginStyles();
  const router = useRouter();

  const ValidationSchema = Yup.object().shape({
    email: Yup.string()
      .email(`${t('validations.email.invalid', { ns: 'forms' })}`)
      .required(`${t('validations.email.required', { ns: 'forms' })}`),
    password: Yup.string().required(`${t('validations.password.required', { ns: 'forms' })}`)
  });

  const _handleSubmit = (email: string, password: string) => {
    handleLoading(true);
    loginService(email, password)
      .then(response => {
        handleLogin(response.data.result);
        setDataToLocalstorage('user', response.data.result);
        handleError(false);
        router.replace('/main');
      })
      .catch(err => {
        if (err.response) {
          const message = err.response.data.error.message;
          switch (err.response.data.error.code) {
            case 'sld-user-3':
              console.log('sld-user-3', email);
              handleError(true, t('message.email.not_register', { ns: 'forms' }));
              break;
            case 'sld-user-15':
              getPersonalData(email)
                .then(res => {
                  setDataToLocalstorage('user', res.data.result);
                })
                .catch(error => handleError(true, error));
              handleError(true, message);
              router.replace('/validate_code');
              break;
            default:
              handleError(true, message);
          }
        } else {
          handleError(true, `${t('message.error.submit', { ns: 'forms' })}`);
        }
      })
      .finally(() => {
        handleLoading && handleLoading(false);
      });
  };

  return (
    <Box p={3}>
      <Grid container className={classes.container}>
        <Grid container item xs={12} md={5}>
          <Grid item xs={12}>
            <TitleContent titleWithSubtitle title={t('title.login_title', { ns: NAMESPACE_KEY })} />
            <TitleContent paragraph title={t('description.login', { ns: NAMESPACE_KEY })} />
          </Grid>
          <Grid item xs={12}>
            <Formik
              initialValues={InitialState}
              validationSchema={ValidationSchema}
              onSubmit={values => _handleSubmit(values.email, values.password)}
            >
              {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                ({ errors, handleChange, values, handleSubmit }: any) => (
                  <form onSubmit={handleSubmit}>
                    <Grid container justify="center">
                      <Grid container item xs={12}>
                        <Grid item xs={12}>
                          <TextField
                            inputProps={{
                              'aria-label': `${t('label.email.email', { ns: NAMESPACE_KEY })}`
                            }}
                            label={t('label.email.email')}
                            name="email"
                            type="email"
                            fullWidth={true}
                            value={values.email}
                            onChange={handleChange}
                            error={errors.email}
                            helperText={errors.email}
                            data-testid="email-field"
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            inputProps={{
                              'aria-label': `${t('label.password.password', {
                                ns: NAMESPACE_KEY
                              })}`
                            }}
                            aria-label={t('label.password.password', { ns: NAMESPACE_KEY })}
                            label={t('label.password.password', { ns: NAMESPACE_KEY })}
                            name="password"
                            type="password"
                            fullWidth={true}
                            value={values.password}
                            onChange={handleChange}
                            error={errors.password}
                            helperText={errors.password}
                            data-testid="password-field"
                          />
                        </Grid>
                        <Grid item xs={12} className={classes.recoverContainer}>
                          <TitleContent
                            paragraph
                            title={
                              <>
                                <span>¿Olvidaste tu contraseña?</span>
                                <Link href="/recover" passHref>
                                  <a>{t('button.recover', { ns: NAMESPACE_KEY })}</a>
                                </Link>
                              </>
                            }
                          />
                        </Grid>
                      </Grid>

                      <Grid item xs={12} md={5} className={classes.containerButton}>
                        <Box p={3}>
                          <Grid container spacing={3}>
                            <Grid item xs={12}>
                              <Button
                                type="submit"
                                variant="contained"
                                fullWidth={true}
                                color="primary"
                                disabled={isLoading || Object.keys(errors).length > 0}
                                data-testid="login-button"
                                className={`${classes.button} ${classes.buttonSubmit}`}
                              >
                                {t('button.login', { ns: NAMESPACE_KEY })}
                              </Button>
                            </Grid>
                            <Hidden smDown>
                              <Divider className={classes.divider} />
                            </Hidden>
                            <Grid item xs={12} className={classes.containerButtonSignup}>
                              <Box p={1} className={classes.containerTextRegister}>
                                <TitleContent
                                  paragraph
                                  title={t('label.no_register', { ns: NAMESPACE_KEY })}
                                />
                              </Box>
                              <Button
                                variant="outlined"
                                fullWidth={true}
                                color="primary"
                                onClick={() => router.push('/signup')}
                                className={classes.button}
                              >
                                {t('button.create_account', { ns: NAMESPACE_KEY })}
                              </Button>
                            </Grid>
                          </Grid>
                        </Box>
                      </Grid>
                    </Grid>
                  </form>
                )
              }
            </Formik>
          </Grid>
        </Grid>
        <Grid item md={2}></Grid>
      </Grid>
    </Box>
  );
}

export default withTranslation([NAMESPACE_KEY, 'forms'])(withAppContext(LoginPage));
