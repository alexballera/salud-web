import React from 'react';
import clsx from 'clsx';

/// CONTEXT
import { withAppContext } from '../../context';
/// CONTEXT END

/// MATERIAL - UI
import { Box } from '@material-ui/core';
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';
/// MATERIAL - UI END

type IProps = {
  children: React.ReactNode;
  fullwidth?: boolean;
};

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
    },
    fullwidth: {
      paddingLeft: 0,
      paddingRight: 0
    }
  })
);
/// STYLES & TYPES END

const LayoutInner = ({ children, fullwidth }: IProps): JSX.Element => {
  const classes = useStyles();
  return (
    <Box component="div" data-testid="div" className={classes.root}>
      <Box
        component="div"
        data-testid="div"
        className={clsx({
          [classes.container]: true,
          [classes.fullwidth]: fullwidth
        })}
      >
        {children}
      </Box>
    </Box>
  );
};
export default withAppContext(LayoutInner);
