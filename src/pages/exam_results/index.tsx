/// BASE IMPORTS
import React, { useEffect, useState } from 'react';
/// BASE IMPORTS

/// i18n
import { useTranslation, withTranslation } from 'react-i18next';
import { NAMESPACE_KEY as i18ExamResult } from '@/src/i18n/clinic_history/i18n';
import { NAMESPACE_KEY as i18Forms } from '@/src/i18n/forms/i18n';
import { NAMESPACE_KEY as i18nGlobal } from '@/src/i18n/globals/i18n';

/// i18n END

/// MUI COMPONENTS
/// MUI COMPONENTS END

/// OWN COMPONENTS
import { withAppContext } from '@/src/context';
import TabComponent from '@/src/components/common/TabComponent';
import CardComponent from '@/src/components/common/CardComponent';
import {
  getExamResultsByYear,
  mockData,
  TExamResultsGroup,
  TGeneralData
} from '@/src/services/getExamResultsData.service';
import { TPersonalDataProps } from '@/src/containers/SignUp/index.types';
import YearSlider from '@/src/components/common/YearSlider';
import { Box, CircularProgress, Grid, Typography } from '@mui/material';
/// OWN COMPONENTS END

/// STYLES
/// STYLES END

const ExamResult = ({ handleNotifications }: TPersonalDataProps): JSX.Element => {
  const { t } = useTranslation([i18ExamResult, i18Forms, i18nGlobal]);
  const [patientData, setPatientData] = useState<TGeneralData | TExamResultsGroup>(mockData);
  const i18nPopUpError = t('message.error.general_fetch', { ns: i18Forms });
  const [loading, setLoading] = useState(false);
  const [selectedYear, setSelectedYear] = useState<null | number>(null);
  const [examResultsGroups, setExamResultsGroups] = useState<TExamResultsGroup>([]);

  const handleClick = () => {
    console.log('Click en el padre');
  };

  /*   const tabContentData = [
    {
      label: '2022',
      content: (
        <CardComponent
          type="Type"
          name="Name"
          date="2021-01-24T00:00:00.000Z"
          performer="Performer"
          callToAction={handleClick}
        />
      )
    },
    {
      label: '2021',
      content: (
        <CardComponent
          type="Type"
          name="Name"
          date="2021-02-24T00:00:00.000Z"
          performer="Performer"
          callToAction={handleClick}
        />
      )
    },
    {
      label: '2020',
      content: (
        <CardComponent
          type="Type"
          name="Name"
          date="2021-01-24T00:00:00.000Z"
          performer="Performer"
          callToAction={handleClick}
        />
      )
    },
    {
      label: '2019',
      content: (
        <CardComponent
          type="Type"
          name="Name"
          date="2021-01-24T00:00:00.000Z"
          performer="Performer"
          callToAction={handleClick}
        />
      )
    },
    {
      label: '2018',
      content: (
        <CardComponent
          type="Type"
          name="Name"
          date="2021-01-24T00:00:00.000Z"
          performer="Performer"
          callToAction={handleClick}
        />
      )
    },
    {
      label: '2017',
      content: (
        <CardComponent
          type="Type"
          name="Name"
          date="2021-01-24T00:00:00.000Z"
          performer="Performer"
          callToAction={handleClick}
        />
      )
    }
  ]; */

  /* const fetchPatientData = () => {
    // TODO CONECTAR CON API REAL
    getExamResultsByYear(2021)
      .then(res => {
        setPatientData(res);
      })
      .catch(err => {
        console.log(err);
        handleNotifications({ open: true, message: i18nPopUpError, severity: 'error' });
      });
  };
  useEffect(() => {
    fetchPatientData();
  }, []); */

  useEffect(() => {
    if (selectedYear) {
      setLoading(true);
      getExamResultsByYear(selectedYear)
        .then(result => {
          setExamResultsGroups(result);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [selectedYear]);

  return (
    <Grid container>
      <Grid item xs={12}>
        <Box>
          <YearSlider
            disabled={loading}
            itemClick={item => {
              setSelectedYear(item);
            }}
          />
        </Box>
        <Box>
          {loading && (
            <Box mt={6}>
              <Grid
                container
                item
                xs={12}
                direction="column"
                justifyContent="center"
                alignItems="center"
              >
                <CircularProgress color="inherit" />
              </Grid>
            </Box>
          )}

          {/* <SwipeableViews
            axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
            index={value}
            onChangeIndex={handleChangeIndex}
          >
            {years.map((tab, i) => (
              <TabPanel key={tab} value={value} index={i} dir={theme.direction}>
                {tab}
              </TabPanel>
            ))}
          </SwipeableViews> */}

          {!loading && !examResultsGroups.length && (
            <Box mt={4}>
              <Typography>No se encuentra</Typography>
            </Box>
          )}

          {!loading &&
            examResultsGroups.map((group, i) => (
              // Group items by month
              <Box key={i}>
                <Typography>{t(`months.${group.month}`, { ns: i18nGlobal })}</Typography>
                {group.items.map((item, i) => {
                  return (
                    <Box mb={2} key={`${item.userId}-${i}`}>
                      <CardComponent
                        type={item.type}
                        name={item.name}
                        date={item.date}
                        performer={item.performer}
                        callToAction={handleClick}
                      />
                    </Box>
                  );
                })}
              </Box>
            ))}
        </Box>
      </Grid>
    </Grid>
  );
};

export default withTranslation(i18ExamResult)(withAppContext(ExamResult));
