import React from 'react';
import { useRouter } from 'next/router';
import { withAppContext } from '../../../context';

/// MATERIAL UI
import { AppBar, Toolbar, Hidden, Grid } from '@material-ui/core';
/// MATERIAL UI END

/// STYLES & TYPES
import { IProps } from './types';
import navbarStyles from './styles.module';
/// STYLES & TYPES END

import SvgContainer from '../SvgContainer';
import SvgLogo from '../Svg/SvgLogo.component';
import SvgLogoLarge from '../Svg/SvgLogoLarge.component';
import ActionButtons from './components/ActionButtons.component';
import Menu from '../Menu';

function Navbar({ loggedIn }: IProps): JSX.Element {
  const classes = navbarStyles();
  const router = useRouter();

  const showMenu = () => {
    switch (router.pathname) {
      case '/main':
        return true;
      case '/profile':
        return true;
      case '/subscription':
        return true;
      case '/preferences':
        return true;
      case '/help':
        return true;
      default:
        return false;
    }
  };

  const noActionPathNames = [
    '/login',
    '/main',
    '/profile',
    '/subscription',
    '/preferences',
    '/help'
  ];

  const exitButtonPathNames = ['/recover', '/signup'];

  return (
    <>
      <Hidden mdUp>
        <AppBar position="static" color="inherit" elevation={0}>
          <Toolbar>
            <Grid container justify="center">
              <Grid container>
                <Grid item xs={6} md={6}>
                  <Grid container alignItems="center">
                    {showMenu() && <Menu type="mobile" />}
                    <SvgContainer title="Logo Icon">
                      <SvgLogo />
                    </SvgContainer>
                  </Grid>
                </Grid>
                <Grid item xs={6} md={6} className={classes.buttonAction}>
                  {!loggedIn && (
                    <ActionButtons
                      noActionPathNames={noActionPathNames}
                      exitButtonPathNames={exitButtonPathNames}
                    />
                  )}
                </Grid>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
      </Hidden>

      <Hidden smDown>
        <AppBar color="inherit" elevation={1}>
          <Toolbar className={classes.toolbarDesktop}>
            <Grid container justify="center">
              <Grid container>
                <Grid item xs={6} md={6}>
                  <Grid container alignItems="center">
                    <SvgContainer title="Logo Icon Large" width={63} height={35}>
                      <SvgLogoLarge />
                    </SvgContainer>
                  </Grid>
                </Grid>
                <Grid item xs={6} md={6} className={classes.buttonAction}>
                  {!loggedIn && (
                    <ActionButtons
                      noActionPathNames={noActionPathNames}
                      exitButtonPathNames={exitButtonPathNames}
                    />
                  )}
                </Grid>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
      </Hidden>
      <Hidden smDown>{showMenu() && <Menu type="desktop" />}</Hidden>
    </>
  );
}

export default withAppContext(Navbar);
