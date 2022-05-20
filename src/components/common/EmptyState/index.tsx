import { Box, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

import emptyStateStyles from './style.module';
import { NAMESPACE_KEY } from '../../../i18n/medicalDirectory/i18n';

interface IEmptyState {
  children: React.ReactNode;
  loading: boolean;
  length: number;
  typeSearch?: string;
}

const EmptyState = ({ children, loading, length, typeSearch }: IEmptyState): JSX.Element => {
  const classes = emptyStateStyles();
  const { t } = useTranslation(NAMESPACE_KEY);

  const showEmptyMessage = (): string => {
    const message = {
      general: t('noOverallResult'),
      default: t('noResult')
    };
    return message[typeSearch] || message['default'];
  };

  return (
    <Box className={!loading && length === 0 && classes.emptyMainGrid}>
      {children}
      {!loading && length === 0 && (
        <Box p={3} mt={3} className={classes.emptyContentTitle}>
          <Typography variant="h6" className={classes.emptyTitle}>
            {showEmptyMessage()}
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default EmptyState;
