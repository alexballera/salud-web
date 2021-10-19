import React from 'react';

/// MATERIAL - UI
import { Box, Divider, Grid, Hidden, Theme } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/core/styles';
/// MATERIAL - UI END

/// OWN COMPONENTS
/// OWN COMPONENTS END

const useStyle = makeStyles((theme: Theme) =>
  createStyles({
    wrapper: {
      paddingBottom: 0
    },
    wrapperBottom: {
      paddingBottom: 0,
      paddingTop: 0
    },
    container: {
      [theme.breakpoints.up('md')]: {
        paddingLeft: '20%',
        paddingRight: '20%'
      }
    },
    divider: {
      marginTop: 16
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
      <Box p={3} className={classes.wrapper}>
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
              <Divider className={classes.divider} />
            </Grid>
            <Grid item xs={12}>
              {actions}
            </Grid>
          </Hidden>
        </Grid>
      </Box>

      <Hidden smDown>
        <Box p={3} className={classes.wrapperBottom}>
          <Grid container item xs={12} className={classes.container}>
            <Grid item xs={12}>
              {actions}
            </Grid>
          </Grid>
        </Box>
      </Hidden>
    </>
  );
};
export default LayoutBasic;
