import { makeStyles } from '@material-ui/core';
import {
  background2Color,
  boxShadow,
  poppinsFontFamily,
  primaryContrastTextColor
} from '@/src/styles/js/theme';

const searchNavbarStyles = makeStyles({
  mainWrapper: {
    boxShadow,
    padding: '0 24px 20px 24px',
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
  title: {
    color: 'rgba(69, 82, 85, 1)',
    fontSize: 16,
    fontWeight: 400,
    marginLeft: 10
  }
});

export default searchNavbarStyles;
