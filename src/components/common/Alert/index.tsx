import { Box } from '@material-ui/core';
import React, { PropsWithChildren } from 'react';
import { errorColor, successColor } from '../../../styles/js/theme';
import { IProps } from './types';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  alertContainer: {
    minWidth: 350
  }
}));

export default function Alert({ children, variant }: PropsWithChildren<IProps>): JSX.Element {
  const classes = useStyles();
  return (
    <Box
      bgcolor={variant === 'success' ? successColor : errorColor}
      padding="10px"
      borderRadius="5px"
      color="white"
      display="flex"
      data-testid="alert-element"
      className={classes.alertContainer}
    >
      {children}
    </Box>
  );
}
