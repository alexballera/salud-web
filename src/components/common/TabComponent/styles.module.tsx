import { createStyles, makeStyles } from '@mui/styles';
import { boxShadow } from '@/src/styles/js/theme';

export const tabStyles = makeStyles(() =>
  createStyles({
    root: {
      boxShadow: boxShadow
    }
  })
);
