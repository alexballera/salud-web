import React, { useState } from 'react';

import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Formik } from 'formik';
import * as Yup from 'yup';

/// i18n
import { useTranslation, withTranslation } from 'react-i18next';
/// i18n END

/// MATERIAL UI
import Typography from '@material-ui/core/Typography';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import {
  Box,
  Button,
  Card,
  Grid,
  TextField,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText
} from '@material-ui/core';
/// MATERIAL UI END

/// OWN COMPONENTS
import { withAppContext } from '../context';
import { loginService, setDataToLocalstorage } from '../services/auth.service';
/// OWN COMPONENTS END

/// STYLES & TYPES
import styles from '../styles/scss/Login.module.scss';
import { IProps } from '../types/login.types';
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
  const { t } = useTranslation(['globals', 'forms']);
  const [dialogOpen, setDialogOpen] = useState(false);
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
              return setDialogOpen(true);
            case 'sld-user-15':
              handleError(true, message);
            /* FIXME setear el correo cuando falte activación y dirigirlo a validate_code
              setDataToLocalstorage('user', email);
              router.replace('/validate_code'); */
          }
          handleError(true, message);
        } else {
          handleError(true, `${t('message.error.submit', { ns: 'forms' })}`);
        }
      })
      .finally(() => {
        handleLoading && handleLoading(false);
      });
  };

  return (
    <>
      <Head>
        <title>{t('title.login_page')}</title>
      </Head>

      <Box className={styles.main}>
        <Button startIcon={<ArrowBackIcon />} onClick={router.back}>
          {t('button.back')}
        </Button>
        <Grid container component="ul" spacing={3} className={styles.mainList}>
          <Grid item xs={12} md={6} component="li" className={styles.loginForm}>
            <Card className={styles.card}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Typography variant="h6">{t('title.login_title')}</Typography>
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
                        <form className={styles.formContainer} onSubmit={handleSubmit}>
                          <Grid
                            container
                            component="ul"
                            justify="center"
                            spacing={3}
                            className={styles.form}
                          >
                            <Grid item xs={12} component="li">
                              <TextField
                                inputProps={{
                                  'aria-label': `${t('label.email')}`
                                }}
                                label={t('label.email')}
                                name="email"
                                type="email"
                                fullWidth={true}
                                value={values.email}
                                onChange={handleChange}
                                error={!!errors.email}
                                helperText={errors.email || undefined}
                                data-testid="email-field"
                              />
                            </Grid>
                            <Grid item xs={12} component="li">
                              <TextField
                                inputProps={{ 'aria-label': `${t('label.password.password')}` }}
                                aria-label={t('label.password.password')}
                                label={t('label.password.password')}
                                name="password"
                                type="password"
                                fullWidth={true}
                                value={values.password}
                                onChange={handleChange}
                                error={!!errors.password}
                                helperText={errors.password || undefined}
                                data-testid="password-field"
                              />
                            </Grid>
                            <Grid
                              item
                              xs={12}
                              component="li"
                              className="MuiGrid-justify-xs-flex-end"
                            >
                              <Button onClick={() => router.push('/recover')}>
                                {t('button.forgot_password')}
                              </Button>
                            </Grid>
                            <Grid
                              item
                              xs={12}
                              component="li"
                              className={`${styles.formButton} MuiGrid-justify-xs-center`}
                            >
                              <Button
                                type="submit"
                                variant="contained"
                                fullWidth={true}
                                color="primary"
                                disabled={isLoading || Object.keys(errors).length > 0}
                                data-testid="login-button"
                              >
                                {t('button.login')}
                              </Button>
                            </Grid>
                          </Grid>
                        </form>
                      )
                    }
                  </Formik>
                </Grid>
              </Grid>
            </Card>
          </Grid>
          <Grid
            item
            xs={12}
            md={3}
            component="li"
            className={`${styles.formButton} MuiGrid-justify-xs-center MuiGrid-direction-xs-column`}
          >
            <Typography variant="body1" className={styles.registerText}>
              {t('label.no_register')}
            </Typography>
            <Button
              variant="contained"
              fullWidth={true}
              color="secondary"
              onClick={() => router.push('/signup')}
            >
              {t('button.create_account')}
            </Button>
            <Image src="/images/register.png" width="400" height="290" alt="" />
          </Grid>
        </Grid>
      </Box>

      {/* Unknown email */}
      <Dialog
        open={dialogOpen}
        keepMounted
        onClose={() => setDialogOpen(false)}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
        data-testid="unknown-dialog-test"
      >
        <DialogTitle id="alert-dialog-slide-title">
          {t('message.email.not_found', { ns: 'forms' })}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {t('message.email.not_register', { ns: 'forms' })}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)} color="secondary">
            {t('button.cancel')}
          </Button>
          <Button
            onClick={() => {
              setDialogOpen(false);
              router.push('/signup');
            }}
            color="primary"
          >
            {t('button.register')}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default withTranslation(['globals', 'forms'])(withAppContext(LoginPage));
