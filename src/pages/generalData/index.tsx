/// BASE IMPORTS
import React, { useEffect, useState } from 'react';
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
import { TPersonalDataProps } from '../../containers/SignUp/index.types';
import { Tab, Tabs } from '@material-ui/core';


function GeneralDataPage({ handleNotifications }: TPersonalDataProps): JSX.Element {
  const { t } = useTranslation([i18nGeneralData, i18Forms]);
  const [tab, setTab] = useState<number>(0);

  const handleChange = (event, newValue) => {
    setTab(newValue);
  };

  return <>
      <Tabs
        value={tab}
        indicatorColor="secondary"
        textColor="secondary"
        variant="fullWidth"
        onChange={handleChange}
        aria-label="tabs-general-data"
      >
        <Tab label={t('tabs.bloodGlucose', { ns: i18nGeneralData })}/>
        <Tab label={t('tabs.pressure', { ns: i18nGeneralData })}/>
        <Tab label={t('tabs.weight', { ns: i18nGeneralData })}/>
      </Tabs>
      <TabContent tab={tab} />
  </>;
}

export default withTranslation([i18nGeneralData, i18Forms])(withAppContext(GeneralDataPage));