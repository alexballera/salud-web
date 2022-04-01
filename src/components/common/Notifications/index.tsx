import { useEffect } from 'react';
import Alert from '@material-ui/lab/Alert';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { Box, Collapse } from '@material-ui/core';
import { useSelector } from '@/src/store';
import { uiClean } from '@/src/store/slice/ui.slice';
import { useDispatch } from 'react-redux';

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

function Notifications(): JSX.Element {
  const classes = useStyles();
  const { open, duration, message, type } = useSelector(state => state.ui?.alert);
  const dispatch = useDispatch();

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(uiClean());
    }, duration);

    return () => {
      clearTimeout(timer);
    };
  }, [open]);

  return (
    <Box className={classes.root}>
      <Collapse in={open}>
        <Alert severity={type}>{message}</Alert>
      </Collapse>
    </Box>
  );
}

export default Notifications;
