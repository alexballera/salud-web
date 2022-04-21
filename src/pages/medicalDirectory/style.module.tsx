import { makeStyles } from '@material-ui/core/styles';
import {
  primaryContrastTextColor,
  titlePageColor,
  title2Color,
  background2Color,
  background3Color,
  secondaryMainColor,
  poppinsFontFamily,
  activeActionColor
} from '../../styles/js/theme';

const medicalDirectoryStyles = makeStyles({
  root: {
    minWidth: 164,
    minHeight: 28,
    flexGrow: 1
  },
  title: {
    position: 'absolute',
    width: '312px',
    height: '32px',
    left: '24px',
    top: '84px',
    fontFamily: poppinsFontFamily,
    fontStyle: 'normal',
    fontWeight: 500,
    fontSize: 20,
    lineHeight: '160%',
    letterSpacing: '0.15px',
    color: secondaryMainColor
  },
  container: {
    background: background3Color
  },
  cardContainer: {
    background: primaryContrastTextColor,
    position: 'absolute',
    width: '360px',
    height: '516px',
    borderRadius: '32px 32px 0px 0px',
    padding: 20
  },
  mainGrid: {
    backgroundColor: background2Color,
    height: '100%'
  },
  mainArea: {
    backgroundColor: primaryContrastTextColor,
    height: '425px',
    width: '100%',
    borderBottomLeftRadius: '32px',
    borderBottomRightRadius: '32px'
  },
  listWrapper: {
    width: '100%',
    padding: 24
  },
  listItem: {
    paddingLeft: 12,
    paddingRight: 12
  },
  historyTextTitle: {
    fontFamily: poppinsFontFamily,
    fontStyle: 'normal',
    fontWeight: 500,
    fontSize: 14,
    lineHeight: '157%',
    letterSpacing: '0.1px',
    color: title2Color
  },
  listMenuTextPrimary: {
    fontFamily: poppinsFontFamily,
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: 14,
    lineHeight: '143%',
    letterSpacing: '0.15px',
    color: titlePageColor
  },
  listMenuTextSecondary: {
    fontFamily: poppinsFontFamily,
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: 14,
    lineHeight: '143%',
    letterSpacing: '0.15px',
    color: activeActionColor
  },
  subTitle: {
    fontFamily: poppinsFontFamily
  }
});

export default medicalDirectoryStyles;
