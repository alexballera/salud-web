import { makeStyles } from '@material-ui/core/styles';

const habitStyles = makeStyles({
  cardHabits: {
    borderRadius: 16,
    boxShadow: '0px 4px 8px rgba(207, 225, 227, 0.5)',
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
