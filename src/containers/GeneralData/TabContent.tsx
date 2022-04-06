import { useEffect, useState } from 'react';

/// MATERIAL UI
import { makeStyles, Typography, Box } from '@material-ui/core';
import GeneralDataCard from '../../components/common/Card/GeneralDataCard';
/// MATERIAL UI END

/// THEME
import { background3Color, poppinsFontFamily, titlePageColor } from '../../styles/js/theme';
/// THEME END

/// TYPES
import type { IMeasurementRecord } from '../../services/getMeasurementsData.service';
/// TYPES END

/// i18n
import { useTranslation, withTranslation } from 'react-i18next';
import { NAMESPACE_KEY as i18nGeneralData } from '../../i18n/generalData/i18n';
import { NAMESPACE_KEY as i18nGlobalsData } from '../../i18n/globals/i18n';
import { useGetMeasurementsQuery } from '../../services/apiBFF';
/// i18n END

/// SVG ICONS
import SvgArterialPressure from '../../../src/components/common/Svg/SvgArterialPressure.component';
import SvgWeight from '../../../src/components/common/Svg/SvgWeight.component';
import SvgWater from '../../../src/components/common/Svg/SvgWater.component';
/// SVG ICONS END

type IProps = {
  tab: number;
};

const useStyles = makeStyles(() => ({
  lastMeasurementText: {
    fontFamily: poppinsFontFamily,
    fontStyle: 'normal',
    fontSize: 16,
    letterSpacing: '0.15px',
    lineHeight: '175%',
    fontWeight: 400,
    color: titlePageColor
  }
}));

const initialState = {
  systolic: null,
  diastolic: null,
  time: null,
  value: null,
  performer: ''
};

const TabContent = ({ tab }: IProps): JSX.Element => {
  const classes = useStyles();
  const [measurement, setMeasurement] = useState<IMeasurementRecord>(initialState);
  const { t } = useTranslation([i18nGeneralData]);
  const { isFetching, data } = useGetMeasurementsQuery('1');

  useEffect(() => {
    if (data && data.records) {
      groupRecordsByType(tab);
    }
  }, [isFetching, tab]);

  const groupRecordsByType = (tab: number) => {
    switch (tab) {
      case 0:
        setMeasurement(filterChildMeasurementByType('arterialPressure'));
        break;
      case 1:
        setMeasurement(filterChildMeasurementByType('weight'));
        break;
      case 2:
        setMeasurement(filterChildMeasurementByType('bloodGlocuse'));
        break;
      default:
        setMeasurement(initialState);
    }
  };

  const filterRecordByType = (typeKey: string) => {
    if (!data || !data.records) {
      return {
        unit: '',
        measurements: []
      };
    }
    return data.records.find(item => item.type === typeKey);
  };

  const filterChildMeasurementByType = (typeKey: string): IMeasurementRecord => {
    const findRecord = filterRecordByType(typeKey);
    if (!findRecord || !findRecord.measurements) return initialState;
    const cloneMeasurements = [...findRecord.measurements];
    return cloneMeasurements.sort(
      (a, b) => new Date(b.time).getTime() - new Date(a.time).getTime()
    )[0];
  };

  return (
    <Box>
      <Typography variant="body2" gutterBottom className={classes.lastMeasurementText}>
        {t('content.last_measurement')}
      </Typography>
      {tab === 0 && (
        <GeneralDataCard
          tab={tab}
          title={t('tabs.pressure', { ns: i18nGeneralData })}
          icon={<SvgArterialPressure />}
          doctorName={measurement.performer}
          unit={filterRecordByType('arterialPressure')?.unit || '-'}
          value={`${measurement?.systolic > 0 ? measurement?.systolic.toString() : '-'}/${
            measurement?.diastolic > 0 ? measurement?.diastolic.toString() : '-'
          }`}
          time={measurement?.time}
        />
      )}
      {tab === 1 && (
        <GeneralDataCard
          title={t('tabs.weight', { ns: i18nGeneralData })}
          tab={tab}
          icon={<SvgWeight />}
          unit={filterRecordByType('weight')?.unit || '-'}
          doctorName={measurement.performer}
          value={measurement?.value}
          time={measurement?.time}
        />
      )}
      {tab === 2 && (
        <GeneralDataCard
          title={t('tabs.bloodGlucose', { ns: i18nGeneralData })}
          tab={tab}
          icon={<SvgWater />}
          unit={filterRecordByType('bloodGlocuse')?.unit || '-'}
          doctorName={measurement.performer}
          value={measurement?.value > 0 ? measurement?.value : '-'}
          time={measurement?.time}
        />
      )}
    </Box>
  );
};

export default withTranslation([i18nGeneralData, i18nGlobalsData])(TabContent);
