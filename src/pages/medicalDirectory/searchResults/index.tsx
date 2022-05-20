import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { makeStyles, styled } from '@material-ui/core';
import MuiTypography from '@material-ui/core/Typography';
import MuiCircularProgress from '@material-ui/core/CircularProgress';
import { Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { poppinsFontFamily, title2Color, secondaryMainColor } from '@/src/styles/js/theme';
import EmptyState from '@/src/components/common/EmptyState';
import { DoctorSearchMode, DoctorSearchOrder, DoctorSearchType } from '@/src/services/doctors.type';
import { useGetDoctorsQuery } from '@/src/services/apiBFF';
import CardDoctorResult from '../../../components/common/CardDoctorResult';
import SearchNavbar from '../../../components/single/searchNavbar';
import { withAppContext } from '../../../context';
import { NAMESPACE_KEY as i18nMedicalDirectory } from '../../../i18n/medicalDirectory/i18n';
import { NAMESPACE_KEY as i18Global } from '../../../i18n/globals/i18n';
import { searchOnFilter } from '@/src/store/slice/search.slice';

const Typography = styled(MuiTypography)({
  font: poppinsFontFamily,
  fontStyle: 'normal',
  fontWeight: 400
});

const CircularProgress = styled(MuiCircularProgress)({
  color: secondaryMainColor
});

const useStyles = makeStyles({
  results: {
    padding: 25,
    paddingTop: 0
  },
  title: {
    fontSize: 14,
    lineHeight: '157%',
    letterSpacing: '0.1px',
    color: title2Color,
    marginBottom: 16,
    marginTop: 24
  }
});

interface SearchState {
  placeName?: string;
  lat?: string;
  lng?: string;
  searchField?: string;
  order?: DoctorSearchOrder;
  range?: number;
  priceRange?: string;
}

function MedicalDirectoryResultsPage(): JSX.Element {
  const router = useRouter();
  const classes = useStyles();
  const { t } = useTranslation([i18Global, i18nMedicalDirectory]);
  const dispatch = useDispatch();

  const {
    searchField,
    lat,
    lng,
    placeName = 'Cerca de mi',
    order,
    range,
    priceRange
  } = router.query as SearchState;

  const { data, isLoading, isFetching } = useGetDoctorsQuery({
    latitude: lat !== '' ? lat : '0',
    longitude: lng !== '' ? lng : '0',
    type: DoctorSearchType.general,
    detail: searchField.toString(),
    order: order || DoctorSearchOrder.distance,
    mode: DoctorSearchMode.presential,
    range: range || 5000,
    priceRange: priceRange
  });

  const price =
    priceRange &&
    priceRange.split('-').map(str => {
      return Number(str);
    });

  useEffect(() => {
    dispatch(
      searchOnFilter({
        placeName: placeName || t('location.placeHolder', { ns: i18Global }),
        lat: lat !== '' ? lat : '0',
        lng: lng !== '' ? lng : '0',
        textFilter: searchField,
        priceRange: price
      })
    );
  }, []);

  return (
    <EmptyState loading={isLoading} length={data?.doctors?.length || 0} typeSearch="general">
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
        <Grid item xs={12} className={classes.results}>
          {!isLoading && data?.doctors && data?.doctors?.length !== 0 && (
            <Typography variant="h1" className={classes.title}>
              {t('searchResults.title', { ns: i18nMedicalDirectory })}
            </Typography>
          )}
          {!isLoading &&
            data?.doctors &&
            data?.doctors.map((item, idx) => {
              return <CardDoctorResult {...item} redirectTo={`/doctor_profile/${idx}`} key={idx} />;
            })}
        </Grid>
      </Grid>
    </EmptyState>
  );
}

export default withAppContext(MedicalDirectoryResultsPage);
