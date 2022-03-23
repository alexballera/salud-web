import { createStyles, makeStyles } from '@mui/styles';
import muiTheme from '@/src/styles/js/muiTheme';
import {
  purpleLight,
  secondaryDarkColor,
  titleCardTagBg,
  titlePageColor
} from '@/src/styles/js/theme';

export const cardStyles = makeStyles(() =>
  createStyles({
    card: {
      width: '100%',
      [muiTheme.breakpoints.up(360)]: {
        width: 312
      }
    },
    chip: {
      backgroundColor: `${titleCardTagBg} !important`,
      borderRadius: '64px !important',
      height: '20px !important',
      '& > .MuiChip-label': {
        fontWeight: 500,
        fontSize: 12,
        lineHeight: '20px',
        color: purpleLight
      }
    },
    performer: {
      color: titlePageColor,
      fontSize: '14px !important',
      display: 'flex',
      alignItems: 'center',
      fontWeight: 'normal !important',
      lineHeight: '143% !important'
    },
    link: {
      fontSize: '13px !important',
      lineHeight: '22px !important',

      '&:hover': {
        color: secondaryDarkColor
      }
    }
  })
);
