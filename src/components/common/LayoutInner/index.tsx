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
        paddingLeft: 256
      }
    }
  })
);

export default withAppContext(function LayoutInner({ children }): JSX.Element {
  const classes = useStyles();
  return (
    <Box component="div" data-testid="div" className={classes.root}>
      {children}
    </Box>
  );
});
