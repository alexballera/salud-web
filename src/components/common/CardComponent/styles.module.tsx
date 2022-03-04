import { createTheme } from '@mui/material/styles';
import { createStyles, makeStyles } from '@mui/styles';
import {
  boxShadow,
  poppinsFontFamily,
  secondaryContrastTextColor,
  secondaryDarkColor,
  secondaryLightColor,
  secondaryMainColor
} from '@/src/styles/js/theme';

export const cardTheme = createTheme({
  palette: {
    secondary: {
      light: secondaryLightColor,
      main: secondaryMainColor,
      dark: secondaryDarkColor,
      contrastText: secondaryContrastTextColor
    }
  }
});

export const cardStyles = makeStyles(() =>
  createStyles({
    performer: {
      color: '#455255',
      fontSize: '14px !important',
      display: 'flex',
      alignItems: 'center',
      fontFamily: `${poppinsFontFamily} !important`
    }
  })
);
