import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import { Box, Card, Grid, Typography } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';

import { NAMESPACE_KEY as i18Habits } from '@/src/i18n/habits/i18n';
import { NAMESPACE_KEY as i18Global } from '@/src/i18n/globals/i18n';
import habitStyles from './styles.module';
import { useGetHabitsQuery } from '@/src/services/apiBFF';
import { HabitRow } from '@/src/containers/Habits/HabitRow';

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
  const { t } = useTranslation([i18Habits, i18Global]);

  const router = useRouter();
  const { habits_id: habitsId } = router.query;

  const [habit, setHabit] = useState<THabit>(initialState);
  const [drugs, setDrugs] = useState([]);
  const { data, isLoading } = useGetHabitsQuery();

  useEffect(() => {
    if (data) {
      setHabit(data[`${habitsId}`]);
      if (habitsId === 'drugs') {
        setDrugs(data[`${habitsId}`]);
      }
    }
  }, [habitsId, isLoading]);

  return (
    <Box className={classes.mainGrid}>
      <Box mx={4} className={classes.edit}>
        <EditIcon className={classes.editIcon} /> {t('label.edit', { ns: i18Global })}
      </Box>
      <Grid container>
        <Grid item xs={12}>
          <Box px={3} py={1}>
            <Box mb={2}>
              <Typography className={classes.typography16}>
                {t(`habits.${habitsId}`, { ns: i18Habits })}
              </Typography>
            </Box>
            {data && habitsId === 'drugs' ? (
              <>
                {drugs.map((habit, index) => (
                  <Card className={`${classes.cardHabits} ${classes.cardSpacing}`} key={index}>
                    <HabitRow title={t(`drug`, { ns: i18Habits })} content={habit.name} />
                    <HabitRow
                      title={t(`comments`, { ns: i18Habits })}
                      content={habit.observation}
                      hideDivider={true}
                    />
                  </Card>
                ))}
              </>
            ) : (
              <Card className={classes.cardHabits}>
                {data && (habitsId === 'alcoholism' || habitsId === 'smoking') && (
                  <HabitRow
                    title={t(`frequency_of_consumption`, { ns: i18Habits })}
                    content={habit.quantity}
                  />
                )}

                {data && (habitsId === 'alcoholism' || habitsId === 'smoking') && (
                  <HabitRow
                    title={t(`state_of_addiction`, { ns: i18Habits })}
                    content={habit.addictionStatus}
                  />
                )}

                {data && habitsId === 'physicalActivity' && (
                  <HabitRow
                    title={t(`physical_activity`, { ns: i18Habits })}
                    content={habit.type}
                  />
                )}
                {data && habitsId === 'physicalActivity' && (
                  <HabitRow title={t(`duration`, { ns: i18Habits })} content={habit.duration} />
                )}

                {data &&
                  (habitsId === 'alcoholism' ||
                    habitsId === 'smoking' ||
                    habitsId === 'physicalActivity') && (
                    <HabitRow title={t(`frequency`, { ns: i18Habits })} content={habit.frequency} />
                  )}

                {data && habitsId === 'physicalActivity' && (
                  <HabitRow
                    title={t(`details`, { ns: i18Habits })}
                    content={habit.details ? habit.details : t(`none`, { ns: i18Habits })}
                    hideDivider={true}
                  />
                )}

                {data && (habitsId === 'alcoholism' || habitsId === 'smoking') && (
                  <HabitRow
                    title={t(`i_want_to_stop_consuming`, { ns: i18Habits })}
                    content={habit.wantsToQuit ? 'Si' : 'No'}
                    hideDivider={true}
                  />
                )}
              </Card>
            )}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default HabitsDetail;
