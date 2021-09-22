import React from 'react';
import { Typography } from '@material-ui/core';
import ProfileStyles from './styles.module';

export const TitleProfile = (): JSX.Element => {
  const classes = ProfileStyles();
  return (
    <Typography variant="h2" className={classes.title}>
      Perfil
    </Typography>
  );
};
