import { createTheme } from '@mui/material/styles';
import { createStyles, makeStyles } from '@mui/styles';
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

export const tabStyles = makeStyles(() =>
  createStyles({
    root: {
      boxShadow: '0px 4px 8px rgba(207, 225, 227, 0.25)'
    }
  })
);
