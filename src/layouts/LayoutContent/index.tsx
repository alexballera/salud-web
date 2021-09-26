import React from 'react';

/// MATERIAL - UI
import { Grid } from '@material-ui/core';
/// MATERIAL - UI END

/// OWN COMPONENTS
import LayoutInner from '../LayoutInner';
/// OWN COMPONENTS END

type LCProps = {
  title: JSX.Element;
  leftContent: JSX.Element;
  rightContent: JSX.Element;
};

const LayoutContent = ({ title, leftContent, rightContent }: LCProps): JSX.Element => {
  return (
    <LayoutInner>
      <Grid container>
        <Grid item xs={12}>
          {title}
        </Grid>
        <Grid item xs={12} md={5}>
          {leftContent}
        </Grid>
        <Grid item xs={12} md={7} lg={5}>
          {rightContent}
        </Grid>
      </Grid>
    </LayoutInner>
  );
};
export default LayoutContent;
