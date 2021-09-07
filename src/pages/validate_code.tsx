import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  container: {
    position: 'absolute',
    top: 0,
    backgroundColor: 'white',
    zIndex: 1200,
    height: '100vh',
    width: '100%'
  }
});
export default function ValidateCodePage(): JSX.Element {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <h1>Validate Code</h1>
    </div>
  );
}
