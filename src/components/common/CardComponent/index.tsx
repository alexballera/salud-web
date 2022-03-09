/// BASE IMPORTS
import React from 'react';
import Link from 'next/link';
/// BASE IMPORTS

/// MUI COMPONENTS
import { Button, Card, CardActions, CardContent, Chip, Stack, Typography } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
/// MUI COMPONENTS END

/// STYLES
import { ThemeProvider } from '@mui/material/styles';
import { cardStyles } from './styles.module';
import {
  boxShadow,
  purpleLight,
  textValueCardColor,
  textValueCardColor2
} from '@/src/styles/js/theme';
import muiTheme from '@/src/styles/js/muiTheme';
/// STYLES END

/// i18n
import { useTranslation } from 'react-i18next';
import { NAMESPACE_KEY as i18Globals } from '@/src/i18n/globals/i18n';
import { NAMESPACE_KEY as i18nRecipes } from '@/src/i18n/recipes_and_prescriptions/i18n';
/// i18n END

/// TYPES
import { TCard } from './card.types';
/// TYPES END

const CardComponent = (props: TCard): JSX.Element => {
  const { type, name, date, performer, redirectTo } = props;
  const classes = cardStyles();
  const { t } = useTranslation([i18Globals, i18nRecipes]);

  const getCardDate = (date: string): string => {
    const toDate = new Date(date);
    const year = toDate.getFullYear();
    const day = toDate.getDay();
    const month = toDate.getMonth();
    if (!month || !year || !day) {
      return `${t('invalid_date_format', { ns: i18nRecipes })}`;
    }
    return `${day.toString().padStart(2, '0')} ${t(`months.${month}`).substring(0, 3)}, ${year}`;
  };

  return (
    <ThemeProvider theme={muiTheme}>
      <Card
        sx={{ borderRadius: 4, boxShadow: boxShadow, height: 155, p: 1.75 }}
        className={classes.card}
      >
        <CardContent sx={{ padding: 0 }}>
          <Chip label={type} size="small" className={classes.chip} />
          <Typography
            variant="body2"
            component="div"
            sx={{ fontSize: 14, color: textValueCardColor, mt: 2, mb: 0.5, lineHeight: '143%' }}
          >
            {name}
          </Typography>
          <Typography
            variant="caption"
            component="div"
            sx={{
              fontSize: 12,
              color: textValueCardColor2,
              mb: 2.75,
              fontWeight: 'normal',
              lineHeight: '166%',

              letterSpacing: 0.4
            }}
          >
            {t('label.date', { ns: i18Globals })}:{' '}
            <span className={classes.date}>{getCardDate(date)}</span>
          </Typography>
        </CardContent>
        <CardActions sx={{ padding: 0 }}>
          <Stack direction="row" justifyContent="space-between" sx={{ width: '100%' }}>
            <Typography variant="body2" component="div" className={classes.performer}>
              {performer}
            </Typography>
            <Link href={redirectTo} passHref>
              <Button
                className={classes.link}
                size="small"
                color="secondary"
                endIcon={<ArrowForwardIcon />}
                sx={{ textTransform: 'inherit' }}
              >
                {t('button.show_more', { ns: i18Globals })}
              </Button>
            </Link>
          </Stack>
        </CardActions>
      </Card>
    </ThemeProvider>
  );
};
export default CardComponent;
