import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { Chip, Grid, Theme, Typography } from '@material-ui/core';
import LinkMaterial from '@material-ui/core/Link';
import clsx from 'clsx';
import { ITitle } from './SectionTitle';
import Link from 'next/link';

const useStyles = makeStyles((theme: Theme) =>
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
    },
    aLink: {
      fontSize: 14,
      fontWeight: 500,
      color: theme.palette.secondary.main,
      textDecoration: 'none',
      '&:hover': {
        color: theme.palette.secondary.main
      }
    }
  })
);

export const FieldTextData = ({
  title,
  linkText,
  onClickLink,
  data,
  relationship,
  href,
  text
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
          <LinkMaterial
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
          </LinkMaterial>
        </Grid>
      )}
      {href && (
        <Grid container item xs={3} justify="flex-end">
          <Link href={href} passHref>
            <a color="secondary" className={classes.aLink}>
              {text}
            </a>
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
