import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Grid from '@mui/material/Grid';
import doctorResultsStyles from './styles.module';
import CardDoctorResult from '../../../../components/common/CardDoctorResult';

import { useTranslation } from 'react-i18next';
import { NAMESPACE_KEY } from '../../../../i18n/medicalDirectory/i18n';

import FAKE_ITEMS from './data.json';
import SearchNavbarDoctor from '../../../../components/single/searchNavbarDoctor';
import { Box, Typography, CircularProgress, ThemeProvider } from '@mui/material';
import muiTheme from '@/src/styles/js/muiTheme';

const doctorResults = (): JSX.Element => {
  const classes = doctorResultsStyles();
  const router = useRouter();
  const { t } = useTranslation(NAMESPACE_KEY);
  const [searchOptions, setSearchOptions] = useState({ ...router.query });
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    console.log('handle the fetch here');
    setIsLoading(true);
    setTimeout(() => {
      const result = FAKE_ITEMS.List.filter(result => result.title === searchOptions.searchField);
      setData(result);
      setIsLoading(false);
    }, 1000);
  }, [searchOptions]);

  return (
    <ThemeProvider theme={muiTheme}>
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
          {!isLoading && data.length !== 0 && (
            <Typography variant="subtitle2" className={classes.subTitle}>
              {t('searchResults.title')}
            </Typography>
          )}
        </Grid>
        <Grid item xs={12} m={3}>
          {!isLoading &&
            data &&
            data.map((item, idx) => {
              return (
                <CardDoctorResult {...item} redirectTo={`${item.redirectTo}/${idx}`} key={idx} />
              );
            })}
          {!isLoading && data.length === 0 && (
            <Box my={3} ml={2}>
              <Typography variant="h4" className={classes.subTitle}>
                Empty State
              </Typography>
            </Box>
          )}
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default doctorResults;
