/// BASE IMPORTS
import { useEffect, useContext } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
/// BASE IMPORTS END

/// CONTEXT
import { withAppContext } from '../context';
/// CONTEXT END

/// SERVICES
/// SERVICES END

/// MATERIAL UI
import { Button, ButtonGroup, Box, Typography, Hidden } from '@material-ui/core';
/// MATERIAL UI END

/// OWN COMPONENTS
import Notifications from '../components/common/Notifications';
/// OWN COMPONENTS END

/// i18n
import { useTranslation } from 'react-i18next';
import { NAMESPACE_KEY as home } from '../i18n/home/i18n';
import { NAMESPACE_KEY as i18nGlobal } from '../i18n/globals/i18n';
import { NAMESPACE_KEY as i18nForms } from '../i18n/forms/i18n';
/// i18n END

/// TYPES
import { INotificationProps } from '../context/types';
import { UserContext } from '../context/UserContext';
type IFormData = {
  handleLoading?: (loading: boolean) => void;
  handleNotifications: (props: INotificationProps) => void;
  notificationState?: INotificationProps;
};
/// TYPES END

const HomePage = ({
  handleNotifications,
  handleLoading,
  notificationState
}: IFormData): JSX.Element => {
  const { t, i18n } = useTranslation([home, i18nGlobal, i18nForms]);
  const { verifyEmail } = useContext(UserContext);
  const router = useRouter();
  const { userId, secret } = router.query;

  useEffect(() => {
    updateVerification();
  }, [userId]);

  const updateVerification = async () => {
    if (userId) {
      verifyEmail(userId as string, secret as string)
        .then(() =>
          handleNotifications({
            open: true,
            message: `${t('message.success.generated_user', { ns: i18nForms })}`,
            severity: 'success'
          })
        )
        .catch(e => {
          console.error(e);
          handleNotifications({
            open: true,
            message: `${t('message.error.general_fetch', { ns: i18nForms })}`,
            severity: 'error'
          });
        })
        .finally(() => handleLoading(false));
    }
  };

  return (
    <>
      <Head>
        <title>{t('header.title')}</title>
      </Head>
      <Box p={3} component="main">
        <Hidden only={['xs', 'sm']}>
          <Notifications
            {...notificationState}
            onClose={() => handleNotifications({ ...notificationState, open: false })}
          />
        </Hidden>

        <Box>
          <Typography variant="h2">Landing Page</Typography>
          <Typography variant="h4">{t('header.title')}</Typography>

          <Box mt={3} mb={3}>
            <ButtonGroup color="primary" aria-label="outlined primary button group">
              <Button onClick={() => i18n?.changeLanguage('enUS')}>English</Button>
              <Button onClick={() => i18n?.changeLanguage('es')}>Español</Button>
            </ButtonGroup>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default withAppContext(HomePage);
