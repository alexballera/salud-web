import { makeStyles, Theme } from '@material-ui/core/styles';

const wizardStyles = makeStyles((theme: Theme) => ({
  root: {
    width: '100%'
  },
  backButton: {
    marginRight: theme.spacing(1)
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1)
  },
  stepIndicator: {
    color: 'rgba(0, 0, 0, 0.87)',
    fontSize: 12,
    letterSpacing: 1,
    marginBottom: 8,
    textTransform: 'uppercase'
  }
}));

export default wizardStyles;
