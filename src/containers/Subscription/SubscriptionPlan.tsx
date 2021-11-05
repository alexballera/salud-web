import React from 'react';
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
  Typography
} from '@material-ui/core';
import SvgContainer from '../../components/common/SvgContainer';
import SvgSubscription from '../../components/common/Svg/SvgSubscription.component';
import SvgSubscriptionBottom from '../../components/common/Svg/SvgSubscriptionBottom.component';
import AutorenewIcon from '@material-ui/icons/Autorenew';
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
      [theme.breakpoints.up('sm')]: {
        order: 0
      }
    },
    containerSvg: {
      textAlign: 'right',
      width: '100%'
    },
    containerActions: {
      padding: 16
    },
    divider: {
      marginBottom: '0.35em'
    },
    title: {
      color: 'white',
      marginTop: '0.35em'
    },
    description: {
      color: 'rgb(255, 255, 255)',
      fontWeight: 'normal',
      fontSize: 12
    },
    colorWhite: {
      color: 'white'
    }
  })
);

const SubscriptionPlan = (): JSX.Element => {
  const classes = useStyles();
  return (
    <>
      <Card className={classes.card}>
        <CardContent className={classes.cardContent}>
          <Grid container justify="space-between" className={classes.containerText}>
            <Grid item sm={2} className={classes.text}>
              <Chip size="small" label="Plan actual" color="secondary" className={classes.chip} />
            </Grid>
            <Grid item sm={10} className={classes.containerSvg}>
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
            Cambiar de plan
          </Button>
        </CardActions>
      </Card>
      <SvgContainer title="Subscription Bottom Svg" width={140} height={116}>
        <SvgSubscriptionBottom />
      </SvgContainer>
    </>
  );
};

export default SubscriptionPlan;
