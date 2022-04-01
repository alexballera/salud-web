import React, { useEffect, useRef, useState } from 'react';
import { Badge, Box, Card, Grid, Typography } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import Chart from 'chart.js/auto';

import { NAMESPACE_KEY as i18nGeneralData } from '../../../../i18n/generalData/i18n';
import {
  secondaryLightColor,
  graphicGradientPrimary,
  graphicGradientSecondary,
  purple
} from '../../../../styles/js/theme';
import measurementGraphicStyles from './styles.module';
import moment from 'moment';
import 'moment/locale/es'; // Spanish

const MeasurementGraphic = ({ datos }: any): JSX.Element => {
  const canvasEl = useRef(null);
  const classes = measurementGraphicStyles();
  const { t } = useTranslation([i18nGeneralData]);

  const [days, setDays] = useState([]);

  useEffect(() => {
    /** extract dataPoints */
    const diastolic = datos.measurements?.map(item => item.diastolic);
    const systolic = datos.measurements?.map(item => item.systolic);

    const weight = datos.measurements?.map(item => item.value);
    const bloodGlocuse = datos.measurements?.map(item => item.value);

    /** set background primary KPI */
    const ctx = canvasEl.current.getContext('2d');
    const gradientArea = ctx.createLinearGradient(0, 16, 0, 600);
    gradientArea.addColorStop(0, graphicGradientPrimary);
    gradientArea.addColorStop(0.65, graphicGradientSecondary);

    /** prepare images indicators */
    const iconPrimary = new Image();
    const iconSecundary = new Image();
    iconPrimary.src = 'images/iconPrimary.svg';
    iconSecundary.src = 'images/iconSecundary.svg';

    const white = '#ffffff';
    /** create structure lines */
    const contentCharts = [];
    switch (datos.type) {
      case 'arterialPressure':
        contentCharts.push(
          {
            data: systolic,
            fill: true,
            lineTension: 0.5,
            backgroundColor: gradientArea,
            borderColor: secondaryLightColor,
            borderWidth: 4,
            pointStyle: iconPrimary
          },
          {
            data: diastolic,
            fill: false,
            lineTension: 0.5,
            borderColor: purple,
            borderWidth: 3,
            pointStyle: iconSecundary
            /* pointBackgroundColor: white,
            pointHoverRadius: 10,
            pointHoverBackgroundColor: white */
          }
        );
        break;
      case 'weight':
        contentCharts.push({
          data: weight,
          fill: true,
          lineTension: 0.5,
          backgroundColor: gradientArea,
          borderColor: secondaryLightColor,
          borderWidth: 4,
          pointStyle: iconPrimary
        });
        break;
      case 'bloodGlocuse':
        contentCharts.push({
          data: bloodGlocuse,
          fill: true,
          lineTension: 0.5,
          backgroundColor: gradientArea,
          borderColor: secondaryLightColor,
          borderWidth: 4,
          pointStyle: iconPrimary
        });
        break;
      default:
        contentCharts.push({
          data: [0, 0, 0, 0, 0, 0, 0],
          fill: true,
          lineTension: 0.5,
          backgroundColor: gradientArea,
          borderColor: secondaryLightColor,
          borderWidth: 4,
          pointStyle: iconPrimary
        });
        break;
    }

    const activeDate = datos.measurements?.map(item => moment(item.time).format('DD MMM yyyy'));
    setDays(activeDate);

    /** set structure lines and spaces */
    const data = {
      labels: ['', '', '', '', '', '', ''],
      datasets: contentCharts.reverse()
    };

    /** select active items with tooltips */
    function triggerTooltip(chart, itemsActive) {
      console.log(chart);
      console.log(itemsActive);
      chart.setActiveElements(itemsActive);
      const tooltip = chart.tooltip;
      if (tooltip.getActiveElements().length > 0) {
        console.log('entro aqui');
        tooltip.setActiveElements([], { x: 0, y: 0 });
        chart.update();
      } else {
        const chartArea = chart.chartArea;
        tooltip.setActiveElements(itemsActive, {
          x: (chartArea.left + chartArea.right) / 2,
          y: (chartArea.top + chartArea.bottom) / 2
        });
      }

      chart.update();
    }

    /** create chart with options */
    const myLineChart = new Chart(ctx, {
      type: 'line',
      data: data,
      options: {
        responsive: true,
        aspectRatio: 1.5,
        events: [],
        plugins: {
          legend: {
            display: false
          },
          title: {
            display: false
          },
          tooltip: {
            enabled: true,
            displayColors: false,
            backgroundColor: 'rgb(27 31 35 / 0%)',
            bodyColor: '#000',
            bodyFont: { weight: 'bold', size: 14 }
          }
        },
        elements: {
          point: {
            radius: 0
          }
        },
        scales: {
          x: {
            display: true,
            grid: {
              borderDash: [2, 10],
              color: '#0000001c'
            }
          },
          y: {
            display: false
          }
        },
        onClick(e) {
          const activePoints = myLineChart.getElementsAtEventForMode(
            e,
            'nearest',
            {
              intersect: true
            },
            false
          );
          if (activePoints.length > 0) {
            console.log(contentCharts.length);
            if (contentCharts.length === 2) {
              triggerTooltip(myLineChart, [
                { datasetIndex: 1, index: activePoints[0].index },
                { datasetIndex: 0, index: activePoints[0].index }
              ]);
            } else {
              triggerTooltip(myLineChart, [{ datasetIndex: 0, index: activePoints[0].index }]);
            }
          }
        }
      }
    });

    /* const monthName = moment('2022-07-17T21:01:03Z').format('MMMM');
    const dayName = moment('2022-07-17T21:01:03Z').format('dddd');
    const yearName = moment('2022-07-17T21:01:03Z').format('yyyy');
    const dateFormat = moment('2022-07-17T21:01:03Z').format('DD MMMM, yyyy');
    console.log(monthName);
    console.log(dayName);
    console.log(yearName);
    console.log(dateFormat); */

    /** end post render */
    return function cleanup() {
      myLineChart.destroy();
    };
  }, [datos]);

  return (
    <>
      <Card className={classes.cardMeasurement}>
        <canvas id="myChart" ref={canvasEl} className={classes.canvasStyle} />
        <Box mt={1}>
          <Grid container style={{ flexWrap: 'nowrap' }}>
            {days &&
              days.map((day, index) => (
                <Grid
                  item
                  key={index}
                  className={classes.typography12}
                  style={{ display: 'flex', justifyContent: 'flex-end' }}
                >
                  {day.replace('.', ',')}
                </Grid>
              ))}
          </Grid>
        </Box>
        <Box mt={2} ml={2} display="flex">
          <Box component="span" mr={2}>
            <Badge color="primary" variant="dot"></Badge>
          </Box>
          <Typography variant="body2">
            {datos.type === 'arterialPressure'
              ? t('graphic.systolicPressureRecording', { ns: i18nGeneralData })
              : datos.type === 'weight'
              ? t('graphic.weightRecords', { ns: i18nGeneralData })
              : datos.type === 'bloodGlocuse' &&
                t('graphic.bloodGlucoseRecords', { ns: i18nGeneralData })}
          </Typography>
        </Box>

        <Box my={1} ml={2} display="flex">
          {datos.type === 'arterialPressure' && (
            <>
              <Box component="span" mr={2}>
                <Badge color="secondary" variant="dot"></Badge>
              </Box>
              <Typography variant="body2">
                {t('graphic.diastolicPressureRecording', { ns: i18nGeneralData })}
              </Typography>
            </>
          )}
        </Box>
      </Card>
    </>
  );
};

export default MeasurementGraphic;
