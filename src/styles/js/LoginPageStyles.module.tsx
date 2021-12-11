import { createStyles } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/styles';
import theme from './theme';

const LoginStyles = makeStyles(() =>
  createStyles({
    containerButton: {
      bottom: 0,
      position: 'absolute',
      width: '100%'
    },
    recoverContainer: {
      marginTop: 8,
      textAlign: 'center',
      '&>span': {
        marginRight: 8
      },
      '& a': {
        color: theme.palette.secondary.main,
        fontWeight: 500
      }
    }
  })
);
export default LoginStyles;
