import React from 'react';

import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Formik } from 'formik';
import * as Yup from 'yup';

/// MATERIAL UI
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { Button, Card, Grid, TextField } from '@material-ui/core';
/// MATERIAL UI END

/// OWN COMPONENTS
import { withAppContext } from '../context';
import { loginService } from '../services/auth.service';
/// OWN COMPONENTS END

/// STYLES & TYPES
import styles from '../styles/Login.module.scss';
import { IProps } from '../types/login.types';
/// STYLES & TYPES END

const InitialState = {
  email: '',
  password: ''
};

const ValidationSchema = Yup.object().shape({
  email: Yup.string().email('Email invalido').required('Debes especificar un email'),
  password: Yup.string().required('Debes especificar una contraseña')
});

function LoginPage({
  handleLogin,
  handleLoading,
  fetching: isLoading,
  handleError
}: IProps): JSX.Element {
  const router = useRouter();

  const _handleSubmit = (email: string, password: string) => {
    handleLoading(true);
    loginService(email, password)
      .then(response => {
        handleLogin(response.data.result);
        handleError(false);
        router.replace('/main');
      })
      .catch(err => {
        if (err.response) handleError(true, err.response.data.error.message);
        else
          handleError(
            true,
            'Ha ocurrido un error desconocido. Vuelve a intentarlo o contacta a un administrador.'
          );
      })
      .finally(() => {
        handleLoading && handleLoading(false);
      });
  };

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>

      <Box className={styles.main}>
        <Button startIcon={<ArrowBackIcon />} onClick={router.back}>
          Volver
        </Button>
        <Grid container component="ul" spacing={3} className={styles.mainList}>
          <Grid item xs={12} md={6} component="li" className={styles.loginForm}>
            <Card className={styles.card}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Typography variant="h6">Inicie sesión</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Formik
                    initialValues={InitialState}
                    validationSchema={ValidationSchema}
                    onSubmit={values => _handleSubmit(values.email, values.password)}
                  >
                    {({ errors, handleChange, values, handleSubmit }: any) => (
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
                                'aria-label': 'Correo electrónico'
                              }}
                              label="Correo electrónico"
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
                              inputProps={{ 'aria-label': 'Contraseña' }}
                              aria-label="Contraseña"
                              label="Contraseña"
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
                          <Grid item xs={12} component="li" className="MuiGrid-justify-xs-flex-end">
                            <Button onClick={() => router.push('/recover')}>
                              ¿Olvidó su contraseña?
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
                              INICIAR SESIÓN
                            </Button>
                          </Grid>
                        </Grid>
                      </form>
                    )}
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
              ¿Aún no está registrado en OMNiSalud?
            </Typography>
            <Button
              variant="contained"
              fullWidth={true}
              color="secondary"
              onClick={() => router.push('/signup')}
            >
              CREAR CUENTA
            </Button>
            <Image src="/images/register.png" width="400" height="290" alt="" />
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default withAppContext(LoginPage);
