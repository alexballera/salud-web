import { createStyles } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/styles';

const LoginStyles = makeStyles(() =>
  createStyles({
    containerButton: {
      bottom: 0,
      position: 'absolute',
      width: '100%'
    }
  })
);
export default LoginStyles;
