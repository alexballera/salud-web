import { useEffect } from 'react';
/// MATERIAL - UI
import Alert from '@material-ui/lab/Alert';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { Box, Collapse } from '@material-ui/core';
/// MATERIAL - UI END

/// TYPES
type IAlertSeverity = 'success' | 'error' | 'info' | 'warning';
type IProps = {
  open: boolean;
  message: string;
  onClose?: () => void;
  severity: IAlertSeverity;
  duration?: number;
};
/// TYPES END

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      paddingLeft: 24,
      paddingRight: 24,
      width: '100%',
      '& > * + *': {
        marginTop: theme.spacing(2)
      },
      [theme.breakpoints.up('md')]: {
        padding: 0
      }
    }
  })
);

function Notifications({ message, severity, onClose, open, duration }: IProps): JSX.Element {
  const classes = useStyles();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (open) onClose();
    }, duration);

    return () => {
      clearTimeout(timer);
    };
  }, [open]);
  return (
    <Box className={classes.root}>
      <Collapse in={open}>
        <Alert severity={severity}>{message} </Alert>
      </Collapse>
    </Box>
  );
}

export default Notifications;
