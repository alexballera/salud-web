import React from 'react';

/// MATERIAL - UI
import { Box, Divider, Grid, Hidden, Theme } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/core/styles';
/// MATERIAL - UI END

/// OWN COMPONENTS
/// OWN COMPONENTS END

const useStyle = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      // height: 'calc(100vh - 64px)',
      [theme.breakpoints.up('md')]: {
        paddingLeft: '20%',
        paddingRight: '20%'
      }
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
    <>
      <Box p={3}>
        <Grid container item xs={12} className={classes.container}>
          <Grid item xs={12} md={8}>
            {header}
          </Grid>
          {content && (
            <Grid item xs={12} md={8}>
              {content}
            </Grid>
          )}
          <Hidden mdUp>
            <Grid item xs={12}>
              <Divider />
            </Grid>
            <Grid item xs={12}>
              {actions}
            </Grid>
          </Hidden>
        </Grid>
      </Box>

      <Hidden smDown>
        <Grid container item xs={12} className={classes.container}>
          <Grid item xs={12}>
            {actions}
          </Grid>
        </Grid>
      </Hidden>
    </>
  );
};
export default LayoutBasic;
