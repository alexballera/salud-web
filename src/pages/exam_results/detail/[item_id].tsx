import React, { useEffect } from 'react';
/// OWN COMPONENTS
import SimpleCardList from '../../../components/common/Card/SimpleCardList';
/// OWN COMPONENTS END

/// STYLES
import { makeStyles, createStyles, styled } from '@material-ui/core/styles';
import {
  background2Color,
  poppinsFontFamily,
  title2Color,
  title3Color,
  titleCardTagBg,
  titleCardTagColor,
  titlePageColor
} from '../../../styles/js/theme';
/// STYLES END

/// MATERIAL UI
import Box from '@material-ui/core/Box';
import MuiTypography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
/// MATERIAL UI END

/// i18n
import { useTranslation } from 'react-i18next';
import { NAMESPACE_KEY as i18nExamResults } from '../../../i18n/exam_result/i18n';
import { NAMESPACE_KEY as i18nGlobal } from '../../../i18n/globals/i18n';
/// i18n END

/// TYPES
import type { NextPageContext } from 'next/';
import type { TListItem } from '../../../components/common/Card/SimpleCardList/types';
/// / TYPES END

/// SERVICES
import {
  TGeneralData,
  TResult,
  getExamResultsById
} from '../../../services/getExamResultsData.service';
import { setDataToLocalStorage } from '../../../services/localStorage.service';
/// SERVICES END

type TProps = {
  examResult: TGeneralData[0];
};

const Typography = styled(MuiTypography)({
  fontFamily: poppinsFontFamily,
  fontStyle: 'normal',
  fontWeight: 'normal'
});

const useStyles = makeStyles(() =>
  createStyles({
    mainGrid: {
      backgroundColor: background2Color,
      height: '100%'
    },
    title: {
      lineHeight: '150%',
      letterSpacing: '0.15px',
      fontSize: 16,
      marginBottom: 16,
      color: titlePageColor,
      textTransform: 'capitalize'
    },
    boxSpacing: {
      marginBottom: 24
    },
    footerCard: {
      borderRadius: 8,
      boxShadow: 'none'
    },
    footerCardTitle: {
      fontSize: 14,
      lineHeight: '143%',
      letterSpacing: '0.15px',
      color: title3Color
    },
    footerCardDescription: {
      fontSize: 14,
      lineHeight: '143%',
      letterSpacing: '0.15px',
      color: title2Color,
      marginTop: 8
    }
  })
);

function ExamResultsDetailPage({ examResult }: TProps): JSX.Element {
  const classes = useStyles();
  const { t } = useTranslation([i18nGlobal, i18nExamResults]);

  useEffect(() => {
    if (examResult) {
      setDataToLocalStorage('titleExamResultDetail', examResult.name);
    }
  }, [examResult]);

  const getExamDate = (date: string) => {
    const toDate = new Date(date);
    const year = toDate.getFullYear();
    const day = toDate.getDay();
    const month = toDate.getMonth();
    if (!month || !year || !day) {
      return t('invalid_date_format', { ns: i18nExamResults });
    }
    return `${day.toString().padStart(2, '0')} de ${t(`months.${month}`, {
      ns: i18nGlobal
    })}, ${year}`;
  };

  const getCardLaboratoryInformation = (result: TResult, date: string): TListItem[] => {
    return [
      {
        title: t('card.date', { ns: i18nExamResults }),
        value: getExamDate(date)
      },
      {
        title: t('card.results', { ns: i18nExamResults }),
        value: result.value
      },
      {
        title: t('card.referenceRange', { ns: i18nExamResults }),
        value: result.referenceRange
      },
      {
        title: t('card.comments', { ns: i18nExamResults }),
        value: result.comments
      }
    ];
  };

  const getCardTitle = type => {
    return type === 'laboratory'
      ? t('card.laboratory', { ns: i18nExamResults })
      : t('card.procedure', { ns: i18nExamResults });
  };

  const getCardProcedureInformation = (examProcedure: TGeneralData[0]): TListItem[] => {
    return [
      {
        title: t('card.date', { ns: i18nExamResults }),
        value: getExamDate(examProcedure.date)
      },
      {
        title: t('card.results', { ns: i18nExamResults }),
        value: examProcedure.result as string
      },
      {
        title: t('card.procedureZone', { ns: i18nExamResults }),
        value: examProcedure.procedureZone || '-'
      },
      {
        title: t('card.diagnostic', { ns: i18nExamResults }),
        value: examProcedure.diagnostic || '-'
      },
      {
        title: t('card.interpretation', { ns: i18nExamResults }),
        value: examProcedure.interpretation || '-'
      },
      {
        title: t('card.performer', { ns: i18nExamResults }),
        value: examProcedure.performer
      }
    ];
  };

  return (
    <Grid container className={classes.mainGrid}>
      <Grid item xs={12}>
        <Box px={3} py={3}>
          {!examResult ? (
            <Typography variant="h1" className={classes.title}>
              {t('recipe_or_prescription_not_found', { ns: i18nExamResults })}
            </Typography>
          ) : (
            <>
              {Array.isArray(examResult.result) ? (
                examResult.result.map((item, i) => (
                  <React.Fragment key={item.name}>
                    <Typography variant="h1" className={classes.title}>
                      {item.name}
                    </Typography>
                    <Box className={classes.boxSpacing}>
                      <SimpleCardList
                        title={getCardTitle(examResult.type)}
                        items={getCardLaboratoryInformation(item, examResult.date)}
                        itemClick={() => null}
                        titleStyles={{
                          backgroundColor: titleCardTagBg,
                          color: titleCardTagColor
                        }}
                        showHeader={i === 0}
                      />
                    </Box>
                  </React.Fragment>
                ))
              ) : (
                <>
                  <Box className={classes.boxSpacing}>
                    <SimpleCardList
                      title={getCardTitle(examResult.type)}
                      items={getCardProcedureInformation(examResult)}
                      itemClick={() => null}
                      titleStyles={{
                        backgroundColor: titleCardTagBg,
                        color: titleCardTagColor
                      }}
                    />
                  </Box>
                </>
              )}
            </>
          )}
        </Box>
      </Grid>
    </Grid>
  );
}

ExamResultsDetailPage.getInitialProps = async ({ query }: NextPageContext) => {
  // eslint-disable-next-line camelcase
  const { item_id: id } = query;
  const examResult = await getExamResultsById(id as string);
  return {
    examResult
  };
};
export default ExamResultsDetailPage;
