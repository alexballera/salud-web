import React, { useState } from 'react';
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
import SvgLogoLarge from '../Svg/SvgLogoLarge.component';
import ActionButtons from './components/ActionButtons.component';
import DropDownButton from './components/DropDownButton';
import Menu from '../Menu';
import { getPersonalData, IPersonalData } from '../../../services/getPersonalData.service';
/// OWN COMPONENTS END

function Navbar({ loggedIn }: IProps): JSX.Element {
  const classes = navbarStyles();
  const router = useRouter();
  const [firstName, setFirstName] = useState('');
  const [documentNumber, setDocumentNumber] = useState('');

  getPersonalData('bastidasarelis2021@gmail.com')
    .then(res => {
      const personalData: IPersonalData = res.data.result;
      setFirstName(personalData.firstName);
      setDocumentNumber(personalData.documentNumber);
    })
    .catch(err => console.log(err));

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
                  {/* TODO corregir mostrar solo para cuando esté logueado: usar "loggedIn" */}
                  {showMenu() && (
                    <Grid container justify="flex-end" alignItems="center" spacing={2}>
                      <Grid item>
                        <Avatar variant="square">{firstName?.charAt(0)}</Avatar>
                      </Grid>
                      <Grid container direction="column" alignItems="baseline" item xs={4} md={3}>
                        <Typography className={classes.name}>{firstName}</Typography>
                        <Typography className={classes.documentNumber}>{documentNumber}</Typography>
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
      <Hidden smDown>{showMenu() && <Menu type="desktop" />}</Hidden>
    </>
  );
}

export default withAppContext(Navbar);
