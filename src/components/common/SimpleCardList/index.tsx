/// MATERIAL UI
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Typographyl from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
/// MATERIAL UI END

/// STYLES
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { poppinsFontFamily } from '../../../styles/js/theme';
/// STYLES END

/// OWN COMPONENTS
import { TitleContent } from '../../../components/common/TitleContent';
/// OWN COMPONENTS END

/// TYPES
import type { TListItem } from './types';
/// TYPES END

export type TProps = {
  items: TListItem[];
  title: string;
  itemClick: (values: unknown) => void;
};

const useStyles = makeStyles(() =>
  createStyles({
    card: {
      boxShadow: '0px 4px 8px rgba(207, 225, 227, 0.5)',
      borderRadius: 16
    },
    tag: {
      backgroundColor: 'red',
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

function SimpleCardList({ items, title, itemClick }: TProps): JSX.Element {
  const classes = useStyles();
  return (
    <Box className={classes.card}>
      <Box px={2} pt={2}>
        <Box className={classes.tag}>
          <Typographyl className={classes.tagFont}>{title}</Typographyl>
        </Box>
      </Box>
      <List>
        {items.map((item, idx) => {
          return (
            <>
              <ListItem button onClick={() => itemClick(item)} key={idx}>
                <Grid container direction="column" justify="space-between">
                  <ListItemText>
                    <Typographyl className={classes.itemFont}>{item.title}</Typographyl>
                  </ListItemText>
                  <ListItemText>
                    <Typographyl className={classes.itemFont}>{item.value}</Typographyl>
                  </ListItemText>
                </Grid>
              </ListItem>
              {idx + 1 !== items.length && (
                <Box px={2}>
                  <Divider />
                </Box>
              )}
            </>
          );
        })}
      </List>
    </Box>
  );
}

export default SimpleCardList;
