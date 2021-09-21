import React from 'react';
import { Avatar } from '@material-ui/core';
import ProfileStyles from './styles.module';

export const AvatarProfile = (): JSX.Element => {
  const classes = ProfileStyles();
  return (
    <>
      <Avatar
        className={classes.imgAvatar}
        alt="Remy Sharp"
        src="https://place-hold.it/300"
        variant="square"
      />
    </>
  );
};
