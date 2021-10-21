import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { Grid, Link, Typography } from '@material-ui/core';

const useStyles = makeStyles(() =>
  createStyles({
    title: {
      color: 'rgba(0, 0, 0, 0.87)',
      fontSize: 12,
      fontWeight: 'normal',
      textTransform: 'uppercase'
    },
    link: {
      fontSize: 14,
      fontWeight: 500
    }
  })
);

export type ITitle = {
  title: string;
  titleUppercase?: boolean;
  linkText?: string;
  onClickLink?;
  data?: string;
  relationship?: string;
  text?: string;
  href?: string;
};

export const SectionTitle = ({ title, linkText, onClickLink }: ITitle): JSX.Element => {
  const classes = useStyles();
  return (
    <Grid container alignItems="center">
      <Grid item xs={9}>
        <Typography variant="h2" className={classes.title}>
          {title}
        </Typography>
      </Grid>
      {linkText && (
        <Grid container item xs={3} justify="flex-end">
          <Link
            className={classes.link}
            component="button"
            variant="body2"
            underline="none"
            color="secondary"
            onClick={() => {
              onClickLink();
            }}
          >
            {linkText}
          </Link>
        </Grid>
      )}
    </Grid>
  );
};
