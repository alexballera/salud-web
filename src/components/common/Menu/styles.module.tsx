import { makeStyles } from '@material-ui/core/styles';
import theme from '../../../styles/js/theme';

const MenuStyles = makeStyles({
  list: {
    width: 312
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
  },
  helpContainer: {
    border: '1px solid rgb(0, 151, 167)',
    borderRadius: 5,
    display: 'flex',
    justifyContent: 'space-around',
    flexDirection: 'column',
    height: 93,
    marginBottom: 26.5,
    marginTop: 91,
    padding: '8px 16px',
    width: '100%'
  },
  helpText: {
    lineHeight: '24px'
  },
  helpLink: {
    color: theme.palette.secondary.light,
    fontWeight: 500,
    textDecoration: 'none'
  },
  divider: {
    marginBottom: 36
  },
  logoutButton: {
    position: 'absolute',
    bottom: 16
  },
  menuDesktopContainer: {
    position: 'absolute',
    top: 48,
    width: 256,
    backgroundColor: '#fafafa'
  }
});
export default MenuStyles;
