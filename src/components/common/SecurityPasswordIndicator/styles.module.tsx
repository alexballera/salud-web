import { createStyles, makeStyles } from '@material-ui/core';

const useIndicatorsStyles = makeStyles(() =>
  createStyles({
    icons: {
      marginRight: 17,
      fontSize: 16
    },
    iconBullets: {
      color: 'rgba(0, 0, 0, 0.6)',
      fontSize: 8
    },
    containerIndicators: {
      alignItems: 'center',
      display: 'flex',
      marginBottom: 16
    },
    label: {
      color: 'rgba(0, 0, 0, 0.6)',
      fontSize: 14,
      letterSpacing: 0.15
    }
  })
);
export { useIndicatorsStyles };
