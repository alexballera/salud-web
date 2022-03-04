import React from 'react';
import Link from 'next/link';
import { createStyles, makeStyles, styled } from '@mui/styles';
import { poppinsFontFamily } from '../../../styles/js/theme';
import { Box, Card, CardContent, CardHeader, Grid, Typography } from '@mui/material';
import { ArrowRight } from '@mui/icons-material';

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
const CustomCard = styled(Card)({
  boxShadow: '0px 4px 8px rgba(207, 225, 227, 0.5)',
  borderRadius: 16
});
const CardComponent = () => {
  const classes = useStyles();

  return (
    <Box mb={2}>
      <CustomCard>
        <CardHeader
          title={
            <Box className={classes.cardTitleBg}>
              <Typography className={classes.cardTitle}>Tipo</Typography>
            </Box>
          }
        />
        <CardContent>
          <Typography className={classes.cardResult}>Resultado</Typography>
          <Typography className={classes.cardDate}>Fecha</Typography>
          <Box mt={4}>
            <Grid container direction="row" alignItems="center" justify="space-between">
              <Typography className={classes.cardDoctor}>Nombre doctor</Typography>
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
};
export default CardComponent;
