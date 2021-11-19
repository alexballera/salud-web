import React, { ChangeEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/router';

/// CONTEXT
import { withAppContext } from '../context';
/// CONTEXT END

/// MATERIAL - UI
import { Box, Tab, Tabs } from '@material-ui/core';
/// MATERIAL - UI END

/// SERVICES
/// SERVICES END

/// OWN COMPONENTS
import LayoutInner from '../layouts/LayoutInner';
import SubscriptionConfiguration from '../containers/Subscription/SubscriptionConfiguration';
import SubscriptionPlan from '../containers/Subscription/SubscriptionPlan';
import { TitleContent } from '../components/common/TitleContent';
import Redirect from '../components/common/Redirect';
/// OWN COMPONENTS END

/// STYLES & TYPES
import { AppStates } from '../context/types';
/// STYLES & TYPES END

/// i18n
import { useTranslation } from 'react-i18next';
import { NAMESPACE_KEY } from '../i18n/subscriptions/i18n';
/// i18n END

/// FORM STATES & VALIDATIONS
/// FORM STATES & VALIDATIONS END

type TabPanelProps = {
  children?: React.ReactNode;
  index: number;
  value: number;
};

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  };
}

function SubscriptionPage({ user, loggedIn }: AppStates): JSX.Element {
  const { t } = useTranslation(NAMESPACE_KEY);
  const router = useRouter();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!(user || loggedIn)) {
      router.replace('/login');
    }
  }, [user, loggedIn]);

  // eslint-disable-next-line @typescript-eslint/ban-types
  const handleChange = (event: ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };
  return (
    <>
      {user ? (
        <LayoutInner fullwidth>
          <Box p={3}>
            <TitleContent title={t('subscription_title')} />
          </Box>
          <Tabs
            variant="fullWidth"
            value={value}
            onChange={handleChange}
            aria-label="simple tabs example"
          >
            <Tab label={t('subscription_tab_lavel1')} {...a11yProps(0)} />
            <Tab label={t('subscription_tab_lavel2')} {...a11yProps(1)} />
          </Tabs>
          <TabPanel value={value} index={0}>
            <SubscriptionPlan />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <SubscriptionConfiguration />
          </TabPanel>
        </LayoutInner>
      ) : (
        <Redirect />
      )}
    </>
  );
}
export default withAppContext(SubscriptionPage);
