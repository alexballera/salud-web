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

const PAGE_PATHNAME = '/consultationHistory';

const ConsultationHistory = (): JSX.Element => {
  const { t } = useTranslation([i18Recipes, i18Forms, i18nGlobal, i18nExams]);
  const router = useRouter();
  const listContainerRef = createRef();
  const renderCompleteVerifyRef = createRef();
  const year = new Date().getFullYear();
  const [sliderYear, setSliderYear] = useState<number>(null);

  const { data, isLoading, isFetching } = useGetConsultationHistoryQuery(sliderYear || year);

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
            {isFetching && (
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

            {!isFetching && !data && (
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
