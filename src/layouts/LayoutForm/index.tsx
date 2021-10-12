import React from 'react';

/// MATERIAL - UI
import { Grid } from '@material-ui/core';
/// MATERIAL - UI END

/// STYLES
/// STYLES END

type IProps = {
  form: JSX.Element;
  buttonLeft: JSX.Element;
  buttonRight: JSX.Element;
};

/// FORM STATES & VALIDATIONS END
function LayoutForm({ form, buttonLeft, buttonRight }: IProps): JSX.Element {
  return (
    <>
      <Grid container item xs={12} md={8} spacing={1}>
        <Grid item xs={12}>
          {form}
        </Grid>
      </Grid>
      <Grid container item xs={12} spacing={1} justify="flex-end" style={{ marginTop: 24 }}>
        <Grid item xs={6} md={3}>
          {buttonLeft}
        </Grid>
        <Grid item xs={6} md={3}>
          {buttonRight}
        </Grid>
      </Grid>
    </>
  );
}

export default LayoutForm;
