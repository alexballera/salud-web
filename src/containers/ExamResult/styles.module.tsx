import muiTheme from '@/src/styles/js/muiTheme';
import { poppinsFontFamily, title3Color } from '@/src/styles/js/theme';

import { createStyles, makeStyles } from '@mui/styles';

export const examStyles = makeStyles(() =>
  createStyles({
    root: {
      width: '100%',
      backgroundColor: muiTheme.palette.background.paper
    },
    text: {
      marginLeft: 28
    },
    hidden: {
      display: 'none'
    },
    noRecords: {
      color: `${title3Color} !important`,
      fontSize: '12px !important',
      letterSpacing: '0.4px',
      lineHeight: '166% !important'
    },
    vaccineTitle: {
      fontFamily: `${poppinsFontFamily} !important`,
      fontSize: '16px !important',
      lineHeight: '24px !important'
    },
    title: {
      marginLeft: 28,
      textAlign: 'left'
    }
  })
);
