import { makeStyles } from '@material-ui/core';
import {
  background2Color,
  boxShadow,
  poppinsFontFamily,
  primaryContrastTextColor,
  secondaryMainColor,
  activeActionColor,
  title2Color
} from '@/src/styles/js/theme';

const searchNavbarDoctorStyles = makeStyles({
  mainWrapper: {
    boxShadow,
    padding: '0 24px 16px 24px',
    borderRadius: 16,
    backgroundColor: 'white'
  },
  inputActionsWrapper: {
    height: 56
  },
  inputWrapper: {
    width: '65%'
  },
  input: {
    background: background2Color,
    borderRadius: 4,
    '& input': {
      font: poppinsFontFamily,
      fontStyle: 'normal',
      fontWeight: 500,
      fontSize: 14,
      lineHeight: '157%',
      letterSpacing: '0.1px',
      opacity: '0.42'
    }
  },
  searchIcon: {
    marginLeft: 19
  },
  filterIcon: {
    paddingRight: 0
  },
  chip: {
    marginRight: 16
  },
  chipWrapper: {
    overflow: 'hidden',
    height: 34,
    marginTop: 8
  },
  chipFlex: {
    display: 'flex',
    overflow: 'scroll',
    paddingBottom: 15
  },
  modalContent: {
    background: primaryContrastTextColor,
    padding: '0 24px 20px 24px',
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16
  },
  inputColor: {
    '& .MuiOutlinedInput-root:hover': {
      '& > fieldset': { borderColor: secondaryMainColor }
    },
    '& label.Mui-focused': {
      color: secondaryMainColor
    },
    '& .MuiOutlinedInput-root.Mui-focused': {
      '& > fieldset': { borderColor: secondaryMainColor }
    },
    '& .MuiAutocomplete-popupIndicator': {
      transform: 'none !important'
    },
    '& .MuiAutocomplete-endAdornment': {
      right: '40px !important'
    }
  },
  iconColor: {
    color: activeActionColor
  },
  titleEdit: {
    color: title2Color,
    fontFamily: `${poppinsFontFamily} !important`
  }
});

export default searchNavbarDoctorStyles;
