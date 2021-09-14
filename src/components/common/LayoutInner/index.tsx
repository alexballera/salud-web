import React from 'react';
/// MATERIAL - UI
import { Box } from '@material-ui/core';

/// OWN COMPONENTS
import { withAppContext } from '../../../context';
/// OWN COMPONENTS END

export default withAppContext(function LayoutInner({ children }): JSX.Element {
  return (
    <Box component="div" data-testid="div" style={{ paddingLeft: 256 }}>
      {children}
    </Box>
  );
});
