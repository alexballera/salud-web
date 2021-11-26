import React from 'react';
import Link from 'next/link';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  createStyles,
  Divider,
  Grid,
  makeStyles,
  Theme,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemIcon
} from '@material-ui/core';
import SvgContainer from '../../components/common/SvgContainer';
import SvgSubscription from '../../components/common/Svg/SvgSubscription.component';
import SvgSubscriptionBottom from '../../components/common/Svg/SvgSubscriptionBottom.component';
import AutorenewIcon from '@material-ui/icons/Autorenew';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import CheckIcon from '@material-ui/icons/Check';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import SentimentSatisfiedAltIcon from '@material-ui/icons/SentimentSatisfiedAlt';

/// i18n
import { useTranslation } from 'react-i18next';
import { NAMESPACE_KEY } from '../../i18n/subscriptions/i18n';
/// i18n END

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      backgroundColor: 'rgb(0, 151, 167)',
      minWidth: 275
    },
    cardContent: {
      paddingTop: '0px !important'
    },
    chip: {
      fontSize: 14
    },
    containerText: {
      alignItems: 'end'
    },
    text: {
      order: 1,
      [theme.breakpoints.up('xs')]: {
        order: 0
      }
    },
    containerSvg: {
      textAlign: 'right'
    },
    containerActions: {
      padding: 16
    },
    divider: {
      marginBottom: 24,
      marginTop: 24
    },
    title: {
      color: 'white',
      marginTop: '0.35em'
    },
    subtitle: {
      color: 'rgba(0, 0, 0, 0.87)',
      fontSize: 14,
      marginBottom: 24,
      marginTop: 24
    },
    description: {
      color: 'rgb(255, 255, 255)',
      fontWeight: 'normal',
      fontSize: 12
    },
    colorWhite: {
      color: 'white'
    },
    helpContainer: {
      marginTop: 24
    },
    helpTitle: {
      color: 'rgba(0, 0, 0, 0.87)',
      fontSize: 16
    },
    helpLink: {
      color: theme.palette.secondary.light,
      fontWeight: 500,
      textDecoration: 'none',
      '&:hover': {
        color: theme.palette.secondary.light
      }
    }
  })
);

const SubscriptionPlan = (): JSX.Element => {
  const { t } = useTranslation(NAMESPACE_KEY, { keyPrefix: 'subscriptions' });
  const classes = useStyles();
  const benefits = [
    {
      icon: <PlayCircleOutlineIcon />,
      text: `${t('plan_benefit1')}`
    },
    {
      icon: <ChatBubbleOutlineIcon />,
      text: `${t('plan_benefit2')}`
    },
    {
      icon: <SentimentSatisfiedAltIcon />,
      text: `${t('plan_benefit3')}`
    }
  ];
  return (
    <>
      <Card className={classes.card}>
        <CardContent className={classes.cardContent}>
          <Grid container justify="space-between" className={classes.containerText}>
            <Grid item xs={3} className={classes.text}>
              <Chip
                size="small"
                label={t('plan_actual')}
                color="secondary"
                className={classes.chip}
              />
            </Grid>
            <Grid item xs={9} className={classes.containerSvg}>
              <Box>
                <SvgContainer title="Subscription Svg" width={227} height={179}>
                  <SvgSubscription />
                </SvgContainer>
              </Box>
            </Grid>
          </Grid>

          <Typography variant="h6" component="h6" gutterBottom className={classes.title}>
            Orientación médica desde donde estés
          </Typography>

          <Divider className={classes.divider} />

          <Typography variant="h6" component="h6" gutterBottom className={classes.description}>
            Modalidad (individual)
          </Typography>

          <Typography variant="h6" component="h6" gutterBottom className={classes.description}>
            Próxima fecha de pago: 23 de Abril
          </Typography>
        </CardContent>
        <CardActions className={classes.containerActions}>
          <Button
            variant="outlined"
            color="primary"
            className={classes.colorWhite}
            startIcon={<AutorenewIcon className={classes.colorWhite} />}
          >
            {t('plan_change')}
          </Button>
        </CardActions>
      </Card>

      <Grid container>
        <Grid item xs={12}>
          <Typography variant="h6" component="h6" gutterBottom className={classes.subtitle}>
            {t('plan_benefits')}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <List component="nav" aria-label="main mailbox folders">
            {benefits.map((item, index) => (
              <ListItem key={index}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
                <ListItemIcon>
                  <CheckIcon color="secondary" />
                </ListItemIcon>
              </ListItem>
            ))}
          </List>
        </Grid>
      </Grid>

      <Divider className={classes.divider} />

      <Grid container alignItems="center" className={classes.helpContainer}>
        <Grid item xs={5}>
          <Box>
            <Typography variant="h6" component="h6" gutterBottom className={classes.helpTitle}>
              {t('help')}
            </Typography>
          </Box>
          <Box>
            <Link href="/help" passHref>
              <a className={classes.helpLink}>{t('help_link')}</a>
            </Link>
          </Box>
        </Grid>
        <Grid item xs={7} className={classes.containerSvg}>
          <SvgContainer title="Subscription Bottom Svg" width={140} height={116}>
            <SvgSubscriptionBottom />
          </SvgContainer>
        </Grid>
      </Grid>
    </>
  );
};

export default SubscriptionPlan;
