import React from 'react';
import { Card, CardContent, CardActionArea, Typography } from '@material-ui/core';
import { useRouter } from 'next/router';
import cardActionImageStyles from './styles.modules';

type TProps = {
  title: string;
  route: string;
  icon;
};

export default function CardActionImage({ title, route, icon }: TProps): JSX.Element {
  const classes = cardActionImageStyles();
  const router = useRouter();

  return (
    <CardActionArea className={classes.root}>
      <Card className={classes.root} onClick={() => router.push(route)}>
        <CardContent>
          <div className={classes.alignCenter}>{icon}</div>
          <Typography className={classes.textCard2}>{title}</Typography>
        </CardContent>
      </Card>
    </CardActionArea>
  );
}
