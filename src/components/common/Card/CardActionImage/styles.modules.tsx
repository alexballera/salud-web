import { shadowCardColor, titlePageColor } from '../../../../styles/js/theme';
import { makeStyles } from '@material-ui/core/styles';

const cardActionImageStyles = makeStyles({
  textCard2: {
    color: titlePageColor,
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 12,
    textAlign: 'center',
    letterSpacing: 0.4,
    marginTop: 10,
    marginBottom: -5
  },
  root: {
    minWidth: 148,
    minHeight: 116,
    borderRadius: 16,
    boxShadow: `0px 4px 8px ${shadowCardColor}`
  },
  alignCenter: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default cardActionImageStyles;
