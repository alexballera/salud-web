import React, { useEffect } from 'react';
import { NextPage } from 'next/types';
import { useTranslation } from 'react-i18next';
import { NAMESPACE_KEY } from '../i18n/home/i18n';

/// MATERIAL UI
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { removeDataFromLocalstorage } from '../services/auth.service';
/// MATERIAL UI END

/// OWN COMPONENTS

/// OWN COMPONENTS END

/// STYLES & TYPES
/// import styles from '../styles/Home.module.scss';
/// STYLES & TYPES END

const HomePage: NextPage = (): JSX.Element => {
  const { t } = useTranslation(NAMESPACE_KEY);
  useEffect(() => {
    removeDataFromLocalstorage('user');
  });
  return (
    <>
      <Box component="main">
        <Typography variant="h1">{t('home_title')}</Typography>
      </Box>
    </>
  );
};

export default HomePage;
