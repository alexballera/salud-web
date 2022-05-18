import { colorRailSlider, secondaryLightColor, tertiaryLightColor } from '@/src/styles/js/theme';
import { formatMoney } from '@/src/utils/helpers';
import { Box, Grid, styled } from '@mui/material';
import MuiSlider, { SliderThumb } from '@mui/material/Slider';
import React from 'react';
import { useDispatch } from 'react-redux';

const Slider = styled(MuiSlider)({
  color: secondaryLightColor,
  height: 2,
  '& .MuiSlider-thumb': {
    height: 24,
    width: 24,
    backgroundColor: tertiaryLightColor,
    border: `1px solid ${secondaryLightColor}`,
    '& .airbnb-bar': {
      height: 8,
      width: 8,
      backgroundColor: secondaryLightColor,
      borderRadius: '50%'
    }
  },
  '& .MuiSlider-rail': {
    color: colorRailSlider,
    height: 4
  }
});
type thumbComponentProps = React.HTMLAttributes<unknown>;

function thumbComponent(props: thumbComponentProps) {
  const { children, ...other } = props;
  return (
    <SliderThumb {...other}>
      {children}
      <span className="airbnb-bar" />
    </SliderThumb>
  );
}
type TProps = {
  min: number;
  max: number;
  step: number;
  currency: string;
  priceRange: number[];
  setRangePrice;
};

const SliderPrice = ({
  min,
  max,
  step,
  currency,
  priceRange,
  setRangePrice
}: TProps): JSX.Element => {
  const [value, setValue] = React.useState<number[]>(priceRange);
  const dispatch = useDispatch();

  const handleChange = (e, value) => {
    const [min, max] = value;
    if (max > min) {
      setValue(value);
      dispatch(
        setRangePrice({
          priceRange: value
        })
      );
    }
  };

  return (
    <>
      <Grid container>
        <Grid item ml={1} xs={10}>
          <Slider
            components={{ Thumb: thumbComponent }}
            value={value}
            onChange={handleChange}
            step={step}
            min={min}
            max={max}
          />
        </Grid>
        <Grid item xs={10.5} display="flex" justifyContent="space-between">
          <Box>{formatMoney(value[0], ',', currency)}</Box>
          <Box>{formatMoney(value[1], ',', currency)}</Box>
        </Grid>
      </Grid>
    </>
  );
};

export default SliderPrice;
