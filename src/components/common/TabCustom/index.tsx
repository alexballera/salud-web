/// BASE IMPORTS
import React from 'react';
import SwipeableViews from 'react-swipeable-views';
/// BASE IMPORTS

/// MUI COMPONENTS
import { Box, Tab, Tabs, Typography } from '@mui/material';
/// MUI COMPONENTS END

/// STYLES
import { useTheme, ThemeProvider } from '@mui/material/styles';
import { tabTheme } from '@/src/containers/ExamResult/styles.module';
import { secondaryMainColor } from '@/src/styles/js/theme';
/// STYLES END

/// TYPES
import { TabPanelProps, TabProps } from './tab.types';
/// TYPES END

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
        <Box sx={{ pl: 5, pr: 5, pt: 3, pb: 3 }}>
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

const TabCustom = (props: TabProps): JSX.Element => {
  const { content } = props;
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
      <Box p={1}>
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
          {content.map((tab, i) => (
            <Tab key={tab.label} label={tab.label} {...a11yProps(i)} />
          ))}
        </Tabs>
        <SwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={value}
          onChangeIndex={handleChangeIndex}
        >
          {content.map((tab, i) => (
            <TabPanel key={tab.label} value={value} index={i} dir={theme.direction}>
              {tab.content}
            </TabPanel>
          ))}
        </SwipeableViews>
      </Box>
    </ThemeProvider>
  );
};

export default TabCustom;
