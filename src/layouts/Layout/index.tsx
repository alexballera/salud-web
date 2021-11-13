import React, { PropsWithChildren } from 'react';
/// MATERIAL - UI
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import { Box, Snackbar, Typography } from '@material-ui/core';
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';
/// MATERIAL - UI END

/// OWN COMPONENTS
import Notifications from '../../components/common/Notifications';
import { withAppContext } from '../../context';
import Navbar from '../../components/common/Navbar';
import Alert from '../../components/common/Alert';
/// OWN COMPONENTS END

import { IProps } from './types';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      [theme.breakpoints.up('md')]: {
        paddingTop: 64
      }
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
  const classes = useStyles();
  return (
    <>
      <Navbar />
      <Notifications
        {...notificationState}
        onClose={() => handleNotifications({ ...notificationState, open: false })}
      />
      <Box component="main" data-testid="main" className={classes.root}>
        {children}
      </Box>

      <Snackbar
        open={errorState?.open}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        onClose={() => handleError(false, '', errorState.type)}
        autoHideDuration={20000}
      >
        <Alert type={errorState.type}>
          {errorState.type === 'error' && <ErrorOutlineIcon />}
          <Typography variant="body1" aria-live="assertive">
            {errorState?.message}
          </Typography>
        </Alert>
      </Snackbar>
    </>
  );
});
