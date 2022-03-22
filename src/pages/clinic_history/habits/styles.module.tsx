import { makeStyles } from '@material-ui/core/styles';
import { shadowCardColor, background2Color } from '../../../styles/js/theme';

const habitStyles = makeStyles({
  cardHabits: {
    borderRadius: 8,
    boxShadow: `0px 4px 8px ${shadowCardColor}`,
    padding: '16px'
  },
  cardContentLink: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  cardSpacing: {
    marginBottom: '16px'
  },
  typography14: {
    fontSize: '14px'
  },
  typography16: {
    fontSize: '16px'
  },
  typographyTitle: {
    marginBottom: '0px !important'
  },
  mainGrid: {
    backgroundColor: background2Color,
    height: '100%'
  },
  edit: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'flex-end',
    top: '-36px',
    fontSize: '13px',
    fontWeight: 500,
    zIndex: 1101
  },
  editIcon: {
    width: '13.5px',
    height: '13.5px',
    marginRight: '8px'
  }
});

export default habitStyles;
