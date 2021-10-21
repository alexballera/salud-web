import React from 'react';

/// MATERIAL UI
import { Typography } from '@material-ui/core';
/// MATERIAL UI END

/// STYLES & TYPES
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';
/// STYLES & TYPES END

type IProps = {
  title: string;
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
    }
  })
);

export const TitleContent = ({ title }: IProps): JSX.Element => {
  const classes = useStyles();
  return (
    <Typography variant="h2" className={classes.title}>
      {title}
    </Typography>
  );
};
