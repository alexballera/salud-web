import React from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Grid } from '@material-ui/core';

import { NAMESPACE_KEY as i18Habits } from '@/src/i18n/habits/i18n';
import { useGetHabitsQuery } from '../../../services/apiBFF';
import CardSimple from '@/src/components/common/CardSimple';

const Habits = (): JSX.Element => {
  const { t } = useTranslation(i18Habits);

  const { data } = useGetHabitsQuery();

  // `/clinic_history/habits/${data.physicalActivity}`

  /**
   * {habit.frequencyOfConsumption
      ? habit.frequencyOfConsumption
      : t('without_consumption', { ns: i18Habits })}
   */

  const listDrugs = drugs => {
    const drugsNames = drugs.map(drug => `<p>${drug.name ? drug.name : ''}</p>`).join('');
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
                  title={t('habits.physical_activity', { ns: i18Habits })}
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
