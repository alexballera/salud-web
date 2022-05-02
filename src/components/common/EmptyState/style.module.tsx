import { makeStyles } from '@material-ui/core/styles';
import { colorTextEmptyState } from '../../../styles/js/theme';

const emptySVG = '/images/empty.svg';

const emptyStateStyles = makeStyles({
  results: {
    padding: 25,
    paddingTop: 0
  },
  emptyMainGrid: {
    backgroundImage: `url(${emptySVG})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: '44% 4px',
    height: '100vh',
    width: '100vw',
    position: 'fixed',
    color: colorTextEmptyState
  },
  emptyContentTitle: {
    position: 'fixed',
    top: '130px',
    width: '65%'
  },
  emptyTitle: {
    color: colorTextEmptyState
  }
});

export default emptyStateStyles;
