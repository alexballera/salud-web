import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { poppinsFontFamily } from '../../../src/styles/js/theme';

const SignUpStyles = makeStyles((theme: Theme) =>
  createStyles({
    titleSection: {
      fontSize: 16,
      fontWeight: 'normal',
      textTransform: 'uppercase',
      marginTop: 24,
      marginBottom: 16
    },
    tooltip: {
      marginRight: 10,
      fontFamily: poppinsFontFamily,
      padding: '18px 8px',
      textAlign: 'center',
      fontStyle: 'normal',
      fontWeight: 'normal',
      fontSize: '10px',
      lineHeight: '14px',
      width: '163px',
      [theme.breakpoints.up('md')]: {
        width: '232px'
      }
    },
    selectPlaceholder: {
      display: 'none'
    }
  })
);

export default SignUpStyles;
