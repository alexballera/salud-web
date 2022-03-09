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

  const { records } = generalData;
  const arterialPressure = records.find(x => x.type === 'arterialPressure');
  const arterialPressureValue =
    arterialPressure && arterialPressure.measurements.length > 0
      ? arterialPressure.measurements[0].systolic + '/' + arterialPressure.measurements[0].diastolic
      : '-';
  const bloodGlocuse = records.find(x => x.type === 'bloodGlocuse');
  const bloodGlocuseValue =
    bloodGlocuse && bloodGlocuse.measurements.length > 0 ? bloodGlocuse.measurements[0].value : '-';
  const weight = records.find(x => x.type === 'weight');
  const weightValue =
    weight && weight.measurements.length > 0
      ? weight.measurements[0].value + ' ' + weight.unit
      : '-';

  return (
    <ScrollMenu scrollContainerClassName={classes.root} separatorClassName={classes.separator}>
      <MeasurementCard
        route="/generalData"
        title={arterialPressure?.name}
        value={arterialPressureValue}
        type={arterialPressure.type}
        tab={1}
      />
      <MeasurementCard
        title={weight?.name}
        value={weightValue}
        type={weight.type}
        route="/generalData"
        tab={2}
      />
      <MeasurementCard
        title={bloodGlocuse?.name}
        value={bloodGlocuseValue}
        type={bloodGlocuse.type}
        route="/generalData"
        tab={0}
      />
    </ScrollMenu>
  );
};
