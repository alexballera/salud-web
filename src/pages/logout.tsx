import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

/// CONTEXT
import { withAppContext } from '../context/index';
/// CONTEXT END

/// MATERIAL - UI
import { Button } from '@material-ui/core';
/// MATERIAL - UI END

/// SERVICES
/// SERVICES END

/// OWN COMPONENTS
import LayoutCode from '../layouts/LayoutCode';
/// OWN COMPONENTS END

/// STYLES & TYPES
import LayoutCodeStyles from '../layouts/LayoutCode/styles.module';
import {
  getDataFromLocalstorage,
  logoutService,
  removeDataToLocalstorage
} from '../services/auth.service';
import { User } from '../types/auth.types';
/// STYLES & TYPES END

/// FORM STATES & VALIDATIONS
/// FORM STATES & VALIDATIONS END

function LogOut(): JSX.Element {
  const classes = LayoutCodeStyles();
  const router = useRouter();
  const [email, setEmail] = useState('');

  useEffect(() => {
    const user: User = getDataFromLocalstorage('user');
    setEmail(user.email);
  });

  const closeSession = (): void => {
    logoutService(email);
    router.replace('/');
    // removeDataToLocalstorage('user');
  };

  return (
    <LayoutCode
      title={'Cerrar sesión'}
      description={'¿Estás seguro que querés cerrar tu sesión en plataforma?'}
      leftButton={
        <Button
          fullWidth
          onClick={() => router.back()}
          color="primary"
          variant="outlined"
          className={classes.button}
        >
          Cancelar
        </Button>
      }
      rightButton={
        <Button
          fullWidth
          onClick={() => closeSession()}
          color="primary"
          variant="contained"
          className={classes.button}
        >
          Si, cerrar sesión
        </Button>
      }
    />
  );
}

export default withAppContext(LogOut);
