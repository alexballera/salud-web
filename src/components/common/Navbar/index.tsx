import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { withAppContext } from '../../../context';

/// MATERIAL UI
import {
  AppBar,
  Button,
  Toolbar,
  Slide,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Hidden,
  Grid
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
/// MATERIAL UI END

/// STYLES & TYPES
import { IProps } from './types';
import SvgContainer from '../SvgContainer';
import LogoIconSvg from './LogoIcon.component';
import DrawerComponent from '../DrawerComponent';
import navbarStyles from './styles.module';
/// STYLES & TYPES END

const Transition = React.forwardRef(function Transition(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  props: { children: React.ReactElement<any, any> },
  ref
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function Navbar({ loggedIn }: IProps): JSX.Element {
  const classes = navbarStyles();
  const router = useRouter();
  const [dialogOpen, setDialogOpen] = useState(false);

  const _drawAction = () => {
    // Exit buttons
    const exitButtonPathNames = ['/recover', '/signup'];
    if (exitButtonPathNames.includes(router.pathname)) {
      return (
        <>
          <Button
            data-testid="exit-button"
            variant="text"
            onClick={() => setDialogOpen(true)}
            endIcon={<CloseIcon />}
            className={classes.button}
          >
            Salir
          </Button>

          <Dialog
            open={dialogOpen}
            TransitionComponent={Transition}
            keepMounted
            onClose={() => {
              setDialogOpen(false);
              router.back();
            }}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
          >
            <DialogTitle id="alert-dialog-slide-title">Volver a la página principal</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-slide-description">
                ¿Seguro deseas salir?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setDialogOpen(false)} color="secondary">
                Cancelar
              </Button>
              <Button
                onClick={() => {
                  setDialogOpen(false);
                  router.push('/');
                }}
                color="primary"
              >
                Salir
              </Button>
            </DialogActions>
          </Dialog>
        </>
      );
    }

    // No buttons
    const noActionPathNames = ['/login', '/main'];
    if (loggedIn || noActionPathNames.includes(router.pathname)) {
      return <></>;
    }

    return (
      <Link href="login">
        <Button color="inherit" data-testid="login-button">
          INGRESAR
        </Button>
      </Link>
    );
  };

  const showMenuDrawer = () => {
    switch (router.pathname) {
      case '/main':
        return true;
      default:
        break;
    }
  };

  useEffect(() => {
    setDialogOpen(false);
  }, [router]);

  return (
    <AppBar position="static" color="inherit" elevation={0}>
      <Hidden smUp>
        <Toolbar>
          <Grid container justify="center">
            <Grid container>
              <Grid item xs={6} md={6}>
                <Grid container alignItems="center">
                  {showMenuDrawer() && <DrawerComponent />}
                  <SvgContainer title="Logo Icon">
                    <LogoIconSvg />
                  </SvgContainer>
                </Grid>
              </Grid>
              <Grid item xs={6} md={6} className={classes.buttonAction}>
                {_drawAction()}
              </Grid>
            </Grid>
          </Grid>
        </Toolbar>
      </Hidden>

      <Hidden xsDown>
        <Toolbar variant="dense">
          <SvgContainer title="Logo Icon">
            <LogoIconSvg />
          </SvgContainer>
          Desktop
          {_drawAction()}
        </Toolbar>
      </Hidden>
    </AppBar>
  );
}

export default withAppContext(Navbar);
