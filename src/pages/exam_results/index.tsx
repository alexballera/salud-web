/// BASE IMPORTS
import React from 'react';
/// BASE IMPORTS

/// i18n
import { withTranslation } from 'react-i18next';
import { NAMESPACE_KEY as i18ExamResult } from '@/src/i18n/clinic_history/i18n';
/// i18n END

/// MUI COMPONENTS
/// MUI COMPONENTS END

/// OWN COMPONENTS
import { withAppContext } from '@/src/context';
import TabCustom from '@/src/components/common/TabCustom';
/// OWN COMPONENTS END

/// STYLES
/// STYLES END

const tabContentData = [
  {
    label: '2022',
    content: <h2>Contenido 2022</h2>
  },
  {
    label: '2021',
    content: <h2>Contenido 2021</h2>
  },
  {
    label: '2020',
    content: <h2>Contenido 2020</h2>
  },
  {
    label: '2019',
    content: <h2>Contenido 2019</h2>
  },
  {
    label: '2018',
    content: <h2>Contenido 2016</h2>
  },
  {
    label: '2017',
    content: <h2>Contenido 2017</h2>
  }
];

const ExamResult = (): JSX.Element => {
  return <TabCustom content={tabContentData} />;
};

export default withTranslation(i18ExamResult)(withAppContext(ExamResult));
