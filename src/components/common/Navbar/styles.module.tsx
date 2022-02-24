import { makeStyles } from '@material-ui/core/styles';

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
    color: 'rgba(0, 0, 0, 1)',
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
  }
});

export default navbarStyles;
