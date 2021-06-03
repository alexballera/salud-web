import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { withAppContext } from '../../../context';

/// MATERIAL UI
import { AppBar, Button, Toolbar, Typography } from '@material-ui/core';
/// MATERIAL UI END

/// STYLES & TYPES
import styles from './styles.module.scss';
import { IProps } from './types';
/// STYLES & TYPES END

function Navbar({ loggedIn }: IProps): JSX.Element {
  const router = useRouter();

  const _drawAction = () => {
    const noLoginPathNames = ['/login', '/signup'];
    if (loggedIn || noLoginPathNames.includes(router.pathname)) {
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

  return (
    <AppBar position="static">
      <Toolbar className={styles.toolbar}>
        <Typography variant="h6">OMNiSalud</Typography>
        {_drawAction()}
      </Toolbar>
    </AppBar>
  );
}

export default withAppContext(Navbar);
