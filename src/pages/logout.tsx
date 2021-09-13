import React from 'react';
import { useRouter } from 'next/router';
import { Button, Box, Grid, Typography } from '@material-ui/core';
import SvgContainer from '../components/common/SvgContainer';
import LogOutStyles from '../styles/js/LogOutStyles.module';
import SvgBanner from '../components/common/Svg/SvgBanner.component';

function LogOut(): JSX.Element {
  const classes = LogOutStyles();
  const router = useRouter();
  return (
    <div className={classes.boxContainer}>
      <Box p={3} className={classes.wrapper}>
        <Grid container spacing={1} justify="center">
          <Grid item xs={8} md={8} className={classes.imgContainer}>
            <SvgContainer title="Banner Svg" width={173} height={137}>
              <SvgBanner />
            </SvgContainer>
          </Grid>
        </Grid>

        <Grid container spacing={1}>
          <Grid item xs={10} md={10}>
            <Typography variant="h2" component="h2" className={classes.title}>
              Cerrar sesión
            </Typography>
          </Grid>
          <Grid item xs={10} md={10}>
            <Typography variant="h5" component="h5" className={classes.desciption}>
              ¿Estás seguro que querés cerrar tu sesión en plataforma?
            </Typography>
          </Grid>
        </Grid>
      </Box>
      <Box p={3}>
        <Grid container spacing={1}>
          <Grid item xs={6} md={6}>
            <Button
              fullWidth
              onClick={() => router.back()}
              color="primary"
              variant="outlined"
              className={classes.button}
            >
              Cancelar
            </Button>
          </Grid>
          <Grid item xs={6} md={6}>
            <Button
              fullWidth
              onClick={() => {
                router.push('/');
              }}
              color="primary"
              variant="contained"
              className={classes.button}
            >
              Si, cerrar sesión
            </Button>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}

export default LogOut;
