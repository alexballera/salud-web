/// BASE IMPORTS
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
/// BASE IMPORTS

/// MATERIAL-UI
import { makeStyles, styled } from '@material-ui/core';
import MuiTypography from '@material-ui/core/Typography';
import MuiCircularProgress from '@material-ui/core/CircularProgress';
import Box from '@material-ui/core/Box';
import Grid from '@mui/material/Grid';
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
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    console.log('handle the fetch here');
    setIsLoading(true);
    setTimeout(() => {
      const result = FAKE_ITEMS.List.filter(
        result => result.specialty === searchOptions.searchField
      );
      setData(result);
      setIsLoading(false);
    }, 1000);
  }, [searchOptions]);

  return (
    <div>
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
          {!isLoading && data.length !== 0 && (
            <Typography variant="h1" className={classes.title}>
              {t('searchResults.title')}
            </Typography>
          )}
          {!isLoading &&
            data &&
            data.map((item, idx) => {
              return (
                <CardDoctorResult {...item} redirectTo={`${item.redirectTo}/${idx}`} key={idx} />
              );
            })}
          {!isLoading && data.length === 0 && (
            <Box my={3} ml={2}>
              <Typography variant="h4">Empty State</Typography>
            </Box>
          )}
        </Grid>
      </Grid>
    </div>
  );
}

export default MedicalDirectoryResultsPage;
