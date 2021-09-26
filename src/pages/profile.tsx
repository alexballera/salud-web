import React, { useState } from 'react';
import Link from 'next/link';

/// CONTEXT
/// CONTEXT END

/// MATERIAL - UI
import { Box, Button, Divider, Grid, Hidden } from '@material-ui/core';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
/// MATERIAL - UI END

/// SERVICES
import { getPersonalData, IPersonalData } from '../services/getPersonalData.service';
/// SERVICES END

/// OWN COMPONENTS
import { TitleProfile } from '../containers/Profile/TitleProfile';
import { AvatarProfile } from '../containers/Profile/AvatarProfile';
import { CredentialsProfile } from '../containers/Profile/CredentialsProfile';
import { LegalProfile } from '../containers/Profile/LegalProfile';
import { PersonalProfile } from '../containers/Profile/PersonalProfile';
import LayoutInner from '../layouts/LayoutInner';
import { SecondaryContactsProfile } from '../containers/Profile/SecondaryContactsProfile';
/// OWN COMPONENTS END

/// STYLES & TYPES
import ProfileStyles from '../containers/Profile/styles.module';
/// STYLES & TYPES END

/// FORM STATES & VALIDATIONS
/// FORM STATES & VALIDATIONS END

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
        <Grid item xs={12} md={7} lg={5}>
          <PersonalProfile />
          <Divider className={classes.divider} />
          <CredentialsProfile />
          <Divider className={classes.divider} />
          <Hidden mdUp>
            <LegalProfile />
          </Hidden>
          <Hidden smDown>
            <SecondaryContactsProfile />
            <Divider className={classes.divider} />
            <Box>
              <Link href="/logout" passHref>
                <Button
                  data-testid="exit-button"
                  variant="text"
                  endIcon={<ExitToAppIcon />}
                  className={classes.button}
                  color="secondary"
                >
                  Cerrar sesión
                </Button>
              </Link>
            </Box>
          </Hidden>
        </Grid>
      </Grid>
    </LayoutInner>
  );
}
