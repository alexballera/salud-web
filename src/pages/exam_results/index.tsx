/// BASE IMPORTS
import React, { useEffect, useState } from 'react';
/// BASE IMPORTS

/// i18n
import { useTranslation } from 'react-i18next';
import { NAMESPACE_KEY as i18Recipes } from '@/src/i18n/recipes_and_prescriptions/i18n';
import { NAMESPACE_KEY as i18Forms } from '@/src/i18n/forms/i18n';
import { NAMESPACE_KEY as i18nGlobal } from '@/src/i18n/globals/i18n';
/// i18n END

/// MUI COMPONENTS
import { Box, CircularProgress, Grid, Typography } from '@mui/material';
/// MUI COMPONENTS END

/// OWN COMPONENTS
import CardComponent from '@/src/components/common/CardComponent';
import { getExamResultsByYear, TExamResultsGroup } from '@/src/services/getExamResultsData.service';
import YearSlider from '@/src/components/common/YearSlider';
/// OWN COMPONENTS END

/// STYLES
import { examStyles } from '@/src/containers/ExamResult/styles.module';
import { title2Color } from '@/src/styles/js/theme';
import { ThemeProvider } from '@mui/material/styles';
import muiTheme from '@/src/styles/js/muiTheme';
/// STYLES END

const ExamResult = (): JSX.Element => {
  const { t } = useTranslation([i18Recipes, i18Forms, i18nGlobal]);
  const classes = examStyles();
  const [loading, setLoading] = useState(false);
  const [selectedYear, setSelectedYear] = useState<null | number>(null);
  const [examResultsGroups, setExamResultsGroups] = useState<TExamResultsGroup>([]);

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

  const getExamTitle = (type: string): string => {
    const title = {
      laboratory: `${t('card.laboratory', { ns: i18Recipes })}`,
      procedure: `${t('card.procedure', { ns: i18Recipes })}`
    };
    return title[type];
  };

  return (
    <ThemeProvider theme={muiTheme}>
      <Grid container>
        <Grid item xs={12}>
          <YearSlider
            disabled={loading}
            itemClick={item => {
              setSelectedYear(item);
            }}
          />
          <Box px={3}>
            {loading && (
              <Grid
                container
                item
                xs={12}
                direction="column"
                justifyContent="center"
                alignItems="center"
                sx={{ height: 'calc(100vh - 104px)' }}
              >
                <CircularProgress color="secondary" />
              </Grid>
            )}

            {!loading && !examResultsGroups.length && (
              <Box mt={4}>
                <Typography className={classes.noRecords}>
                  {t('no_records', { ns: i18Recipes })}
                </Typography>
              </Box>
            )}

            {!loading &&
              examResultsGroups.map((group, i) => (
                // Group items by month
                <Box key={i}>
                  <Typography
                    variant="body1"
                    component="div"
                    sx={{
                      fontSize: 12,
                      letterSpacing: 1,
                      textTransform: 'uppercase',
                      color: title2Color,
                      lineHeight: '31.92px',
                      mt: 16 / 8,
                      mb: 8 / 8
                    }}
                  >
                    {t(`months.${group.month}`, { ns: i18nGlobal })}
                  </Typography>
                  {group.items.map((item, i) => {
                    return (
                      <Box mb={2} key={`${item.userId}-${i}`}>
                        <CardComponent
                          type={getExamTitle(item.type)}
                          name={item.name}
                          date={item.date}
                          performer={item.performer}
                          redirectTo={item.userId}
                        />
                      </Box>
                    );
                  })}
                </Box>
              ))}
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default ExamResult;
