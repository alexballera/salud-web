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

const MeasurementGraphic = ({ datos }: any): JSX.Element => {
  const canvasEl = useRef(null);
  const classes = measurementGraphicStyles();

  useEffect(() => {
    const diastolic = datos.measurements?.map(item => item.diastolic);
    const systolic = datos.measurements?.map(item => item.systolic);
    console.log('diastolic', diastolic);
    console.log('systolic', systolic);

    const ctx = canvasEl.current.getContext('2d');
    const gradientArea = ctx.createLinearGradient(0, 16, 0, 600);
    gradientArea.addColorStop(0, graphicGradientPrimary);
    gradientArea.addColorStop(0.65, graphicGradientSecondary);

    const data = {
      labels: ['', '', '', '', '', '', ''],
      datasets: [
        {
          data: diastolic,
          fill: false,
          lineTension: 0.5,
          borderColor: purple,
          borderWidth: 3
        },
        {
          data: systolic,
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
};

export default MeasurementGraphic;
