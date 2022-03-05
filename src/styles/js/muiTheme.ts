import { secondaryMainColor } from '@/src/styles/js/theme';
import {
  primaryLightColor,
  primaryMainColor,
  primaryDarkColor,
  primaryContrastTextColor,
  secondaryLightColor,
  secondaryDarkColor,
  secondaryContrastTextColor,
  activeActionColor,
  hoverActionColor,
  poppinsFontFamily
} from './theme';
import { ThemeOptions } from '@mui/material';
import { createTheme } from '@mui/material/styles';

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
  }
};

const muiTheme = createTheme({
  ...defaultTheme
});

export default muiTheme;
