import React from 'react';

/// CONTEXT
/// CONTEXT END

/// MATERIAL - UI
import { Button, Grid } from '@material-ui/core';
import UpdateStyles from '../../../styles/js/UpdatePageStyles.module';
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
  const classes = UpdateStyles();
  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <h1>formulario</h1>
      </Grid>

      <Grid
        container
        item
        xs={12}
        spacing={1}
        justify="flex-end"
        className={classes.containerActions}
      >
        <Grid item xs={6} md={2}>
          <Button fullWidth variant="outlined">
            Volver
          </Button>
        </Grid>
        <Grid item xs={6} md={2}>
          <Button
            fullWidth
            type="submit"
            color="primary"
            variant="contained"
            // TODO verificar
            // disabled={!_.isEmpty(formik.errors) || loading}
          >
            Continuar
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default UpdateActions;
