import { Theme } from '@material-ui/core';
import { createStyles } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/styles';

const UpdateStyles = makeStyles((theme: Theme) =>
  createStyles({
    headerTitle: {
      color: 'rgba(0, 0, 0, 0.87)',
      fontSize: 20,
      fontWeight: 500,
      letterSpacing: 0.15,
      marginBottom: 8,
      marginTop: 24
    },
    headerDescription: {
      color: 'rgba(0, 0, 0, 0.6)',
      fontSize: 14,
      fontWeight: 'normal',
      letterSpacing: 0.15,
      marginBottom: 32
    },
    contentLabel: {
      color: 'rgba(0, 0, 0, 0.6)',
      fontSize: 14,
      fontWeight: 'normal',
      marginBottom: 8
    },
    contentData: {
      color: 'rgba(0, 0, 0, 0.87)',
      fontSize: 16,
      fontWeight: 'normal',
      marginBottom: 24
    },
    containerActions: {
      bottom: 32,
      paddingRight: '48px !important',
      position: 'fixed',
      width: '100%',
      [theme.breakpoints.up('md')]: {
        paddingRight: '40% !important'
      }
    }
  })
);
export default UpdateStyles;
