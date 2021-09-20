import React from 'react';
import { Divider, Grid, Hidden } from '@material-ui/core';
import LayoutInner from '../components/common/LayoutInner';
import { TitleProfile } from '../containers/Profile/TitleProfile';
import { AvatarProfile } from '../containers/Profile/AvatarProfile';
import { CredentialsProfile } from '../containers/Profile/CredentialsProfile';
import { LegalProfile } from '../containers/Profile/LegalProfile';
import { PersonalProfile } from '../containers/Profile/PersonalProfile';

export default function ProfilePage(): JSX.Element {
  return (
    <LayoutInner>
      <Grid container>
        <Grid item xs={12}>
          <TitleProfile />
        </Grid>
        <Grid item xs={12} md={5}>
          <AvatarProfile title="Avatar Profile" />
          <Hidden mdUp>
            <Divider />
          </Hidden>
        </Grid>
        <Grid item xs={12} md={5}>
          <PersonalProfile title="Personal Profile" />
          <Divider />
          <CredentialsProfile title="Credentials Profile" />
          <Divider />
          <LegalProfile title="Legal Profile" />
        </Grid>
      </Grid>
    </LayoutInner>
  );
}
