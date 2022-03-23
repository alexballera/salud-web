/// BASE IMPORTS
import React, { createRef, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
/// BASE IMPORTS

/// i18n
import { useTranslation } from 'react-i18next';
import { NAMESPACE_KEY as i18Recipes } from '@/src/i18n/recipes_and_prescriptions/i18n';
import { NAMESPACE_KEY as i18Forms } from '@/src/i18n/forms/i18n';
import { NAMESPACE_KEY as i18nGlobal } from '@/src/i18n/globals/i18n';
/// i18n END

/// MUI COMPONENTS
import MuiCircularProgress from '@mui/material/CircularProgress';
import { Box, Grid, styled, Typography } from '@mui/material';
/// MUI COMPONENTS END

/// OWN COMPONENTS
import YearSlider from '@/src/components/common/YearSlider';
import CardLink from '@/src/components/common/Card/CardLink';
/// OWN COMPONENTS END

/// STYLES
import { examStyles } from '@/src/containers/ExamResult/styles.module';
import { secondaryMainColor, title2Color, title3Color } from '@/src/styles/js/theme';
/// STYLES END

/// SERVICES
import { getExamResultsByYear, TExamResultsGroup } from '@/src/services/getExamResultsData.service';
/// SERVICES END

const CircularProgress = styled(MuiCircularProgress)({
  color: secondaryMainColor
});

const PAGE_PATHNAME = '/exam_results';

const ExamResult = (): JSX.Element => {
  const { t } = useTranslation([i18Recipes, i18Forms, i18nGlobal]);
  const classes = examStyles();
  const router = useRouter();
  const listContainerRef = createRef();
  const renderCompleteVerifyRef = createRef();
  const [loading, setLoading] = useState(false);
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

  useEffect(() => {
    setLoading(true);
    if (sliderYear) {
      const id = 'ee957013-b02f-45b2-b837-092b490242ea';
      getExamResultsByYear(id, sliderYear)
        .then(res => {
          setExamResultsGroups(res);
        })
        .catch(err => console.error(err))
        .finally(() => setLoading(false));
    }
  }, [sliderYear]);

  const getExamTitle = (type: string): string => {
    const title = {
      laboratory: `${t('card.laboratory', { ns: i18Recipes })}`,
      procedure: `${t('card.procedure', { ns: i18Recipes })}`
    };
    return title[type];
  };

  return (
    <Grid container>
      <Grid item xs={12}>
        <YearSlider
          disabled={loading}
          itemClick={item => {
            setSliderYear(item);
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
                {t('no_records', { ns: i18Recipes })}
              </Typography>
            </Box>
          )}

          <Box {...{ ref: listContainerRef }}>
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
  );
};

export default ExamResult;
