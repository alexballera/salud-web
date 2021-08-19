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
  DialogActions
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { makeStyles } from '@material-ui/core/styles';
/// MATERIAL UI END

/// STYLES & TYPES
import styles from './styles.module.scss';
import { IProps } from './types';
import LogoIcon from '../LogoIcon/LogoIcon';
/// STYLES & TYPES END

const useStyles = makeStyles({
  root: {
    textTransform: 'capitalize'
  }
});

const Transition = React.forwardRef(function Transition(
  props: { children: React.ReactElement<any, any> },
  ref
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function Navbar({ loggedIn }: IProps): JSX.Element {
  const classes = useStyles();
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
            className={classes.root}
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
    const noActionPathNames = ['/login'];
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

  useEffect(() => {
    setDialogOpen(false);
  }, [router]);

  return (
    <AppBar position="static" color="inherit" elevation={0}>
      <Toolbar className={styles.toolbar}>
        <LogoIcon />
        {_drawAction()}
      </Toolbar>
    </AppBar>
  );
}

export default withAppContext(Navbar);
