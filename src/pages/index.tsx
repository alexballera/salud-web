import React, { useEffect } from 'react';
import Head from 'next/head';
import { NextPage } from 'next/types';
import { useTranslation } from 'react-i18next';
import { NAMESPACE_KEY } from '../i18n/home/i18n';
import i18next from 'i18next';

/// MATERIAL UI
import { Button, ButtonGroup, Box, Typography } from '@material-ui/core';
import { removeDataFromLocalstorage } from '../services/auth.service';
/// MATERIAL UI END

/// OWN COMPONENTS

/// OWN COMPONENTS END

/// STYLES & TYPES
/// STYLES & TYPES END

const HomePage: NextPage = (): JSX.Element => {
  const { t } = useTranslation(NAMESPACE_KEY);
  useEffect(() => {
    removeDataFromLocalstorage('user');
  });
  return (
    <>
      <Head>
        <title>{t('home_title')}</title>
      </Head>
      <Box component="main">
        <Typography variant="h1">{t('home_title')}</Typography>
        <ButtonGroup color="primary" aria-label="outlined primary button group">
          <Button onClick={() => i18next.changeLanguage('en')}>English</Button>
          <Button onClick={() => i18next.changeLanguage('es')}>Español</Button>
        </ButtonGroup>
      </Box>
    </>
  );
};

export default HomePage;
