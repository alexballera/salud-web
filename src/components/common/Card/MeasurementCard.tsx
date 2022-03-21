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
import { setDataToLocalStorage } from '@/src/services/localStorage.service';

/// i18n
import { useTranslation } from 'react-i18next';
import { NAMESPACE_KEY } from '../../../i18n/globals/i18n';

import { isValid, parseISO, format } from 'date-fns';

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
    color: textSmallCardColor
  }
});
type IProps = {
  title?: string;
  value: number | string;
  type?: string;
  noSVG?: boolean;
  route?: string;
  tab?: number;
  time?: string;
};

export default function MeasurementCard({
  title,
  value,
  type,
  noSVG = false,
  route,
  tab,
  time
}: IProps) {
  const classes = useStyles();
  const router = useRouter();
  const { t } = useTranslation(NAMESPACE_KEY);

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

  const getCardDate = (date: string) => {
    const toDate = parseISO(date);

    if (!isValid(toDate)) {
      return t('invalid_date_format');
    }

    const year = toDate.getFullYear();
    const day = toDate.getDate().toString();
    const month = toDate.getMonth();
    return `${day.padStart(2, '0')} ${t(`months.${month}`).substring(0, 3).toLowerCase()}, ${year}`;
  };

  const getCardHours = (date: string) => {
    const toDate = parseISO(date);

    if (!isValid(toDate)) {
      return t('invalid_date_format');
    }

    return `${format(toDate, 'hh:mm aaaa')}`;
  };

  const redirectTo = () => {
    setDataToLocalStorage('cardSelected', tab.toString());
    route && router.push(route);
  };
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
          {getCardDate(time)}
          <br />
          {getCardHours(time)}
        </Typography>
      </CardContent>
    </Card>
  );
}
