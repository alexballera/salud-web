import { createStyles, makeStyles, Theme } from '@material-ui/core';
import { secondaryMainColor } from './theme';

const recoverStyles = makeStyles((theme: Theme) =>
  createStyles({
    containerButton: {
      backgroundColor: 'white',
      bottom: 0,
      position: 'fixed',
      zIndex: 1000,
      width: '100%',
      [theme.breakpoints.up('md')]: {
        position: 'static'
      }
    },
    containerLink: {
      marginTop: 24,
      textAlign: 'center',
      width: '100%',
      '&>a': {
        color: secondaryMainColor
      },
      [theme.breakpoints.up('md')]: {
        textAlign: 'left'
      }
    },
    containerForm: {
      width: '100%'
    }
  })
);
export default recoverStyles;
