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

/// i18n
import { useTranslation } from 'react-i18next';
import { NAMESPACE_KEY } from '../i18n/globals/i18n';
/// i18n END

/// OWN COMPONENTS
import LayoutCode from '../layouts/LayoutCode';
/// OWN COMPONENTS END

/// STYLES & TYPES
import LayoutCodeStyles from '../layouts/LayoutCode/styles.module';
import { getDataFromLocalstorage, logoutService } from '../services/auth.service';
import { User } from '../types/auth.types';
/// STYLES & TYPES END

/// FORM STATES & VALIDATIONS
/// FORM STATES & VALIDATIONS END

function LogOut(): JSX.Element {
  const { t } = useTranslation(NAMESPACE_KEY);
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
  };

  return (
    <LayoutCode
      title={t('title.logout')}
      description={t('description.logout')}
      leftButton={
        <Button
          fullWidth
          onClick={() => router.back()}
          color="primary"
          variant="outlined"
          className={classes.button}
        >
          {t('button.cancel')}
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
          {t('button.logout_confirm')}
        </Button>
      }
    />
  );
}

export default withAppContext(LogOut);
