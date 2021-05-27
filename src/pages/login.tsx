import React, { useState } from 'react'
import Head from 'next/head'

/// MATERIAL UI
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
/// MATERIAL UI END

/// OWN COMPONENTS
import Navbar from '../components/Navbar'
import registerImage from '../assets/images/register.png'
/// OWN COMPONENTS END

/// STYLES & TYPES
import styles from '../styles/Login.module.scss'
import { Button, Card, Grid, TextField } from '@material-ui/core'
/// STYLES & TYPES END

const InitialState = {
  email: '',
  password: ''
}

export default function LoginPage(): JSX.Element {
  const [state, setState] = useState(InitialState)
  const _handleFieldChange = field => e =>
    setState(prevState => ({ ...prevState, [field]: e.target.value }))
  return (
    <>
      <Head>
        <title>Login</title>
      </Head>

      <Box component="main" className={styles.main}>
        <Grid container component="ul" className={styles.mainList}>
          <Grid item xs={12} md={8} justify="center" component="li">
            <Card className={styles.card}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Button startIcon={<ArrowBackIcon />}>Volver</Button>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="h6">Inicie sesión</Typography>
                </Grid>
                <Grid item xs={12}>
                  <form>
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
                        className={styles.formButton}
                      >
                        <Button
                          variant="contained"
                          fullWidth={true}
                          color="primary"
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
            md={4}
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
            <img src={registerImage} />
          </Grid>
        </Grid>
      </Box>
    </>
  )
}
