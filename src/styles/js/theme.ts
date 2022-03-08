import { createMuiTheme, ThemeOptions } from '@material-ui/core/styles';

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
export const textValueCardColor = '#67777A';
export const textSmallCardColor = '#A4B6BA';
export const titleCardColor = '#616161';
export const titlePageColor = '#455255';
export const tertiaryLightColor = '#E9F7FC';
export const title2Color = '#4D5759';
export const background2Color = '#F8F8F8';
export const boxShadow = '0px 4px 8px rgba(207, 225, 227, 0.5)';
export const purpleLight = '#AB82FF';
export const titleCardTagColor = purpleLight;
export const titleCardTagBg = '#bb9afd1a';
export const textValueCardColor2 = '#A4B6BA';
export const title3Color = '#A1ADB0';
export const cardDividerColor = '#E4EBED';
export const chipActiveBackground = '#BB9AFD1A';
export const chipActiveTextColor = purpleLight;
export const chipInactiveBackground = '#E4EBED';
export const chipInactiveTextColor = '#829296';
export const shadowCardColor = 'rgba(207, 225, 227, 0.5)';

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
      labelPlacementStart: {
        margin: '0px !important'
      },
      label: {
        color: 'rgba(0, 0, 0, 0.87)'
      }
    },
    MuiFormLabel: {
      root: {
        fontSize: '14px',
        lineHeight: '12px',
        color: 'rgba(0, 0, 0, 0.87)'
      }
    },
    MuiChip: {
      colorSecondary: {
        color: secondaryMainColor,
        backgroundColor: secondaryBackgroundLightColor
      }
    },
    MuiButton: {
      label: {
        textTransform: 'initial',
        fontSize: '15px',
        lineHeight: '26px'
      },
      outlined: {
        color: primaryMainColor,
        border: `1px solid ${primaryMainColor}`
      }
    },
    MuiOutlinedInput: {
      notchedOutline: {
        top: 0
      }
    },
    MuiTab: {
      root: {
        textTransform: 'none',
        fontFamily: poppinsFontFamily,
        fontStyle: 'normal',
        fontWeight: 500,
        fontSize: 14,
        letterSpacing: 0.4,
        color: textValueCardColor
      }
    }
  }
};

const theme = createMuiTheme({
  ...defaultTheme
});

export default theme;
