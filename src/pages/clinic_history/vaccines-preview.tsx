/// OWN COMPONENTS
import CardCollapse from '../../components/common/Card/CardCollapse';
/// OWN COMPONENTS

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
import { NAMESPACE_KEY as i18nClinicHistory } from '../../i18n/clinic_history/i18n';
/// i18n END

const Typography = styled(MuiTypography)({
  fontFamily: poppinsFontFamily,
  fontStyle: 'normal',
  fontWeight: 400
});

const useStyles = makeStyles(() =>
  createStyles({
    main: {
      backgroundColor: '#F2F2F2', // TODO: Change this color
      height: '100%'
    },
    diseaseText: {
      fontSize: 12,
      lineHeight: '200%',
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
  const { t } = useTranslation(i18nClinicHistory);

  return (
    <Box px={3} py={4} className={classes.main}>
      <Typography className={classes.diseaseText}>Covid 19</Typography>
      <Typography className={classes.subTitle}>
        {t('vaccine_preview.sub_title', { disease: 'Covid-19' })}
      </Typography>

      <Box my={3}>
        <CardCollapse
          items={[{ value: 'asdf' }]}
          title="sdf"
          showArrow={false}
          isExpanded={true}
          cardProps={{ elevation: 0 }}
          itemClick={() => null}
        />
      </Box>

      <Box my={3}>
        <CardCollapse
          items={[{ value: 'asdf' }]}
          title="sdf"
          showArrow={false}
          isExpanded={true}
          cardProps={{ elevation: 0 }}
          itemClick={() => null}
        />
      </Box>
    </Box>
  );
}

export default VaccinesPreview;
