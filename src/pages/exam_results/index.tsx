/// BASE IMPORTS
import React, { createRef, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
/// BASE IMPORTS

/// i18n
import { useTranslation } from 'react-i18next';
import { NAMESPACE_KEY as i18Recipes } from '@/src/i18n/recipes_and_prescriptions/i18n';
import { NAMESPACE_KEY as i18Forms } from '@/src/i18n/forms/i18n';
import { NAMESPACE_KEY as i18nGlobal } from '@/src/i18n/globals/i18n';
import { NAMESPACE_KEY as i18nExams } from '@/src/i18n/exam_result/i18n';
/// i18n END

/// MUI COMPONENTS
import { Box, Grid, CircularProgress, Typography, ThemeProvider } from '@mui/material';
/// MUI COMPONENTS END

/// OWN COMPONENTS
import YearSlider from '@/src/components/common/YearSlider';
import CardLink from '@/src/components/common/Card/CardLink';
/// OWN COMPONENTS END

/// STYLES
import { title2Color, title3Color } from '@/src/styles/js/theme';
import muiTheme from '@/src/styles/js/muiTheme';
/// STYLES END

/// SERVICES
import { TExamResultsGroup, TGeneralData } from '@/src/services/getExamResultsData.service';
import { useGetExamsQuery } from '@/src/services/apiBFF';
/// SERVICES END

const PAGE_PATHNAME = '/exam_results';

const ExamResult = (): JSX.Element => {
  const { t } = useTranslation([i18Recipes, i18Forms, i18nGlobal, i18nExams]);
  const router = useRouter();
  const { data, isLoading } = useGetExamsQuery();
  const listContainerRef = createRef();
  const renderCompleteVerifyRef = createRef();
  const [sliderYear, setSliderYear] = useState<null | number>(null);
  const { 'selected-year': selectedYear, 'selected-item': selectedItem } = router.query;
  const [examResultsGroups, setExamResultsGroups] = useState<TExamResultsGroup>([]);

  // TODO: replace this route state using the redux or context
  const pushRouteItem = (itemIdx?: string) => {
    router.push({
      pathname: PAGE_PATHNAME,
      query: {
        'selected-year': sliderYear,
        'selected-item': itemIdx || selectedItem || '-1'
      }
    });
  };

  const groupResultsByMonth = (data: TGeneralData) => {
    const groups = data.reduce((groups, curr) => {
      const month = new Date(curr.date).getMonth().toLocaleString();
      if (!groups[month]) {
        groups[month] = [];
      }
      groups[month].push(curr);
      return groups;
    }, {});
    return Object.keys(groups)
      .map(month => {
        return {
          month: month.toString(),
          items: groups[month]
        };
      })
      .reverse();
  };

  const filterResultsByYear = (data: TGeneralData, year: number) => {
    const currentDate = new Date(year, 0, 1);
    const firstDay = new Date(currentDate.getFullYear(), 0, 1);
    const lastDay = new Date(currentDate.getFullYear(), 11, 31);
    return data.filter(item => {
      const itemDateParsed = new Date(item.date);
      return itemDateParsed >= firstDay && itemDateParsed <= lastDay;
    });
  };

  useEffect(() => {
    if (sliderYear) {
      if (data) {
        const filterResults = filterResultsByYear(data, sliderYear);
        groupResultsByMonth(filterResults);
        setExamResultsGroups(groupResultsByMonth(filterResults));
      }

      if (!isLoading) {
        if (sliderYear && selectedYear) {
          router.replace(PAGE_PATHNAME);
        }
      }
    }
  }, [sliderYear, data]);

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
            disabled={isLoading}
            itemClick={item => {
              setSliderYear(item);
            }}
          />
          <Box px={3}>
            {isLoading && (
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

            {!isLoading && !examResultsGroups.length && (
              <Box mt={4}>
                <Typography
                  variant="caption"
                  component="div"
                  sx={{
                    fontSize: '12px !important',
                    lineHeight: '19.92px !important',
                    letterSpacing: '0.4px',
                    color: title3Color
                  }}
                >
                  {t('no_records', { ns: i18nExams })}
                </Typography>
              </Box>
            )}

            <Box {...{ ref: listContainerRef }}>
              {!isLoading &&
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
                          <CardLink
                            title={getExamTitle(item.type)}
                            text1={item.name}
                            text2={item.date}
                            reportedBy={item.performer}
                            action={() => {
                              pushRouteItem(item.id);
                              router.push(`${PAGE_PATHNAME}/detail/${item.id}`);
                            }}
                          />
                        </Box>
                      );
                    })}
                  </Box>
                ))}
            </Box>
            <Box {...({ ref: renderCompleteVerifyRef } as any)} />
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default ExamResult;
