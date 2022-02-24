/// MATERIAL UI
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Box, { BoxProps } from '@material-ui/core/Box';
/// MATERIAL UI END

/// STYLES
import { makeStyles, createStyles, StyleRules } from '@material-ui/core/styles';
import { poppinsFontFamily } from '../../../styles/js/theme';
/// STYLES END

/// OWN COMPONENTS
import { TitleContent } from '../../../components/common/TitleContent';
import CardList from './cardList';
/// OWN COMPONENTS END

/// TYPES
import type { TListItem } from './types';
/// TYPES END

export type TProps = {
  items: TListItem[];
  cardStyle?: BoxProps;
  title: string;
  titleStyles: BoxProps['style'];
  itemClick: (values: TListItem) => void;
};

const useStyles = makeStyles(() =>
  createStyles({
    tag: {
      display: 'inline-block',
      borderRadius: 64,
      padding: 2,
      paddingLeft: 6,
      paddingRight: 6
    },
    tagFont: {
      fontFamily: poppinsFontFamily,
      fontStyle: 'normal',
      fontWeight: 500,
      fontSize: '12px',
      lineHeight: '20px',
      letterSpacing: '0.14px'
    },
    card: {
      boxShadow: '0px 4px 8px rgba(207, 225, 227, 0.5)',
      borderRadius: 16,
      paddingBottom: 0
    },
    itemFont: {
      fontFamily: poppinsFontFamily,
      fontStyle: 'normal',
      fontWeight: 'normal',
      fontSize: 14,
      lineHeight: '143%',
      letterSpacing: '0.15px'
    }
  })
);

function SimpleCardList({ title, titleStyles, items, itemClick }: TProps): JSX.Element {
  const classes = useStyles();
  return (
    <Card className={classes.card}>
      <CardHeader
        title={
          <Box className={classes.tag} style={titleStyles}>
            <Typography className={classes.tagFont}>{title}</Typography>
          </Box>
        }
      />
      <CardList items={items} itemClick={itemClick} />
    </Card>
  );
}

export default SimpleCardList;
