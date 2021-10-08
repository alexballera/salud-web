import React from 'react';

/// CONTEXT
/// CONTEXT END

/// MATERIAL - UI
import { Grid } from '@material-ui/core';
import UpdatePhone from './UpdatePhone';
/// MATERIAL - UI END

/// SERVICES
/// SERVICES END

/// OWN COMPONENTS
/// OWN COMPONENTS END

/// STYLES & TYPES
/// STYLES & TYPES END

/// FORM STATES & VALIDATIONS
/// FORM STATES & VALIDATIONS END

const UpdateActions = (): JSX.Element => {
  return (
    <Grid container spacing={1}>
      <Grid item xs={12} md={6}>
        <UpdatePhone />
      </Grid>
    </Grid>
  );
};

export default UpdateActions;
