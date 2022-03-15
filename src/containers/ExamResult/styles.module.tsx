import muiTheme from '@/src/styles/js/muiTheme';
import { title3Color } from '@/src/styles/js/theme';

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
      fontSize: '12px !important',
      lineHeight: '19.92px !important',
      letterSpacing: '0.4px',
      color: title3Color
    }
  })
);
