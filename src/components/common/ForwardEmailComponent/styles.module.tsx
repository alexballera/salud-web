import { makeStyles, createStyles } from '@material-ui/core/styles';

const forwardEmailStyles = makeStyles(() =>
  createStyles({
    imgContainer: {
      alignItems: 'center',
      display: 'flex',
      justifyContent: 'center'
    },
    contentContainer: {
      position: 'fixed',
      bottom: 0,
      left: 0,
      width: '100%'
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
