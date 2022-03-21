import { createTheme } from '@mui/material/styles';
import {
  secondaryContrastTextColor,
  secondaryDarkColor,
  secondaryLightColor,
  secondaryMainColor,
  title3Color
} from '@/src/styles/js/theme';

import { createStyles, makeStyles } from '@mui/styles';

export const examStyles = makeStyles(() =>
  createStyles({
    noRecords: {
      fontSize: '12px !important',
      lineHeight: '19.92px !important',
      letterSpacing: '0.4px',
      color: title3Color
    }
  })
);

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
