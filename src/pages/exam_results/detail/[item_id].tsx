import React, { useEffect, useState } from 'react';
import { getDate, getMonth, getYear, isValid } from 'date-fns';
import { useDispatch } from 'react-redux';

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
import { NAMESPACE_KEY as i18Recipes } from '../../../i18n/recipes_and_prescriptions/i18n';
/// i18n END

/// TYPES
import type { TListItem } from '../../../components/common/Card/SimpleCardList/types';
/// / TYPES END

/// SERVICES
import { TGeneralData, TResult } from '../../../services/getExamResultsData.service';
import { setTitle } from '@/src/store/slice/navbar.slice';
import { useGetExamsQuery } from '@/src/services/apiBFF';
import { useRouter } from 'next/router';
/// SERVICES END

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

function ExamResultsDetailPage(): JSX.Element {
  const classes = useStyles();
  const router = useRouter();
  const { data } = useGetExamsQuery();
  const { t } = useTranslation([i18nGlobal, i18nExamResults, i18Recipes]);
  const dispatch = useDispatch();
  const [examResult, setExamResult] = useState<TGeneralData[0] | null>(null);

  useEffect(() => {
    const { item_id: id } = router.query;
    const result = data && (data.find(item => item?.id === id) as TGeneralData[0] | null);
    dispatch(
      setTitle({
        title: result && result.name
      })
    );
    setExamResult(result);
  }, [router.query, data]);

  const getExamDate = (date: string) => {
    let newDate = new Date(date);
    newDate = new Date(newDate.getTime() + newDate.getTimezoneOffset() * 60000);
    const year = getYear(newDate);
    const month = getMonth(newDate);
    const day = getDate(newDate);
    const isValidDate = isValid(newDate);

    if (!isValidDate) {
      return `${t('invalid_date_format', { ns: i18nExamResults })}`;
    }
    return `${day.toString().padStart(2, '0')} ${t(`months.${month}`)}, ${year}`;
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
        value: result.comments || `${t('label.neither', { ns: i18nGlobal })}`
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
              {t('no_records', { ns: i18Recipes })}
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

export default ExamResultsDetailPage;
