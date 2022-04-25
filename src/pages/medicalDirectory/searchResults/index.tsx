/// BASE IMPORTS
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
/// BASE IMPORTS

/// MATERIAL-UI
import { makeStyles, styled } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import MuiTypography from '@material-ui/core/Typography';
import MuiCircularProgress from '@material-ui/core/CircularProgress';
import Box from '@material-ui/core/Box';
/// MATERIAL-UI END

/// OWN COMPONENTS
import CardDoctorResult from '../../../components/common/CardDoctorResult';
import SearchNavbar from '../../../components/single/searchNavbar';
/// OWN COMPONENTS END

/// i18n
import { useTranslation } from 'react-i18next';
import { NAMESPACE_KEY } from '../../../i18n/medicalDirectory/i18n';
/// i18n END

/// DUMMY DATA
import FAKE_ITEMS from './data.json';
import { poppinsFontFamily, title2Color, secondaryMainColor } from '@/src/styles/js/theme';
/// DUMMY DATA END

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

  useEffect(() => {
    console.log('handle the fetch here');
  }, [searchOptions]);

  return (
    <div>
      <Grid container>
        <Grid item xs={12}>
          <SearchNavbar setSearchOptions={setSearchOptions} searchOptions={searchOptions} />
        </Grid>
        <Grid item xs={12} className={classes.results}>
          <Typography variant="h1" className={classes.title}>
            {t('searchResults.title')}
          </Typography>
          {/* <Box mt={6} mb={6}>
            <Grid container direction="column" justify="center" alignItems="center">
              <CircularProgress color="inherit" />
            </Grid>
          </Box> */}
          {FAKE_ITEMS.List.map((item, idx) => {
            return (
              <CardDoctorResult {...item} redirectTo={`${item.redirectTo}/${idx}`} key={idx} />
            );
          })}
        </Grid>
      </Grid>
    </div>
  );
}

export default MedicalDirectoryResultsPage;
