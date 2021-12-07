import { makeStyles, createStyles } from '@material-ui/core/styles';

const SignUpStyles = makeStyles(() =>
  createStyles({
    titleSection: {
      fontSize: 16,
      fontWeight: 'normal',
      textTransform: 'uppercase'
    }
  })
);

export default SignUpStyles;
