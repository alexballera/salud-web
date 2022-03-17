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
    console.log(drugsNames);
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
                  title="Actividad física"
                  content={
                    data.physicalActivity.frequency
                      ? data.physicalActivity.frequency
                      : t('not_assigned', { ns: i18Habits })
                  }
                  href={''}
                />
              )}
              {data.alcoholism && (
                <CardSimple
                  title="Alcoholismo"
                  content={
                    data.alcoholism.frequency
                      ? data.alcoholism.frequency
                      : t('not_assigned', { ns: i18Habits })
                  }
                  href={''}
                />
              )}
              {data.smoking && (
                <CardSimple
                  title="Tabaquismo"
                  content={
                    data.smoking.frequency
                      ? data.smoking.frequency
                      : t('not_assigned', { ns: i18Habits })
                  }
                  href={''}
                />
              )}
              {data.drugs && (
                <CardSimple
                  title="Tabaquismo"
                  content={
                    listDrugs(data.drugs)
                    /* data.smoking.frequency
                      ? data.smoking.frequency
                      : t('not_assigned', { ns: i18Habits }) */
                  }
                  href={''}
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
