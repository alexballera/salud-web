import { useDispatch } from 'react-redux';
import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import Grid from '@mui/material/Grid';
import specialtyResultsStyles from './styles.module';
import CardDoctorResult from '../../../../components/common/CardDoctorResult';

import { useTranslation } from 'react-i18next';
import { NAMESPACE_KEY as i18nMedicalDirectory } from '../../../../i18n/medicalDirectory/i18n';
import { NAMESPACE_KEY as i18Global } from '../../../../i18n/globals/i18n';
import { withAppContext } from '../../../../context';

import { Typography, CircularProgress, ThemeProvider } from '@mui/material';
import muiTheme from '@/src/styles/js/muiTheme';
import EmptyState from '@/src/components/common/EmptyState';
import SearchNavbar from '@/src/components/single/searchNavbar';
import { useGetDoctorsQuery } from '@/src/services/apiBFF';
import { DoctorSearchMode, DoctorSearchOrder, DoctorSearchType } from '@/src/services/doctors.type';

import { searchOnFilter } from '@/src/store/slice/search.slice';

interface SearchState {
  placeName?: string;
  lat?: string;
  lng?: string;
  searchField?: string;
  order?: DoctorSearchOrder;
  range?: number;
}

const specialtyResults = (): JSX.Element => {
  const classes = specialtyResultsStyles();
  const router = useRouter();
  const { t } = useTranslation([i18Global, i18nMedicalDirectory]);
  const dispatch = useDispatch();

  const {
    searchField,
    lat,
    lng,
    placeName = 'Cerca de mi',
    order,
    range
  } = router.query as SearchState;

  const { data, isLoading, isFetching } = useGetDoctorsQuery({
    latitude: lat !== '' ? lat : '0',
    longitude: lng !== '' ? lng : '0',
    type: DoctorSearchType.speciality,
    detail: searchField.toString(),
    order: order || DoctorSearchOrder.distance,
    mode: DoctorSearchMode.presential,
    range: range
  });

  useEffect(() => {
    dispatch(
      searchOnFilter({
        placeName: placeName || t('location.placeHolder', { ns: i18Global }),
        lat: lat !== '' ? lat : '0',
        lng: lng !== '' ? lng : '0',
        textFilter: searchField,
        order,
        range
      })
    );
  }, []);

  return (
    <ThemeProvider theme={muiTheme}>
      <EmptyState loading={isLoading} length={data?.doctors?.length || 0}>
        <Grid container>
          <Grid item xs={12}>
            <SearchNavbar />
          </Grid>
          {(isLoading || isFetching) && (
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
                {t('searchResults.title', { ns: i18nMedicalDirectory })}
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

export default withAppContext(specialtyResults);
