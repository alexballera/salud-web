import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { withAppContext } from '../../../context';

/// MATERIAL UI
import { AppBar, Toolbar, Hidden, Grid, Avatar, Typography } from '@material-ui/core';
/// MATERIAL UI END

/// STYLES & TYPES
import { IProps } from './types';
import navbarStyles from './styles.module';
/// STYLES & TYPES END

/// OWN COMPONENTS
import SvgContainer from '../SvgContainer';
import SvgLogo from '../Svg/SvgLogo.component';
import ActionButtons from './components/ActionButtons.component';
import DropDownButton from './components/DropDownButton';
import Menu from '../Menu';
import { User } from '../../../types/auth.types';
import { getUserFromLocalStorage } from '../../../services/localStorage.service';
/// OWN COMPONENTS END

function Navbar({ loggedIn }: IProps): JSX.Element {
  const classes = navbarStyles();
  const router = useRouter();
  const [firstName, setFirstName] = useState('');
  const [documentNumber, setDocumentNumber] = useState('');

  useEffect(() => {
    if (loggedIn) {
      const user: User = getUserFromLocalStorage('user');
      setFirstName(user.firstName);
      setDocumentNumber(user.documentNumber);
    }
  });

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

  const noActionPathNames = ['/main', '/profile', '/subscriptions', '/preferences', '/help'];

  const exitButtonPathNames = ['/signup', '/recover_password/forward_email'];

  const closeButtonPathNames = ['/login'];

  const backButtonPathNames = [
    '/update/phone',
    '/update/password',
    '/update/email',
    '/preferences/language',
    '/preferences/notifications',
    '/subscriptions/beneficiaries',
    '/recover_password'
  ];

  return (
    <>
      {showMenu() && (
        <>
          <Hidden mdUp>
            <AppBar position="sticky" color="inherit" elevation={0}>
              <Toolbar>
                <Grid container justify="center">
                  <Grid container>
                    <Grid item xs={6} md={6}>
                      <Grid
                        container
                        alignItems="center"
                        justify="flex-start"
                        style={{ height: '100%' }}
                      >
                        <SvgContainer title="Logo Icon" width={54} height={28}>
                          <SvgLogo />
                        </SvgContainer>
                      </Grid>
                    </Grid>
                    <Grid item xs={6} md={6} className={classes.buttonAction}>
                      {!loggedIn && (
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
                    <Grid item xs={6} md={6} container alignItems="center">
                      <SvgContainer title="Logo Icon" width={54} height={28}>
                        <SvgLogo />
                      </SvgContainer>
                    </Grid>
                    <Grid item xs={6} md={6} className={classes.buttonAction}>
                      <ActionButtons
                        noActionPathNames={noActionPathNames}
                        exitButtonPathNames={exitButtonPathNames}
                        backButtonPathNames={backButtonPathNames}
                        closeButtonPathNames={closeButtonPathNames}
                      />
                      {/* TODO corregir mostrar solo para cuando esté logueado: usar "loggedIn" */}
                      {showMenuMobile() && loggedIn && (
                        <Grid container justify="flex-end" alignItems="center" spacing={2}>
                          <Grid item>
                            <Avatar variant="square">{firstName?.charAt(0)}</Avatar>
                          </Grid>
                          <Grid
                            container
                            direction="column"
                            alignItems="baseline"
                            item
                            xs={4}
                            md={3}
                          >
                            <Typography className={classes.name}>{firstName}</Typography>
                            <Typography className={classes.documentNumber}>
                              {documentNumber}
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
          <Hidden smDown>{showMenuMobile() && loggedIn && <Menu type="desktop" />}</Hidden>
        </>
      )}
    </>
  );
}

export default withAppContext(Navbar);
