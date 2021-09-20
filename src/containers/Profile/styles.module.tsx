import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';

const ProfileStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      color: 'rgba(0, 0, 0, 0.87)',
      fontSize: 20,
      fontWeight: 500,
      [theme.breakpoints.up('md')]: {
        fontSize: 42,
        fontWeight: 400
      }
    }
  })
);

export default ProfileStyles;
