import React, { useState } from 'react'
import Head from 'next/head'
import Image from 'next/image'

/// MATERIAL UI
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import { Button, Card, Grid, Snackbar, TextField } from '@material-ui/core'
/// MATERIAL UI END

/// OWN COMPONENTS
/// OWN COMPONENTS END

/// STYLES & TYPES
import styles from '../styles/Login.module.scss'
import { loginService } from '../services/auth.service'
import { withAppContext } from '../context'
/// STYLES & TYPES END

const InitialState = {
  email: '',
  password: ''
}

const InitialErrorState = {
  message: '',
  open: false
}

function LoginPage(): JSX.Element {
  const [state, setState] = useState(InitialState)
  const [errorState, setErrorState] = useState(InitialErrorState)
  const _handleFieldChange = field => e =>
    setState(prevState => ({ ...prevState, [field]: e.target.value }))

  const _handleSubmit = () => {
    loginService(state.email, state.password)
      .then(response => {
        console.log(response)
      })
      .catch(err => {
        console.error({ ...err })
        _handleError(true, err.response.data.error.message)
      })
  }

  const _handleError = (open: boolean, message?: string) => {
    setErrorState(prevState => ({
      ...prevState,
      message: message || prevState.message,
      open
    }))
  }

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>

      <Box component="main" className={styles.main}>
        <Button startIcon={<ArrowBackIcon />}>Volver</Button>
        <Grid container component="ul" spacing={3} className={styles.mainList}>
          <Grid item xs={12} md={6} component="li" className={styles.loginForm}>
            <Card className={styles.card}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Typography variant="h6">Inicie sesión</Typography>
                </Grid>
                <Grid item xs={12}>
                  <form className={styles.formContainer}>
                    <Grid
                      container
                      component="ul"
                      justify="center"
                      spacing={3}
                      className={styles.form}
                    >
                      <Grid item xs={12} component="li" justify="center">
                        <TextField
                          label="Correo electronico"
                          type="email"
                          fullWidth={true}
                          value={state.email}
                          onChange={_handleFieldChange('email')}
                        />
                      </Grid>
                      <Grid item xs={12} component="li" justify="center">
                        <TextField
                          label="Contraseña"
                          type="password"
                          fullWidth={true}
                          value={state.password}
                          onChange={_handleFieldChange('password')}
                        />
                      </Grid>
                      <Grid item xs={12} component="li" justify="flex-end">
                        <Button>¿Olvidó su contraseña?</Button>
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        component="li"
                        justify="center"
                        alignItems="center"
                        className={styles.formButton}
                      >
                        <Button
                          variant="contained"
                          fullWidth={true}
                          color="primary"
                          onClick={_handleSubmit}
                        >
                          INICIAR SESIÓN
                        </Button>
                      </Grid>
                    </Grid>
                  </form>
                </Grid>
              </Grid>
            </Card>
          </Grid>
          <Grid
            item
            xs={12}
            md={3}
            component="li"
            justify="center"
            direction="column"
            className={styles.formButton}
          >
            <Typography variant="body1" className={styles.registerText}>
              ¿Aún no está registrado en OMNiSalud?
            </Typography>
            <Button variant="contained" fullWidth={true} color="secondary">
              CREAR CUENTA
            </Button>
            <Image src="/images/register.png" width="400" height="290" />
          </Grid>
        </Grid>
      </Box>

      <Snackbar
        open={errorState.open}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        message={errorState.message}
      />
    </>
  )
}

export default withAppContext(LoginPage)
