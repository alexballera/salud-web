import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';
import { poppinsFontFamily, tertiaryLightColor } from '../../styles/js/theme';

const MedicalStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      background: tertiaryLightColor,
      height: 'calc(100% - 90px)',
      paddingTop: 55
    },
    cardContainer: {
      maxWidth: '90%',
      margin: 'auto',
      boxShadow: 'none',
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
  })
);

export default MedicalStyles;
