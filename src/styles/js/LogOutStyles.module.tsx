import { makeStyles } from '@material-ui/core/styles';

const LogOutStyles = makeStyles({
  boxContainer: {
    position: 'absolute',
    top: 0,
    backgroundColor: 'white',
    zIndex: 1200,
    height: '100vh',
    width: '100%'
  },
  wrapper: {
    height: 'calc(100vh - 86px)'
  },
  button: {
    textTransform: 'initial'
  },
  imgContainer: {
    marginBottom: 49,
    marginTop: 100,
    textAlign: 'center'
  },
  title: {
    fontSize: 20,
    fontWeight: 500,
    letterSpacing: 0.15
  },
  desciption: {
    color: 'rgba(0, 0, 0, 0.6)',
    fontSize: 14,
    letterSpacing: 0.15
  }
});
export default LogOutStyles;
