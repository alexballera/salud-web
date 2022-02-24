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

export const MeasurementCardContainer = ({ generalData }: IProps): JSX.Element => {
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
    <ScrollMenu>
      <MeasurementCard
        title={arterialPressure?.name}
        value={arterialPressureValue}
        type={arterialPressure.type}
      />
      <MeasurementCard title={weight?.name} value={weightValue} type={weight.type} />
      <MeasurementCard
        title={bloodGlocuse?.name}
        value={bloodGlocuseValue}
        type={bloodGlocuse.type}
      />
    </ScrollMenu>
  );
};
