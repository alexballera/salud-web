import React, { useState } from 'react';
import { Divider, Grid, Hidden } from '@material-ui/core';
import LayoutInner from '../components/common/LayoutInner';
import { TitleProfile } from '../containers/Profile/TitleProfile';
import { AvatarProfile } from '../containers/Profile/AvatarProfile';
import { CredentialsProfile } from '../containers/Profile/CredentialsProfile';
import { LegalProfile } from '../containers/Profile/LegalProfile';
import { PersonalProfile } from '../containers/Profile/PersonalProfile';
import ProfileStyles from '../containers/Profile/styles.module';
import { getPersonalData, IPersonalData } from '../services/getPersonalData.service';
/// GET SERVICE END

export default function ProfilePage(): JSX.Element {
  const classes = ProfileStyles();
  const [fullName, setFullName] = useState('');
  const [documentNumber, setDocumentNumber] = useState('');

  getPersonalData('bastidasarelis2021@gmail.com')
    .then(res => {
      const personalData: IPersonalData = res.data.result;
      setFullName(personalData.fullName);
      setDocumentNumber(personalData.documentNumber);
    })
    .catch(err => console.log(err));
  return (
    <LayoutInner>
      <Grid container>
        <Grid item xs={12}>
          <TitleProfile />
        </Grid>
        <Grid item xs={12} md={5}>
          <AvatarProfile fullName={fullName} documentNumber={documentNumber} />
          <Hidden mdUp>
            <Divider className={classes.divider} />
          </Hidden>
        </Grid>
        <Grid item xs={12} md={5}>
          <PersonalProfile />
          <Divider className={classes.divider} />
          <CredentialsProfile />
          <Divider className={classes.divider} />
          <LegalProfile />
        </Grid>
      </Grid>
    </LayoutInner>
  );
}
