import { makeStyles } from '@material-ui/core/styles';
import { shadowCardColor } from '../../../styles/js/theme';

const habitStyles = makeStyles({
  cardHabits: {
    borderRadius: 16,
    boxShadow: `0px 4px 8px ${shadowCardColor}`,
    padding: '16px'
  },
  cardContentLink: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  typography14: {
    fontSize: '14px'
  },
  typography16: {
    fontSize: '16px'
  }
});

export default habitStyles;
