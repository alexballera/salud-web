import { makeStyles } from '@material-ui/core/styles';
import theme from '../../../styles/js/theme';

const DrawerStyles = makeStyles({
  list: {
    width: 250
  },
  logo: {
    paddingBottom: 16,
    paddingLeft: 16
  },
  item: {
    marginBottom: 8,
    '&:hover': {
      color: theme.palette.secondary.light,
      backgroundColor: '#DAF0F0',

      '&>.MuiListItemIcon-root': {
        color: theme.palette.secondary.light
      }
    }
  },
  icon: {
    minWidth: 'calc(56px - 24px)'
  },
  text: {
    '&>.MuiTypography-root': {
      fontSize: 15
    }
  },
  button: {
    textTransform: 'initial'
  }
});
export default DrawerStyles;
