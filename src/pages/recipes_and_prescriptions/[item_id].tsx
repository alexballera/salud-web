/// BASE IMPORTS
import { useEffect, useState } from 'react';
import Link from 'next/link';
/// BASE IMPORTS END

/// OWN COMPONENTS
import SimpleCardList from '../../components/common/SimpleCardList';
import CardCollapse from '../../components/common/CardCollapse';
import YearSlider from '../../components/common/YearSlider';
/// OWN COMPONENTS END

/// STYLES
import { makeStyles, createStyles, styled } from '@material-ui/core/styles';
import { poppinsFontFamily, secondaryMainColor } from '../../styles/js/theme';
/// STYLES END

/// MATERIAL UI
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
/// MATERIAL UI END

/// i18n
import { useTranslation } from 'react-i18next';
import { NAMESPACE_KEY as i18nRecipes } from '../../i18n/recipes_and_prescriptions/i18n';
import { NAMESPACE_KEY as i18nGlobal } from '../../i18n/globals/i18n';
/// i18n END

/// TYPES
import type { TListItem } from '../../components/common/SimpleCardList/types';
import type { NextPageContext } from 'next/';
/// / TYPES END

const ArrowRight = styled(ArrowForwardIcon)({
  color: secondaryMainColor
});

const CustomCard = styled(Card)({
  boxShadow: '0px 4px 8px rgba(207, 225, 227, 0.5)',
  borderRadius: '16px'
});

const useStyles = makeStyles(() =>
  createStyles({
    year: {
      fontFamily: poppinsFontFamily,
      fontStyle: 'normal',
      fontWeight: 'normal',
      lineHeight: '266%',
      letterSpacing: '1px',
      fontSize: '12px',
      marginBottom: '10px',
      margin: 0,
      textTransform: 'uppercase',
      color: '#4D5759'
    },
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
    cardTitleBg: {
      backgroundColor: 'rgba(187, 154, 253, 0.1)',
      display: 'inline-block',
      borderRadius: 64,
      padding: 2,
      paddingLeft: 6,
      paddingRight: 6
    },
    cardTitle: {
      color: '#AB82FF',
      font: poppinsFontFamily,
      textAlign: 'left',
      fontStyle: 'normal',
      fontWeight: 'normal',
      lineHeight: '150%',
      letterSpacing: '0.15px',
      fontSize: '16px',
      width: 'fit-content'
    },
    cardResult: {
      font: poppinsFontFamily,
      textAlign: 'left',
      fontStyle: 'normal',
      fontWeight: 'normal',
      lineHeight: '143%',
      letterSpacing: '0.15px',
      fontSize: 14,
      color: '#67777A'
    },
    cardDate: {
      font: poppinsFontFamily,
      textAlign: 'left',
      fontStyle: 'normal',
      fontWeight: 'normal',
      lineHeight: '166%',
      letterSpacing: '0.4px',
      fontSize: 12,
      color: '#A4B6BA',
      marginTop: '4px'
    },
    cardDoctor: {
      font: poppinsFontFamily,
      textAlign: 'left',
      fontStyle: 'normal',
      fontWeight: 'normal',
      lineHeight: '143%',
      letterSpacing: '0.15px',
      fontSize: 14,
      color: '#455255'
    },
    showMoreLink: {
      font: poppinsFontFamily,
      textAlign: 'left',
      fontStyle: 'normal',
      fontWeight: 500,
      textDecoration: 'none',
      lineHeight: '22px',
      letterSpacing: '0.46px',
      fontSize: 13,
      color: '#0097A7'
    },
    noRecords: {
      font: poppinsFontFamily,
      fontStyle: 'normal',
      fontWeight: 'normal',
      lineHeight: '166%',
      letterSpacing: '0.4px',
      fontSize: '12px',
      color: '#A1ADB0'
    }
  })
);

type TMyCard = {
  type: string;
  date: string;
  doctorName: string;
  result: string;
};

type TMounts = {
  [key: string]: TMyCard[];
}[];

type TItem = {
  year: number;
  mounts: TMounts;
};

type TProps = {
  items: TItem[];
};

function RecipeAndPrescriptionPage({ items }: TProps): JSX.Element {
  const classes = useStyles();
  const [selectedYear, setSelectedYear] = useState<null | number>(null);
  const [items2, setItems] = useState<TMounts>([]);
  const [isEmpty, setIsEmpy] = useState(false);
  const { t } = useTranslation([i18nRecipes, i18nGlobal]);

  useEffect(() => {
    console.log('selected year', selectedYear);
    if (selectedYear && items) {
      const childs = items.find(i => i.year === selectedYear);
      if (childs && childs.mounts) setItems(childs.mounts);
      else setItems([]);
    }
  }, [selectedYear]);

  return (
    <Grid container item xs={12}>
      <Grid item xs={12}>
        <Box px={3} pb={4} style={{ background: '' }}>
          {/* <Typography variant="h1" className={classes.title}>
            {t('title')}
          </Typography> */}
          <YearSlider
            itemClick={item => {
              setSelectedYear(item);
            }}
          />
          {!items2.length && (
            <Typography className={classes.noRecords}>
              {t('no_records', { ns: i18nRecipes })}
            </Typography>
          )}
          {items2.map(i => {
            const title = Object.keys(i)[0];
            const values = Object.values(i)[0] as TMyCard[];
            return (
              <>
                <Typography className={classes.year}>
                  {t(`months.${title}`, { ns: i18nGlobal })}
                </Typography>
                {values.map((item, idx) => {
                  return (
                    <Box mb={2} key={idx}>
                      <CustomCard key={idx}>
                        <CardHeader
                          title={
                            <Box className={classes.cardTitleBg}>
                              <Typography className={classes.cardTitle}>{item.type}</Typography>
                            </Box>
                          }
                        />
                        <CardContent>
                          <Typography className={classes.cardResult}>{item.result}</Typography>
                          <Typography className={classes.cardDate}>{item.date}</Typography>
                          <Box mt={4}>
                            <Grid
                              container
                              direction="row"
                              alignItems="center"
                              justify="space-between"
                            >
                              <Typography className={classes.cardDoctor}>
                                {item.doctorName}
                              </Typography>
                              <Grid direction="row">
                                <Link href="/recipes_and_prescriptions/preview/xz4dfdsf3432">
                                  <a className={classes.showMoreLink}>Ver más</a>
                                </Link>
                                <ArrowRight />
                              </Grid>
                            </Grid>
                          </Box>
                        </CardContent>
                      </CustomCard>
                    </Box>
                  );
                })}
              </>
            );
          })}
        </Box>
      </Grid>
    </Grid>
  );
}

RecipeAndPrescriptionPage.getInitialProps = async ({ query }: NextPageContext) => {
  // eslint-disable-next-line camelcase
  const { item_id } = query;
  const items: TItem[] = [
    {
      year: 2022,
      mounts: [
        {
          january: [
            {
              type: 'Preescripción',
              result: 'Paracetamol',
              date: 'Fecha: 01 feb, 2022',
              doctorName: 'Dra. Clotilde Miraflores'
            },
            {
              type: 'Receta',
              result: 'Panadol extra fuerte',
              date: 'Fecha: 01 feb, 2022',
              doctorName: 'Dra. Clotilde Miraflores'
            }
          ]
        },
        {
          march: [
            {
              type: 'Receta',
              result: 'Panadol extra fuerte',
              date: 'Fecha: 01 feb, 2022',
              doctorName: 'Dra. Clotilde Miraflores'
            }
          ]
        }
      ]
    },
    {
      year: 2020,
      mounts: [
        {
          september: [
            {
              type: 'Preescripción',
              result: 'Paracetamol',
              date: 'Fecha: 01 feb, 2022',
              doctorName: 'Dra. Clotilde Miraflores'
            },
            {
              type: 'Receta',
              result: 'Panadol extra fuerte',
              date: 'Fecha: 01 feb, 2022',
              doctorName: 'Dra. Clotilde Miraflores'
            }
          ]
        },
        {
          december: [
            {
              type: 'Receta',
              result: 'Panadol extra fuerte',
              date: 'Fecha: 01 feb, 2022',
              doctorName: 'Dra. Clotilde Miraflores'
            }
          ]
        }
      ]
    }
  ];
  return {
    items
  };
};

export default RecipeAndPrescriptionPage;
