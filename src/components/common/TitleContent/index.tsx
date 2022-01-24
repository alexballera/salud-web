import React from 'react';

/// MATERIAL UI
import { Typography } from '@material-ui/core';
/// MATERIAL UI END

/// STYLES & TYPES
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
/// STYLES & TYPES END

type IProps = {
  title: JSX.Element;
  subTitle?: boolean;
  paragraph?: boolean;
  titleWithSubtitle?: boolean;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      color: 'rgba(0, 0, 0, 0.87)',
      fontSize: 20,
      fontWeight: 500,
      marginBottom: 16,
      [theme.breakpoints.up('md')]: {
        fontSize: 42,
        fontWeight: 400,
        marginBottom: 45
      }
    },
    titleWithSubtitle: {
      color: 'rgba(0, 0, 0, 0.87)',
      fontSize: 20,
      fontWeight: 500,
      marginBottom: 8,
      [theme.breakpoints.up('md')]: {
        fontSize: 42,
        fontWeight: 400
      }
    },
    subTitle: {
      color: 'rgba(0, 0, 0, 0.87)',
      fontSize: 14,
      fontWeight: 'normal',
      marginBottom: 8,
      marginTop: 8
    },
    paragraph: {
      color: 'rgba(0, 0, 0, 0.6)',
      fontSize: 16,
      fontWeight: 'normal',
      marginBottom: 8,
      marginTop: 8
    }
  })
);

export const TitleContent = ({
  title,
  titleWithSubtitle,
  subTitle,
  paragraph
}: IProps): JSX.Element => {
  const classes = useStyles();
  return (
    <Typography
      variant="h2"
      className={clsx({
        [classes.title]: !subTitle,
        [classes.subTitle]: subTitle,
        [classes.titleWithSubtitle]: titleWithSubtitle,
        [classes.paragraph]: paragraph
      })}
    >
      {title}
    </Typography>
  );
};
