import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Box, Card, Grid, Divider } from '@material-ui/core';

import habitStyles from './styles.module';
import { useGetHabitsQuery } from '../../../services/apiBFF';

type THabit = {
  id: string;
  status?: boolean;
  addictionStatus?: string;
  passive?: boolean;
  quantity?: string;
  frequency?: string;
  period?: string;
  wantsToQuit?: boolean;
  type?: string;
  duration?: string;
  details?: string;
};

const initialState = {
  id: '',
  status: null,
  addictionStatus: '',
  passive: null,
  quantity: '',
  frequency: '',
  period: '',
  wantsToQuit: null,
  type: '',
  duration: '',
  details: ''
};

const HabitsDetail = (): JSX.Element => {
  const classes = habitStyles();

  const router = useRouter();
  const { habit_id: id } = router.query;

  const [habit, setHabit] = useState<THabit>(initialState);
  const { data, isLoading } = useGetHabitsQuery();

  useEffect(() => {
    if (data) {
      console.log('id: ', id);
      // console.log(data[id]);
      // setHabit();
    }
  }, [id]);

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

export default HabitsDetail;
