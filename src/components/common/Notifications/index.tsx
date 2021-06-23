import { useEffect } from 'react';
/// MATERIAL - UI
import Alert from '@material-ui/lab/Alert';
import Collapse from '@material-ui/core/Collapse';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
/// MATERIAL - UI END

/// TYPES
type IAlertSeverity = 'success' | 'error' | 'info' | 'warning';
type IProps = {
  open: boolean;
  message: string;
  onClose?: () => void;
  severity: IAlertSeverity;
};
/// TYPES END

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      '& > * + *': {
        marginTop: theme.spacing(2)
      }
    }
  })
);

function Notifications({ message, ...props }: IProps): JSX.Element {
  const classes = useStyles();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (props.open) props?.onClose();
    }, 10000);

    return () => {
      clearTimeout(timer);
    };
  }, [props.open]);
  return (
    <div className={classes.root}>
      <Collapse in={props.open}>
        <Alert
          {...props}
          action={
            <IconButton size="small" color="inherit" onClick={props.onClose} aria-label="close">
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
        >
          {message}
        </Alert>
      </Collapse>
    </div>
  );
}

export default Notifications;
