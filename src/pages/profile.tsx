import React, { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

/// MATERIAL - UI
import { Box, Button, Divider, Hidden } from '@material-ui/core';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
/// MATERIAL - UI END

/// SERVICES
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
import { withAppContext } from '../context';
import { AppStates } from '../context/types';
/// STYLES & TYPES END

function ProfilePage({ user, loggedIn }: AppStates): JSX.Element {
  const classes = ProfileStyles();
  const router = useRouter();
  console.log('user', user);
  console.log('loggedIn', loggedIn);

  useEffect(() => {
    if (!(user || loggedIn)) {
      router.push('/login');
    }
  }, [user, loggedIn]);

  return (
    <>
      {user && (
        <LayoutContent
          title={<TitleContent title="Perfil" />}
          leftContent={
            <>
              <AvatarProfile fullName={user.fullName} documentNumber={user.documentNumber} />
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
      )}
      {!user && <h2>Será redireccionado para que inicie sesión...</h2>}
    </>
  );
}

export default withAppContext(ProfilePage);
