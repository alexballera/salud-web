import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { Button, Box, Grid } from '@material-ui/core';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  boxContainer: {
    position: 'absolute',
    top: 0,
    backgroundColor: 'white',
    zIndex: 1200,
    height: '100vh',
    width: '100%'
  },
  button: {
    textTransform: 'initial'
  }
});

function LogOut(): JSX.Element {
  const classes = useStyles();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button
        data-testid="exit-button"
        variant="text"
        onClick={() => setOpen(true)}
        endIcon={<ExitToAppIcon />}
        className={classes.button}
        color="secondary"
      >
        Cerrar sesión
      </Button>
      {open && (
        <div className={classes.boxContainer}>
          <Box p={3}>
            <Grid container spacing={1}>
              <Grid item xs={12} md={12}>
                <h1>Aqui estoy</h1>
              </Grid>
            </Grid>
          </Box>
          <Box p={3}>
            <Grid container spacing={1}>
              <Grid item xs={6} md={6}>
                <Button
                  fullWidth
                  onClick={() => setOpen(false)}
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
                    setOpen(false);
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
      )}
    </>
  );
}

export default LogOut;
