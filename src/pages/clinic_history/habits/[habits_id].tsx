import React from 'react';
import { Box, Card, Grid, Divider } from '@material-ui/core';

import habitStyles from './styles.module';
import { useGetHabitsQuery } from '../../../services/apiBFF';

const HabitsDetail = (): JSX.Element => {
  const classes = habitStyles();

  const { data } = useGetHabitsQuery();
  console.log(data);

  return (
    <Grid container className={classes.mainGrid}>
      <Grid item xs={12}>
        <Box mt={2} px={3} py={3}>
          <Box mb={2}>okokok</Box>
          <Card className={classes.cardHabits}>
            HOLA
            <Divider />
          </Card>
        </Box>
      </Grid>
    </Grid>
  );
};

HabitsDetail.getInitialProps = async () => {
  return [];
};
export default HabitsDetail;
