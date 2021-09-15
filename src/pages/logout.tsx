import React from 'react';
import { useRouter } from 'next/router';
import { Button, Box, Grid, Typography, Hidden } from '@material-ui/core';
import LogOutStyles from '../styles/js/LogOutStyles.module';
import SvgContainer from '../components/common/SvgContainer';
import SvgBanner from '../components/common/Svg/SvgBanner.component';
/// CONTEXT
import { withAppContext } from '../context/index';

function LogOut(): JSX.Element {
  const classes = LogOutStyles();
  const router = useRouter();
  return (
    <div className={classes.boxContainer}>
      <Box p={3} className={classes.wrapper}>
        <Grid container spacing={1} className={classes.container}>
          <Grid item xs={12} md={5} className={classes.imgContainer}>
            <Hidden mdUp>
              <SvgContainer title="Banner Svg" width={173} height={137}>
                <SvgBanner />
              </SvgContainer>
            </Hidden>
            <Hidden smDown>
              <SvgContainer title="Banner Svg" width={326} height={261}>
                <SvgBanner width="326" height="261" text={false} />
              </SvgContainer>
            </Hidden>
          </Grid>
          <Grid item xs={12} md={5} className={classes.content}>
            <Grid container spacing={1} className={classes.contentContainer}>
              <Grid item xs={10} md={10}>
                <Typography variant="h2" component="h2" className={classes.title}>
                  Cerrar sesión
                </Typography>
              </Grid>
              <Grid item xs={10} md={10}>
                <Typography variant="h5" component="h5" className={classes.description}>
                  ¿Estás seguro que querés cerrar tu sesión en plataforma?
                </Typography>
              </Grid>
            </Grid>
            <Box>
              <Grid container spacing={1}>
                <Grid item xs={6} md={5}>
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
                <Grid item xs={6} md={5}>
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
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}

export default withAppContext(LogOut);
