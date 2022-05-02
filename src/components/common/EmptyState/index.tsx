import { Box, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

import emptyStateStyles from './style.module';
import { NAMESPACE_KEY } from '../../../i18n/medicalDirectory/i18n';

interface IEmptyState {
  children: React.ReactNode;
  loading: boolean;
  length: number;
}

const EmptyState = ({ children, loading, length }: IEmptyState): JSX.Element => {
  const classes = emptyStateStyles();
  const { t } = useTranslation(NAMESPACE_KEY);

  return (
    <Box className={!loading && length === 0 && classes.emptyMainGrid}>
      {children}
      {!loading && length === 0 && (
        <Box mt={6} ml={4} className={classes.emptyContentTitle}>
          <Typography variant="h6" className={classes.emptyTitle}>
            {t('noResult')}
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default EmptyState;
