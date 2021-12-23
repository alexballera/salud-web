import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
/// i18n
import { useTranslation } from 'react-i18next';
import { NAMESPACE_KEY } from '../../../../i18n/globals/i18n';
/// i18n END

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
  const { t } = useTranslation([NAMESPACE_KEY, 'menu']);
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
        {t('button.exit', { ns: NAMESPACE_KEY })}
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
          {t('button.exit', { ns: NAMESPACE_KEY })}
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
          <DialogTitle id="alert-dialog-slide-title">
            {t('alert.slide_title', { ns: 'menu' })}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              {t('alert.confirm_title', { ns: 'menu' })}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDialogOpen(false)} color="secondary">
              {t('button.cancel', { ns: NAMESPACE_KEY })}
            </Button>
            <Button
              onClick={() => {
                setDialogOpen(false);
                router.push('/');
              }}
              color="primary"
            >
              {t('button.exit', { ns: NAMESPACE_KEY })}
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
        {t('button.enter', { ns: NAMESPACE_KEY })}
      </Button>
    </Link>
  );
};

export default ActionButtons;
