import React, { useEffect, useRef, useState } from 'react';
import { Badge, Box, Card, Grid, Typography } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import Chart from 'chart.js/auto';

import { NAMESPACE_KEY as i18nGeneralData } from '../../../../i18n/generalData/i18n';
import {
  secondaryLightColor,
  graphicGradientPrimary,
  graphicGradientSecondary,
  purple,
  borderDash,
  textValueCardColor,
  graphicTooltipBackground
} from '../../../../styles/js/theme';
import measurementGraphicStyles from './styles.module';

import { parseISO, format } from 'date-fns';

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
  dataGraphic: measurements;
  onSelected;
  selected: number;
  tab: number;
};

const MeasurementGraphic = ({ dataGraphic, onSelected, selected, tab }: Tprops): JSX.Element => {
  const canvasEl = useRef(null);
  const classes = measurementGraphicStyles();
  const { t } = useTranslation([i18nGeneralData]);

  const [days, setDays] = useState([]);
  const [active, setActive] = useState(0);
  const [noRecordArterialPressure, setNoRecordArterialPressure] = useState(true);
  const [noRecordBloodGlocuse, setNoRecordBloodGlocuse] = useState(true);
  const [noRecordWeight, setNoRecordWeight] = useState(true);

  const changeActive = index => {
    setActive(index);
  };

  useEffect(() => {
    setActive(0);
  }, [tab]);

  useEffect(() => {
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

    if (dataGraphic) {
      /** extract dataPoints */
      const diastolic = dataGraphic.measurements?.map(item => item.diastolic);
      const systolic = dataGraphic.measurements?.map(item => item.systolic);
      const weight = dataGraphic.measurements?.map(item => item.value);
      const bloodGlocuse = dataGraphic.measurements?.map(item => item.value);

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

      /** set days line */
      const activeDate = dataGraphic.measurements?.map(item => {
        return {
          dateVisual: format(parseISO(item.time), 'dd MMM yyyy'),
          dateSelected: item.time
        };
      });
      setDays(activeDate.reverse());

      /** create structure lines */
      const contentCharts = [];
      switch (dataGraphic.type) {
        case 'arterialPressure':
          contentCharts.push(
            {
              label: 'mmHg',
              data: systolic.reverse(),
              fill: true,
              lineTension: 0.5,
              backgroundColor: gradientArea,
              borderColor: secondaryLightColor,
              borderWidth: 4,
              pointStyle: iconPrimary
            },
            {
              label: 'mmHg',
              data: diastolic.reverse(),
              fill: false,
              lineTension: 0.5,
              borderColor: purple,
              borderWidth: 3,
              pointStyle: iconSecundary
            }
          );
          break;
        case 'weight':
          contentCharts.push({
            label: 'kg',
            data: weight.reverse(),
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
            data: bloodGlocuse.reverse(),
            fill: true,
            lineTension: 0.5,
            backgroundColor: gradientArea,
            borderColor: secondaryLightColor,
            borderWidth: 4,
            pointStyle: iconPrimary
          });
          break;
      }

      /** set structure lines and spaces */
      const data = {
        labels: ['', '', '', '', '', '', ''],
        datasets: contentCharts.reverse()
      };

      /** create chart empty message */
      const empty = {
        id: 'empty',
        afterDraw: chart => {
          const data = chart.data.datasets[0].data;
          if (data.length === 0) {
            // No data is present
            const current = chart.ctx;
            const width = chart.width;
            const height = chart.height;

            current.save();
            current.textAlign = 'center';
            current.textBaseline = 'middle';
            current.fillText(t('noRecords', { ns: i18nGeneralData }), width / 2, height / 2);
            current.restore();
          }
        }
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
                color: borderDash
              }
            },
            y: {
              display: false,
              min: 0,
              max: 200
            }
          },
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
              backgroundColor: graphicTooltipBackground,
              titleColor: textValueCardColor,
              bodyFont: { size: 14 },
              callbacks: {
                labelTextColor: function () {
                  return textValueCardColor;
                },
                label: function (context) {
                  const content =
                    `${context.raw.toString()} ${context.dataset.label}`.split(' ')[0] +
                    '  ' +
                    `${context.raw.toString()} ${context.dataset.label}`.split(' ')[1];
                  return content;
                }
              }
            }
          }
        },
        plugins: [empty]
      });

      /** set indicators points */
      if (contentCharts.length === 2 && diastolic.length > 0 && systolic.length > 0) {
        triggerTooltip(myLineChart, [
          { datasetIndex: 1, index: selected },
          { datasetIndex: 0, index: selected }
        ]);
        setNoRecordArterialPressure(true);
      } else {
        setNoRecordArterialPressure(false);
        if (weight && weight.length > 0 && contentCharts[0].label === 'kg') {
          triggerTooltip(myLineChart, [{ datasetIndex: 0, index: selected }]);
          setNoRecordWeight(true);
        } else {
          setNoRecordWeight(false);
        }
        if (bloodGlocuse && bloodGlocuse.length > 0 && contentCharts[0].label === 'mg/dl') {
          triggerTooltip(myLineChart, [{ datasetIndex: 0, index: selected }]);
          setNoRecordBloodGlocuse(true);
        } else {
          setNoRecordBloodGlocuse(false);
        }
      }

      /** end post render */
      return function cleanup() {
        myLineChart.destroy();
      };
    }
  }, [dataGraphic, selected]);

  const dotElement = () => {
    return <Badge color="primary" variant="dot"></Badge>;
  };

  return (
    <Card className={classes.cardMeasurement}>
      <canvas id="myChart" ref={canvasEl} />
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
                    className={`${classes.a} ${
                      active === index ? classes.active : classes.typography12
                    }`}
                  >
                    {!day.activeDates && day.dateVisual.replace('.', ',')}
                  </a>
                </Grid>
              ))}
            </Grid>
          </Box>

          <Box mt={2} ml={2} display="flex">
            {dataGraphic && (
              <>
                <Box component="span" mr={2}>
                  {noRecordArterialPressure
                    ? dotElement()
                    : noRecordWeight
                    ? dotElement()
                    : noRecordBloodGlocuse && dotElement()}
                </Box>
                <Typography variant="body2">
                  {dataGraphic.type === 'arterialPressure' && noRecordArterialPressure
                    ? t('graphic.systolicPressureRecording', { ns: i18nGeneralData })
                    : dataGraphic.type === 'weight' && noRecordWeight
                    ? t('graphic.weightRecords', { ns: i18nGeneralData })
                    : dataGraphic.type === 'bloodGlocuse' &&
                      noRecordBloodGlocuse &&
                      t('graphic.bloodGlucoseRecords', { ns: i18nGeneralData })}
                </Typography>
              </>
            )}
          </Box>

          <Box my={1} ml={2} display="flex">
            {dataGraphic && dataGraphic.type === 'arterialPressure' && noRecordArterialPressure && (
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
  );
};

export default MeasurementGraphic;
