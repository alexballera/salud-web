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
    imgAvatar: {
      height: 86,
      width: 86,
      [theme.breakpoints.up('md')]: {
        height: 164,
        width: 164
      }
    }
  })
);

export default ProfileStyles;
