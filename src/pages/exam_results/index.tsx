/// BASE IMPORTS
import React from 'react';
/// BASE IMPORTS

/// i18n
import { useTranslation, withTranslation } from 'react-i18next';
import { NAMESPACE_KEY as i18ExamResult } from '@/src/i18n/clinic_history/i18n';
/// i18n END

/// MUI COMPONENTS
import { Box } from '@material-ui/core';
/// MUI COMPONENTS END

/// OWN COMPONENTS
import { withAppContext } from '@/src/context';
/// OWN COMPONENTS END

/// STYLES
import examResultStyles from '@/src/containers/ExamResult/styles.module';
/// STYLES END

const ExamResult = (): JSX.Element => {
  const { t } = useTranslation(i18ExamResult);
  const classes = examResultStyles();
  return (
    <Box p={3}>
      <h2>Resultados de exámenes</h2>
    </Box>
  );
};

export default withTranslation(i18ExamResult)(withAppContext(ExamResult));
