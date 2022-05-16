import { secondaryMainColor } from '@/src/styles/js/theme';
import { makeStyles } from '@material-ui/core/styles';

const sliderPriceStyles = makeStyles({
  thumb: {
    background: `${secondaryMainColor} !important`,
    '&~&': {
      background: `${secondaryMainColor} !important`
    }
  },
  mark: {
    background: `${secondaryMainColor} !important`
  },
  rail: {
    background: `${secondaryMainColor} !important`
  },
  track: {
    background: `${secondaryMainColor} !important`
  }
});

export default sliderPriceStyles;
