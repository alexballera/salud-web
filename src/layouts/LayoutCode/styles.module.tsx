import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';

const LayoutCodeStyles = makeStyles((theme: Theme) =>
  createStyles({
    boxContainer: {
      position: 'absolute',
      top: 0,
      backgroundColor: 'white',
      zIndex: 1200,
      height: '100vh',
      width: '100%'
    },
    wrapper: {
      height: '100vh'
    },
    container: {
      height: '100vh',
      justifyContent: 'space-between',
      [theme.breakpoints.up('md')]: {
        justifyContent: 'center'
      }
    },
    button: {
      textTransform: 'initial',
      fontSize: 12,
      [theme.breakpoints.up('md')]: {
        fontSize: 15
      }
    },
    imgContainer: {
      alignItems: 'center',
      display: 'flex',
      justifyContent: 'center'
    },
    content: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-around',
      [theme.breakpoints.up('md')]: {
        justifyContent: 'center'
      }
    },
    contentContainer: {
      marginBottom: 24
    },
    title: {
      fontSize: 20,
      fontWeight: 500,
      letterSpacing: 0.15
    },
    description: {
      color: 'rgba(0, 0, 0, 0.6)',
      fontSize: 14,
      letterSpacing: 0.15
    }
  })
);

export default LayoutCodeStyles;
