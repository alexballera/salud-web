/// BASE IMPORTS
import React, { createRef, useState } from 'react';
import { useRouter } from 'next/router';
/// BASE IMPORTS

/// i18n
import { useTranslation } from 'react-i18next';
import { NAMESPACE_KEY as i18Recipes } from '../../i18n/recipes_and_prescriptions/i18n';
import { NAMESPACE_KEY as i18Forms } from '../../i18n/forms/i18n';
import { NAMESPACE_KEY as i18nGlobal } from '../../i18n/globals/i18n';
import { NAMESPACE_KEY as i18nExams } from '../../i18n/exam_result/i18n';
/// i18n END

/// MUI COMPONENTS
import { Box, Grid, CircularProgress, Typography, ThemeProvider } from '@mui/material';
/// MUI COMPONENTS END

/// OWN COMPONENTS
import YearSlider from '../../components/common/YearSlider';
import CardLink from '../../components/common/Card/CardLink';
/// OWN COMPONENTS END

/// STYLES
import { title2Color, title3Color } from '../../styles/js/theme';
import muiTheme from '../../styles/js/muiTheme';
/// STYLES END

/// SERVICES
import { useGetConsultationHistoryQuery } from '../../services/apiBFF';
/// SERVICES END

const PAGE_PATHNAME = '/exam_results';

const ConsultationHistory = (): JSX.Element => {
  const { t } = useTranslation([i18Recipes, i18Forms, i18nGlobal, i18nExams]);
  const router = useRouter();
  const listContainerRef = createRef();
  const renderCompleteVerifyRef = createRef();
  // const [loading, setLoading] = useState(false);
  const [sliderYear, setSliderYear] = useState<number>(null);
  const { 'selected-year': selectedYear, 'selected-item': selectedItem } = router.query;
  // const [consultationHistoryGroups, setConsultationHistoryGroups] =
  //   useState<TConsultationHistoryGroup>([]);

  const { data, isLoading } = useGetConsultationHistoryQuery({
    ...(sliderYear && { year: sliderYear.toString() })
  });
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

  // useEffect(() => {
  //   if (sliderYear) {
  //     setLoading(true);
  //     const id = 'ee957013-b02f-45b2-b837-092b490242ea';
  //     getExamResultsByYear(id, sliderYear)
  //       .then(res => {
  //         setConsultationHistoryGroups(res);
  //       })
  //       .catch(err => console.error(err))
  //       .finally(() => {
  //         setLoading(false);
  //         if (sliderYear && selectedYear) {
  //           router.replace(PAGE_PATHNAME);
  //         }
  //       });
  //   }
  // }, [sliderYear]);

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

            {data.length === 0 && (
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
                data.map((group, i) => (
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
                        <Box mb={2} key={`${item.medicalConsultationId}-${i}`}>
                          <CardLink
                            title={item.healthSite}
                            text1={item.name}
                            text2={item.date}
                            reportedBy={item.doctor}
                            action={() => {
                              pushRouteItem(item.medicalConsultationId);
                              router.push(`${PAGE_PATHNAME}/detail/${item.medicalConsultationId}`);
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

export default ConsultationHistory;
