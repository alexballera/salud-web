import { makeStyles } from '@material-ui/core/styles';
import { poppinsFontFamily, shadowCardColor } from '../../styles/js/theme';

const MedicalStyles = makeStyles({
  root: {
    height: 'calc(100% - 90px)'
  },
  cardContainer: {
    boxShadow: `0px 4px 8px ${shadowCardColor}`,
    margin: 'auto',
    padding: 15,
    borderRadius: 8
  },
  title: {
    fontFamily: poppinsFontFamily,
    fontSize: 14,
    color: 'rgba(0, 0, 0, 0.6)'
  },
  textValue: {
    fontFamily: poppinsFontFamily,
    fontSize: 14,
    color: 'rgba(0, 0, 0, 0.87)'
  },
  containerData: {
    padding: '10px 5px',
    borderBottom: '1px solid rgba(233, 247, 252, 1)'
  }
});

export default MedicalStyles;
