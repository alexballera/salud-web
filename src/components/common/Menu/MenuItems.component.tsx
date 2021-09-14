import React from 'react';
import Link from 'next/link';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import HomeIcon from '@material-ui/icons/Home';
import CardMembershipIcon from '@material-ui/icons/CardMembership';
import SettingsIcon from '@material-ui/icons/Settings';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import SvgContainer from '../SvgContainer';
import LogoIconSvg from '../Navbar/components/LogoIcon.component';
import { Box, Button, Typography } from '@material-ui/core';
import MenuStyles from './styles.module';
import { IMenu } from './types';
import SvgBanner from '../Svg/SvgBanner.component';
import clsx from 'clsx';

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

const MenuItems = ({ type }: IMenu): JSX.Element => {
  const classes = MenuStyles();
  return (
    <>
      {type === 'mobile' && (
        <Box className={classes.logo}>
          <SvgContainer title="Logo Icon">
            <LogoIconSvg />
          </SvgContainer>
        </Box>
      )}
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
      <Box
        className={clsx({
          [classes.helpContainer]: true,
          [classes.helpContainerDesktop]: type === 'desktop',
          [classes.helpContainerMobile]: type === 'mobile'
        })}
      >
        <Box>
          <Typography className={classes.helpText}>¿Tenés alguna consulta?</Typography>
        </Box>
        <Box>
          <Link href="/help" passHref>
            <a className={classes.helpLink}>Ir a ayuda</a>
          </Link>
        </Box>
        {type === 'desktop' && (
          <Box style={{ width: '161px', height: '110px' }}>
            <SvgContainer title="Banner Svg" width={161} height={110}>
              <SvgBanner />
            </SvgContainer>
          </Box>
        )}
      </Box>
      <Divider className={classes.divider} />
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
    </>
  );
};
export default MenuItems;
