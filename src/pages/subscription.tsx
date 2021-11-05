import React, { ChangeEvent } from 'react';
import { Box, makeStyles, Tab, Tabs, Theme } from '@material-ui/core';

/// CONTEXT
/// CONTEXT END

/// MATERIAL - UI
/// MATERIAL - UI END

/// SERVICES
/// SERVICES END

/// OWN COMPONENTS
import LayoutInner from '../layouts/LayoutInner';
import SubscriptionConfiguration from '../containers/Subscription/SubscriptionConfiguration';
import SubscriptionPlan from '../containers/Subscription/SubscriptionPlan';
import { TitleContent } from '../components/common/TitleContent';
/// OWN COMPONENTS END

/// STYLES & TYPES
/// STYLES & TYPES END

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

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper
  }
}));

export default function SubscriptionPage(): JSX.Element {
  const [value, setValue] = React.useState(0);

  // eslint-disable-next-line @typescript-eslint/ban-types
  const handleChange = (event: ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };
  return (
    <LayoutInner fullwidth>
      <Box p={3}>
        <TitleContent title="Preferencias" />
      </Box>
      <Tabs
        variant="fullWidth"
        value={value}
        onChange={handleChange}
        aria-label="simple tabs example"
      >
        <Tab label="Mi plan" {...a11yProps(0)} />
        <Tab label="Configuración" {...a11yProps(1)} />
      </Tabs>
      <TabPanel value={value} index={0}>
        <SubscriptionPlan />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <SubscriptionConfiguration />
      </TabPanel>
    </LayoutInner>
  );
}
