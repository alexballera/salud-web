/// BASE IMPORTS
import { useState } from 'react';
/// BASE IMPORTS END

/// OWN COMPONENTS
import SimpleCardList from '../../../components/common/SimpleCardList';
import CardCollapse from '../../../components/common/CardCollapse';
/// OWN COMPONENTS END

/// STYLES
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { poppinsFontFamily, secondaryMainColor } from '../../../styles/js/theme';
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
import { NAMESPACE_KEY } from '../../../i18n/recipes_and_prescriptions/i18n';
/// i18n END

/// TYPES
import type { TListItem } from '../../../components/common/SimpleCardList/types';
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
    },
    boxSpacing: {
      marginTop: 24
    },
    footerCard: {
      borderRadius: 8,
      boxShadow: 'none'
    },
    footerCardTitle: {
      fontFamily: poppinsFontFamily,
      fontFtyle: 'normal',
      fontWeight: 'normal',
      fontSize: 14,
      lineHeight: '143%',
      letterSpacing: '0.15px',
      color: '#A1ADB0'
    },
    footerCardDescription: {
      fontFamily: poppinsFontFamily,
      fontFtyle: 'normal',
      fontWeight: 'normal',
      fontSize: 14,
      lineHeight: '143%',
      letterSpacing: '0.15px',
      color: '#4D5759',
      marginTop: 8
    }
  })
);

function RecipeAndPrescriptionPage({ items }: TProps): JSX.Element {
  const classes = useStyles();
  const { t } = useTranslation(NAMESPACE_KEY);
  const [itemDetails, setItemDetails] = useState<string | null>('');

  const handleSimpleListClick = (values: TListItem) => {
    console.log('values', values);
    if (values && values.title) {
      setItemDetails(values.title);
    }
  };

  const formatMainCardData = () => {
    return [];
  };

  return (
    <Grid container item xs={12}>
      <Grid item xs={12}>
        <Box px={3} py={4}>
          <Typography variant="h1" className={classes.title}>
            {t('title')}
          </Typography>

          <Box className={classes.boxSpacing}>
            <SimpleCardList
              title="asdf"
              titleStyles={{ backgroundColor: 'red', color: 'blue' }}
              itemClick={handleSimpleListClick}
              items={items}
            />
          </Box>

          <Box className={classes.boxSpacing}>
            <CardCollapse title="Loratadina" items={items} itemClick={handleSimpleListClick} />
          </Box>

          <Box className={classes.boxSpacing}>
            <CardCollapse
              isExpanded
              title="Loratadina"
              items={[{ value: 'asdfas' }]}
              itemClick={handleSimpleListClick}
            />
          </Box>

          {itemDetails && (
            <Box className={classes.boxSpacing}>
              <Card className={classes.footerCard}>
                <CardContent>
                  <Typography className={classes.footerCardTitle} variant="h2">
                    {t('sub_title')}
                  </Typography>
                  <Typography className={classes.footerCardDescription} variant="body1">
                    Consumir en ayunas. Suspender consumo de alcohol durante el tratamiento
                  </Typography>
                </CardContent>
              </Card>
            </Box>
          )}
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
