/// MATERIAL UI
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import MuiTypography from '@material-ui/core/Typography';
import MuiCardContent from '@material-ui/core/CardContent';
import MuiLink from '@material-ui/core/Link';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import { makeStyles, CardProps, Avatar, Grid } from '@material-ui/core';
import { styled } from '@material-ui/styles';
/// MATERIAL UI END

/// i18n
import { useTranslation } from 'react-i18next';
import { NAMESPACE_KEY } from '../../../i18n/globals/i18n';
/// i18n END

/// STYLES
import {
  secondaryMainColor,
  poppinsFontFamily,
  boxShadow,
  titlePageColor,
  activeActionColor,
  chipInactiveTextColor,
  purpleLight,
  titleCardTagBg
} from '../../../styles/js/theme';
/// STYLES END

type TProps = {
  title: string;
  cardProps?: CardProps;
  subheader: string;
  avatarSrc: string;
  redirectTo: string;
  specialty: string;
  priceText: string;
  price: string;
};

const Typography = styled(MuiTypography)({
  font: poppinsFontFamily,
  fontStyle: 'normal',
  fontWeight: 400
});

const CardContent = styled(MuiCardContent)({
  paddingTop: 0
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

const useStyles = makeStyles({
  card: {
    boxShadow,
    borderRadius: 12
  },
  title: {
    fontSize: 14,
    lineHeight: '143%',
    letterSpacing: '0.15px',
    color: titlePageColor
  },
  subHeader: {
    fontSize: 14,
    lineHeight: '143%',
    letterSpacing: '0.15px',
    color: activeActionColor
  },
  tagContainer: {
    background: titleCardTagBg,
    padding: '0px 6.5px',
    borderRadius: 64,
    display: 'inline-block'
  },
  tag: {
    fontSize: 12,
    lineHeight: '20px',
    letterSpacing: '0.14px',
    color: purpleLight
  },
  priceText: {
    fontSize: 12,
    lineHeight: '20px',
    letterSpacing: '0.4px',
    color: chipInactiveTextColor,
    marginTop: '12.5px',
    marginBottom: '4px'
  },
  price: {
    fontSize: 14,
    lineHeight: '143%',
    letterSpacing: '0.15px',
    color: titlePageColor
  },
  redirectLink: {
    cursor: 'pointer'
  }
});

function CardCollapse({
  title,
  subheader,
  avatarSrc,
  redirectTo,
  specialty,
  priceText,
  price,
  cardProps = { style: { marginBottom: 24 } }
}: TProps): JSX.Element {
  const classes = useStyles();
  const { t } = useTranslation(NAMESPACE_KEY);
  return (
    <Card className={classes.card} {...cardProps}>
      <CardHeader
        title={<Typography className={classes.title}>{title}</Typography>}
        subheader={<Typography className={classes.subHeader}>{subheader}</Typography>}
        avatar={<Avatar src={avatarSrc} alt={title} />}
      />
      <CardContent>
        <span className={classes.tagContainer}>
          <Typography variant="body2" className={classes.tag}>
            {specialty}
          </Typography>
        </span>
        <Typography variant="body2" className={classes.priceText}>
          {priceText}
        </Typography>
        <Grid container justify="space-between" alignItems="center">
          <Grid item>
            <Typography variant="body2" className={classes.price}>
              {price}
            </Typography>
          </Grid>
          <Grid item>
            <CustomMuiLink underline="none" href={redirectTo}>
              <Grid container direction="row" className={classes.redirectLink}>
                {t('button.show_more')}
                <ArrowRight />
              </Grid>
            </CustomMuiLink>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

export default CardCollapse;
