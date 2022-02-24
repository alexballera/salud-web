/// BASE IMPORTS
import { useState } from 'react';
/// BASE IMPORTS END

/// OWN COMPONENTS
import SimpleCardList from '../../components/common/SimpleCardList';
import CardCollapse from '../../components/common/CardCollapse';
import YearSlider from '../../components/common/YearSlider';
/// OWN COMPONENTS END

/// STYLES
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { poppinsFontFamily, secondaryMainColor } from '../../styles/js/theme';
/// STYLES END

/// MATERIAL UI
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
/// MATERIAL UI END

/// i18n
import { useTranslation } from 'react-i18next';
import { NAMESPACE_KEY } from '../../i18n/recipes_and_prescriptions/i18n';
/// i18n END

/// TYPES
import type { TListItem } from '../../components/common/SimpleCardList/types';
import type { NextPageContext } from 'next/';
/// / TYPES END

type TProps = {
  items: TListItem[];
};

const useStyles = makeStyles(() =>
  createStyles({
    title: {
      fontFamily: poppinsFontFamily,
      fontStyle: 'normal',
      fontWeight: 'normal',
      lineHeight: '150%',
      letterSpacing: '0.15px',
      fontSize: 16,
      marginBottom: 16,
      margin: 0
    }
  })
);

function RecipeAndPrescriptionPage({ items }: TProps): JSX.Element {
  const classes = useStyles();
  const { t } = useTranslation(NAMESPACE_KEY);

  return (
    <Grid container item xs={12}>
      <Grid item xs={12}>
        <Box px={3} py={4}>
          <YearSlider />
          <Typography variant="h1" className={classes.title}>
            {t('title')}
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
}

RecipeAndPrescriptionPage.getInitialProps = async ({ query }: NextPageContext) => {
  // eslint-disable-next-line camelcase
  const { item_id } = query;
  console.log('itemid', item_id);
  const items: TListItem[] = [
    { title: 'tag', value: 'uno' },
    { title: 'date', value: 'tres' },
    { title: 'reportBy', value: 'cuatro' },
    { title: 'specialty', value: 'cinco' }
  ];
  return {
    items
  };
};

export default RecipeAndPrescriptionPage;
