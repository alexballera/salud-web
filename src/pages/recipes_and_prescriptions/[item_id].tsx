/// BASE IMPORTS
import { useState } from 'react';
/// BASE IMPORTS END

/// OWN COMPONENTS
import SimpleCardList from '../../components/common/SimpleCardList';
import { TitleContent } from '../../components/common/TitleContent';
/// OWN COMPONENTS END

/// STYLES
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { secondaryMainColor } from '../../styles/js/theme';
/// STYLES END

/// MATERIAL UI
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
/// MATERIAL UI END

/// i18n
import { useTranslation } from 'react-i18next';
import { NAMESPACE_KEY } from '../../i18n/recipes_and_prescriptions/i18n';
/// i18n END

/// TYPES
import { TListItem } from '../../components/common/SimpleCardList/types';
/// / TYPES END

const useStyles = makeStyles(() => createStyles({}));

function RecipeAndPrescriptionPage(): JSX.Element {
  const classes = useStyles();
  const { t } = useTranslation([NAMESPACE_KEY]);
  const [itemDetails, setItemDetails] = useState<string | null>('');

  return (
    <>
      <Grid container item xs={12}>
        <Grid item>
          <Box px={3} py={4}>
            <SimpleCardList
              title="Preescripción"
              itemClick={values => {
                const formatValues = values as any;
                if (formatValues && formatValues.title) {
                  setItemDetails(formatValues.title);
                }
              }}
              items={[
                { title: 'asdf', value: 'asf' },
                {
                  title: 'asdfasdf',
                  value:
                    't is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using'
                },
                {
                  title: 'asdfasdf',
                  value: '00000000000000is a long established'
                },

                { title: 'asdfasdf', value: 'asdfasdf' },
                { title: 'asdfasdf', value: 'asdfasdf' }
              ]}
            />

            {itemDetails && (
              <Box mt={6}>
                <Card variant="outlined">
                  <CardContent>
                    <TitleContent paragraph title={t('sub_title', { ns: NAMESPACE_KEY })} />
                    Consumir en ayunas. Suspender consumo de alcohol durante el tratamiento{' '}
                  </CardContent>
                </Card>
              </Box>
            )}
          </Box>
        </Grid>
      </Grid>
    </>
  );
}

export default RecipeAndPrescriptionPage;
