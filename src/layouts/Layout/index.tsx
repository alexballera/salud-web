/// BASE IMPORTS
import React, { PropsWithChildren, useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
/// BASE IMPORTS END

/// MATERIAL - UI
import { Box, Hidden, IconButton, Snackbar, CircularProgress } from '@material-ui/core';
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
import { UserContext } from '../../context/UserContext';
/// TYPES END

import { uiClean } from '@/src/store/slice/ui.slice';
import { useDispatch } from 'react-redux';

export default withAppContext(function Layout({
  children,
  errorState,
  handleError
}: PropsWithChildren<IProps>): JSX.Element {
  const router = useRouter();
  const { isLoading, userLogState, loggedInRoutes } = useContext(UserContext);

  const dispatch = useDispatch();

  const pathNotificationClean = [
    '/',
    '/main',
    '/login',
    '/recover_password',
    '/recover_password/change_password',
    '/recover_password/forward_email',
    '/signup',
    '/signup/email_verification',
    '/signup/registered_patient'
  ];

  useEffect(() => {
    if (pathNotificationClean.includes(router.pathname)) {
      dispatch(uiClean());
    }
  }, [router.asPath]);

  if (isLoading || userLogState === 'UNKNOWN') {
    return (
      <>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100vh"
          width="100vw"
        >
          <CircularProgress />
        </Box>
      </>
    );
  }

  if (userLogState === 'LOGGEDOUT' && loggedInRoutes.includes(router.pathname)) {
    router.replace('/');
    return <></>;
  }

  return (
    <>
      <Navbar />
      <Hidden only={['md', 'lg', 'xl']}>
        <Notifications />
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
          severity={errorState?.type}
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
