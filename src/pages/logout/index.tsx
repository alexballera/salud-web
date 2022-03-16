/// BASE IMPORTS
import { useContext, useState } from 'react';
import { useRouter } from 'next/router';
/// BASE  IMPORTS END

/// CONTEXT
import { withAppContext } from '../../context/index';
/// CONTEXT END

/// MATERIAL - UI
import { Button } from '@material-ui/core';
/// MATERIAL - UI END

/// SERVICES
/// SERVICES END

/// i18n
import { useTranslation } from 'react-i18next';
import { NAMESPACE_KEY } from '../../i18n/globals/i18n';
/// i18n END

/// OWN COMPONENTS
import LayoutCode from '../../layouts/LayoutCode';
/// OWN COMPONENTS END

/// STYLES & TYPES
import LayoutCodeStyles from '../../layouts/LayoutCode/styles.module';
import { UserContext } from '../../context/UserContext';
/// STYLES & TYPES END

function LogOut(): JSX.Element {
  const { t } = useTranslation(NAMESPACE_KEY);
  const { handleUserLogOut, userLogState } = useContext(UserContext);
  const classes = LayoutCodeStyles();
  const router = useRouter();

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
          disabled={userLogState === 'LOGGEDOUT' || userLogState === 'UNKNOWN'}
          onClick={() => {
            handleUserLogOut();
            router.replace('/');
          }}
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
