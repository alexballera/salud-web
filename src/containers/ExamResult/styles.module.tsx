import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
const examResultStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      backgroundColor: theme.palette.background.paper
    },
    text: {
      marginLeft: 28
    },
    hidden: {
      display: 'none'
    }
  })
);

export default examResultStyles;
