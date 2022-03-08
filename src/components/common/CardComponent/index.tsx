/// BASE IMPORTS
import React from 'react';
/// BASE IMPORTS

/// MUI COMPONENTS
import { Button, Card, CardActions, CardContent, Chip, Stack, Typography } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
/// MUI COMPONENTS END

/// STYLES
import { ThemeProvider } from '@mui/material/styles';
import { cardStyles } from './styles.module';
import { boxShadow, purpleLight } from '@/src/styles/js/theme';
import muiTheme from '@/src/styles/js/muiTheme';
/// STYLES END

/// i18n
import { useTranslation } from 'react-i18next';
import { NAMESPACE_KEY as i18Globals } from '@/src/i18n/globals/i18n';
/// i18n END

/// TYPES
import { TCard } from './card.types';
/// TYPES END

const CardComponent = (props: TCard): JSX.Element => {
  const { type, name, date, performer, callToAction } = props;
  const classes = cardStyles();
  const { t } = useTranslation(i18Globals);

  const handleClick = () => {
    callToAction();
  };

  const getCardDate = (date: string) => {
    const toDate = new Date(date);
    const year = toDate.getFullYear();
    const day = toDate.getDay();
    const month = toDate.getMonth().toLocaleString();
    if (!month || !year || !day) {
      return t('invalid_date_format');
    }
    return `${day.toString().padStart(2, '0')} ${t(`months.${month}`).substring(0, 3)} ${year}`;
  };

  return (
    <ThemeProvider theme={muiTheme}>
      <Card
        sx={{ borderRadius: 4, boxShadow: boxShadow, height: 155, p: 1.75 }}
        className={classes.card}
      >
        <CardContent sx={{ padding: 0 }}>
          <Chip
            label={type}
            size="small"
            sx={{ backgroundColor: 'rgba(187, 154, 253, 0.1)', color: purpleLight }}
          />
          <Typography
            variant="h2"
            component="div"
            sx={{ fontSize: 14, color: '#67777A', mt: 2, mb: 0.5 }}
          >
            {name}
          </Typography>
          <Typography
            variant="body1"
            component="div"
            sx={{ fontSize: 12, color: '#A4B6BA', mb: 2.75 }}
          >
            {t('label.date', { ns: i18Globals })}: {getCardDate(date)}
          </Typography>
        </CardContent>
        <CardActions sx={{ padding: 0 }}>
          <Stack direction="row" justifyContent="space-between" sx={{ width: '100%' }}>
            <Typography variant="body1" component="div" className={classes.performer}>
              {performer}
            </Typography>
            <Button
              size="small"
              color="secondary"
              endIcon={<ArrowForwardIcon />}
              onClick={() => handleClick()}
            >
              {t('button.show_more', { ns: i18Globals })}
            </Button>
          </Stack>
        </CardActions>
      </Card>
    </ThemeProvider>
  );
};
export default CardComponent;
