import { createStyles } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/styles';

const UpdateStyles = makeStyles(() =>
  createStyles({
    headerTitle: {
      color: 'rgba(0, 0, 0, 0.87)',
      fontSize: 20,
      fontWeight: 500,
      letterSpacing: 0.15,
      marginBottom: 8,
      marginTop: 24
    },
    headerDescription: {
      color: 'rgba(0, 0, 0, 0.6)',
      fontSize: 14,
      fontWeight: 'normal',
      letterSpacing: 0.15
    },
    contentLabel: {
      color: 'rgba(0, 0, 0, 0.6)',
      fontSize: 14,
      fontWeight: 'normal',
      marginBottom: 8
    },
    contentData: {
      color: 'rgba(0, 0, 0, 0.87)',
      fontSize: 16,
      fontWeight: 'normal',
      marginTop: 24
    }
  })
);
export default UpdateStyles;
