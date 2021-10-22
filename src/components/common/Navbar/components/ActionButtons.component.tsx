import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

/// MATERIAL UI
import {
  Button,
  Slide,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import navbarStyles from '../styles.module';
/// MATERIAL UI END

const Transition = React.forwardRef(function Transition(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  props: { children: React.ReactElement<any, any> },
  ref
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

type IAction = {
  noActionPathNames: Array<string>;
  exitButtonPathNames: Array<string>;
  backButtonPathNames: Array<string>;
};

const ActionButtons = ({
  noActionPathNames,
  exitButtonPathNames,
  backButtonPathNames
}: IAction): JSX.Element => {
  const classes = navbarStyles();
  const router = useRouter();
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    setDialogOpen(false);
  }, [router]);

  // Back buttons
  if (backButtonPathNames.includes(router.pathname)) {
    return (
      <Button
        data-testid="exit-button"
        variant="text"
        onClick={() => router.back()}
        endIcon={<CloseIcon />}
        className={classes.button}
      >
        Salir
      </Button>
    );
  }

  // Exit buttons
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
  if (noActionPathNames.includes(router.pathname)) {
    return <></>;
  }

  return (
    <Link href="login" passHref>
      <Button color="inherit" data-testid="login-button">
        INGRESAR
      </Button>
    </Link>
  );
};

export default ActionButtons;
