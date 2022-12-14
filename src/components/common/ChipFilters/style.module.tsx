import { makeStyles } from '@material-ui/core/styles';

const chipFiltersStyles = makeStyles({
  chip: {
    marginRight: 16,
    marginTop: 16
  },
  chipIcon: {
    marginRight: 16,
    marginTop: 16,
    paddingRight: 6
  },
  chipWrapper: {
    overflow: 'hidden',
    height: 34,
    marginTop: 8
  },
  chipFlex: {
    display: 'flex',
    overflow: 'scroll',
    paddingBottom: 15
  }
});

export default chipFiltersStyles;
