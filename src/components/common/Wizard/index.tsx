import React, { useState } from 'react';
import SwipeableViews from 'react-swipeable-views';

/// TYPES
import { IWizardProps, ITabPanelProps, IWizardDataSourceItem } from './index.types';

/// MATERIAL-UI
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import Tabs from '@material-ui/core/Tabs';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { makeStyles, Theme, useTheme } from '@material-ui/core/styles';
/// MATERIAL-UI END

function TabPanel({ data, value, index, ...other }: ITabPanelProps) {
  return (
    <div
      id={`full-width-tabpanel-${index}`}
      role="tabpanel"
      hidden={value !== index}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography variant="h5" component="h5" gutterBottom>
            {data.title}
          </Typography>
          <Typography>{data.description}</Typography>
          {data.component}
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

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper
  }
}));

function Wizard({ dataSource }: IWizardProps): JSX.Element {
  const theme = useTheme();
  const classes = useStyles();
  const [value, setValue] = useState<number>(0);

  const handleChange = (_event, newValue: number): void => {
    setValue(newValue);
  };

  const handleChangeIndex = (index: number) => {
    setValue(index);
  };

  return (
    <section className={classes.root}>
      <Paper square>
        <Tabs
          value={value}
          variant="fullWidth"
          onChange={handleChange}
          textColor="primary"
          aria-label="disabled tabs example"
          indicatorColor="primary"
        >
          {dataSource.map((_data, i) => (
            <Tab key={i} label={`Paso ${i + 1}`} {...a11yProps(i)} />
          ))}
        </Tabs>
        <SwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={value}
          onChangeIndex={handleChangeIndex}
        >
          {dataSource.map((data, i) => (
            <TabPanel key={i} dir={theme.direction} data={data} value={value} index={i} />
          ))}
        </SwipeableViews>
      </Paper>
    </section>
  );
}

export default Wizard;
export type { IWizardDataSourceItem };
