import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Grid from '@mui/material/Grid';
import doctorResultsStyles from './styles.module';
import CardDoctorResult from '../../../../components/common/CardDoctorResult';

import { useTranslation } from 'react-i18next';
import { NAMESPACE_KEY } from '../../../../i18n/medicalDirectory/i18n';
import { withAppContext } from '../../../../context';

import SearchNavbarDoctor from '../../../../components/single/searchNavbarDoctor';
import { Typography, CircularProgress, ThemeProvider } from '@mui/material';
import muiTheme from '@/src/styles/js/muiTheme';
import EmptyState from '@/src/components/common/EmptyState';
import { useGetDoctorsQuery } from '@/src/services/apiBFF';
import { DoctorSearchMode, DoctorSearchOrder, DoctorSearchType } from '@/src/services/doctors.type';

const doctorResults = (): JSX.Element => {
  const classes = doctorResultsStyles();
  const router = useRouter();
  const { t } = useTranslation(NAMESPACE_KEY);
  const [searchOptions, setSearchOptions] = useState({ ...router.query });

  const { data, isLoading, refetch } = useGetDoctorsQuery({
    latitude: '0',
    longitude: '0',
    detail: searchOptions.searchField.toString(),
    type: DoctorSearchType.general,
    order: DoctorSearchOrder.available,
    mode: DoctorSearchMode.presential
  });

  useEffect(() => {
    refetch();
  }, [searchOptions]);

  return (
    <ThemeProvider theme={muiTheme}>
      <EmptyState loading={isLoading} length={data?.doctors?.length || 0}>
        <Grid container>
          <Grid item xs={12}>
            <SearchNavbarDoctor setSearchOptions={setSearchOptions} searchOptions={searchOptions} />
          </Grid>
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
          <Grid item xs={12} mx={3} mt={3}>
            {!isLoading && data?.doctors?.length !== 0 && (
              <Typography variant="subtitle2" className={classes.subTitle}>
                {t('searchResults.title')}
              </Typography>
            )}
          </Grid>
          <Grid item xs={12} m={3}>
            {!isLoading &&
              data &&
              data.doctors.map((item, idx) => {
                return (
                  <CardDoctorResult {...item} redirectTo={`/doctor_profile/${idx}`} key={idx} />
                );
              })}
          </Grid>
        </Grid>
      </EmptyState>
    </ThemeProvider>
  );
};

export default withAppContext(doctorResults);
