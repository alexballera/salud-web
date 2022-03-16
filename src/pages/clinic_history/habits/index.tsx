import React from 'react';
import Link from 'next/link';
import { Box, Card, Grid, Divider, Typography } from '@material-ui/core';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { useTranslation } from 'react-i18next';

import habitStyles from './styles.module';
import { NAMESPACE_KEY as i18Habits } from '@/src/i18n/habits/i18n';
import { useGetHabitsQuery } from '../../../services/apiBFF';

type THabits = {
  name: string;
  frequencyOfConsumption: string;
};

type TProps = {
  habits: THabits[];
};
/// / TYPES END

const Habits = ({ habits }: TProps): JSX.Element => {
  const classes = habitStyles();
  const { t } = useTranslation(i18Habits);

  const { data } = useGetHabitsQuery();
  console.log(data);

  return (
    <>
      <Grid container>
        <Grid item xs={12}>
          {habits.map((habit, index) => (
            <Box px={3} my={3} key={index}>
              <Card className={classes.cardHabits}>
                {habit.frequencyOfConsumption ? (
                  <Link href={`/clinic_history/habits/${habit.name}`} passHref>
                    <Box component="span" className={classes.cardContentLink}>
                      <Typography paragraph color="secondary" className={classes.typography16}>
                        {habit.name}
                      </Typography>
                      <ChevronRightIcon color="secondary" />
                    </Box>
                  </Link>
                ) : (
                  <Box component="span" className={classes.cardContentLink}>
                    <Typography paragraph color="secondary" className={classes.typography16}>
                      {habit.name}
                    </Typography>
                    <ChevronRightIcon color="secondary" />
                  </Box>
                )}
                <Divider />
                <Box mt={2}>
                  {habit.name === 'Drogas' && habit.frequencyOfConsumption === '' ? (
                    <Typography variant="body2" className={classes.typography14}>
                      {habit.frequencyOfConsumption
                        ? habit.frequencyOfConsumption
                        : t('without_consumption', { ns: i18Habits })}
                    </Typography>
                  ) : (
                    <Typography variant="body2" className={classes.typography14}>
                      {habit.frequencyOfConsumption
                        ? habit.frequencyOfConsumption
                        : t('not_assigned', { ns: i18Habits })}
                    </Typography>
                  )}
                </Box>
              </Card>
            </Box>
          ))}
        </Grid>
      </Grid>
    </>
  );
};

Habits.getInitialProps = async () => {
  const habits: THabits[] = [
    {
      name: 'Actividad física',
      frequencyOfConsumption: 'Parcial'
    },
    {
      name: 'Alcoholismo',
      frequencyOfConsumption: 'Consumo parcial'
    },
    {
      name: 'Tabaquismo',
      frequencyOfConsumption: ''
    },
    {
      name: 'Drogas',
      frequencyOfConsumption: ''
    }
  ];
  return {
    habits
  };
};

export default Habits;
