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
import { useRouter } from 'next/router';

const useStyles = makeStyles({
  root: {
    minWidth: 124,
    minHeight: 160,
    borderRadius: 16,
    boxShadow: '0px 4px 8px rgba(207, 225, 227, 0.5)'
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
  },
  mediumText: {
    marginTop: 0,
    fontFamily: poppinsFontFamily,
    fontStyle: 'normal',
    fontSize: 12,
    color: textValueCardColor
  }
});
type IProps = {
  title?: string
  value: string
  type?: string
  noSVG?: boolean
  route?: string
}

export default function MeasurementCard({ title, value, type, noSVG = false, route}: IProps) {
  const classes = useStyles();
  const router = useRouter();

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

  const redirectTo = () => {
    route && router.push(route)
  }
  return (
    <Card className={classes.root} onClick={redirectTo}>
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          {!noSVG && getSvg(type)}
          {title}
        </Typography>
        <Typography className={classes.textValue}>{value}</Typography>
        <Typography className={!noSVG ? classes.smallText : classes.mediumText}>
          {!noSVG && 'Última medición:'}
          <br />
          01 feb, 2022
          <br />
          1:32 pm.
        </Typography>
      </CardContent>
    </Card>
  );
}
