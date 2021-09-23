import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';

const ProfileStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      color: 'rgba(0, 0, 0, 0.87)',
      fontSize: 20,
      fontWeight: 500,
      marginBottom: 16,
      [theme.breakpoints.up('md')]: {
        fontSize: 42,
        fontWeight: 400,
        marginBottom: 45
      }
    },
    divider: {
      marginBottom: 16,
      marginTop: 34
    },
    avatarContainer: {
      position: 'relative'
    },
    imgAvatar: {
      height: 86,
      width: 86,
      boxShadow: `0px 8px 10px 1px rgba(0, 0, 0, 0.14),
0px 3px 14px 2px rgba(0, 0, 0, 0.12),
0px 5px 5px -3px rgba(0, 0, 0, 0.2)`,
      [theme.breakpoints.up('md')]: {
        height: 164,
        width: 164
      }
    },
    buttonIcon: {
      backgroundColor: 'white',
      borderRadius: 50,
      boxShadow: `0px 1px 1px 0px rgba(0, 0, 0, 0.14),
0px 2px 1px -1px rgba(0, 0, 0, 0.12),
0px 1px 3px 0px rgba(0, 0, 0, 0.2)`,
      height: 32,
      left: 65,
      position: 'absolute',
      top: 65,
      width: 32,
      '&:hover': {
        backgroundColor: 'white'
      },
      [theme.breakpoints.up('md')]: {
        height: 30,
        width: 30,
        top: 150,
        left: 150
      }
    },
    fullNameContainer: {
      marginLeft: 16,
      [theme.breakpoints.up('md')]: {
        marginTop: 36,
        marginLeft: 0
      }
    },
    textFullname: {
      color: 'rgba(0, 0, 0, 0.87)',
      fontSize: 16,
      fontWeight: 'normal',
      [theme.breakpoints.up('md')]: {
        fontSize: 20,
        fontWeight: 500
      }
    },
    textDocument: {
      color: 'rgba(0, 0, 0, 0.6)',
      fontSize: 14,
      fontWeight: 'normal',
      [theme.breakpoints.up('md')]: {
        fontSize: 16
      }
    },
    terms: {
      color: 'rgba(0, 0, 0, 0.6)',
      cursor: 'pointer',
      fontSize: 14,
      fontWeight: 500,
      textDecoration: 'underline'
    },
    button: {
      textTransform: 'initial',
      '&:hover': {
        color: theme.palette.secondary.light
      }
    }
  })
);

export default ProfileStyles;
