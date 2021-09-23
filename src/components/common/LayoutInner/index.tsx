import React from 'react';
/// MATERIAL - UI
import { Box } from '@material-ui/core';
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';

/// OWN COMPONENTS
import { withAppContext } from '../../../context';
/// OWN COMPONENTS END

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      [theme.breakpoints.up('md')]: {
        paddingLeft: 256,
        paddingTop: 64
      }
    },
    container: {
      padding: `14px 24px`,
      [theme.breakpoints.up('md')]: {
        padding: `47px 134px`
      }
    }
  })
);

export default withAppContext(function LayoutInner({ children }): JSX.Element {
  const classes = useStyles();
  return (
    <Box component="div" data-testid="div" className={classes.root}>
      <Box component="div" data-testid="div" className={classes.container}>
        {children}
      </Box>
    </Box>
  );
});
