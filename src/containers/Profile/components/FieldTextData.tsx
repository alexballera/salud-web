import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { Chip, Grid, Link, Typography } from '@material-ui/core';
import clsx from 'clsx';
import { ITitle } from './SectionTitle';

const useStyles = makeStyles(() =>
  createStyles({
    title: {
      color: 'rgba(0, 0, 0, 0.6)',
      fontSize: 14,
      fontWeight: 'normal',
      marginBottom: 4
    },
    data: {
      color: 'rgba(0, 0, 0, 0.87)',
      fontSize: 16,
      fontWeight: 'normal'
    },
    titleRelationship: {
      color: 'rgba(0, 0, 0, 0.87)'
    },
    dataRelationship: {
      color: 'rgba(0, 0, 0, 0.6)',
      fontSize: 14
    },
    linkContainer: {
      textAlign: 'right'
    },
    link: {
      fontSize: 14,
      fontWeight: 500
    }
  })
);

export const FieldTextData = ({
  title,
  linkText,
  onClickLink,
  data,
  relationship
}: ITitle): JSX.Element => {
  const classes = useStyles();
  return (
    <Grid container alignItems="center">
      <Grid item xs={9}>
        <Typography
          variant="h2"
          className={clsx({
            [classes.title]: true,
            [classes.titleRelationship]: relationship
          })}
        >
          {title}
        </Typography>
        <Typography
          variant="h2"
          className={clsx({
            [classes.data]: true,
            [classes.dataRelationship]: relationship
          })}
        >
          {data}
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
      {relationship && (
        <Grid item xs={9}>
          <Chip label={relationship} />
        </Grid>
      )}
    </Grid>
  );
};
