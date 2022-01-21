import { createStyles } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/styles';
import theme from './theme';

const LoginStyles = makeStyles(() =>
  createStyles({
    mainContainer: {
      width: '100%',
      padding: 24,
      [theme.breakpoints.up('md')]: {
        padding: 0,
        width: 461
      }
    },
    recoverContainer: {
      marginTop: 0,
      textAlign: 'right',
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
    button: {
      height: 40,
      textTransform: 'inherit'
    },
    buttonSubmit: {
      [theme.breakpoints.up('md')]: {
        width: '33%'
      }
    },
    divider: {
      height: '2px !important',
      background: '#979797',
      marginBottom: 32,
      marginTop: 32,
      width: '100%'
    }
  })
);
export default LoginStyles;
