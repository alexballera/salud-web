import { createMuiTheme, ThemeOptions, Theme } from '@material-ui/core/styles';

export const errorColor = '#ff6666';
export const successColor = '#4caf50';
export const primaryLightColor = '#32566a';
export const primaryMainColor = '#002d3f';
export const primaryDarkColor = '#000219';
export const primaryContrastTextColor = '#ffffff';
export const secondaryLightColor = '#56c8d8';
export const secondaryMainColor = '#0097a7';
export const secondaryDarkColor = '#006978';
export const secondaryBackgroundLightColor = '#DAF0F0';
export const secondaryContrastTextColor = '#ffffff';
export const activeActionColor = 'rgba(0, 0, 0, 0.54)';
export const hoverActionColor = 'rgba(0, 0, 0, 0.04)';
export const poppinsFontFamily = 'Poppins, Roboto, sans-serif';

const defaultTheme: ThemeOptions = {
  palette: {
    primary: {
      light: primaryLightColor,
      main: primaryMainColor,
      dark: primaryDarkColor,
      contrastText: primaryContrastTextColor
    },
    secondary: {
      light: secondaryLightColor,
      main: secondaryMainColor,
      dark: secondaryDarkColor,
      contrastText: secondaryContrastTextColor
    },
    action: {
      active: activeActionColor,
      hover: hoverActionColor
    }
  },
  typography: {
    fontFamily: poppinsFontFamily
  },
  overrides: {
    MuiStepper: {
      root: {
        display: 'none'
      }
    },
    MuiFormHelperText: {
      contained: {
        margin: '0px !important'
      }
    },
    MuiFormControl: {
      root: {
        width: '100%'
      }
    },
    MuiFormControlLabel: {
      root: {
        justifyContent: 'space-between'
      },
      labelPlacementStart: {
        margin: '0px !important'
      }
    },
    MuiChip: {
      colorSecondary: {
        color: secondaryMainColor,
        backgroundColor: secondaryBackgroundLightColor
      }
    }
  }
};

const theme = createMuiTheme({
  ...defaultTheme
});

export default theme;
