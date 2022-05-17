import { styled } from '@mui/material';
import MuiChip from '@material-ui/core/Chip';
import { secondaryMainColor, tertiaryLightColor, titlePageColor } from '@/src/styles/js/theme';

import chipFiltersStyles from './style.module';

type Tprops = {
  isActive: boolean;
  idx: number;
  label: string;
  handleSelect;
};

const ChipDefault = styled(MuiChip)({
  color: titlePageColor,
  '& svg': {
    color: titlePageColor
  },
  '&:focus': {
    color: titlePageColor
  }
});

const ChipActive = styled(MuiChip)({
  color: secondaryMainColor,
  background: tertiaryLightColor,
  '& svg': {
    color: secondaryMainColor
  },
  '&:focus': {
    color: secondaryMainColor,
    background: tertiaryLightColor
  }
});

const ChipFilters = ({ isActive, idx, label, handleSelect }: Tprops): JSX.Element => {
  const classes = chipFiltersStyles();

  return (
    <>
      {isActive ? (
        <ChipActive
          key={idx}
          className={classes.chip}
          label={label}
          color="default"
          onClick={() => handleSelect(idx)}
        />
      ) : (
        <ChipDefault
          key={idx}
          className={classes.chip}
          label={label}
          variant="outlined"
          color="default"
          onClick={() => handleSelect(idx)}
        />
      )}
    </>
  );
};

export default ChipFilters;
