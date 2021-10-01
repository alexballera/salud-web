import { makeStyles, createMuiTheme } from '@material-ui/core/styles';

export const validateCodeCustomTheme = createMuiTheme({
  overrides: {
    MuiFormHelperText: {
      root: {
        '&$error': {
          textAlign: 'left'
        }
      }
    }
  }
});
export const validateCodeStyles = makeStyles({
  boxContainer: {
    position: 'absolute',
    top: 0,
    backgroundColor: 'white',
    zIndex: 1200,
    height: '100vh',
    width: '100%'
  },
  button: {
    textTransform: 'initial'
  },
  imgContainer: {
    marginBottom: 16,
    marginTop: 56,
    textAlign: 'center'
  },
  title: {
    fontSize: 20,
    fontWeight: 500,
    letterSpacing: 0.15,
    marginBottom: 8
  },
  desciption: {
    marginBottom: 40
  },
  desciptionText: {
    color: 'rgba(0, 0, 0, 0.6)',
    fontSize: 14,
    letterSpacing: 0.15
  },
  label: {
    color: 'rgba(0, 0, 0, 0.87)',
    marginBottom: 10,
    fontSize: 14,
    fontWeight: 500
  },
  paperRoot: {
    fontSize: 14,
    marginBottom: 24,
    padding: 15
  },
  iconRoot: {
    height: 20,
    width: 20,
    marginRight: 16
  },
  link: {
    fontSize: 14,
    fontWeight: 500,
    marginBottom: 16,
    textAlign: 'right',
    textDecoration: 'underline'
  }
});
