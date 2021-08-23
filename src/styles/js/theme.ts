import { createMuiTheme, ThemeOptions } from '@material-ui/core/styles';

export const errorColor = '#ff6666';
export const successColor = '#4caf50';

const defaultTheme: ThemeOptions = {
  palette: {
    primary: {
      light: '#32566a',
      main: '#002d3f',
      dark: '#000219',
      contrastText: '#ffffff'
    },
    secondary: {
      light: '#56c8d8',
      main: '#0097a7',
      dark: '#006978',
      contrastText: '#ffffff'
    },
    action: {
      active: 'rgba(0, 0, 0, 0.54)',
      hover: 'rgba(0, 0, 0, 0.04)'
    }
  },
  typography: {
    fontFamily: 'Poppins, Roboto, sans-serif'
  },
  overrides: {
    MuiFormHelperText: {
      root: {
        '&$error': {
          textAlign: 'right'
        }
      }
    }
  }
};

const theme = createMuiTheme({
  ...defaultTheme
});

export default theme;
