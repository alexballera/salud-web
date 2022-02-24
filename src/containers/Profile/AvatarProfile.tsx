import React from 'react';

/// MATERIAL UI
import { Avatar, Grid, IconButton, Typography } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import PersonIcon from '@material-ui/icons/Person';
/// MATERIAL UI END

/// STYLES & TYPES
import ProfileStyles from './styles.module';
/// STYLES & TYPES END

type IProps = {
  fullName: string;
  documentNumber?: string;
  generalData?: boolean;
};

const handleUpdateAvatar = () => console.log('handleUpdateAvatar');

export const AvatarProfile = ({
  fullName,
  documentNumber,
  generalData = false
}: IProps): JSX.Element => {
  const classes = ProfileStyles();
  return (
    <Grid container className={classes.avatarContainer}>
      <Grid item xs={generalData ? 12 : 4} md={12}>
        {/* TODO conectar con avatar de usuario
        <Avatar
          className={classes.imgAvatar}
          alt="Remy Sharp"
          src="https://place-hold.it/300"
          variant="square"
        />
        */}
        <Avatar className={generalData ? classes.imgAvatarGD : classes.imgAvatar}>
          <PersonIcon fontSize="large" />
        </Avatar>
        {!generalData && (
          <IconButton
            aria-label="delete"
            className={classes.buttonIcon}
            color="secondary"
            onClick={() => handleUpdateAvatar()}
          >
            <EditIcon />
          </IconButton>
        )}
      </Grid>
      {generalData ? (
        <Grid item md={12} className={classes.nameContaner}>
          <Typography variant="h1" className={classes.textName}>
            {fullName}
          </Typography>
        </Grid>
      ) : (
        <Grid item xs={7} md={12} className={classes.fullNameContainer}>
          <Typography variant="h2" className={classes.textFullname}>
            {fullName}
          </Typography>
          <Typography variant="h3" className={classes.textDocument}>
            {documentNumber}
          </Typography>
        </Grid>
      )}
    </Grid>
  );
};
