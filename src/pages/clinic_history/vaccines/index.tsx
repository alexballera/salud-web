/// BASE IMPORTS
import React from 'react';
/// BASE IMPORTS

/// i18n
import { useTranslation, withTranslation } from 'react-i18next';
import { NAMESPACE_KEY as i18ClinicHistory } from '@/src/i18n/clinic_history/i18n';
/// i18n END

/// MUI COMPONENTS
import { Box, Typography } from '@mui/material';
/// MUI COMPONENTS END

/// OWN COMPONENTS
/// OWN COMPONENTS END

/// STYLES
import muiTheme from '@/src/styles/js/muiTheme';
import { ThemeProvider } from '@mui/styles';
import { examStyles } from '@/src/containers/ExamResult/styles.module';
/// STYLES END

const Vaccines = (): JSX.Element => {
  const { t } = useTranslation(i18ClinicHistory);
  const classes = examStyles();
  return (
    <ThemeProvider theme={muiTheme}>
      <Box p={3}>
        <Typography variant="body1" component="div" className={classes.vaccineTitle}>
          {t('vaccines.title', { ns: i18ClinicHistory })}
        </Typography>
      </Box>
    </ThemeProvider>
  );
};

export default withTranslation(i18ClinicHistory)(Vaccines);
