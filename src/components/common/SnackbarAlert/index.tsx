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
    width: '100%',
    position: 'relative',
    display: 'block'
  }
}));

type TProps = {
  duration: number;
  message?: string;
  severity: AlertProps['severity'];
  removeMessage: Dispatch<SetStateAction<string>>;
};

export default function SnackbarAlert({
  severity,
  message,
  duration,
  removeMessage
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
    <Box>
      <Snackbar
        className={classes.snackbar}
        open={open}
        autoHideDuration={duration}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity={severity}>
          {message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
