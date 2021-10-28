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
    containerForm: {
      marginTop: 24,
      marginBottom: 96
    },
    containerButton: {
      backgroundColor: 'white',
      bottom: 4,
      left: 4,
      padding: 24,
      position: 'fixed',
      zIndex: 1000,
      [theme.breakpoints.up('md')]: {
        borderTop: '1px solid rgba(0, 0, 0, 0.12)',
        paddingRight: '15%'
      }
    },
    buttonLeftContainer: {
      paddingLeft: '0px !important'
    },
    buttonRightContainer: {
      paddingRight: '0px !important'
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
        <Grid item xs={6} md={2} className={classes.buttonLeftContainer}>
          {buttonLeft}
        </Grid>
        <Grid item xs={6} md={2} className={classes.buttonRightContainer}>
          {buttonRight}
        </Grid>
      </Grid>
    </>
  );
};

export default LayoutForm;
