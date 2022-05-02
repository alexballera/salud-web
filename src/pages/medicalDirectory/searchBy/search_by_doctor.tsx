// BASE IMPORTS
import React, { useState } from 'react';
import { useRouter } from 'next/router';
// BASE IMPORTS END

// MUI
import {
  Box,
  CircularProgress,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Stack,
  ThemeProvider,
  Typography
} from '@mui/material';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
// MUI END

// OWN COMPONENTS
import SvgDoctors from '@/src/components/common/Svg/SvgDoctors.component';
// OWN COMPONENTS END

// STYLES
import { titlePageColor } from '@/src/styles/js/theme';
import muiTheme from '@/src/styles/js/muiTheme';
import { examStyles } from '@/src/containers/ExamResult/styles.module';
// STYLES END

/// i18n
import { useTranslation } from 'react-i18next';
import { NAMESPACE_KEY as i18ClinicHistory } from '@/src/i18n/clinic_history/i18n';
import { NAMESPACE_KEY as i18nMedicalDirectory } from '@/src/i18n/medicalDirectory/i18n';

import InputSearch from '@/src/components/common/InputSearch';
/// i18n END
import { useGetSearchHistoryQuery } from '@/src/services/apiBFF';

const SearchByDoctor = (): JSX.Element => {
  const { t } = useTranslation([i18nMedicalDirectory, i18ClinicHistory]);
  const classes = examStyles();
  const router = useRouter();
  const { data, isLoading } = useGetSearchHistoryQuery();
  const [search, setSearch] = useState({});

  const handleClick = (doctor): void => {
    router.push(`/doctor_profile/${doctor.doctorId}`);
  };

  const ListItemDoctors = (doctor, index): JSX.Element => (
    <React.Fragment key={index}>
      <ListItem button onClick={() => handleClick(doctor)} sx={{ pl: 1 }}>
        <ListItemText
          primary={
            <Typography
              sx={{
                display: 'block',
                color: '#455255',
                fontWeight: 400,
                fontSize: 14,
                lineHeight: '143%'
              }}
              component="span"
              variant="body2"
              color="text.primary"
            >
              {doctor.doctorName}
            </Typography>
          }
        />
        <ListItemSecondaryAction>
          <IconButton edge="end" aria-label={doctor.doctorName} onClick={() => handleClick(doctor)}>
            <ChevronRightIcon color="secondary" />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    </React.Fragment>
  );

  return (
    <ThemeProvider theme={muiTheme}>
      <Box p={3}>
        <Stack direction="row" alignItems="center" spacing={2}>
          <SvgDoctors width={24} heigth={24} />
          <Typography
            sx={{ fontWeight: 500, fontSize: 20, lineHeight: '160%', color: titlePageColor }}
          >
            {t('searchBySection.doctors', { ns: i18nMedicalDirectory })}
          </Typography>
        </Stack>
        <Box mt={3}>
          <InputSearch
            searchObject={setSearch}
            labelText={t('items.labelSearch', { ns: i18nMedicalDirectory })}
            placeHolderText={t('searchDoctor.placeholderSearch', { ns: i18nMedicalDirectory })}
            path="/medicalDirectory/searchBy/doctorResults"
          />
        </Box>

        <Box mt={2}>
          <List className={classes.root} aria-label="clinic history folders">
            {isLoading && (
              <Grid
                container
                item
                xs={12}
                direction="column"
                justifyContent="center"
                alignItems="center"
                sx={{ paddingTop: '10%' }}
              >
                <CircularProgress color="secondary" />
              </Grid>
            )}
            {!isLoading && !data.searches?.length && (
              <Typography variant="caption" className={classes.noRecords}>
                {t('doctors.no_records', { ns: i18ClinicHistory })}
              </Typography>
            )}
            {!isLoading && data.searches?.map((item, index) => ListItemDoctors(item, index))}
          </List>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default SearchByDoctor;
