import { makeStyles } from '@mui/styles';
import muiTheme from '@/src/styles/js/muiTheme';

export const cardStyles = makeStyles(() => ({
  performer: {
    color: '#455255',
    fontSize: '14px !important',
    display: 'flex',
    alignItems: 'center'
  },
  card: {
    width: '100%',
    [muiTheme.breakpoints.up(360)]: {
      width: 312
    }
  }
}));
