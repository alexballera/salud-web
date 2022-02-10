/// BASE IMPORTS
import React, { PropsWithChildren, useEffect } from 'react';
import { useRouter } from 'next/router';
/// BASE IMPORTS END

/// MATERIAL - UI
import { Box, Hidden, IconButton, Snackbar } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';
/// MATERIAL - UI END

/// OWN COMPONENTS
import { withAppContext } from '../../context';
import Notifications from '../../components/common/Notifications';
import Navbar from '../../components/common/Navbar';
import { Alert } from '@material-ui/lab';
/// OWN COMPONENTS END

/// TYPES
import { IProps } from './types';
/// TYPES END

const useStyles = makeStyles(() =>
  createStyles({
    alertText: {
      marginLeft: 10
    }
  })
);

export default withAppContext(function Layout({
  children,
  errorState,
  handleError,
  notificationState,
  handleNotifications
}: PropsWithChildren<IProps>): JSX.Element {
  const router = useRouter();

  useEffect(() => {
    handleNotifications({ ...notificationState, open: false });
  }, [router.pathname]);

  const classes = useStyles();
  return (
    <>
      <Navbar />
      <Hidden only={['md', 'lg', 'xl']}>
        <Notifications
          {...notificationState}
          onClose={() => handleNotifications({ ...notificationState, open: false })}
        />
      </Hidden>
      <Box component="main" data-testid="main">
        {children}
      </Box>

      <Snackbar
        open={errorState?.open}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        onClose={() => handleError(false, '', errorState.type)}
        autoHideDuration={7000}
      >
        <Alert
          severity={errorState.type}
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => handleError(false, '', errorState.type)}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
        >
          {errorState?.message}
        </Alert>
      </Snackbar>
    </>
  );
});
