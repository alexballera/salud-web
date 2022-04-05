import { makeStyles } from '@material-ui/core/styles';
import { shadowCardColor, background2Color } from '../../styles/js/theme';

const measurementGraphicStyles = makeStyles({
  typography14: {
    fontSize: '14px'
  },
  typography16: {
    fontSize: '16px'
  },
  shadow: {
    boxShadow: `0px 4px 8px ${shadowCardColor}`
  },
  mainGrid: {
    backgroundColor: background2Color,
    height: '100%'
  }
});

export default measurementGraphicStyles;
