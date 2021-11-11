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
  button: {
    textTransform: 'initial'
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
    textDecoration: 'underline',
    cursor: 'pointer'
  },
  containerContent: {
    marginBottom: 16,
    backgroundColor: 'white'
  }
});
