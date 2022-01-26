import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

/// i18n
import { useTranslation } from 'react-i18next';
import { NAMESPACE_KEY as i18nGlobals } from '../../../../i18n/globals/i18n';
/// i18n END

/// MATERIAL UI
import { Button } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
/// MATERIAL UI END

import navbarStyles from '../styles.module';

type IAction = {
  noActionPathNames: Array<string>;
  exitButtonPathNames: Array<string>;
  backButtonPathNames: Array<string>;
  closeButtonPathNames: Array<string>;
};

const ActionButtons = ({
  noActionPathNames,
  exitButtonPathNames,
  closeButtonPathNames,
  backButtonPathNames
}: IAction): JSX.Element => {
  const { t } = useTranslation(i18nGlobals);
  const classes = navbarStyles();
  const router = useRouter();

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
        {t('button.back', { ns: i18nGlobals })}
      </Button>
    );
  }

  // Close buttons
  if (closeButtonPathNames.includes(router.pathname)) {
    return (
      <Button
        data-testid="close-button"
        variant="text"
        onClick={() => router.push('/')}
        endIcon={<CloseIcon />}
        className={classes.button}
      >
        {t('button.close', { ns: i18nGlobals })}
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
          onClick={() => router.push('/login')}
          endIcon={<CloseIcon />}
          className={classes.button}
        >
          {t('button.exit', { ns: i18nGlobals })}
        </Button>
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
        {t('button.enter', { ns: i18nGlobals })}
      </Button>
    </Link>
  );
};

export default ActionButtons;
