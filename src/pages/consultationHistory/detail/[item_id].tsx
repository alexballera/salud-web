/// BASE
import React from 'react';
/// BASE END

/// OWN COMPONENTS
/// OWN COMPONENTS END

/// i18n
import { useTranslation } from 'react-i18next';
import { NAMESPACE_KEY as i18nClinic } from '@/src/i18n/clinic_history/i18n';
/// i18n END

/// MATERIAL UI
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
/// MATERIAL UI END

/// STYLES
import { background3Color, title2Color, title3Color } from '@/src/styles/js/theme';
import muiTheme from '@/src/styles/js/muiTheme';
import { useGetConsultationHistoryByIdQuery } from '@/src/services/apiBFF';
import { useRouter } from 'next/router';
/// STYLES END

const items = [
  {
    userId: '623a34d8ef9e97ce33a3',
    consultations: [
      {
        medicalConsultationId: 'f942014b-8eab-47c3-9ee0-ef3972b71ce8',
        month: 'Marzo',
        name: 'Cita Psicólogo',
        doctor: 'Dr. Allan Brito',
        reason: 'Presenta ansiedad',
        healthSite: 'Hospital Rafael Ángel Calderón Guardia',
        date: '2022-03-26T00:55:19.596Z'
      },
      {
        medicalConsultationId: '53828014-c02f-4aaa-ba51-a47734fb54ca',
        month: 'Marzo',
        name: 'Cita Cardiólogo',
        doctor: 'Dr. Armando Casas',
        reason: 'Revisión corazón',
        healthSite: 'Hospital Rafael Ángel Calderón Guardia',
        date: '2022-03-24T00:55:19.596Z'
      }
    ]
  }
];

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

const ListItemCustom = (props: TListItem): JSX.Element => {
  const { label, value, divider } = props;
  return (
    <>
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
    </>
  );
};

const CardCustom = (props: TConsultations): JSX.Element => {
  const { name, reason, healthSite, doctor } = props;
  const { t } = useTranslation(i18nClinic);
  const router = useRouter();
  const { item_id: medicalConsultationId } = router.query;
  const { data } = useGetConsultationHistoryByIdQuery({
    userId: '53828014-c02f-4aaa-ba51-a47734fb34yg',
    medicalConsultationId: medicalConsultationId as string,
    year: '2022'
  });
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
  return (
    <ThemeProvider theme={muiTheme}>
      <Box p={3} sx={{ backgroundColor: background3Color, height: '100%' }}>
        <Typography
          variant="body1"
          sx={{ fontWeight: 400, fontSize: 16, lineHeight: '150%', mb: 2 }}
        >
          {t('consultation.title')}
        </Typography>
        {items.map(item => (
          <React.Fragment key={item.userId}>
            {item.consultations.map(
              ({ name, reason, healthSite, doctor, medicalConsultationId }: TConsultations) => (
                <React.Fragment key={medicalConsultationId}>
                  <CardCustom name={name} reason={reason} healthSite={healthSite} doctor={doctor} />
                </React.Fragment>
              )
            )}
          </React.Fragment>
        ))}
      </Box>
    </ThemeProvider>
  );
}

export default ConsultationHistoryDetailPage;
