import { makeStyles } from '@material-ui/core/styles';
import {
  shadowCardColor,
  title2Color,
  poppinsFontFamily,
  secondaryMainColor
} from '../../../styles/js/theme';

const modalFiltersStyles = makeStyles({
  main: {
    background: 'white',
    height: '100vh',
    width: '100vw',
    overflowY: 'scroll'
  },
  navBar: {
    position: 'fixed',
    backgroundColor: 'white',
    padding: '8px 28px',
    minHeight: 56,
    boxShadow: `0px 4px 8px ${shadowCardColor}`
  },
  titleFilter: {
    fontFamily: `${poppinsFontFamily} !important`,
    color: title2Color
  },
  eraseText: {
    fontFamily: `${poppinsFontFamily} !important`,
    fontWeight: 500,
    color: title2Color
  },
  fixedSection: {
    position: 'fixed',
    backgroundColor: 'white',
    height: '72px',
    bottom: 0,
    boxShadow:
      '0px -3px 5px -2px rgb(77 90 97 / 20%), 0px -2px 7px rgb(77 90 97 / 14%), 0px -1px 11px rgb(77 90 97 / 12%)'
  },
  buttonFilter: {
    backgroundColor: `${secondaryMainColor} !important`,
    fontFamily: `${poppinsFontFamily} !important`,
    fontSize: '15px !important'
  }
});

export default modalFiltersStyles;
