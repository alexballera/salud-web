import React from 'react';

/// CONTEXT
import { withAppContext } from '../../context';
/// CONTEXT END

/// MATERIAL - UI
import { Box } from '@material-ui/core';
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';
/// MATERIAL - UI END

/// STYLES & TYPES
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      [theme.breakpoints.up('md')]: {
        paddingLeft: 256
      }
    },
    container: {
      padding: `14px 24px`,
      [theme.breakpoints.up('md')]: {
        padding: 47
      },
      [theme.breakpoints.up('lg')]: {
        padding: `47px 134px`
      }
    }
  })
);
/// STYLES & TYPES END

const LayoutInner = ({ children }): JSX.Element => {
  const classes = useStyles();
  return (
    <Box component="div" data-testid="div" className={classes.root}>
      <Box component="div" data-testid="div" className={classes.container}>
        {children}
      </Box>
    </Box>
  );
};
export default withAppContext(LayoutInner);
