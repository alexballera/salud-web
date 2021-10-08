import React from 'react';

/// MATERIAL - UI
import { Box, Grid } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/core/styles';

/// MATERIAL - UI END

/// OWN COMPONENTS
/// OWN COMPONENTS END

const useStyle = makeStyles(() =>
  createStyles({
    container: {
      height: 'calc(100vh - 64px)'
    }
  })
);

type LCProps = {
  header: JSX.Element;
  content?: JSX.Element;
  actions: JSX.Element;
};
const LayoutBasic = ({ header, content, actions }: LCProps): JSX.Element => {
  const classes = useStyle();
  return (
    <Box p={3} className={classes.container}>
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
