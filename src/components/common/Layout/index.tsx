import React, { PropsWithChildren } from 'react';
/// MATERIAL - UI
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import { Box, Snackbar, Typography } from '@material-ui/core';
/// MATERIAL - UI END

/// OWN COMPONENTS
import Alert from '../Alert';
import Navbar from '../Navbar';
import Notification from '../Notifications';
import { withAppContext } from '../../../context';
/// OWN COMPONENTS END

import { IProps } from './types';

export default withAppContext(function Layout({
  children,
  errorState,
  handleError,
  notificationState,
  handleNotifications
}: PropsWithChildren<IProps>): JSX.Element {
  return (
    <>
      <Navbar />
      <Notification
        {...notificationState}
        onClose={() => handleNotifications({ ...notificationState, open: false })}
      />
      <Box component="main" data-testid="main">
        {children}
      </Box>

      <Snackbar
        open={errorState?.open}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        onClose={() => handleError(false, '', errorState.type)}
        autoHideDuration={20000}
      >
        <Alert variant={errorState.type}>
          {errorState.type === 'error' && <ErrorOutlineIcon />}
          <Typography variant="body1" aria-live="assertive">
            {errorState?.message}
          </Typography>
        </Alert>
      </Snackbar>
    </>
  );
});
