import { makeStyles } from '@material-ui/core/styles';
import {
  chipActiveBackground,
  chipActiveTextColor,
  chipInactiveBackground,
  chipInactiveTextColor,
  title2Color,
  shadowCardColor
} from '../../../styles/js/theme';

const allergieStyles = makeStyles({
  cardAllergie: {
    marginTop: '24px',
    borderRadius: 16,
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
    color: title2Color,
    marginBottom: '4px'
  },
  spacingRow: {
    padding: '16px 0px'
  },
  chipStatus: {
    fontSize: '12px',
    height: '20px'
  },
  chipActive: {
    backgroundColor: chipActiveBackground,
    color: chipActiveTextColor
  },
  chipInative: {
    backgroundColor: chipInactiveBackground,
    color: chipInactiveTextColor
  },
  typography14: {
    fontSize: '14px'
  },
  typography16: {
    fontSize: '16px'
  }
});

export default allergieStyles;
