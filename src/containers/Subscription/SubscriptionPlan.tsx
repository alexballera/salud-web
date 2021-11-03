import React from 'react';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  makeStyles,
  Typography
} from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    backgroundColor: 'rgb(0, 151, 167)',
    minWidth: 275
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)'
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  }
});

const SubscriptionPlan = (): JSX.Element => {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          Word of the Day
        </Typography>
        <Typography variant="h5" component="h2">
          be
        </Typography>

        <Divider />
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
};

export default SubscriptionPlan;
