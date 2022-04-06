/// BASE
import React from 'react';
import { useRouter } from 'next/router';
/// BASE END

/// OWN COMPONENTS
import LoadingCircular from '@/src/components/common/LoadingCircular';
/// OWN COMPONENTS END

/// i18n
import { useTranslation } from 'react-i18next';
import { NAMESPACE_KEY as i18nClinic } from '@/src/i18n/clinic_history/i18n';
/// i18n END

/// MUI
import {
  Box,
  List,
  ListItem,
  ListItemText,
  Paper,
  Stack,
  ThemeProvider,
  Typography
} from '@mui/material';
/// MUI END

/// SERVICES
import { useGetConsultationHistoryByIdQuery } from '@/src/services/apiBFF';
/// SERVICES END

/// STYLES
import { background3Color, title2Color, title3Color } from '@/src/styles/js/theme';
import muiTheme from '@/src/styles/js/muiTheme';
/// STYLES END

/// TYPES
type TListItem = {
  label: string;
  value: string;
  divider?: boolean;
};

type TConsultations = {
  medicalConsultationId?: string;
  month?: string;
  name: string;
  doctor: string;
  reason: string;
  healthSite: string;
  date?: string;
};
/// TYPES END

const ListItemCustom = (props: TListItem): JSX.Element => {
  const { label, value, divider } = props;
  return (
    <ListItem sx={{ py: 2 }} divider={divider}>
      <Stack direction="column">
        <ListItemText sx={{ my: 0 }}>
          <Typography
            variant="body2"
            sx={{
              color: title3Color,
              fontWeight: 400,
              fontSize: 14,
              lineHeight: '143%'
            }}
          >
            {label}
          </Typography>
        </ListItemText>
        <ListItemText sx={{ my: 0 }}>
          <Typography
            sx={{
              color: title2Color,
              fontWeight: 400,
              fontSize: 14,
              lineHeight: '143%'
            }}
          >
            {value}
          </Typography>
        </ListItemText>
      </Stack>
    </ListItem>
  );
};

const CardCustom = (props: TConsultations): JSX.Element => {
  const { name, reason, healthSite, doctor } = props;
  const { t } = useTranslation(i18nClinic);
  return (
    <Paper elevation={0} sx={{ borderRadius: 2, mb: 2 }}>
      <Box px={2}>
        <List sx={{ py: 1 }}>
          <ListItemCustom label={t('consultation.type')} value={name} divider={true} />

          <ListItemCustom label={t('consultation.reason')} value={reason} divider={true} />

          <ListItemCustom
            label={t('consultation.establishment')}
            value={healthSite}
            divider={true}
          />

          <ListItemCustom label={t('consultation.specialist')} value={doctor} />
        </List>
      </Box>
    </Paper>
  );
};

function ConsultationHistoryDetailPage(): JSX.Element {
  const { t } = useTranslation(i18nClinic);
  const router = useRouter();
  const { slug } = router.query;
  const { data: consult, isLoading } = useGetConsultationHistoryByIdQuery({
    userId: slug[0],
    medicalConsultationId: slug[0],
    year: slug[1]
  });

  if (isLoading) {
    return <LoadingCircular />;
  }
  return (
    <ThemeProvider theme={muiTheme}>
      <Box p={3} sx={{ backgroundColor: background3Color, height: '100%' }}>
        <Typography
          variant="body1"
          sx={{ fontWeight: 400, fontSize: 16, lineHeight: '150%', mb: 2 }}
        >
          {t('consultation.title')}
        </Typography>
        {consult && (
          <CardCustom
            name={consult.name}
            reason={consult.reason}
            healthSite={consult.healthSite}
            doctor={consult.doctor}
          />
        )}
      </Box>
    </ThemeProvider>
  );
}

export default ConsultationHistoryDetailPage;
