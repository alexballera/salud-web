/// MATERIAL UI
import MuiCard from '@material-ui/core/Card';
import MuiCardHeader from '@material-ui/core/CardHeader';
import MuiTypography from '@material-ui/core/Typography';
import MuiCardContent from '@material-ui/core/CardContent';
import MuiLink from '@material-ui/core/Link';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core';
import { styled } from '@material-ui/styles';
/// MATERIAL UI END

/// STYLES
import {
  secondaryMainColor,
  poppinsFontFamily,
  titleCardTagBg,
  titleCardTagColor,
  textValueCardColor2,
  textValueCardColor,
  titlePageColor
} from '../../../styles/js/theme';
/// STYLES END

/// i18n
import { useTranslation } from 'react-i18next';
import { NAMESPACE_KEY } from '../../../i18n/globals/i18n';
/// i18n END

/// DATE-FNS
import { isValid, parseISO } from 'date-fns';
/// DATE-FNS END

const Card = styled(MuiCard)({
  boxShadow: '0px 4px 8px rgba(207, 225, 227, 0.5)',
  borderRadius: 16
});

const CardHeader = styled(MuiCardHeader)({
  paddingBottom: 0,
  '& span': {
    lineHeight: 0
  }
});

const CardContent = styled(MuiCardContent)({
  '&:last-child': {
    paddingBottom: 16
  }
});

const Typography = styled(MuiTypography)({
  fontFamily: poppinsFontFamily,
  fontStyle: 'normal',
  fontWeight: 'normal'
});

const CustomMuiLink = styled(MuiLink)({
  fontSize: 13,
  fontWeight: 500,
  lineHeight: '22px',
  letterSpacing: '0.46px',
  color: secondaryMainColor,
  '&:hover': {
    color: secondaryMainColor
  }
});

const ArrowRight = styled(ArrowForwardIcon)({
  color: secondaryMainColor,
  marginLeft: 11
});

type TProps = {
  title: string;
  text1: string;
  text2: string;
  reportedBy: string;
  action: () => void;
};

const useStyles = makeStyles({
  cardTitleBg: {
    backgroundColor: titleCardTagBg,
    display: 'inline-block',
    borderRadius: 64,
    padding: 2,
    paddingLeft: 6,
    paddingRight: 6
  },
  cardTitleText: {
    fontWeight: 500,
    fontSize: 12,
    lineHeight: '20px',
    letterSpacing: '0.14px',
    color: titleCardTagColor,
    width: 'fit-content'
  },
  cardDrug: {
    fontSize: 14,
    lineHeight: '143%',
    letterSpacing: '0.15px',
    color: textValueCardColor
  },
  cardDate: {
    fontSize: 12,
    lineHeight: '166%',
    letterSpacing: '0.4px',
    color: textValueCardColor2,
    textTransform: 'lowercase',
    marginTop: '4px'
  },
  cardDoctor: {
    fontSize: 14,
    lineHeight: '143%',
    letterSpacing: '0.15px',
    color: titlePageColor
  },
  cardFooter: {
    marginTop: 22
  },
  redirectLink: {
    cursor: 'pointer'
  }
});

function CardLink({ title, text1, text2, reportedBy, action }: TProps): JSX.Element {
  const { t } = useTranslation(NAMESPACE_KEY);
  const classes = useStyles();

  const getCardDate = (date: string) => {
    const toDate = parseISO(date);

    if (!isValid(toDate)) {
      return t('invalid_date_format');
    }

    const year = toDate.getFullYear();
    const day = toDate.getDate().toString();
    const month = toDate.getMonth();
    return `${day.padStart(2, '0')} ${t(`months.${month}`).substring(0, 3)} ${year}`;
  };

  return (
    <Card>
      <CardHeader
        title={
          <Box className={classes.cardTitleBg}>
            <Typography className={classes.cardTitleText}>{title}</Typography>
          </Box>
        }
      />
      <CardContent>
        <Typography className={classes.cardDrug}>{text1}</Typography>
        <Typography className={classes.cardDate}>{getCardDate(text2)}</Typography>
        <Box className={classes.cardFooter}>
          <Grid container direction="row" alignItems="center" justify="space-between">
            <Grid item>
              <Typography className={classes.cardDoctor}>{reportedBy}</Typography>
            </Grid>
            <Grid item>
              <Grid container direction="row" className={classes.redirectLink}>
                <CustomMuiLink underline="none" onClick={action}>
                  {t('button.show_more')}
                </CustomMuiLink>
                <ArrowRight />
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </CardContent>
    </Card>
  );
}

export default CardLink;
