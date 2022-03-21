import { makeStyles } from '@material-ui/core/styles';
import {
  chipActiveBackground,
  chipActiveTextColor,
  chipInactiveBackground,
  chipInactiveTextColor,
  title2Color,
  shadowCardColor,
  background2Color
} from '../../../styles/js/theme';

const allergieStyles = makeStyles({
  cardAllergie: {
    borderRadius: 10,
    boxShadow: `0px 4px 8px ${shadowCardColor}`
  },
  contentButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '56px',
    margin: '8px 0px'
  },
  buttonText: {
    width: '60%',
    fontSize: '16px'
  },
  colorTitle: {
    color: `${title2Color} !important`,
    marginBottom: '4px'
  },
  spacingRow: {
    padding: '16px 0px'
  },
  chipStatus: {
    fontSize: '12px !important',
    height: '20px !important'
  },
  chipActive: {
    backgroundColor: `${chipActiveBackground} !important`,
    color: `${chipActiveTextColor} !important`
  },
  chipInative: {
    backgroundColor: `${chipInactiveBackground} !important`,
    color: `${chipInactiveTextColor} !important`
  },
  typography14: {
    fontSize: '14px'
  },
  typography16: {
    fontSize: '16px'
  },
  mainGrid: {
    backgroundColor: background2Color,
    height: '100%'
  }
});

export default allergieStyles;
