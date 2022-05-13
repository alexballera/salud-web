import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Grid, styled } from '@material-ui/core';
import { useSelector } from '@/src/store';
import { useDispatch } from 'react-redux';
import MuiCircularProgress from '@material-ui/core/CircularProgress';

import { NAMESPACE_KEY as i18Habits } from '@/src/i18n/habits/i18n';
import { useGetHabitsQuery } from '../../../services/apiBFF';
import CardSimple from '@/src/components/common/CardSimple';

import api from '../../../api/api';
import { notificationClean } from '../../../store/slice/notification.slice';
import { secondaryMainColor } from '@/src/styles/js/theme';

const CircularProgress = styled(MuiCircularProgress)({
  color: secondaryMainColor
});

const Habits = (): JSX.Element => {
  const { t } = useTranslation(i18Habits);

  const [idNotification, setIdNotification] = useState('');
  const [spinner, setSpinner] = useState(false);
  const { id, message } = useSelector(state => state.notification);
  const dispatch = useDispatch();

  let { data, refetch, isLoading } = useGetHabitsQuery();

  useEffect(() => {
    if (data?.token) {
      setIdNotification(data.token);
      api.realTime(data.token);
      setSpinner(true);
    }
  }, [data]);

  useEffect(() => {
    if (id === idNotification) {
      if (message === 'FULFILLED') {
        refetch();
      } else {
        data = {
          ...data,
          drugs: []
        };
      }

      setSpinner(false);
      dispatch(notificationClean());
    }
  }, [id, message]);

  if (isLoading || spinner) {
    return (
      <Grid container>
        <Grid item xs={12}>
          <Box px={3} py={3}>
            <Grid container direction="column" justify="center" alignItems="center">
              <CircularProgress color="inherit" />
            </Grid>
          </Box>
        </Grid>
      </Grid>
    );
  }

  const listDrugs = drugs => {
    const drugsNames = drugs && drugs.map(drug => `<p>${drug.name ? drug.name : ''}</p>`).join('');
    return drugsNames;
  };

  return (
    <>
      <Grid container>
        <Grid item xs={12}>
          {data && (
            <Box px={3} my={3}>
              {data.physicalActivity && (
                <CardSimple
                  title={t('habits.physicalActivity', { ns: i18Habits })}
                  content={
                    data.physicalActivity.frequency
                      ? data.physicalActivity.frequency
                      : t('not_assigned', { ns: i18Habits })
                  }
                  href={data.physicalActivity.id ? '/clinic_history/habits/physicalActivity' : ''}
                />
              )}
              {data.alcoholism && (
                <CardSimple
                  title={t('habits.alcoholism', { ns: i18Habits })}
                  content={
                    data.alcoholism.frequency
                      ? data.alcoholism.frequency
                      : t('not_assigned', { ns: i18Habits })
                  }
                  href={data.alcoholism.id ? '/clinic_history/habits/alcoholism' : ''}
                />
              )}
              {data.smoking && (
                <CardSimple
                  title={t('habits.smoking', { ns: i18Habits })}
                  content={
                    data.smoking.frequency
                      ? data.smoking.frequency
                      : t('not_assigned', { ns: i18Habits })
                  }
                  href={data.smoking.id ? '/clinic_history/habits/smoking' : ''}
                />
              )}
              {data.drugs && (
                <CardSimple
                  title={t('habits.drugs', { ns: i18Habits })}
                  content={
                    data.drugs ? listDrugs(data.drugs) : t('without_consumption', { ns: i18Habits })
                  }
                  href={data.smoking.id ? '/clinic_history/habits/drugs' : ''}
                />
              )}
            </Box>
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default Habits;
