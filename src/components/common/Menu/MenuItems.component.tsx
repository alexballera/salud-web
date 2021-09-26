import React, { useState } from 'react';
import Link from 'next/link';
import clsx from 'clsx';

/// MATERIAL UI
import {
  Divider,
  Box,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography
} from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import HomeIcon from '@material-ui/icons/Home';
import CardMembershipIcon from '@material-ui/icons/CardMembership';
import SettingsIcon from '@material-ui/icons/Settings';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
/// MATERIAL UI END

/// STYLES & TYPES
import MenuStyles from './styles.module';
import { IMenu } from './types';
/// STYLES & TYPES END

/// OWN COMPONENTS
import SvgContainer from '../SvgContainer';
import SvgLogo from '../Svg/SvgLogo.component';
import Modal from '../Modal';
import TermsAndConditions from '../../TermsAndConditions';
import InformedConsent from '../../InformedConsent';
import SvgHelp from '../Svg/SvgHelp.component';
/// OWN COMPONENTS END

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
  const [termsAndConditionOpen, setTermsAndConditionOpen] = useState(false);
  const [informedConsentOpen, setInformedConsentOpen] = useState(false);
  return (
    <>
      {type === 'mobile' && (
        <Box className={classes.logo}>
          <SvgContainer title="Logo Icon">
            <SvgLogo />
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
          <Box className={classes.svgContainerDesktop}>
            <SvgContainer title="Banner Svg" width={162} height={112}>
              <SvgHelp />
            </SvgContainer>
          </Box>
        )}
      </Box>
      <Divider className={classes.divider} />
      {type === 'desktop' && (
        <Box>
          <Typography onClick={() => setTermsAndConditionOpen(true)} className={classes.terms}>
            Términos y condiciones
          </Typography>
          <Typography onClick={() => setInformedConsentOpen(true)} className={classes.terms}>
            Consentimiento informado
          </Typography>
        </Box>
      )}
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
      <Modal open={termsAndConditionOpen} onClose={() => setTermsAndConditionOpen(false)}>
        <TermsAndConditions />
      </Modal>
      <Modal open={informedConsentOpen} onClose={() => setInformedConsentOpen(false)}>
        <InformedConsent />
      </Modal>
    </>
  );
};
export default MenuItems;
