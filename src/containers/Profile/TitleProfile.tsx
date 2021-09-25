import React from 'react';

/// MATERIAL UI
import { Typography } from '@material-ui/core';
/// MATERIAL UI END

/// STYLES & TYPES
import ProfileStyles from './styles.module';
/// STYLES & TYPES END

export const TitleProfile = (): JSX.Element => {
  const classes = ProfileStyles();
  return (
    <Typography variant="h2" className={classes.title}>
      Perfil
    </Typography>
  );
};
