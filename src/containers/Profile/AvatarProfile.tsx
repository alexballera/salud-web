import React from 'react';

/// MATERIAL UI
import { Avatar, Grid, IconButton, Typography } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
/// MATERIAL UI END

/// STYLES & TYPES
import ProfileStyles from './styles.module';
/// STYLES & TYPES END

type IProps = {
  fullName: string;
  documentNumber: string;
};

const handleUpdateAvatar = () => console.log('handleUpdateAvatar');

export const AvatarProfile = ({ fullName, documentNumber }: IProps): JSX.Element => {
  const classes = ProfileStyles();
  return (
    <Grid container className={classes.avatarContainer}>
      <Grid item xs={4} md={12}>
        <Avatar
          className={classes.imgAvatar}
          alt="Remy Sharp"
          src="https://place-hold.it/300"
          variant="square"
        />
        <IconButton
          aria-label="delete"
          className={classes.buttonIcon}
          color="secondary"
          onClick={() => handleUpdateAvatar()}
        >
          <EditIcon />
        </IconButton>
      </Grid>
      <Grid item xs={7} md={12} className={classes.fullNameContainer}>
        <Typography variant="h2" className={classes.textFullname}>
          {fullName}
        </Typography>
        <Typography variant="h3" className={classes.textDocument}>
          {documentNumber}
        </Typography>
      </Grid>
    </Grid>
  );
};
