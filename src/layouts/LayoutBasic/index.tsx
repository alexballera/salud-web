import React from 'react';

/// MATERIAL - UI
import { Box, Grid } from '@material-ui/core';
/// MATERIAL - UI END

/// OWN COMPONENTS
/// OWN COMPONENTS END

type LCProps = {
  header: JSX.Element;
  content: JSX.Element;
  actions: JSX.Element;
};

const LayoutBasic = ({ header, content, actions }: LCProps): JSX.Element => {
  return (
    <Box p={3}>
      <Grid container>
        <Grid item xs={12}>
          {header}
        </Grid>
        <Grid item xs={12}>
          {content}
        </Grid>
        <Grid item xs={12}>
          {actions}
        </Grid>
      </Grid>
    </Box>
  );
};
export default LayoutBasic;
