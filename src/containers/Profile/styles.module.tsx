import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';
import { secondaryMainColor, tertiaryLightColor } from '../../styles/js/theme';

const ProfileStyles = makeStyles((theme: Theme) =>
  createStyles({
    divider: {
      marginBottom: 16,
      marginTop: 34
    },
    avatarContainer: {
      position: 'relative'
    },
    imgAvatar: {
      height: '80px !important',
      width: '80px !important',
      [theme.breakpoints.up('md')]: {
        height: '164px !important',
        width: '164px !important'
      }
    },
    imgAvatarGD: {
      height: '80px !important',
      width: '80px !important',
      margin: 'auto',
      border: `8px solid ${tertiaryLightColor}`,
      marginTop: 10
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
    nameContaner: {
      background: tertiaryLightColor,
      margin: '-45px auto',
      textAlign: 'center',
      paddingTop: 50,
      width: '100%',
      borderTopRightRadius: 10,
      borderTopLeftRadius: 10
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
    textName: {
      color: secondaryMainColor,
      fontSize: 20,
      fontWeight: 500,
      lineHeight: '32px'
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
    },
    containerButton: {
      paddingRight: 0
    }
  })
);

export default ProfileStyles;
