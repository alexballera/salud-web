import { makeStyles } from '@material-ui/core/styles';
import {
  boxBaseShadow,
  tertiaryLightColor,
  poppinsFontFamily,
  titlePageColor
} from '../../../../styles/js/theme';

const specialtyResultsStyles = makeStyles({
  contentChip: {
    boxShadow: `0px 4px 8px ${boxBaseShadow}`,
    borderRadius: '0px 0px 12px 12px'
  },
  root: {
    paddingBottom: 20,
    paddingLeft: 20,
    paddingRight: 20
  },
  separator: {
    margin: 10
  },
  chipColor: {
    backgroundColor: `${tertiaryLightColor} !important`,
    fontSize: '14px !important',
    fontFamily: `${poppinsFontFamily} !important`,
    fontWeight: 400,
    color: `${titlePageColor} !important`
  },
  subTitle: {
    fontFamily: `${poppinsFontFamily} !important`
  }
});

export default specialtyResultsStyles;
