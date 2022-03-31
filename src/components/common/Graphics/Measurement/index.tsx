import React, { useEffect, useRef } from 'react';
import { Badge, Box, Card, Typography } from '@material-ui/core';
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

const MeasurementGraphic = ({ datos }: any): JSX.Element => {
  const canvasEl = useRef(null);
  const classes = measurementGraphicStyles();
  const { t } = useTranslation([i18nGeneralData]);

  useEffect(() => {
    const diastolic = datos.measurements?.map(item => item.diastolic);
    const systolic = datos.measurements?.map(item => item.systolic);
    const weight = datos.measurements?.map(item => item.value);
    const bloodGlocuse = datos.measurements?.map(item => item.value);

    const ctx = canvasEl.current.getContext('2d');
    const gradientArea = ctx.createLinearGradient(0, 16, 0, 600);
    gradientArea.addColorStop(0, graphicGradientPrimary);
    gradientArea.addColorStop(0.65, graphicGradientSecondary);

    const contentCharts = [];
    switch (datos.type) {
      case 'arterialPressure':
        contentCharts.push(
          {
            data: diastolic,
            label: 'Label1',
            fill: false,
            lineTension: 0.5,
            borderColor: purple,
            borderWidth: 3
          },
          {
            data: systolic,
            label: 'Label2',
            fill: true,
            lineTension: 0.5,
            backgroundColor: gradientArea,
            borderColor: secondaryLightColor,
            borderWidth: 4
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
          borderWidth: 4
        });
        break;
      case 'bloodGlocuse':
        contentCharts.push({
          data: bloodGlocuse,
          fill: true,
          lineTension: 0.5,
          backgroundColor: gradientArea,
          borderColor: secondaryLightColor,
          borderWidth: 4
        });
        break;
      default:
        contentCharts.push({
          data: [0, 0, 0, 0, 0, 0, 0],
          fill: true,
          lineTension: 0.5,
          backgroundColor: gradientArea,
          borderColor: secondaryLightColor,
          borderWidth: 4
        });
        break;
    }

    const data = {
      labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
      datasets: contentCharts
    };

    const myLineChart = new Chart(ctx, {
      type: 'line',
      data: data,
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: false
          },
          title: {
            display: false
          }
        },
        elements: {
          point: {
            radius: 8
          }
        },
        scales: {
          x: {
            display: false
          },
          y: {
            display: false
          }
        }
      }
    });

    /* myLineChart.tooltip.setActiveElements(
      [
        { datasetIndex: 0, index: 1 },
        { datasetIndex: 1, index: 1 }
      ],
      {
        x: 0,
        y: 0
      }
    ); */

    /* myLineChart.tooltip.setActiveElements(
      [
        {
          datasetIndex: 0,
          index: 2
        },
        {
          datasetIndex: 1,
          index: 2
        }
      ],
      { y: 0, x: 0 }
    ); */

    // myLineChart.tooltip.active;
    // triggerTooltip(myLineChart);

    /* myLineChart.setActiveElements([
      { datasetIndex: 0, index: 1 },
      { datasetIndex: 1, index: 1 }
    ]);
    myLineChart.update();
    myLineChart.draw(); */

    return function cleanup() {
      myLineChart.destroy();
    };
  });

  return (
    <>
      <Card className={classes.cardMeasurement}>
        <canvas id="myChart" ref={canvasEl} height="160" />
        <Box mt={1} style={{ display: 'flex', justifyContent: 'center' }}>
          Here controls
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
