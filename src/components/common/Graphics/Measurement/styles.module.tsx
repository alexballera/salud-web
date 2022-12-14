import { makeStyles } from '@material-ui/core/styles';
import { shadowCardColor, background2Color, textValueCardColor } from '../../../../styles/js/theme';

const generalDataStyles = makeStyles({
  a: {
    cursor: 'pointer',
    '&:hover': {
      color: textValueCardColor
    }
  },
  cardMeasurement: {
    borderRadius: 10,
    boxShadow: `0px 4px 8px ${shadowCardColor}`
  },
  typography12: {
    fontSize: '12px',
    color: textValueCardColor,
    textAlign: 'center',
    textDecoration: 'none'
  },
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
  },
  active: {
    color: 'black !important',
    fontWeight: 530,
    textDecoration: 'none'
  }
});

export default generalDataStyles;
