import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
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
import { NAMESPACE_KEY } from '../../../i18n/medicalDirectory/i18n';

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

function MedicalDirectoryResultsPage(): JSX.Element {
  const router = useRouter();
  const classes = useStyles();
  const { t } = useTranslation(NAMESPACE_KEY);
  const [searchOptions, setSearchOptions] = useState({ ...router.query });

  const { data, isLoading, refetch } = useGetDoctorsQuery({
    latitude: searchOptions.lat !== '' ? searchOptions.lat.toString() : '0',
    longitude: searchOptions.lng !== '' ? searchOptions.lng.toString() : '0',
    type: DoctorSearchType.general,
    detail: searchOptions.searchField.toString(),
    order: DoctorSearchOrder.distance,
    mode: DoctorSearchMode.presential
  });

  useEffect(() => {
    refetch();
  }, [searchOptions]);

  return (
    <EmptyState loading={isLoading} length={data?.doctors?.length || 0}>
      <Grid container>
        <Grid item xs={12}>
          <SearchNavbar setSearchOptions={setSearchOptions} searchOptions={searchOptions} />
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
        <Grid item xs={12} className={classes.results}>
          {!isLoading && data?.doctors?.length !== 0 && (
            <Typography variant="h1" className={classes.title}>
              {t('searchResults.title')}
            </Typography>
          )}
          {!isLoading &&
            data &&
            data?.doctors.map((item, idx) => {
              return <CardDoctorResult {...item} redirectTo={`/doctor_profile/${idx}`} key={idx} />;
            })}
        </Grid>
      </Grid>
    </EmptyState>
  );
}

export default withAppContext(MedicalDirectoryResultsPage);
