import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const forwardEmailStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      [theme.breakpoints.up('md')]: {
        height: 'calc(100vh - 128px)'
      }
    },
    imgContainer: {
      alignItems: 'center',
      display: 'flex',
      justifyContent: 'center'
    },
    contentContainer: {
      bottom: 0,
      right: 0,
      paddingLeft: 24,
      paddingRight: 24,
      width: '100%',
      position: 'fixed',
      [theme.breakpoints.up('md')]: {
        paddingLeft: 0,
        paddingRight: 0,
        position: 'static'
      }
    },
    timerContainer: {
      width: '100%'
    },
    timerTitle: {
      color: 'rgba(0, 0, 0, 0.6)',
      fontSize: 14,
      letterSpacing: 0.15
    },
    timerLabel: {
      fontWeight: 'bold',
      textAlign: 'right',
      fontSize: 14
    },
    contactTitle: {
      color: 'rgba(0, 0, 0, 0.87)',
      fontSize: 14,
      fontWeight: 600,
      letterSpacing: 0.15
    },
    contactLabel: {
      color: 'rgba(0, 0, 0, 0.6)',
      fontWeight: 400
    }
  })
);

export { forwardEmailStyles };
