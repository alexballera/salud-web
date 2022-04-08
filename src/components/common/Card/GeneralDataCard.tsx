/// GENERAL IMPORTS
import { useRouter } from 'next/router';
/// GENERAL IMPORTS END

/// MATERIAL UI
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import MuiCardContent from '@material-ui/core/CardContent';
import MuiTypography from '@material-ui/core/Typography';
import { makeStyles, styled } from '@material-ui/core/styles';
/// MATERIAL UI - END

/// THEME
import {
  poppinsFontFamily,
  textValueCardColor,
  titleCardColor,
  boxShadow,
  title3Color,
  title2Color
} from '../../../styles/js/theme';
/// THEME END

/// SERVICES
import { setDataToLocalStorage } from '@/src/services/localStorage.service';
/// SEVICES END

/// i18n
import { useTranslation } from 'react-i18next';
import { NAMESPACE_KEY as i18nGeneralData } from '../../../i18n/generalData/i18n';
import { NAMESPACE_KEY as i18nGlobal } from '../../../i18n/globals/i18n';
/// i18n END

const Typography = styled(MuiTypography)({
  fontFamily: poppinsFontFamily,
  fontStyle: 'normal',
  fontWeight: 'normal'
});

const CardContent = styled(MuiCardContent)({
  paddingTop: 0
});

const useStyles = makeStyles({
  root: {
    width: '100%',
    borderRadius: 16,
    boxShadow: boxShadow
  },
  titleText: {
    fontSize: 16,
    letterSpacing: '0.15px',
    lineHeight: '175%',
    fontWeight: 400,
    color: titleCardColor
  },
  valueText: {
    fontSize: 34,
    letterSpacing: '0.25px',
    lineHeight: '123.5%',
    fontWeight: 400,
    color: textValueCardColor
  },
  valueUnitText: {
    fontSize: 16,
    letterSpacing: '0.15px',
    lineHeight: '150%',
    fontWeight: 400,
    marginLeft: 3,
    marginBottom: 5,
    color: textValueCardColor
  },
  cardLabelText: {
    fontSize: 12,
    letterSpacing: '0.4px',
    lineHeight: '166%',
    fontWeight: 400,
    color: title3Color
  },
  cardValueText: {
    fontSize: 12,
    letterSpacing: '0.4px',
    lineHeight: '166%',
    fontWeight: 400,
    color: title2Color
  }
});
type IProps = {
  icon: JSX.Element;
  title: string;
  value: number | string;
  route?: string;
  time?: string;
  doctorName?: string;
  tab: number;
  unit: string;
};

export default function MeasurementCard({
  title,
  value,
  route,
  time,
  tab,
  icon,
  unit,
  doctorName
}: IProps): JSX.Element {
  const classes = useStyles();
  const router = useRouter();
  const { t } = useTranslation([i18nGeneralData, i18nGlobal]);

  const redirectTo = () => {
    setDataToLocalStorage('cardSelected', tab.toString());
    route && router.push(route);
  };

  return (
    <Card className={classes.root} onClick={redirectTo}>
      <CardHeader
        title={
          <Box>
            <Grid container direction="row" justify="space-between" alignItems="center">
              <Grid item>
                <Grid container direction="row" justify="center" alignItems="center">
                  <Grid item>{icon}</Grid>
                  <Grid item>
                    <Typography className={classes.titleText} color="textSecondary">
                      {title}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <Grid container justify="flex-end" alignItems="flex-end">
                  <Typography className={classes.valueText} color="textSecondary">
                    {value}
                  </Typography>
                  <Typography className={classes.valueUnitText} color="textSecondary">
                    {unit}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        }
      />
      <CardContent>
        <Box pb={3}>
          <Divider />
        </Box>
        <Typography className={classes.cardLabelText}>{t('content.measurement_date')}</Typography>
        <Typography className={classes.cardValueText}>{time || t('content.noRegistry')}</Typography>
        <Box mt={1}>
          <Typography className={classes.cardLabelText}>{t('content.created_by')}</Typography>
          <Typography className={classes.cardValueText}>
            {doctorName || t('content.noRegistry')}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}
