import { makeStyles } from '@material-ui/core/styles';

const navbarStyles = makeStyles({
  button: {
    textTransform: 'capitalize'
  },
  buttonAction: {
    textAlign: 'right'
  },
  toolbarDesktop: {
    backgroundColor: 'rgb(250, 250, 250)'
  },
  name: {
    color: 'rgba(0, 0, 0, 0.87)',
    fontSize: 16,
    fontWeight: 'normal'
  },
  documentNumber: {
    color: 'rgba(0, 0, 0, 0.6)',
    fontSize: 14,
    fontWeight: 'normal'
  }
});

export default navbarStyles;
