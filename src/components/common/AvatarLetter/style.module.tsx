import { makeStyles } from '@material-ui/core/styles';
import { avatarBackground, secondaryMainColor } from '../../../styles/js/theme';

const avatarStyles = makeStyles({
  avatarText: {
    fontWeight: 700,
    color: secondaryMainColor
  },
  avatar: {
    backgroundColor: avatarBackground
  }
});

export default avatarStyles;
