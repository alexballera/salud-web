///  BASE IMPORTS
import { useEffect, useState } from 'react';
/// BASE IMPORTS END

/// MATERIAL UI
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
/// MATERIAL UI END

/// STYLES
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { boxShadow, poppinsFontFamily, secondaryMainColor } from '../../../styles/js/theme';
/// STYLES END

const YEARS_BLOCK_SIZE = 30;
const CURRENT_YEAR = new Date().getFullYear();

type TProps = {
  selectedYear?: number;
  itemClick: (item: number) => void;
  disabled: boolean;
};

const prevBlock = (year: number) =>
  Array.from(Array(YEARS_BLOCK_SIZE).keys()).map((_, idx) => year - (idx + 1));

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  };
}

const useStyles = makeStyles(() => {
  return createStyles({
    root: {
      boxShadow: boxShadow,
      '& span': {
        font: poppinsFontFamily,
        fontStyle: 'normal',
        fontWeight: 500,
        color: secondaryMainColor,
        fontSize: 14,
        letterSpacing: '0.4px',
        lineHeight: '24px'
      }
    }
  });
});

function YearSlider({ itemClick, disabled, selectedYear }: TProps): JSX.Element {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const [years] = useState([CURRENT_YEAR, ...prevBlock(CURRENT_YEAR)]); // TODO: Make this length dynamic

  useEffect(() => {
    const year = selectedYear || CURRENT_YEAR;
    const findIndex = years.findIndex(item => item === Number(selectedYear || CURRENT_YEAR));
    setValue(findIndex);
    itemClick(year);
  }, []);

  const handleChange = (_evt: React.SyntheticEvent, newValue: number) => {
    if (disabled) return;
    setValue(newValue);
    itemClick(years[newValue]);
  };

  return (
    <Tabs
      disabled={disabled}
      value={value}
      onChange={handleChange}
      variant="scrollable"
      scrollButtons="on"
      textColor="secondary"
      indicatorColor="secondary"
      TabScrollButtonProps={{ style: { color: secondaryMainColor } }}
      TabIndicatorProps={{ color: 'secondary' }}
      className={classes.root}
    >
      {years.map(tab => (
        <Tab key={tab} label={tab} {...a11yProps(tab)} />
      ))}
    </Tabs>
  );
}

export default YearSlider;
