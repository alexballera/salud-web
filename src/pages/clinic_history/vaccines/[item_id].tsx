/// BASE IMPORTS
import { useRouter } from 'next/router';
/// BASE IMPORTS

/// OWN COMPONENTS
import CardCollapse from '../../../components/common/Card/CardCollapse';
/// OWN COMPONENTS

/// STYLES
import { makeStyles, createStyles, styled } from '@material-ui/core/styles';
import {
  poppinsFontFamily,
  secondaryMainColor,
  title2Color,
  background3Color
} from '../../../styles/js/theme';
/// STYLES END

/// MATERIAL UI
import Box from '@material-ui/core/Box';
import MuiTypography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import MuiCircularProgress from '@material-ui/core/CircularProgress';
/// MATERIAL UI END

/// SERVICES
import { useGetVaccineByIdQuery } from '@/src/services/apiBFF';
/// SERVICES END

/// i18n
import { useTranslation } from 'react-i18next';
import { NAMESPACE_KEY as i18nClinicHistory } from '../../../i18n/clinic_history/i18n';
import { NAMESPACE_KEY as i18nGlobal } from '../../../i18n/globals/i18n';
/// i18n END

/// TYPES
import type { TDose } from '@/src/services/getExamResultsData.service';
/// TYPES END

// DATE-FNS
import { isValid, parseISO } from 'date-fns';
/// DATE-FNS END

const Typography = styled(MuiTypography)({
  fontFamily: poppinsFontFamily,
  fontStyle: 'normal',
  fontWeight: 400
});

const CircularProgress = styled(MuiCircularProgress)({
  color: secondaryMainColor
});

const useStyles = makeStyles(() =>
  createStyles({
    main: {
      backgroundColor: background3Color,
      height: '100%'
    },
    diseaseText: {
      fontSize: 12,
      lineHeight: '266%',
      letterSpacing: 1,
      textTransform: 'uppercase',
      color: secondaryMainColor
    },
    subTitle: {
      fontSize: 16,
      lineHeight: '150%',
      letterSpacing: '0.15px',
      color: title2Color,
      marginTop: 8
    }
  })
);

function VaccinesPreview(): JSX.Element {
  const classes = useStyles();
  const router = useRouter();
  const { item_id: vaccineId } = router.query;
  const { t } = useTranslation([i18nClinicHistory, i18nGlobal]);
  const { data, isLoading } = useGetVaccineByIdQuery({
    userId: 'ee957013-b02f-45b2-b837-092b490242ea',
    vaccineId: vaccineId as string
  });

  if (isLoading) {
    return (
      <Box px={3} py={4} className={classes.main}>
        <Grid container justify="center" alignItems="center">
          <CircularProgress color="inherit" />
        </Grid>
      </Box>
    );
  }

  const formatDate = (date: string) => {
    const toDate = parseISO(date);

    if (!isValid(toDate)) {
      return t('invalid_date_format', { ns: i18nGlobal });
    }

    const year = toDate.getUTCFullYear();
    const day = toDate.getUTCDate().toString();
    const month = toDate.getUTCMonth();
    return `${day.padStart(2, '0')} ${t(`months.${month}`, {
      ns: i18nGlobal
    }).toLowerCase()} ${year}`;
  };

  const getCardBodyText = (item: TDose) => {
    const { date } = item;
    return date !== null ? formatDate(date) : t('vaccines.no_applied');
  };

  return (
    <Box px={3} py={4} className={classes.main}>
      <Typography className={classes.diseaseText}>{data && data.name}</Typography>
      <Typography className={classes.subTitle}>
        {t('vaccines.preview_sub_title', {
          disease: data && data.name,
          ns: i18nClinicHistory
        })}
      </Typography>

      {data &&
        data.doses.map((item, idx) => {
          return (
            <Box my={3} key={idx}>
              <CardCollapse
                items={[{ value: getCardBodyText(item) }]}
                title={t('vaccines.dose_with_value', {
                  dose: 'I'.repeat(idx + 1),
                  ns: i18nClinicHistory
                })}
                showArrow={false}
                isExpanded={true}
                cardProps={{ elevation: 0 }}
                itemClick={() => null}
              />
            </Box>
          );
        })}
    </Box>
  );
}

export default VaccinesPreview;
