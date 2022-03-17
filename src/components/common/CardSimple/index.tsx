import React from 'react';
import { useRouter } from 'next/router';
import { Box, Card, Divider, Typography } from '@material-ui/core';

import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import cardStyles from './styles.module';

type TProps = {
  href?: string;
  title: string;
  content: any;
};

export const CardSimple = ({ href, title, content }: TProps): JSX.Element => {
  const classes = cardStyles();
  const router = useRouter();

  const redirect = () => {
    if (!href) {
      return;
    }
    router.push(href);
  };

  return (
    <Card className={classes.card}>
      <a onClick={redirect}>
        <Box component="span" className={classes.cardContentLink}>
          <Typography paragraph color="secondary" className={classes.typography16}>
            {title}
          </Typography>
          <ChevronRightIcon color="secondary" />
        </Box>
      </a>
      <Divider />
      <Box mt={2}>
        <div
          className={classes.typography14}
          dangerouslySetInnerHTML={{ __html: `${content}` }}
        ></div>
      </Box>
    </Card>
  );
};
export default CardSimple;
