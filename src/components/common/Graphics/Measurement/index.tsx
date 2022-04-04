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

type item = {
  diastolic?: number;
  systolic?: number;
  value?: number;
  time: string;
  performer: string;
};

type measurements = {
  type: string;
  measurements: item[];
};

type Tprops = {
  datos: measurements;
  onSelected;
  seleted: number;
};

const MeasurementGraphic = ({ datos, onSelected, seleted }: Tprops): JSX.Element => {
  const canvasEl = useRef(null);
  const classes = measurementGraphicStyles();
  const { t } = useTranslation([i18nGeneralData]);

  const [days, setDays] = useState([]);
  const [active, setActive] = useState(0);

  const changeActive = index => {
    setActive(index);
  };

  useEffect(() => {
    /** extract dataPoints */

    /** select active items with tooltips */
    function triggerTooltip(chart, itemsActive) {
      chart.setActiveElements(itemsActive);
      const tooltip = chart.tooltip;
      if (tooltip.getActiveElements().length > 0) {
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

    if (datos) {
      const diastolic = datos.measurements?.map(item => item.diastolic);
      const systolic = datos.measurements?.map(item => item.systolic);
      const weight = []; // datos.measurements?.map(item => item.value);
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

      /** create structure lines */
      const contentCharts = [];
      switch (datos.type) {
        case 'arterialPressure':
          contentCharts.push(
            {
              label: 'mmHg',
              data: systolic,
              fill: true,
              lineTension: 0.5,
              backgroundColor: gradientArea,
              borderColor: secondaryLightColor,
              borderWidth: 4,
              pointStyle: iconPrimary
            },
            {
              label: 'mmHg',
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
            label: 'kg',
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
            label: 'mg/dl',
            data: bloodGlocuse,
            fill: true,
            lineTension: 0.5,
            backgroundColor: gradientArea,
            borderColor: secondaryLightColor,
            borderWidth: 4,
            pointStyle: iconPrimary
          });
          break;
      }

      /** set days line */
      if (datos.measurements) {
        const activeDate = datos.measurements?.map(item => {
          return {
            dateVisual: moment(item.time).format('DD MMM yyyy'),
            dateSelected: item.time
          };
        });
        setDays(activeDate.reverse());
      }

      /** set structure lines and spaces */
      const data = {
        labels: ['', '', '', '', '', '', ''],
        datasets: contentCharts.reverse()
      };

      /** create chart with options */
      const myLineChart = new Chart(ctx, {
        type: 'line',
        data: data,
        options: {
          responsive: true,
          aspectRatio: 1.5,
          events: [],
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
              },
              min: 0,
              max: 200
            },
            y: {
              display: false,
              min: 0,
              max: 200
            }
          },
          plugins: [
            {
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
                titleColor: '#67777A',
                bodyFont: { weight: 'bold', size: 14 },
                callbacks: {
                  labelTextColor: function () {
                    return '#67777A';
                  },
                  label: function (context) {
                    let content = '';
                    if (context.dataset.label === 'mmHg') {
                      content =
                        `${context.raw.toString()} mmhg`.split(' ')[0] +
                        '  ' +
                        `${context.raw.toString()} mmhg`.split(' ')[1];
                    }
                    if (context.dataset.label === 'kg') {
                      content =
                        `${context.raw.toString()} kg`.split(' ')[0] +
                        '  ' +
                        `${context.raw.toString()} kg`.split(' ')[1];
                    }
                    if (context.dataset.label === 'mg/dl') {
                      content =
                        `${context.raw.toString()} mg/dl`.split(' ')[0] +
                        '  ' +
                        `${context.raw.toString()} mg/dl`.split(' ')[1];
                    }
                    return content;
                  }
                }
              },
              beforeInit: function (chart) {
                const data = chart.data.datasets[0].data;
                if (data.length === 0) {
                  // No data is present
                  const current = chart.ctx;
                  const width = chart.width;
                  const height = chart.height;
                  chart.clear();

                  current.save();
                  current.textAlign = 'center';
                  current.textBaseline = 'middle';
                  current.font = "16px normal 'poppins'";
                  current.fillText(t('noRecords', { ns: i18nGeneralData }), width / 2, height / 2);
                  current.restore();
                }
              }
            }
          ]
        }
      });

      /** set indicators points */
      if (contentCharts.length === 2 && diastolic.length > 0 && systolic.length > 0) {
        triggerTooltip(myLineChart, [
          { datasetIndex: 1, index: seleted },
          { datasetIndex: 0, index: seleted }
        ]);
      } else {
        if (weight && weight.length > 0 && contentCharts[0].label === 'kg') {
          triggerTooltip(myLineChart, [{ datasetIndex: 0, index: seleted }]);
        }

        if (bloodGlocuse && bloodGlocuse.length > 0 && contentCharts[0].label === 'mg/dl') {
          triggerTooltip(myLineChart, [{ datasetIndex: 0, index: seleted }]);
        }
      }

      /** end post render */
      return function cleanup() {
        myLineChart.destroy();
      };
    }
  }, [datos, seleted]);

  return (
    <>
      <Card className={classes.cardMeasurement}>
        <canvas id="myChart" ref={canvasEl} className={classes.canvasStyle} />
        {days && (
          <>
            <Box>
              <Grid container style={{ flexWrap: 'nowrap' }}>
                {days.map((day, index) => (
                  <Grid
                    item
                    key={index}
                    className={classes.typography12}
                    style={{ display: 'flex', justifyContent: 'flex-end' }}
                  >
                    <a
                      onClick={() => {
                        onSelected(day.dateSelected, true, index);
                        changeActive(index);
                      }}
                      className={active === index ? classes.active : classes.typography12}
                    >
                      {day.dateVisual.replace('.', ',')}
                    </a>
                  </Grid>
                ))}
              </Grid>
            </Box>

            <Box mt={2} ml={2} display="flex">
              {datos && datos.type && (
                <>
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
                </>
              )}
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
          </>
        )}
      </Card>
    </>
  );
};

export default MeasurementGraphic;
