import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Grid from '@mui/material/Grid';
import doctorResultsStyles from './styles.module';
import CardDoctorResult from '../../../../components/common/CardDoctorResult';

import { useTranslation } from 'react-i18next';
import { NAMESPACE_KEY } from '../../../../i18n/medicalDirectory/i18n';

import FAKE_ITEMS from './data.json';
import SearchNavbarDoctor from '../../../../components/single/searchNavbarDoctor';
import { Typography } from '@mui/material';

const doctorResults = (): JSX.Element => {
  const classes = doctorResultsStyles();
  const router = useRouter();
  const { t } = useTranslation(NAMESPACE_KEY);
  const [searchOptions, setSearchOptions] = useState({ ...router.query });

  useEffect(() => {
    console.log('handle the fetch here');
  }, [searchOptions]);

  return (
    <>
      <Grid container>
        <Grid item xs={12}>
          <SearchNavbarDoctor setSearchOptions={setSearchOptions} searchOptions={searchOptions} />
        </Grid>
        <Grid item xs={12} mx={3} mt={3}>
          <Typography variant="subtitle2" className={classes.subTitle}>
            {t('searchResults.title')}
          </Typography>
        </Grid>
        <Grid item xs={12} m={3}>
          {FAKE_ITEMS.List.map((item, idx) => {
            return (
              <CardDoctorResult {...item} redirectTo={`${item.redirectTo}/${idx}`} key={idx} />
            );
          })}
        </Grid>
      </Grid>
    </>
  );
};

export default doctorResults;
