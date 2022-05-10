import React from 'react';
import { useDispatch } from 'react-redux';
import { Card, CardContent, CardActionArea, Typography } from '@material-ui/core';
import { useRouter } from 'next/router';
import cardActionImageStyles from './styles.modules';
import { searchClean } from '@/src/store/slice/search.slice';

type TProps = {
  title: string;
  route: string;
  icon;
};

export default function CardActionImage({ title, route, icon }: TProps): JSX.Element {
  const classes = cardActionImageStyles();
  const router = useRouter();
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(searchClean());
    router.push(route);
  };

  return (
    <CardActionArea className={classes.root}>
      <Card className={classes.root} onClick={() => handleClick()}>
        <CardContent>
          <div className={classes.alignCenter}>{icon}</div>
          <Typography className={classes.textCard2}>{title}</Typography>
        </CardContent>
      </Card>
    </CardActionArea>
  );
}
