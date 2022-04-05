/// BASE IMPORTS
import React, { useState } from 'react';
/// BASE IMPORTS

/// i18n
import { useTranslation, withTranslation } from 'react-i18next';
import { NAMESPACE_KEY as i18Forms } from '../../i18n/forms/i18n';
import { NAMESPACE_KEY as i18nGeneralData } from '../../i18n/generalData/i18n';
/// i18n END

/// OWN COMPONENTS
import { withAppContext } from '../../context';
import TabContent from '../../containers/GeneralData/TabContent';
/// OWN COMPONENTS END

/// STYLES & TYPES
import { Tab, Tabs } from '@material-ui/core';
/// STYLES & TYPES END

/// SERVICES
import {
  getDataFromLocalStorage,
  removeDataFromLocalStorage
} from '@/src/services/localStorage.service';
/// SERVICES END

function GeneralDataPage(): JSX.Element {
  const { t } = useTranslation([i18nGeneralData, i18Forms]);
  const [tab, setTab] = useState<number>(parseInt(getDataFromLocalStorage('cardSelected')) || 0);
  removeDataFromLocalStorage('cardSelected');

  const handleChange = (event, newValue) => {
    setTab(newValue);
  };

  const items = [
    {
      label: t('tabs.pressure', { ns: i18nGeneralData })
    },
    {
      label: t('tabs.weight', { ns: i18nGeneralData })
    },
    {
      label: t('tabs.bloodGlucose', { ns: i18nGeneralData })
    }
  ];

  return (
    <>
      <Tabs
        value={tab}
        indicatorColor="secondary"
        textColor="secondary"
        variant="fullWidth"
        onChange={handleChange}
        aria-label="tabs-general-data"
      >
        {items.map((item, i) => (
          <Tab label={item.label} key={i} onClick={() => setTab(i)} />
        ))}
      </Tabs>
      <TabContent tab={tab} />
    </>
  );
}

export default withTranslation([i18nGeneralData, i18Forms])(withAppContext(GeneralDataPage));
