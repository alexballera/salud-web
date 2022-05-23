/// BASE IMPORTS
import { useEffect, useState, createRef } from 'react';
import { useRouter } from 'next/router';
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
import { TPatientRecipiesAndPrescriptionList } from '../../services/getRecipiesAndPrescriptionData.service';
/// SERVICES END

/// TYPES
import type { TPatientRecipiesAndPrescriptionGroups } from '../../services/getRecipiesAndPrescriptionData.service';
import { useGetRecipiesPrescriptionsQuery } from '@/src/services/apiBFF';
/// TYPES END

const Typography = styled(MuiTypography)({
  fontFamily: poppinsFontFamily,
  fontStyle: 'normal',
  fontWeight: 'normal'
});

const CircularProgress = styled(MuiCircularProgress)({
  color: secondaryMainColor
});

const PAGE_PATHNAME = '/recipes_and_prescriptions';

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
  const router = useRouter();
  const { data, isLoading } = useGetRecipiesPrescriptionsQuery();
  const listContainerRef = createRef();
  const renderCompleteVerifyRef = createRef();
  const { t } = useTranslation([i18nRecipes, i18nGlobal]);
  const { 'selected-year': selectedYear, 'selected-item': selectedItem } = router.query;
  const [sliderYear, setSliderYear] = useState<null | number>(null);
  const [recipiesAndPrescriptionGroups, setRecipiesAndPrescriptionGroups] =
    useState<TPatientRecipiesAndPrescriptionGroups>([]);

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

  const groupResultsByMonth = (recipiesAndPrescriptions: TPatientRecipiesAndPrescriptionList) => {
    const groups = recipiesAndPrescriptions.reduce((groups, curr) => {
      const month = new Date(curr.reportDate).getMonth();
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

  const filterResultsByYear = (data: TPatientRecipiesAndPrescriptionList, year: number) => {
    const currentDate = new Date(year, 5, 5);
    const firstDay = new Date(currentDate.getFullYear(), 0, 1);
    const lastDay = new Date(currentDate.getFullYear(), 11, 31);
    return data.filter(item => {
      const itemDateParsed = new Date(item.reportDate);
      return itemDateParsed >= firstDay && itemDateParsed <= lastDay;
    });
  };

  useEffect(() => {
    if (sliderYear) {
      if (data) {
        const filterResults = filterResultsByYear(data, sliderYear);
        groupResultsByMonth(filterResults);
        setRecipiesAndPrescriptionGroups(groupResultsByMonth(filterResults));
      }

      if (!isLoading) {
        if (sliderYear && selectedYear) {
          router.replace(PAGE_PATHNAME);
        }
      }
    }
  }, [sliderYear, data]);

  useEffect(() => {
    if (selectedItem && renderCompleteVerifyRef.current) {
      const containerEl = listContainerRef.current as HTMLElement;
      const selectedCard = containerEl.querySelector(`[data-id="${selectedItem}"]`) as HTMLElement;
      if (selectedCard) {
        const topOfElement = selectedCard.offsetTop - 100;
        window.scroll({ top: topOfElement, behavior: 'smooth' });
      }
    }
  }, [renderCompleteVerifyRef]);

  return (
    <Grid container>
      <Grid item xs={12}>
        <Box>
          <YearSlider
            selectedYear={Number(selectedYear)}
            disabled={isLoading}
            itemClick={item => {
              setSliderYear(item);
            }}
          />
        </Box>
        <Box className={classes.listContent}>
          {isLoading && (
            <Box mt={6}>
              <Grid container direction="column" justify="center" alignItems="center">
                <CircularProgress color="inherit" />
              </Grid>
            </Box>
          )}

          {!isLoading && !recipiesAndPrescriptionGroups.length && (
            <Box mt={4}>
              <Typography className={classes.noRecords}>
                {t('no_records', { ns: i18nRecipes })}
              </Typography>
            </Box>
          )}

          <Box {...{ ref: listContainerRef }}>
            {!isLoading &&
              recipiesAndPrescriptionGroups.map((group, i) => (
                // Group items by month
                <Box key={i}>
                  <Typography className={classes.month}>
                    {t(`months.${group.month}`, { ns: i18nGlobal })}
                  </Typography>
                  {group.items.map((item, idx) => (
                    <Box mb={2} key={`${item.id}-${idx}`} {...{ 'data-id': item.id }}>
                      <CardLink
                        title={t(`card.${item.type}`)}
                        text1={
                          item.type === 'prescription'
                            ? item.details.drug
                            : item.details.description
                        }
                        text2={item.reportDate}
                        reportedBy={item.reporter.name}
                        action={() => {
                          pushRouteItem(item.id);
                          router.push(`${PAGE_PATHNAME}/preview/${item.id}`);
                        }}
                      />
                    </Box>
                  ))}
                </Box>
              ))}
          </Box>
          <Box {...({ ref: renderCompleteVerifyRef } as any)} />
        </Box>
      </Grid>
    </Grid>
  );
}

export default RecipeAndPrescriptionPage;
