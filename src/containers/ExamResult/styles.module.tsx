import { createTheme } from '@mui/material/styles';
import {
  secondaryContrastTextColor,
  secondaryDarkColor,
  secondaryLightColor,
  secondaryMainColor
} from '@/src/styles/js/theme';

export const tabTheme = createTheme({
  palette: {
    secondary: {
      light: secondaryLightColor,
      main: secondaryMainColor,
      dark: secondaryDarkColor,
      contrastText: secondaryContrastTextColor
    }
  }
});
