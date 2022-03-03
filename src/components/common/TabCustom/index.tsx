/// BASE IMPORTS
import React from 'react';
import SwipeableViews from 'react-swipeable-views';
/// BASE IMPORTS

/// MUI COMPONENTS
import { Box, Tab, Tabs, Typography } from '@mui/material';
/// MUI COMPONENTS END

/// STYLES
import { useTheme, ThemeProvider } from '@mui/material/styles';
import { secondaryMainColor } from '@/src/styles/js/theme';
import { tabTheme, tabStyles } from './styles.module';
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
        <Box sx={{ px: 5, py: 3 }}>
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
  const classes = tabStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index: number) => {
    setValue(index);
  };

  return (
    <ThemeProvider theme={tabTheme}>
      <Box>
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
          className={classes.root}
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
