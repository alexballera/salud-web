import { Box, Grid, Slider } from '@mui/material';
import React, { useEffect } from 'react';
import sliderPriceStyles from './style.module';

const SliderPrice = (): JSX.Element => {
  const classes = sliderPriceStyles();
  const [value, setValue] = React.useState<number[]>([20, 37]);

  const handleChange = (e, value) => {
    const [min, max] = value;
    if (max >= 50 && min <= 50 && max !== min) {
      setValue(value);
    }
  };

  useEffect(() => {
    console.log(value);
  }, [value]);

  return (
    <>
      <Grid container>
        <Grid item xs={10.5}>
          <Slider
            classes={{
              thumb: classes.thumb,
              rail: classes.rail,
              track: classes.track,
              mark: classes.mark
            }}
            value={value}
            onChange={handleChange}
            min={0}
            max={1000}
          />
        </Grid>
        <Grid item xs={10.5} display="flex" justifyContent="space-between">
          <Box>{value[0]}</Box>
          <Box>{value[1]}</Box>
        </Grid>
      </Grid>
    </>
  );
};

export default SliderPrice;
