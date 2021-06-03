import { Box, Snackbar, Typography } from '@material-ui/core';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import React, { PropsWithChildren } from 'react';
import { withAppContext } from '../../../context';
import Navbar from '../Navbar';
import Alert from '../Alert';
import { IProps } from './types';

export default withAppContext(function Layout({
  children,
  errorState,
  handleError
}: PropsWithChildren<IProps>): JSX.Element {
  return (
    <>
      <Navbar />

      <Box component="main">{children}</Box>

      <Snackbar
        open={errorState?.open}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        onClose={() => handleError(false)}
        autoHideDuration={20000}
      >
        <Alert variant="error">
          <ErrorOutlineIcon />
          <Typography variant="body1" aria-live="assertive">
            {errorState?.message}
          </Typography>
        </Alert>
      </Snackbar>
    </>
  );
});
