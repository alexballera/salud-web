/// BASE IMPORTS
import React from 'react';
import SwipeableViews from 'react-swipeable-views';
/// BASE IMPORTS

/// i18n
import { useTranslation, withTranslation } from 'react-i18next';
import { NAMESPACE_KEY as i18ExamResult } from '@/src/i18n/clinic_history/i18n';
/// i18n END

/// MUI COMPONENTS
import { Box, Tab, Tabs, Typography } from '@mui/material';
/// MUI COMPONENTS END

/// OWN COMPONENTS
import { withAppContext } from '@/src/context';
/// OWN COMPONENTS END

/// STYLES
import { useTheme, ThemeProvider } from '@mui/material/styles';
import { tabTheme } from '@/src/containers/ExamResult/styles.module';
import { secondaryMainColor } from '@/src/styles/js/theme';
/// STYLES END

/// TYPES
type TabPanelProps = {
  children?: React.ReactNode;
  dir?: string;
  index: number;
  value: number;
};
/// TYPES END

const tabContent = [
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
function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography component="div">{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`
  };
}

const ExamResult = (): JSX.Element => {
  const { t } = useTranslation(i18ExamResult);
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index: number) => {
    setValue(index);
  };

  return (
    <ThemeProvider theme={tabTheme}>
      <Box p={3}>
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons
          allowScrollButtonsMobile
          aria-label="scrollable auto tabs example"
          textColor="secondary"
          indicatorColor="secondary"
          sx={{ color: secondaryMainColor }}
        >
          {tabContent.map((tab, i) => (
            <Tab key={tab.label} label={tab.label} {...a11yProps(i)} />
          ))}
        </Tabs>
        <SwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={value}
          onChangeIndex={handleChangeIndex}
        >
          {tabContent.map((tab, i) => (
            <TabPanel key={tab.label} value={value} index={i} dir={theme.direction}>
              {tab.content}
            </TabPanel>
          ))}
        </SwipeableViews>
      </Box>
    </ThemeProvider>
  );
};

export default withTranslation(i18ExamResult)(withAppContext(ExamResult));
