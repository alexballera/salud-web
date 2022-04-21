import { makeStyles } from '@material-ui/core/styles';
import { secondaryMainColor, activeActionColor } from '../../../styles/js/theme';

const autoCompleteLocationStyles = makeStyles({
  inputColor: {
    '& .MuiOutlinedInput-root:hover': {
      '& > fieldset': { borderColor: secondaryMainColor }
    },
    '& label.Mui-focused': {
      color: secondaryMainColor
    },
    '& .MuiOutlinedInput-root.Mui-focused': {
      '& > fieldset': { borderColor: secondaryMainColor }
    },
    '& .MuiAutocomplete-popupIndicator': {
      transform: 'none !important'
    },
    '& .MuiAutocomplete-endAdornment': {
      right: '40px !important'
    }
  },
  icon: {
    position: 'relative',
    top: '-40px',
    right: '12px',
    float: 'right',
    color: activeActionColor
  },
  iconColor: {
    color: activeActionColor
  }
});

export default autoCompleteLocationStyles;
