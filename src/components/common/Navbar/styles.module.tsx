import { makeStyles } from '@material-ui/core/styles';
import { shadowCardColor } from '../../../styles/js/theme';

const navbarStyles = makeStyles({
  button: {
    textTransform: 'capitalize'
  },
  buttonAction: {
    textAlign: 'right'
  },
  name: {
    color: 'rgba(0, 0, 0, 0.87)',
    fontSize: 16,
    fontWeight: 'normal'
  },
  title: {
    color: 'rgba(69, 82, 85, 1)',
    fontSize: 16,
    fontWeight: 400,
    marginLeft: 10
  },
  documentNumber: {
    color: 'rgba(0, 0, 0, 0.6)',
    fontSize: 14,
    fontWeight: 'normal'
  },
  dropDownContainer: {
    textAlign: 'center'
  },
  shadow: {
    boxShadow: `0px 4px 8px ${shadowCardColor}`
  }
});

export default navbarStyles;
