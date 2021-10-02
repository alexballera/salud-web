import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';

const LayoutCodeStyles = makeStyles((theme: Theme) =>
  createStyles({
    boxContainer: {
      position: 'absolute',
      top: 0,
      backgroundColor: 'white',
      zIndex: 1200,
      width: '100%'
    },
    wrapper: {
      height: '100vh'
    },
    container: {
      height: 'calc(100vh - 36px)',
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
      justifyContent: 'space-between',
      [theme.breakpoints.up('md')]: {
        justifyContent: 'center'
      }
    },
    contentContainer: {
      marginBottom: 16,
      paddingBottom: '0px !important'
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
