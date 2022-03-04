/// BASE IMPORTS
import React, { useEffect, useState } from 'react';
/// BASE IMPORTS

/// i18n
import { useTranslation, withTranslation } from 'react-i18next';
import { NAMESPACE_KEY as i18ExamResult } from '@/src/i18n/clinic_history/i18n';
import { NAMESPACE_KEY as i18Forms } from '@/src/i18n/forms/i18n';
/// i18n END

/// MUI COMPONENTS
/// MUI COMPONENTS END

/// OWN COMPONENTS
import { withAppContext } from '@/src/context';
import TabComponent from '@/src/components/common/TabComponent';
import CardComponent from '@/src/components/common/CardComponent';
import {
  getPatientExamsData,
  mockData,
  TGeneralData
} from '@/src/services/getPatientsData.service';
import { TPersonalDataProps } from '@/src/containers/SignUp/index.types';
/// OWN COMPONENTS END

/// STYLES
/// STYLES END

const ExamResult = ({ handleNotifications }: TPersonalDataProps): JSX.Element => {
  const { t } = useTranslation([i18ExamResult, i18Forms]);
  const [patientData, setPatientData] = useState<TGeneralData>(mockData);
  const i18nPopUpError = t('message.error.general_fetch', { ns: i18Forms });

  const tabContentData = [
    {
      label: '2022',
      content: <CardComponent />
    },
    {
      label: '2021',
      content: <CardComponent />
    },
    {
      label: '2020',
      content: <CardComponent />
    },
    {
      label: '2019',
      content: <CardComponent />
    },
    {
      label: '2018',
      content: <CardComponent />
    },
    {
      label: '2017',
      content: <CardComponent />
    }
  ];

  const fetchPatientData = () => {
    getPatientExamsData()
      .then(response => {
        const { result } = response.data;
        setPatientData(result);
      })
      .catch(err => {
        console.log(err);
        handleNotifications({ open: true, message: i18nPopUpError, severity: 'error' });
      });
  };
  useEffect(() => {
    // TODO CONECTAR CON API REAL
    // fetchPatientData();
    console.log(patientData);
  }, []);
  return <TabComponent content={tabContentData} />;
};

export default withTranslation(i18ExamResult)(withAppContext(ExamResult));
