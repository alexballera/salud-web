/// BASE IMPORTS
import { useEffect, useState } from 'react';
/// BASE IMPORTS END

/// OWN COMPONENTS
import YearSlider from '../../components/common/YearSlider';
import CardLink from '../../components/common/Card/CardLink';
/// OWN COMPONENTS END

/// STYLES
import { makeStyles, createStyles, styled } from '@material-ui/core/styles';
import {
  poppinsFontFamily,
  secondaryMainColor,
  title2Color,
  title3Color
} from '../../styles/js/theme';
/// STYLES END

/// MATERIAL UI
import Box from '@material-ui/core/Box';
import MuiTypography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import MuiCircularProgress from '@material-ui/core/CircularProgress';
/// MATERIAL UI END

/// i18n
import { useTranslation } from 'react-i18next';
import { NAMESPACE_KEY as i18nRecipes } from '../../i18n/recipes_and_prescriptions/i18n';
import { NAMESPACE_KEY as i18nGlobal } from '../../i18n/globals/i18n';
/// i18n END

/// SERVICES
import { getRecipiesAndPrescriptionsByYear } from '../../services/getRecipiesAndPrescriptionData.service';
/// SERVICES END

/// TYPES
import type { TPatientRecipiesAndPrescriptionGroups } from '../../services/getRecipiesAndPrescriptionData.service';
/// TYPES END

const Typography = styled(MuiTypography)({
  fontFamily: poppinsFontFamily,
  fontStyle: 'normal',
  fontWeight: 'normal'
});

const CircularProgress = styled(MuiCircularProgress)({
  color: secondaryMainColor
});

const useStyles = makeStyles(() =>
  createStyles({
    month: {
      fontSize: 12,
      lineHeight: '266%',
      letterSpacing: 1,
      textTransform: 'uppercase',
      color: title2Color,
      marginBottom: 10,
      marginTop: 16,
      margin: 0
    },
    sliderContent: {
      boxShadow: '0px 4px 8px rgba(207, 225, 227, 0.25)'
    },
    listContent: {
      padding: 24,
      paddingTop: 0
    },
    noRecords: {
      fontSize: 12,
      lineHeight: '166%',
      letterSpacing: '0.4px',
      color: title3Color
    }
  })
);

function RecipeAndPrescriptionPage(): JSX.Element {
  const classes = useStyles();
  const { t } = useTranslation([i18nRecipes, i18nGlobal]);
  const [selectedYear, setSelectedYear] = useState<null | number>(null);
  const [loading, setLoading] = useState(false);
  const [recipiesAndPrescriptionGroups, setRecipiesAndPrescriptionGroups] =
    useState<TPatientRecipiesAndPrescriptionGroups>([]);

  useEffect(() => {
    if (selectedYear) {
      setLoading(true);
      getRecipiesAndPrescriptionsByYear(selectedYear)
        .then(result => {
          setRecipiesAndPrescriptionGroups(result);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [selectedYear]);

  return (
    <Grid container>
      <Grid item xs={12}>
        <Box className={classes.sliderContent}>
          <YearSlider
            disabled={loading}
            itemClick={item => {
              setSelectedYear(item);
            }}
          />
        </Box>
        <Box className={classes.listContent}>
          {loading && (
            <Box mt={6}>
              <Grid container direction="column" justify="center" alignItems="center">
                <CircularProgress color="inherit" />
              </Grid>
            </Box>
          )}

          {!loading && !recipiesAndPrescriptionGroups.length && (
            <Box mt={4}>
              <Typography className={classes.noRecords}>
                {t('no_records', { ns: i18nRecipes })}
              </Typography>
            </Box>
          )}

          {!loading &&
            recipiesAndPrescriptionGroups.map((group, i) => (
              // Group items by month
              <Box key={i}>
                <Typography className={classes.month}>
                  {t(`months.${group.month}`, { ns: i18nGlobal })}
                </Typography>
                {group.items.map((item, idx) => {
                  return (
                    <Box mb={2} key={`${item.id}-${idx}`}>
                      <CardLink
                        title={t(`card.${item.type}`)}
                        text1={
                          item.type === 'prescription'
                            ? item.details.drug
                            : item.details.description
                        }
                        text2={item.reportDate}
                        reportedBy={item.reporter.name}
                        redirectTo={`/recipes_and_prescriptions/preview/${item.id}`}
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
}

export default RecipeAndPrescriptionPage;
