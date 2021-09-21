import React from 'react';
import { Divider, Grid, Hidden } from '@material-ui/core';
import LayoutInner from '../components/common/LayoutInner';
import { TitleProfile } from '../containers/Profile/TitleProfile';
import { AvatarProfile } from '../containers/Profile/AvatarProfile';
import { CredentialsProfile } from '../containers/Profile/CredentialsProfile';
import { LegalProfile } from '../containers/Profile/LegalProfile';
import { PersonalProfile } from '../containers/Profile/PersonalProfile';
import ProfileStyles from '../containers/Profile/styles.module';

export default function ProfilePage(): JSX.Element {
  const classes = ProfileStyles();
  return (
    <LayoutInner>
      <Grid container>
        <Grid item xs={12}>
          <TitleProfile />
        </Grid>
        <Grid item xs={12} md={5}>
          <AvatarProfile />
          <Hidden mdUp>
            <Divider className={classes.divider} />
          </Hidden>
        </Grid>
        <Grid item xs={12} md={5}>
          <PersonalProfile title="Personal Profile" />
          <Divider className={classes.divider} />
          <CredentialsProfile title="Credentials Profile" />
          <Divider className={classes.divider} />
          <LegalProfile title="Legal Profile" />
        </Grid>
      </Grid>
    </LayoutInner>
  );
}
