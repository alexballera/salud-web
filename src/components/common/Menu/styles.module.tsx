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
      color: theme.palette.secondary.main,
      backgroundColor: '#DAF0F0',

      '&>.MuiListItemIcon-root': {
        color: theme.palette.secondary.main
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
    textTransform: 'initial',
    '&:hover': {
      color: theme.palette.secondary.light
    }
  },
  helpContainer: {
    border: '1px solid rgb(0, 151, 167)',
    borderRadius: 5,
    display: 'flex',
    flexDirection: 'column',
    width: '100%'
  },
  helpContainerMobile: {
    marginTop: 91,
    padding: '8px 16px',
    justifyContent: 'space-around',
    height: 93,
    marginBottom: 26.5
  },
  helpContainerDesktop: {
    padding: '8px 16px 0px 16px',
    height: 208,
    justifyContent: 'space-between',
    marginBottom: 16
  },
  helpText: {
    lineHeight: '24px'
  },
  helpLink: {
    color: theme.palette.secondary.light,
    fontWeight: 500,
    textDecoration: 'none',
    '&:hover': {
      color: theme.palette.secondary.light
    }
  },
  divider: {
    marginBottom: 16
  },
  logoutButton: {
    position: 'absolute',
    bottom: 16
  },
  menuDesktopContainer: {
    backgroundColor: '#fafafa',
    height: '100vh',
    overflowY: 'auto',
    paddingTop: 64,
    position: 'fixed',
    width: 256
  },
  terms: {
    color: 'rgba(0, 0, 0, 0.6)',
    cursor: 'pointer',
    fontSize: 14,
    fontWeight: 500,
    textDecoration: 'underline',
    marginBottom: 16
  },
  svgContainerDesktop: {
    height: 112,
    width: 162
  }
});
export default MenuStyles;
