import { useContext } from 'react';
import { useRouter } from 'next/router';
import { withAppContext } from '../../../context';

/// MATERIAL UI
import { AppBar, Toolbar, Hidden, Grid, Avatar, Typography, IconButton } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
/// MATERIAL UI END

/// STYLES & TYPES
import navbarStyles from './styles.module';
/// STYLES & TYPES END

/// i18n
import { useTranslation, withTranslation } from 'react-i18next';
import { NAMESPACE_KEY as i18Global, i18n } from '../../../i18n/globals/i18n';
import { NAMESPACE_KEY as i18Forms } from '../../../i18n/forms/i18n';
/// i18n END

/// OWN COMPONENTS
import SvgContainer from '../SvgContainer';
import SvgLogo from '../Svg/SvgLogo.component';
import ActionButtons from './components/ActionButtons.component';
import DropDownButton from './components/DropDownButton';
import Menu from '../Menu';
import { UserContext } from '../../../context/UserContext';
/// OWN COMPONENTS END

function Navbar(): JSX.Element {
  const classes = navbarStyles();
  const router = useRouter();
  const { userLogState, account } = useContext(UserContext);
  const { t } = useTranslation([i18Global, i18Forms]);

  const showMenuMobile = () => {
    switch (router.pathname) {
      case '/main':
        return true;
      case '/profile':
        return true;
      case '/subscriptions':
        return true;
      case '/preferences':
        return true;
      case '/help':
        return true;
      default:
        return false;
    }
  };

  const showMenu = () => {
    switch (router.pathname) {
      case '/validate_code':
        return false;
      case '/logout':
        return false;
      case '/':
        return true;
      default:
        return true;
    }
  };

  const showBackButton = () => {
    switch (router.pathname) {
      case '/medicalData':
        return true;
      case '/proceedings':
        return true;
      default:
        return false;
    }
  };

  const showPageTitle = () => {
    switch (router.pathname) {
      case '/medicalData':
        return t('items.generalData', { ns: 'menu' });
      case '/proceedings':
        return t('items.proceedings', { ns: 'menu' });
      default:
        return false;
    }
  };

  const noActionPathNames = [
    '/main',
    '/profile',
    '/subscriptions',
    '/preferences',
    '/help',
    '/medicalData',
    '/proceedings'
  ];

  const exitButtonPathNames = [
    '/recover_password/forward_email',
    '/recover_password/change_password'
  ];

  const closeButtonPathNames = ['/login', '/signup', '/signup/email_verification'];

  const backButtonPathNames = [
    '/update/phone',
    '/update/password',
    '/update/email',
    '/preferences/language',
    '/preferences/notifications',
    '/subscriptions/beneficiaries',
    '/recover_password',
    '/signup/registered_patient'
  ];

  return (
    <>
      {showMenu() && (
        <>
          <Hidden mdUp>
            <AppBar position="sticky" color="inherit" elevation={0}>
              <Toolbar>
                <Grid container justify="center">
                  {showBackButton() && (
                    <Grid container justify="flex-start" alignItems="center">
                      <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="arrow-back"
                        onClick={() => router.back()}
                      >
                        <ArrowBackIcon />
                      </IconButton>
                      <Typography variant="body1" className={classes.title}>
                        {showPageTitle()}
                      </Typography>
                    </Grid>
                  )}
                  <Grid container>
                    <Grid item xs={6} md={6}>
                      <Grid
                        container
                        alignItems="center"
                        justify="flex-start"
                        style={{ height: '100%' }}
                      >
                        {showMenuMobile() && <Menu type="mobile" />}
                        {!showBackButton() && (
                          <SvgContainer title="Logo Icon" width={54} height={28}>
                            <SvgLogo />
                          </SvgContainer>
                        )}
                      </Grid>
                    </Grid>
                    <Grid item xs={6} md={6} className={classes.buttonAction}>
                      {userLogState !== 'LOGGEDIN' && (
                        <ActionButtons
                          noActionPathNames={noActionPathNames}
                          exitButtonPathNames={exitButtonPathNames}
                          backButtonPathNames={backButtonPathNames}
                          closeButtonPathNames={closeButtonPathNames}
                        />
                      )}
                    </Grid>
                  </Grid>
                </Grid>
              </Toolbar>
            </AppBar>
          </Hidden>
          <Hidden smDown>
            <AppBar position="sticky" color="inherit" elevation={0}>
              <Toolbar>
                <Grid container justify="center">
                  <Grid container>
                    {showBackButton() && (
                      <Grid container justify="flex-start" alignItems="center">
                        <IconButton
                          edge="start"
                          color="inherit"
                          aria-label="arrow-back"
                          onClick={() => router.back()}
                        >
                          <ArrowBackIcon />
                        </IconButton>
                        <Typography variant="body1" className={classes.title}>
                          {showPageTitle()}
                        </Typography>
                      </Grid>
                    )}
                    <Grid item xs={6} md={6} container alignItems="center">
                      {!showBackButton() && (
                        <SvgContainer title="Logo Icon" width={54} height={28}>
                          <SvgLogo />
                        </SvgContainer>
                      )}
                    </Grid>
                    <Grid item xs={6} md={6} className={classes.buttonAction}>
                      {userLogState !== 'LOGGEDIN' && (
                        <ActionButtons
                          noActionPathNames={noActionPathNames}
                          exitButtonPathNames={exitButtonPathNames}
                          backButtonPathNames={backButtonPathNames}
                          closeButtonPathNames={closeButtonPathNames}
                        />
                      )}
                      {/* TODO corregir mostrar solo para cuando esté logueado: usar "loggedIn" */}
                      {showMenuMobile() && userLogState === 'LOGGEDIN' && (
                        <Grid container justify="flex-end" alignItems="center" spacing={2}>
                          <Grid item>
                            <Avatar variant="square">{account?.name?.charAt(0)}</Avatar>
                          </Grid>
                          <Grid
                            container
                            direction="column"
                            alignItems="baseline"
                            item
                            xs={4}
                            md={3}
                          >
                            <Typography className={classes.name}>
                              {account?.name.split(' ')[1]}
                            </Typography>
                            <Typography className={classes.documentNumber}>
                              {account?.$id}
                            </Typography>
                          </Grid>
                          <Grid item xs={2} md={1} className={classes.dropDownContainer}>
                            <DropDownButton />
                          </Grid>
                        </Grid>
                      )}
                    </Grid>
                  </Grid>
                </Grid>
              </Toolbar>
            </AppBar>
          </Hidden>
          <Hidden smDown>
            {showMenuMobile() && userLogState === 'LOGGEDIN' && <Menu type="desktop" />}
          </Hidden>
        </>
      )}
    </>
  );
}

export default withTranslation([i18Global, i18Forms])(withAppContext(Navbar));
