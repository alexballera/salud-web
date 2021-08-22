import { Box } from '@material-ui/core';
import React, { PropsWithChildren } from 'react';
import { errorColor, successColor } from '../../../styles/js/theme';
import { IProps } from './types';

export default function Alert({ children, variant }: PropsWithChildren<IProps>): JSX.Element {
  return (
    <Box
      bgcolor={variant === 'success' ? successColor : errorColor}
      padding="10px"
      borderRadius="5px"
      color="white"
      display="flex"
      data-testid="alert-element"
    >
      {children}
    </Box>
  );
}
