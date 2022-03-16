/// MATERIAL UI
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import MuiTypography from '@material-ui/core/Typography';
import Box, { BoxProps } from '@material-ui/core/Box';
/// MATERIAL UI END

/// STYLES
import { makeStyles, createStyles, styled } from '@material-ui/core/styles';
import { poppinsFontFamily } from '../../../../styles/js/theme';
/// STYLES END

/// OWN COMPONENTS
import CardList from './cardList';
/// OWN COMPONENTS END

/// TYPES
import type { TListItem } from './types';
/// TYPES END

const Typography = styled(MuiTypography)({
  fontFamily: poppinsFontFamily,
  fontStyle: 'normal',
  fontWeight: 'normal'
});

export type TProps = {
  items: TListItem[];
  cardStyle?: BoxProps;
  title: string;
  titleStyles: BoxProps['style'];
  itemClick: (values: TListItem) => void;
  showHeader?: boolean;
};

const useStyles = makeStyles(() =>
  createStyles({
    tag: {
      display: 'inline-block',
      borderRadius: 64,
      marginTop: 0,
      padding: 2,
      paddingLeft: 6,
      paddingRight: 6
    },
    tagText: {
      fontWeight: 500,
      fontSize: 12,
      lineHeight: '20px',
      letterSpacing: '0.14px'
    },
    card: {
      boxShadow: '0px 4px 8px rgba(207, 225, 227, 0.5)',
      borderRadius: 10
    },
    cardHeader: {
      paddingBottom: 0,
      '& span': {
        lineHeight: 0
      }
    }
  })
);

function SimpleCardList({
  title,
  titleStyles,
  items,
  itemClick,
  showHeader = true
}: TProps): JSX.Element {
  const classes = useStyles();
  return (
    <Card className={classes.card}>
      {showHeader ? (
        <CardHeader
          className={classes.cardHeader}
          title={
            <Box className={classes.tag} style={titleStyles}>
              <Typography className={classes.tagText}>{title}</Typography>
            </Box>
          }
        />
      ) : (
        <></>
      )}
      <CardList items={items} itemClick={itemClick} />
    </Card>
  );
}

export default SimpleCardList;
