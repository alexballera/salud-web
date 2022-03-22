import { makeStyles } from '@material-ui/core/styles';
import { title3Color } from '../../styles/js/theme';

const habitRowStyles = makeStyles({
  typography14: {
    fontSize: '14px'
  },
  typography16: {
    fontSize: '16px'
  },
  typographyTitle: {
    marginBottom: '0px !important',
    color: title3Color
  },
  spaceDivider: {
    marginBottom: '16px'
  }
});

export default habitRowStyles;
