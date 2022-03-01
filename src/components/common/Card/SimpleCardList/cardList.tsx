/// MATERIAL UI
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import MuiTypography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
/// MATERIAL UI END

/// STYLES
import { makeStyles, createStyles, styled } from '@material-ui/core/styles';
import { poppinsFontFamily, title2Color, title3Color } from '../../../../styles/js/theme';
/// STYLES END

/// TYPES
import type { TListItem } from './types';
/// TYPES END

export type TProps = {
  items: TListItem[] | string[];
  itemClick: (values: unknown) => void;
};

const Typography = styled(MuiTypography)({
  fontFamily: poppinsFontFamily,
  fontStyle: 'normal',
  fontWeight: 'normal',
  fontSize: 14,
  lineHeight: '143%',
  letterSpacing: '0.15px'
});

const useStyles = makeStyles(() =>
  createStyles({
    itemTitle: {
      color: title3Color
    },
    itemValue: {
      color: title2Color
    }
  })
);

function SimpleCardList({ items, itemClick }: TProps): JSX.Element {
  const classes = useStyles();
  return (
    <List>
      {items.map((item, idx) => {
        return (
          <Box key={idx}>
            <ListItem button onClick={() => itemClick(item)}>
              <Grid container direction="column" justify="space-between">
                {item.title && (
                  <ListItemText>
                    <Typography className={classes.itemTitle}>{item.title}</Typography>
                  </ListItemText>
                )}
                <ListItemText>
                  <Typography className={classes.itemValue}>{item.value}</Typography>
                </ListItemText>
              </Grid>
            </ListItem>
            {idx + 1 !== items.length && (
              <Box px={2}>
                <Divider />
              </Box>
            )}
          </Box>
        );
      })}
    </List>
  );
}

export default SimpleCardList;
