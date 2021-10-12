import React from 'react';

/// MATERIAL - UI
import { Grid } from '@material-ui/core';
/// MATERIAL - UI END

/// STYLES
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';
/// STYLES END

type IProps = {
  form: JSX.Element;
  buttonLeft: JSX.Element;
  buttonRight: JSX.Element;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    containerForm: { marginBottom: 64 },
    containerButton: {
      backgroundColor: 'white',
      bottom: 4,
      paddingBottom: 24,
      paddingTop: 24,
      paddingRight: 46,
      position: 'fixed',
      zIndex: 1000,
      [theme.breakpoints.up('md')]: {
        paddingRight: '35%'
      }
    }
  })
);

/// FORM STATES & VALIDATIONS END
const LayoutForm = ({ form, buttonLeft, buttonRight }: IProps): JSX.Element => {
  const classes = useStyles();
  return (
    <>
      <Grid container item xs={12} md={8} spacing={1} className={classes.containerForm}>
        <Grid item xs={12}>
          {form}
        </Grid>
      </Grid>
      <Grid
        container
        item
        xs={12}
        spacing={1}
        justify="flex-end"
        className={classes.containerButton}
      >
        <Grid item xs={6} md={3}>
          {buttonLeft}
        </Grid>
        <Grid item xs={6} md={3}>
          {buttonRight}
        </Grid>
      </Grid>
    </>
  );
};

export default LayoutForm;
