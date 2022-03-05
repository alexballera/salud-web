import { createStyles, makeStyles } from '@mui/styles';
import { poppinsFontFamily } from '@/src/styles/js/theme';

export const cardStyles = makeStyles(() =>
  createStyles({
    performer: {
      color: '#455255',
      fontSize: '14px !important',
      display: 'flex',
      alignItems: 'center',
      fontFamily: `${poppinsFontFamily} !important`
    }
  })
);
