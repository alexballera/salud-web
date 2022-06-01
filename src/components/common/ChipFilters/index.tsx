import { styled } from '@mui/material';
import MuiChip from '@material-ui/core/Chip';
import { secondaryMainColor, tertiaryLightColor, titlePageColor } from '@/src/styles/js/theme';

import chipFiltersStyles from './style.module';
import SvgAdd from '../Svg/SvgAdd.component';

type Tprops = {
  isActive: boolean;
  idx?: number;
  label?: string;
  handleSelect?;
  icon?: boolean;
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

const ChipFilters = ({ isActive, idx, label, handleSelect, icon = false }: Tprops): JSX.Element => {
  const classes = chipFiltersStyles();

  return (
    <>
      {isActive ? (
        <ChipActive
          key={idx}
          className={icon ? classes.chipIcon : classes.chip}
          label={label}
          color="default"
          onClick={() => handleSelect(idx)}
          deleteIcon={icon ? <SvgAdd /> : <></>}
          onDelete={icon ? () => handleSelect(idx) : null}
        />
      ) : (
        <ChipDefault
          key={idx}
          className={icon ? classes.chipIcon : classes.chip}
          label={label}
          variant="outlined"
          color="default"
          onClick={() => handleSelect(idx)}
          deleteIcon={icon ? <SvgAdd /> : <></>}
          onDelete={icon ? () => handleSelect(idx) : null}
        />
      )}
    </>
  );
};

export default ChipFilters;
