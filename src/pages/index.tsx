import React from 'react';
import Head from 'next/head';
import { NextPage } from 'next/types';
import { useTranslation } from 'react-i18next';
import { NAMESPACE_KEY } from '../i18n/home/i18n';

/// MATERIAL UI
import { Button, ButtonGroup, Box, Typography } from '@material-ui/core';
/// MATERIAL UI END

/// OWN COMPONENTS

/// OWN COMPONENTS END

/// STYLES & TYPES
/// STYLES & TYPES END

const HomePage: NextPage = (): JSX.Element => {
  const { t, i18n } = useTranslation(NAMESPACE_KEY);
  return (
    <>
      <Head>
        <title>{t('header.title')}</title>
      </Head>
      <Box component="main">
        <Typography variant="h2">{t('header.title')}</Typography>
        <ButtonGroup color="primary" aria-label="outlined primary button group">
          <Button onClick={() => i18n?.changeLanguage('enUS')}>English</Button>
          <Button onClick={() => i18n?.changeLanguage('es')}>Español</Button>
        </ButtonGroup>
      </Box>
    </>
  );
};

export default HomePage;
