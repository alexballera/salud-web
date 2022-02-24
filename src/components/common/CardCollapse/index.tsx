/// BASE IMPORTS
import { useState } from 'react';
/// BASE IMPORTS END

/// MATERIAL UI
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import { makeStyles, CardProps } from '@material-ui/core';
import { styled } from '@material-ui/styles';
import { KeyboardArrowDown, KeyboardArrowUp } from '@material-ui/icons';
/// MATERIAL UI END

/// OWN COMPONENTS
import CardList from '../../../components/common/SimpleCardList/cardList';
/// OWN COMPONENTS

/// STYLES
import { secondaryMainColor, poppinsFontFamily } from '../../../styles/js/theme';
/// STYLES END

/// TYPES
import type { TListItem } from '../../../components/common/SimpleCardList/types';
/// TYPES END

type TProps = {
  title: string;
  cardProps?: CardProps;
  items: TListItem[];
  isExpanded?: boolean;
  itemClick: (values: TListItem) => void;
};

const ArrowDown = styled(KeyboardArrowDown)({
  color: secondaryMainColor
});

const ArrowUp = styled(KeyboardArrowUp)({
  color: secondaryMainColor
});

function CardCollapse({
  title,
  items,
  itemClick,
  cardProps = {},
  isExpanded = false
}: TProps): JSX.Element {
  const [expand, setExpand] = useState(isExpanded);
  const useStyles = makeStyles({
    card: {
      boxShadow: '0px 4px 8px rgba(207, 225, 227, 0.5)',
      borderRadius: 8,
      textAlign: 'center'
    },
    title: {
      color: secondaryMainColor,
      font: poppinsFontFamily,
      textAlign: 'left',
      fontStyle: 'normal',
      fontWeight: 'normal',
      lineHeight: '150%',
      letterSpacing: '0.15px',
      fontSize: 16
    },
    divider: {
      backgroundColor: '#E4EBED'
    },
    arrow: {
      color: secondaryMainColor
    }
  });

  const classes = useStyles();
  return (
    <Card className={classes.card} {...cardProps}>
      <CardHeader
        title={<Typography className={classes.title}>{title}</Typography>}
        action={
          <IconButton onClick={() => setExpand(!expand)}>
            {!expand ? <ArrowDown /> : <ArrowUp />}
          </IconButton>
        }
      />
      {expand && <Divider className={classes.divider} />}
      <Collapse in={expand}>
        <CardList items={items} itemClick={itemClick} />
      </Collapse>
    </Card>
  );
}

export default CardCollapse;
