/// BASE IMPORTS
import { useState } from 'react';
/// BASE IMPORTS END

/// MATERIAL UI
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import CardContent from '@material-ui/core/CardContent';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import MuiTypography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import { makeStyles, CardProps, ListItem, ListItemText } from '@material-ui/core';
import { styled } from '@material-ui/styles';
import { KeyboardArrowDown, KeyboardArrowUp } from '@material-ui/icons';
/// MATERIAL UI END

/// OWN COMPONENTS
import CardList from './SimpleCardList/cardList';
/// OWN COMPONENTS

/// STYLES
import {
  secondaryMainColor,
  poppinsFontFamily,
  cardDividerColor,
  title2Color
} from '../../../styles/js/theme';
/// STYLES END

/// TYPES
import type { TListItem } from './SimpleCardList/types';
/// TYPES END

type TProps = {
  title: string;
  subTitle?: string;
  cardProps?: CardProps;
  items: TListItem[];
  isExpanded?: boolean;
  itemClick: (values: TListItem) => void;
  disabled?: boolean;
};

const ArrowDown = styled(KeyboardArrowDown)({
  color: secondaryMainColor
});

const ArrowUp = styled(KeyboardArrowUp)({
  color: secondaryMainColor
});

const Typography = styled(MuiTypography)({
  font: poppinsFontFamily,
  fontStyle: 'normal',
  fontWeight: 'normal'
});

function CardCollapse({
  title,
  subTitle,
  items,
  itemClick,
  cardProps = {},
  isExpanded = false,
  disabled = false
}: TProps): JSX.Element {
  const [expand, setExpand] = useState(isExpanded);
  const useStyles = makeStyles({
    card: {
      boxShadow: '0px 4px 8px rgba(207, 225, 227, 0.5)',
      borderRadius: 8,
      textAlign: 'center'
    },
    title: {
      fontSize: 16,
      letterSpacing: '0.15px',
      lineHeight: '150%',
      color: secondaryMainColor,
      textAlign: 'left'
    },
    subTitle: {
      fontSize: 14,
      letterSpacing: '0.15px',
      lineHeight: '143%',
      color: title2Color,
      textAlign: 'left'
    },
    arrowIcon: {
      padding: 3
    },
    divider: {
      backgroundColor: cardDividerColor
    },
    arrow: {
      color: secondaryMainColor
    }
  });

  const classes = useStyles();
  return (
    <Card className={classes.card} {...cardProps}>
      <CardContent>
        <Grid container justify="space-between" alignItems="center">
          <Grid item>
            <Typography className={classes.title}>{title}</Typography>
          </Grid>
          <Grid item>
            <IconButton
              className={classes.arrowIcon}
              disabled={disabled}
              onClick={() => setExpand(!expand)}
            >
              {!expand ? <ArrowDown /> : <ArrowUp />}
            </IconButton>
          </Grid>
        </Grid>
      </CardContent>
      {expand && <Divider className={classes.divider} />}
      <Collapse in={expand}>
        <CardList items={items} itemClick={itemClick} />
      </Collapse>
      {!expand && subTitle && (
        <>
          <Divider className={classes.divider} />
          <ListItem>
            <ListItemText>
              <Typography className={classes.subTitle}>{subTitle}</Typography>
            </ListItemText>
          </ListItem>
        </>
      )}
    </Card>
  );
}

export default CardCollapse;
