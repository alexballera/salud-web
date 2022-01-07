import React, { useState } from 'react';
import Link from 'next/link';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';

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

const MenuItems = ({ type }: IMenu): JSX.Element => {
  const { t } = useTranslation(['globals', 'menu']);
  const classes = MenuStyles();
  const [termsAndConditionOpen, setTermsAndConditionOpen] = useState(false);
  const [informedConsentOpen, setInformedConsentOpen] = useState(false);

  const items = [
    {
      title: `${t('items.main', { ns: 'menu' })}`,
      icon: <HomeIcon />,
      action: 'main'
    },
    {
      title: `${t('items.profile', { ns: 'menu' })}`,
      icon: <AccountCircleIcon />,
      action: 'profile'
    },
    {
      title: `${t('items.subscription', { ns: 'menu' })}`,
      icon: <CardMembershipIcon />,
      action: 'subscriptions'
    },
    {
      title: `${t('items.preferences', { ns: 'menu' })}`,
      icon: <SettingsIcon />,
      action: 'preferences'
    }
  ];

  return (
    <>
      {type === 'mobile' && (
        <Box className={classes.logo}>
          <SvgContainer title="Logo Icon" width={54} height={28}>
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
          <Typography className={classes.helpText}>
            {t('text.helpTitle', { ns: 'menu' })}
          </Typography>
        </Box>
        <Box>
          <Link href="/help" passHref>
            <a className={classes.helpLink}>{t('label.go_help')}</a>
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
            {t('label.terms')}
          </Typography>
          <Typography onClick={() => setInformedConsentOpen(true)} className={classes.terms}>
            {t('label.consent')}
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
            {t('button.logout')}
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
