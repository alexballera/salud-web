import { Box } from '@material-ui/core';
import React, { PropsWithChildren } from 'react';
import { IProps } from './types';

export default function Alert({ children, variant }: PropsWithChildren<IProps>): JSX.Element {
  return (
    <Box
      bgcolor={variant === 'success' ? 'lime' : '#ff6666'}
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
