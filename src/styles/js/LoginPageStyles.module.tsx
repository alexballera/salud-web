import { createStyles } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/styles';
import theme from './theme';

const LoginStyles = makeStyles(() =>
  createStyles({
    container: {
      [theme.breakpoints.up('md')]: {
        justifyContent: 'flex-end'
      }
    },
    containerButton: {
      bottom: 0,
      position: 'absolute',
      width: '100%'
    },
    recoverContainer: {
      marginTop: 8,
      textAlign: 'center',
      '& span': {
        marginRight: 8
      },
      '& a': {
        color: theme.palette.secondary.main,
        fontWeight: 500
      },
      [theme.breakpoints.up('md')]: {
        textAlign: 'right'
      }
    },
    containerTextRegister: {
      textAlign: 'center'
    },
    button: {
      height: 40,
      textTransform: 'inherit'
    },
    buttonSubmit: {
      [theme.breakpoints.up('md')]: {
        width: '33%'
      }
    },
    containerButtonSignup: {
      [theme.breakpoints.up('md')]: {
        display: 'flex',
        justifyContent: 'space-between',
        '& button': {
          width: '33%'
        }
      }
    },
    divider: {
      height: '2px !important',
      marginBottom: 16,
      marginTop: 16,
      width: '100%'
    }
  })
);
export default LoginStyles;
