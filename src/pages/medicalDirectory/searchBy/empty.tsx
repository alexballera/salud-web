/// BASE
import React from 'react';
// BASE END

/// i18n
import { useTranslation } from 'react-i18next';
import { NAMESPACE_KEY as i18ClinicHistory } from '@/src/i18n/clinic_history/i18n';
import { examStyles } from '@/src/containers/ExamResult/styles.module';
/// i18n END

// MUI
import { Typography } from '@mui/material';
// MUI END

const EmptySearchDoctor = (): JSX.Element => {
  const { t } = useTranslation(i18ClinicHistory);
  const classes = examStyles();

  return (
    <Typography variant="caption" className={classes.noRecords}>
      {t('doctors.no_records', { ns: i18ClinicHistory })}
    </Typography>
  );
};

export default EmptySearchDoctor;
