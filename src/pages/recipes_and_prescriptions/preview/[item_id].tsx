/// OWN COMPONENTS
import SimpleCardList from '../../../components/common/Card/SimpleCardList';
import CardCollapse from '../../../components/common/Card/CardCollapse';
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
import type {
  TPatientRecipiesAndPrescriptionList,
  TPrescription,
  TRecipe
} from '../../../services/getRecipiesAndPrescriptionData.service';
/// / TYPES END

/// SERVICES
import { getRecipiesAndPrescriptionsById } from '../../../services/getRecipiesAndPrescriptionData.service';
/// SERVICES END

type TProps = {
  recipeOrPrescription: TPatientRecipiesAndPrescriptionList[0];
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

function RecipeAndPrescriptionPage({ recipeOrPrescription }: TProps): JSX.Element {
  const classes = useStyles();
  const { t } = useTranslation([i18nGlobal, i18nRecipes]);

  const getRecipeOrPrescriptionDate = (date: string) => {
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

  const getReportInformation = ({
    reporter,
    reportDate
  }: TPatientRecipiesAndPrescriptionList[0]): TListItem[] => {
    return [
      {
        title: t('card.date', { ns: i18nRecipes }),
        value: getRecipeOrPrescriptionDate(reportDate)
      },
      {
        title: t('card.reporter_by', { ns: i18nRecipes }),
        value: reporter.name
      },
      {
        title: t('card.specialty', { ns: i18nRecipes }),
        value: reporter.speciality
      }
    ];
  };

  const getPrescriptionInformation = (prescription: TPrescription): TListItem[] => {
    const { frequency, quantity } = prescription;
    return [
      {
        title: t('card.via', { ns: i18nRecipes }),
        value: prescription.via
      },
      {
        title: t('card.take', { ns: i18nRecipes }),
        value: prescription.take.toString()
      },
      {
        title: t('card.frequency', { ns: i18nRecipes }),
        value:
          frequency <= 1
            ? t('config.simple_hour', { ns: i18nGlobal, hour: frequency.toString() })
            : t('config.many_hour', { ns: i18nGlobal, hour: frequency.toString() })
      },
      {
        title: t('card.quantity', { ns: i18nRecipes }),
        value:
          quantity <= 1
            ? t('config.simple_unit', { ns: i18nGlobal, unit: quantity.toString() })
            : t('config.many_unit', { ns: i18nGlobal, unit: quantity.toString() })
      },
      {
        title: t('card.days', { ns: i18nRecipes }),
        value: prescription.days.toString()
      },
      {
        title: t('card.power', { ns: i18nRecipes }),
        value: prescription.power.toString()
      }
    ];
  };

  const getRecipeInformation = (recipe: TRecipe): TListItem[] => {
    return [{ title: t('card.description', { ns: i18nRecipes }), value: recipe.description }];
  };

  const getItemTitle = () => {
    return recipeOrPrescription.type === 'recipe'
      ? t('card.recipe', { ns: i18nRecipes })
      : t('card.prescription', { ns: i18nRecipes });
  };

  const getCollapseCardTitle = () => {
    return recipeOrPrescription.type === 'recipe'
      ? recipeOrPrescription.details.description
      : recipeOrPrescription.details.drug;
  };

  const getCollapseCardSubTitle = () => {
    if (recipeOrPrescription.type === 'recipe') {
      return null;
    }
    const { frequency } = recipeOrPrescription.details;
    return frequency <= 1
      ? t('config.simple_hour', { ns: i18nGlobal, hour: frequency.toString() })
      : t('config.many_hour', { ns: i18nGlobal, hour: frequency.toString() });
  };

  const getCardDetails = () => {
    return recipeOrPrescription.type === 'recipe'
      ? getRecipeInformation(recipeOrPrescription.details)
      : getPrescriptionInformation(recipeOrPrescription.details);
  };

  return (
    <Grid container className={classes.mainGrid}>
      <Grid item xs={12}>
        <Box px={3} py={3}>
          {!recipeOrPrescription ? (
            <Typography variant="h1" className={classes.title}>
              {t('recipe_or_prescription_not_found', { ns: i18nRecipes })}
            </Typography>
          ) : (
            <>
              <Typography variant="h1" className={classes.title}>
                {t('details_title', { ns: i18nRecipes })}
              </Typography>

              <Box className={classes.boxSpacing}>
                <SimpleCardList
                  title={getItemTitle()}
                  items={getReportInformation(recipeOrPrescription)}
                  itemClick={() => null}
                  titleStyles={{
                    backgroundColor: titleCardTagBg,
                    color: titleCardTagColor
                  }}
                />
              </Box>

              <Box className={classes.boxSpacing}>
                <CardCollapse
                  title={getCollapseCardTitle()}
                  subTitle={getCollapseCardSubTitle()}
                  items={getCardDetails()}
                  itemClick={() => null}
                />
              </Box>

              <Box className={classes.boxSpacing}>
                <Card className={classes.footerCard}>
                  <CardContent>
                    <Typography className={classes.footerCardTitle} variant="h2">
                      {recipeOrPrescription.type === 'prescription'
                        ? t('details_indications_text', { ns: i18nRecipes })
                        : t('details_comments_text', { ns: i18nRecipes })}
                    </Typography>
                    <Typography className={classes.footerCardDescription} variant="body1">
                      {recipeOrPrescription.details.indications}
                    </Typography>
                  </CardContent>
                </Card>
              </Box>
            </>
          )}
        </Box>
      </Grid>
    </Grid>
  );
}

RecipeAndPrescriptionPage.getInitialProps = async ({ query }: NextPageContext) => {
  // eslint-disable-next-line camelcase
  const { item_id: id } = query;
  const recipeOrPrescription = await getRecipiesAndPrescriptionsById(id as string);
  return {
    recipeOrPrescription
  };
};
export default RecipeAndPrescriptionPage;
