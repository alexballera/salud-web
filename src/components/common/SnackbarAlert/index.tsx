/// BASE IMPORTS
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
/// BASE IMPORTS END

/// MATERIAL UI
import { Box, Snackbar } from '@material-ui/core';
import { Alert, AlertProps } from '@material-ui/lab';
/// MATERIAL UI END

/// STYLES & TYPES
import { makeStyles } from '@material-ui/core/styles';
/// STYLES & TYPES END

const useStyles = makeStyles(() => ({
  snackbar: {
    zIndex: 1,
    bottom: 0,
    width: '100%',
    position: 'relative',
    display: 'block',
    left: 0,
    transform: 'none'
  }
}));

type TProps = {
  duration: number;
  message?: string;
  severity: AlertProps['severity'];
  removeMessage: Dispatch<SetStateAction<string>>;
  mt?: number;
  mb?: number;
};

export default function SnackbarAlert({
  severity,
  message,
  duration,
  removeMessage,
  mt = 0,
  mb = 0
}: TProps): JSX.Element {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(!!message);
  }, [message]);

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    removeMessage(null);
    setOpen(false);
  };

  return (
    <Box mb={open ? mb : 0} mt={open ? mt : 0}>
      <Snackbar
        className={classes.snackbar}
        open={open}
        autoHideDuration={duration}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity={severity} action={false}>
          {message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
