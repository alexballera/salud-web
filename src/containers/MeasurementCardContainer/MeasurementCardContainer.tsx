import { makeStyles } from '@material-ui/core';
import React from 'react';

/// MATERIAL UI
/// MATERIAL UI END

/// i18n
import { ScrollMenu } from 'react-horizontal-scrolling-menu';
import MeasurementCard from '../../components/common/Card/MeasurementCard';
import { IMeasurementsData } from '../../services/getMeasurementsData.service';
/// i18n END

type IProps = {
  generalData: IMeasurementsData;
};

const useStyles = makeStyles({
  root: {
    paddingBottom: 20,
    paddingLeft: 20,
    paddingRight: 20
  },
  separator: {
    margin: 10
  }
});

export const MeasurementCardContainer = ({ generalData }: IProps): JSX.Element => {
  const classes = useStyles();

  console.log(generalData);
  const { records } = generalData;
  const arterialPressure = records.find(x => x.type === 'arterialPressure');
  const arterialPressureValue =
    arterialPressure && arterialPressure.measurements.length > 0
      ? arterialPressure.measurements[arterialPressure.measurements.length - 1].systolic +
        '/' +
        arterialPressure.measurements[arterialPressure.measurements.length - 1].diastolic +
        ' ' +
        arterialPressure.unit
      : '-';
  const arterialPressureTime =
    arterialPressure && arterialPressure.measurements.length > 0
      ? arterialPressure.measurements[arterialPressure.measurements.length - 1].time
      : '-';

  const bloodGlocuse = records.find(x => x.type === 'bloodGlocuse');
  const bloodGlocuseValue =
    bloodGlocuse && bloodGlocuse.measurements.length > 0
      ? `${bloodGlocuse.measurements[bloodGlocuse.measurements.length - 1].value} ${
          bloodGlocuse.unit
        }`
      : '-';
  const bloodGlocuseTime =
    bloodGlocuse && bloodGlocuse.measurements.length > 0
      ? bloodGlocuse.measurements[bloodGlocuse.measurements.length - 1].time
      : '-';

  const weight = records.find(x => x.type === 'weight');
  const weightValue =
    weight && weight.measurements.length > 0
      ? weight.measurements[weight.measurements.length - 1].value + ' ' + weight.unit
      : '-';
  const weightTime =
    weight && weight.measurements.length > 0
      ? weight.measurements[weight.measurements.length - 1].time
      : '-';

  const items = [
    {
      route: '/generalData',
      title: arterialPressure?.name,
      value: arterialPressureValue,
      type: arterialPressure?.type,
      time: arterialPressureTime
    },
    {
      route: '/generalData',
      title: weight?.name,
      value: weightValue,
      type: weight?.type,
      time: weightTime
    },
    {
      route: '/generalData',
      title: bloodGlocuse?.name,
      value: bloodGlocuseValue,
      type: bloodGlocuse?.type,
      time: bloodGlocuseTime
    }
  ];

  return (
    <ScrollMenu scrollContainerClassName={classes.root} separatorClassName={classes.separator}>
      {items.map((item, i) => (
        <React.Fragment key={i}>
          <MeasurementCard
            route={item.route}
            title={item.title}
            value={item.value}
            type={item.type}
            tab={i}
            time={item.time}
          />
        </React.Fragment>
      ))}
    </ScrollMenu>
  );
};
