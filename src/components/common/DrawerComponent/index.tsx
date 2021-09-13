import React, { useState } from 'react';
import Link from 'next/link';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import HomeIcon from '@material-ui/icons/Home';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import CardMembershipIcon from '@material-ui/icons/CardMembership';
import SettingsIcon from '@material-ui/icons/Settings';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import SvgContainer from '../SvgContainer';
import LogoIconSvg from '../Navbar/components/LogoIcon.component';
import { Box, Button } from '@material-ui/core';
import DrawerStyles from './styles.module';

const items = [
  {
    title: 'Inicio',
    icon: <HomeIcon />,
    action: 'main'
  },
  {
    title: 'Perfil',
    icon: <AccountCircleIcon />,
    action: 'profile'
  },
  {
    title: 'Tu suscripción',
    icon: <CardMembershipIcon />,
    action: 'subscription'
  },
  {
    title: 'Preferencias',
    icon: <SettingsIcon />,
    action: 'preferences'
  }
];

const DrawerComponent = (): JSX.Element => {
  const classes = DrawerStyles();
  const [open, setOpen] = useState(false);

  const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }
    setOpen(open);
  };

  const list = () => (
    <Box
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
      p={3}
    >
      <Box className={classes.logo}>
        <SvgContainer title="Logo Icon">
          <LogoIconSvg />
        </SvgContainer>
      </Box>
      <List>
        {items.map(item => (
          <Link href={item.action} passHref key={item.title}>
            <ListItem button className={classes.item}>
              <ListItemIcon className={classes.icon}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.title} className={classes.text} />
            </ListItem>
          </Link>
        ))}
      </List>
      <Divider />
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
  );

  return (
    <>
      <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer(true)}>
        <MenuIcon />
      </IconButton>
      <Drawer anchor={'left'} open={open} onClose={toggleDrawer(false)}>
        {list()}
      </Drawer>
    </>
  );
};

export default DrawerComponent;
