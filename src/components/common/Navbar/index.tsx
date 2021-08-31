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
import SvgContainer from '../SvgContainer';
/// STYLES & TYPES END

const useStyles = makeStyles({
  root: {
    textTransform: 'capitalize'
  }
});

const Transition = React.forwardRef(function Transition(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
        <SvgContainer title="Logo Icon">
          <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
            <g id="Group-3" transform="translate(0.000000, -0.000000)">
              <g id="Group-2" fill="#DAF0F0">
                <path
                  d="M22.0570126,3.27682764 C18.6776235,3.6463166 13.8779759,7.23619865 9.25731453,6.25969033 C4.6366532,5.283182 0.459871964,9.12648862 2.52623522,16.3239235 C4.59259847,23.5213584 19.1296012,23.5170521 23.7462444,19.1712394 C28.3628877,14.8254266 30.0174696,10.7506775 29.0715986,7.48258915 C28.1257277,4.21450079 25.4364017,2.90733867 22.0570126,3.27682764 Z"
                  id="Path-2"
                  transform="translate(15.655451, 12.679381) rotate(-165.000000) translate(-15.655451, -12.679381) "
                ></path>
              </g>
              <text
                id="OS"
                fontFamily="Poppins-Bold, Poppins"
                fontSize="21.4285714"
                fontWeight="bold"
                line-spacing="22.8571429"
                letterSpacing="1.23214287"
              >
                <tspan x="7.14063356" y="30.0599081" fill="#84BEBE">
                  O
                </tspan>
                <tspan x="25.2799193" y="30.0599081" fill="#0097A7">
                  S
                </tspan>
              </text>
            </g>
          </g>
        </SvgContainer>
        {_drawAction()}
      </Toolbar>
    </AppBar>
  );
}

export default withAppContext(Navbar);
