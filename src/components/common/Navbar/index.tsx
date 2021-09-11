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
import LogoIconSvg from './components/LogoIcon.component';
import DrawerComponent from '../DrawerComponent';
import ActionButtons from './components/ActionButtons.component';

function Navbar({ loggedIn }: IProps): JSX.Element {
  const classes = navbarStyles();
  const router = useRouter();

  const showMenuDrawer = () => {
    switch (router.pathname) {
      case '/main':
        return true;
      default:
        break;
    }
  };

  return (
    <AppBar position="static" color="inherit" elevation={0}>
      <Hidden smUp>
        <Toolbar>
          <Grid container justify="center">
            <Grid container>
              <Grid item xs={6} md={6}>
                <Grid container alignItems="center">
                  {showMenuDrawer() && <DrawerComponent />}
                  <SvgContainer title="Logo Icon">
                    <LogoIconSvg />
                  </SvgContainer>
                </Grid>
              </Grid>
              <Grid item xs={6} md={6} className={classes.buttonAction}>
                {!loggedIn && <ActionButtons />}
              </Grid>
            </Grid>
          </Grid>
        </Toolbar>
      </Hidden>

      <Hidden xsDown>
        <Toolbar variant="dense">
          <SvgContainer title="Logo Icon">
            <LogoIconSvg />
          </SvgContainer>
          Desktop
          {!loggedIn && <ActionButtons />}
        </Toolbar>
      </Hidden>
    </AppBar>
  );
}

export default withAppContext(Navbar);
