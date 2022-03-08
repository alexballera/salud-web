/// BASE IMPORTS
import React, { useEffect, useState } from 'react';
import SwipeableViews from 'react-swipeable-views';
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace';
/// BASE IMPORTS

/// MUI COMPONENTS
import { Box, Tab, Tabs, Typography } from '@mui/material';
/// MUI COMPONENTS END

/// STYLES
import { useTheme, ThemeProvider } from '@mui/material/styles';
import { secondaryMainColor } from '@/src/styles/js/theme';
import { tabStyles } from './styles.module';
import muiTheme from '@/src/styles/js/muiTheme';
/// STYLES END

/// TYPES
import { TabContentProps, TabPanelProps } from './tab.types';
/// TYPES END

const YEARS_BLOCK_SIZE = 10;
const CURRENT_YEAR = new Date().getFullYear();

const prevBlock = (year: number) =>
  Array.from(Array(YEARS_BLOCK_SIZE).keys()).map((_, idx) => year - (idx + 1));

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

const TabComponent = (props: TabContentProps): ReactJSXElement => {
  const { itemClick, content } = props;
  const theme = useTheme();
  const classes = tabStyles();
  const [value, setValue] = useState(0);
  const [years] = useState([CURRENT_YEAR, ...prevBlock(CURRENT_YEAR)]);

  useEffect(() => {
    itemClick(CURRENT_YEAR);
  }, []);

  useEffect(() => {
    console.log('content', content);
  }, []);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    // if (disabled) return;
    const value = event.target as HTMLElement;
    const toNumber = Number(value.innerHTML);
    if (typeof toNumber === 'number') {
      setValue(newValue);
      itemClick(toNumber);
    }
  };

  const handleChangeIndex = (index: number) => {
    setValue(index);
  };

  return (
    <ThemeProvider theme={muiTheme}>
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
          {years.map((tab, i) => (
            <Tab key={tab} label={tab} {...a11yProps(i)} />
          ))}
        </Tabs>
        <SwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={value}
          onChangeIndex={handleChangeIndex}
        >
          {years.map((tab, i) => (
            <TabPanel key={tab} value={value} index={i} dir={theme.direction}>
              {tab}
            </TabPanel>
          ))}
        </SwipeableViews>
      </Box>
    </ThemeProvider>
  );
};

export default TabComponent;
