import React from 'react';
import Link from 'next/link';

/// i18n
import { useTranslation } from 'react-i18next';
import { NAMESPACE_KEY } from '../../i18n/globals/i18n';
/// i18n END

/// MATERIAL - UI
import { Box, Button, Divider, Hidden } from '@material-ui/core';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
/// MATERIAL - UI END

/// SERVICES
/// SERVICES END

/// OWN COMPONENTS
import { TitleContent } from '../../components/common/TitleContent';
import { AvatarProfile } from '../../containers/Profile/AvatarProfile';
import { CredentialsProfile } from '../../containers/Profile/CredentialsProfile';
import { LegalProfile } from '../../containers/Profile/LegalProfile';
import { PersonalProfile } from '../../containers/Profile/PersonalProfile';
import { withAppContext } from '../../context';
import LayoutContent from '../../layouts/LayoutContent';
import LayoutLoggedIn from '../../layouts/LayoutLoggedIn';
/// OWN COMPONENTS END

/// STYLES & TYPES
import ProfileStyles from '../../containers/Profile/styles.module';
import { AppStates } from '../../context/types';
/// STYLES & TYPES END

function ProfilePage({ user }: AppStates): JSX.Element {
  const { t } = useTranslation(NAMESPACE_KEY);
  const classes = ProfileStyles();
  return (
    <LayoutLoggedIn>
      <LayoutContent
        title={<TitleContent title={t('title.profile')} />}
        leftContent={
          <>
            <AvatarProfile fullName={user?.fullName} documentNumber={user?.documentNumber} />
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
                    {t('button.logout')}
                  </Button>
                </Link>
              </Box>
            </Hidden>
          </>
        }
      />
    </LayoutLoggedIn>
  );
}

export default withAppContext(ProfilePage);
