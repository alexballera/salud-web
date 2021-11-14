import React, { useEffect, useState } from 'react';
import Link from 'next/link';

/// MATERIAL - UI
import { Box, Button, Divider, Hidden } from '@material-ui/core';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
/// MATERIAL - UI END

/// SERVICES
import { getDataFromLocalstorage } from '../services/auth.service';
/// SERVICES END

/// OWN COMPONENTS
import { TitleContent } from '../components/common/TitleContent';
import { AvatarProfile } from '../containers/Profile/AvatarProfile';
import { CredentialsProfile } from '../containers/Profile/CredentialsProfile';
import { LegalProfile } from '../containers/Profile/LegalProfile';
import { PersonalProfile } from '../containers/Profile/PersonalProfile';
import LayoutContent from '../layouts/LayoutContent';
/// OWN COMPONENTS END

/// STYLES & TYPES
import ProfileStyles from '../containers/Profile/styles.module';
import { User } from '../types/auth.types';
/// STYLES & TYPES END

export default function ProfilePage(): JSX.Element {
  const classes = ProfileStyles();
  const [fullName, setFullName] = useState('');
  const [documentNumber, setDocumentNumber] = useState('');

  useEffect(() => {
    const user: User = getDataFromLocalstorage('user');
    setFullName(user.fullName);
    setDocumentNumber(user.documentNumber);
    console.log(user);
  });

  return (
    <LayoutContent
      title={<TitleContent title="Perfil" />}
      leftContent={
        <>
          <AvatarProfile fullName={fullName} documentNumber={documentNumber} />
          <Hidden mdUp>
            <Divider className={classes.divider} />
          </Hidden>
        </>
      }
      rightContent={
        <>
          <PersonalProfile />
          <Divider className={classes.divider} />
          <CredentialsProfile />
          <Divider className={classes.divider} />
          <Hidden mdUp>
            <LegalProfile />
          </Hidden>
          <Hidden smDown>
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
        </>
      }
    />
  );
}
