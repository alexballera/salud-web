import React, { PropsWithChildren } from 'react';
/// MATERIAL - UI
import { Box, IconButton, Snackbar } from '@material-ui/core';
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';
/// MATERIAL - UI END

/// OWN COMPONENTS
import { withAppContext } from '../../context';
import Notifications from '../../components/common/Notifications';
import Navbar from '../../components/common/Navbar';
// import Alert from '../../components/common/Alert';
/// OWN COMPONENTS END

import { IProps } from './types';
import { Alert } from '@material-ui/lab';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      [theme.breakpoints.up('md')]: {
        paddingTop: 64
      }
    },
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
        {/* TODO Eliminar texto comentado y el componente Alert
        <Alert variant={errorState.type}>
          {errorState.type === 'error' ? <ErrorOutlineIcon /> : <CheckCircleOutlineIcon />}
          <Typography variant="body1" aria-live="assertive" className={classes.alertText}>
            {errorState?.message}
          </Typography>
        </Alert> */}
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
