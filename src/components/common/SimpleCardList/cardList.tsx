/// MATERIAL UI
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Typographyl from '@material-ui/core/Typography';
import Box, { BoxProps } from '@material-ui/core/Box';
/// MATERIAL UI END

/// STYLES
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { poppinsFontFamily } from '../../../styles/js/theme';
/// STYLES END

/// OWN COMPONENTS
import { TitleContent } from '../TitleContent';
/// OWN COMPONENTS END

/// TYPES
import type { TListItem } from './types';
/// TYPES END

export type TProps = {
  items: TListItem[];
  itemClick: (values: unknown) => void;
};

const useStyles = makeStyles(() =>
  createStyles({
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

function SimpleCardList({ items, itemClick }: TProps): JSX.Element {
  const classes = useStyles();
  return (
    <List>
      {items.map((item, idx) => {
        return (
          <>
            <ListItem button onClick={() => itemClick(item)} key={idx}>
              <Grid container direction="column" justify="space-between">
                <ListItemText>
                  <Typographyl className={classes.itemFont} style={{ color: '#A1ADB0' }}>
                    {item.title}
                  </Typographyl>
                </ListItemText>
                <ListItemText>
                  <Typographyl className={classes.itemFont} style={{ color: '#4D5759' }}>
                    {item.value}
                  </Typographyl>
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
  );
}

export default SimpleCardList;
