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
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Box from '@material-ui/core/Box';
import MuiTypography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
/// MATERIAL UI END

/// i18n
import { useTranslation } from 'react-i18next';
import { NAMESPACE_KEY as i18nRecipes } from '../../../i18n/recipes_and_prescriptions/i18n';
import { NAMESPACE_KEY as i18nGlobal } from '../../../i18n/globals/i18n';
/// i18n END

/// TYPES
import type { NextPageContext } from 'next/';
import type { TListItem } from '../../../components/common/Card/SimpleCardList/types';
/// / TYPES END

/// SERVICES
import {
  getExamResultsById,
  TExamResults,
  TResultLaboratory
} from '@/src/services/getExamResultsData.service';
import React from 'react';
/// SERVICES END

type TProps = {
  examResult: TExamResults;
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
      color: titlePageColor
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
  const { t } = useTranslation([i18nGlobal, i18nRecipes]);

  const getExamDate = (date: string) => {
    const toDate = new Date(date);
    const year = toDate.getFullYear();
    const day = toDate.getDay();
    const month = toDate.getMonth();
    if (!month || !year || !day) {
      return t('invalid_date_format', { ns: i18nRecipes });
    }
    return `${day.toString().padStart(2, '0')} de ${t(`months.${month}`, {
      ns: i18nGlobal
    })}, ${year}`;
  };

  const getCardLaboratoryInformation = (result: TResultLaboratory, date: string): TListItem[] => {
    return [
      {
        title: t('card.date', { ns: i18nRecipes }),
        value: getExamDate(date)
      },
      {
        title: t('card.results', { ns: i18nRecipes }),
        value: result.name
      },
      {
        title: t('card.referenceRange', { ns: i18nRecipes }),
        value: result.referenceRange
      },
      {
        title: t('card.comments', { ns: i18nRecipes }),
        value: result.comments
      }
    ];
  };

  // const getCardProcedureInformation = (examProcedure: TExamResults): TListItem[] => {
  //   return [
  //     {
  //       title: t('card.date', { ns: i18nRecipes }),
  //       value: getExamDate(examProcedure.date)
  //     },
  //     {
  //       title: t('card.results', { ns: i18nRecipes }),
  //       value: examProcedure.name
  //     },
  //     {
  //       title: t('card.performer', { ns: i18nRecipes }),
  //       value: examProcedure.performer
  //     },
  //     {
  //       title: t('card.procedureZone', { ns: i18nRecipes }),
  //       value: examProcedure.procedureZone
  //     },
  //     {
  //       title: t('card.diagnostic', { ns: i18nRecipes }),
  //       value: examProcedure.diagnostic
  //     },
  //     {
  //       title: t('card.interpretation', { ns: i18nRecipes }),
  //       value: examProcedure.interpretation
  //     }
  //   ];
  // };

  // const getItemTitle = () => {
  //   return examResult.type === 'laboratory'
  //     ? t('card.laboratory', { ns: i18nRecipes })
  //     : t('card.procedure', { ns: i18nRecipes });
  // };

  return (
    <Grid container className={classes.mainGrid}>
      <Grid item xs={12}>
        <Box px={3} py={3}>
          {!examResult ? (
            <Typography variant="h1" className={classes.title}>
              {t('recipe_or_prescription_not_found', { ns: i18nRecipes })}
            </Typography>
          ) : (
            <>
              {Array.isArray(examResult.result) ? (
                examResult.result.map(item => (
                  <React.Fragment key={item.name}>
                    <Typography variant="h1" className={classes.title}>
                      {item.name}
                    </Typography>
                    <Box className={classes.boxSpacing}>
                      <SimpleCardList
                        title={item.name}
                        items={getCardLaboratoryInformation(item, examResult.date)}
                        itemClick={() => null}
                        titleStyles={{
                          backgroundColor: titleCardTagBg,
                          color: titleCardTagColor
                        }}
                      />
                    </Box>
                  </React.Fragment>
                ))
              ) : (
                <></>
              )}
              {/* <Box className={classes.boxSpacing}>
                <Card className={classes.footerCard}>
                  <CardContent>
                    <Typography className={classes.footerCardTitle} variant="h2">
                      {t('details_sub_title', { ns: i18nRecipes })}
                    </Typography>
                    <Typography className={classes.footerCardDescription} variant="body1">
                      {examResult.details.indications}
                    </Typography>
                  </CardContent>
                </Card>
              </Box> */}
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
  const examResults = await getExamResultsById(id as string);
  return {
    examResults
  };
};
export default ExamResultsDetailPage;
