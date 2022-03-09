import { makeStyles } from '@material-ui/core/styles';
import { shadowCardColor } from '../../../styles/js/theme';

const diseasesStyles = makeStyles({
  cardDiseases: {
    borderRadius: 16,
    boxShadow: `0px 4px 8px ${shadowCardColor}`
  },
  typography14: {
    fontSize: '14px'
  },
  typography16: {
    fontSize: '16px'
  },
  shadow: {
    boxShadow: `0px 4px 8px ${shadowCardColor}`
  }
});

export default diseasesStyles;
