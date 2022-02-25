///  BASE IMPORTS
import { useContext, useEffect, useState } from 'react';
/// BASE IMPORTS END

/// MATERIAL UI
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { ArrowBackIos, ArrowForwardIos } from '@material-ui/icons';
/// MATERIAL UI END

import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu';
import { styled } from '@material-ui/core';

/// STYLES
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { poppinsFontFamily, secondaryMainColor } from '../../../styles/js/theme';
/// STYLES END

const YEARS_BLOCK_SIZE = 5;
const CURRENT_YEAR = new Date().getFullYear();

type TProps = {
  itemClick: (item: number) => void;
};

const prevBlock = (year: number) =>
  Array.from(Array(YEARS_BLOCK_SIZE).keys()).map((_, idx) => year - (idx + 1));

const ArrowLeft = styled(ArrowBackIos)({
  color: secondaryMainColor,
  width: 'auto',
  height: 20
});

const ArrowRight = styled(ArrowForwardIos)({
  color: secondaryMainColor,
  width: 'auto',
  height: 20
});

const CustomCard = styled(Card)({
  border: 'none',
  boxShadow: 'none',
  width: '85.33px;',
  height: 50,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 0,
  fontFamily: poppinsFontFamily,
  fontStyle: 'normal',
  fontWeight: 500,
  fontSize: '14px',
  lineHeight: '24px',
  letterSpacing: '0.4px',
  color: secondaryMainColor
});

function LeftArrow() {
  const { isFirstItemVisible, scrollPrev } = useContext(VisibilityContext);

  return (
    <IconButton disabled={isFirstItemVisible} onClick={() => scrollPrev()}>
      <ArrowLeft />
    </IconButton>
  );
}

function RightArrow() {
  const { isLastItemVisible, scrollNext } = useContext(VisibilityContext);

  return (
    <IconButton disabled={isLastItemVisible} onClick={() => scrollNext()}>
      <ArrowRight />
    </IconButton>
  );
}

const useStyles = makeStyles(() => {
  return createStyles({
    main: {
      paddingBottom: 10
    },
    boxItemDisable: {},
    boxItemEnable: {
      borderBottom: `2px solid ${secondaryMainColor}`
    }
  });
});

function YearSlider({ itemClick }: TProps): JSX.Element {
  const classes = useStyles();
  const [years, setYears] = useState([CURRENT_YEAR, ...prevBlock(CURRENT_YEAR)]);
  const [selected, setSelected] = useState<number>(CURRENT_YEAR);

  useEffect(() => {
    itemClick(CURRENT_YEAR);
  }, []);

  return (
    <Box className={classes.main}>
      <ScrollMenu
        scrollContainerClassName={classes.main}
        LeftArrow={LeftArrow}
        RightArrow={RightArrow}
        onUpdate={e => {
          if (e.isLastItemVisible) {
            setYears(prevState => [...prevState, ...prevBlock(prevState[prevState.length - 1])]);
          }
        }}
      >
        {years.map(item => (
          <CustomCard
            {...({ itemID: item } as any)}
            itemId={item} // NOTE: itemId is required for track items
            key={item}
            className={selected === item ? classes.boxItemEnable : classes.boxItemDisable}
            onClick={() => {
              setSelected(item);
              itemClick(item);
            }}
          >
            <Typography variant="body1">{item}</Typography>
          </CustomCard>
        ))}
      </ScrollMenu>
    </Box>
  );
}

export default YearSlider;
