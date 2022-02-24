import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import SvgArterialPressure from '../Svg/SvgArterialPressure.component';
import SvgWeight from '../Svg/SvgWeight.component';
import SvgWater from '../Svg/SvgWater.component';
import {
  poppinsFontFamily,
  textSmallCardColor,
  textValueCardColor,
  titleCardColor
} from '../../../styles/js/theme';

const useStyles = makeStyles({
  root: {
    minWidth: 124,
    minHeight: 160,
    borderRadius: 16,
    boxShadow: '0px 4px 8px rgba(207, 225, 227, 0.5)',
    marginLeft: 8,
    marginRight: 8
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)'
  },
  title: {
    fontFamily: poppinsFontFamily,
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 16,
    letterSpacing: '0.15px',
    color: titleCardColor
  },
  pos: {
    marginBottom: 12
  },
  svgContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start'
  },
  textValue: {
    fontFamily: poppinsFontFamily,
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 24,
    color: textValueCardColor
  },
  smallText: {
    marginTop: 12,
    fontFamily: poppinsFontFamily,
    fontStyle: 'normal',
    fontSize: 10,
    color: textSmallCardColor
  }
});

export default function MeasurementCard({ title, value, type }) {
  const classes = useStyles();

  const getSvg = type => {
    switch (type) {
      case 'weight':
        return <SvgWeight />;
      case 'bloodGlocuse':
        return <SvgWater />;
      case 'arterialPressure':
        return <SvgArterialPressure />;
      default:
        break;
    }
  };

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          {getSvg(type)}
          {title}
        </Typography>
        <Typography className={classes.textValue}>{value}</Typography>
        <Typography className={classes.smallText}>
          Última medición:
          <br />
          01 feb, 2022
          <br />
          1:32 pm.
        </Typography>
      </CardContent>
    </Card>
  );
}
