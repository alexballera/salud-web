import { makeStyles } from '@material-ui/core/styles';

const MedicalStyles = makeStyles({
  container: {
    marginBottom: '16px'
  },
  contentAvatar: {
    display: 'flex',
    justifyContent: 'end'
  },
  avatar: {
    width: '64px',
    height: '64px'
  },
  edit: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'end',
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

export default MedicalStyles;
