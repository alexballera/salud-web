import { CircularProgress } from '@material-ui/core';
import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() =>
  createStyles({
    container: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: `calc(100vh - 64px)`
    }
  })
);

function Redirect(): JSX.Element {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <CircularProgress color="secondary" />
    </div>
  );
}

export default Redirect;
