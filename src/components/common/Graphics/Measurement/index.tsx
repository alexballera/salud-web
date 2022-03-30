import React, { useEffect, useRef, useState } from 'react';
import { Badge, Box, Card, Typography } from '@material-ui/core';
import Chart from 'chart.js/auto';

import {
  secondaryLightColor,
  graphicGradientPrimary,
  graphicGradientSecondary,
  purple
} from '../../../../styles/js/theme';
import measurementGraphicStyles from './styles.module';

import { IMeasurementRecord } from '../../../../services/getMeasurementsData.service';
import { useGetMeasurementsQuery } from '../../../../services/apiBFF';

const options = {
  responsive: true,
  scaleShowVerticalLines: false,
  plugins: {
    legend: false,
    title: false
  },
  tooltips: {
    mode: 'point'
  },
  elements: {
    point: {
      radius: 0
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
};

const initialState = {
  systolic: null,
  diastolic: null,
  time: null,
  value: null,
  performer: ''
};

const MeasurementGraphic = ({ datos }): JSX.Element => {
  const canvasEl = useRef(null);
  const classes = measurementGraphicStyles();

  useEffect(() => {
    // const diastolic = measurement2.measurement.map(item => item.diastolic);
    // console.log('diastolic', diastolic);
    console.log('data tool', datos.measurements);

    const ctx = canvasEl.current.getContext('2d');
    const gradientArea = ctx.createLinearGradient(0, 16, 0, 600);
    gradientArea.addColorStop(0, graphicGradientPrimary);
    gradientArea.addColorStop(0.65, graphicGradientSecondary);

    const data = {
      labels: ['', '', '', '', ''],
      datasets: [
        {
          data: [33, 25, 35, 51, 54, 76],
          fill: false,
          lineTension: 0.5,
          borderColor: purple,
          borderWidth: 3
        },
        {
          data: [0, 41, 44, 65, 0, 50],
          fill: true,
          lineTension: 0.5,
          backgroundColor: gradientArea,
          borderColor: secondaryLightColor,
          borderWidth: 4
        }
      ]
    };
    const config = {
      type: 'line',
      data: data,
      options: options
    };
    const myLineChart = new Chart(ctx, config);

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
          <Typography variant="body2">Registro de presión sistólica</Typography>
        </Box>
        <Box my={1} ml={2} display="flex">
          <Box component="span" mr={2}>
            <Badge color="secondary" variant="dot"></Badge>
          </Box>
          <Typography variant="body2">Registro de presión diastólica</Typography>
        </Box>
      </Card>
    </>
  );
};

export default MeasurementGraphic;
