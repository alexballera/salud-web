import React from 'react';
import { Box, Divider, Typography } from '@material-ui/core';

import habitRowStyles from './styles.module';

type IProps = {
  title: string;
  content: string;
  hideDivider?: boolean;
};

export const HabitRow = ({ title, content, hideDivider }: IProps): JSX.Element => {
  const classes = habitRowStyles();
  return (
    <Box>
      <Typography paragraph className={`${classes.typography14} ${classes.typographyTitle}`}>
        {title}
      </Typography>
      <Typography paragraph className={classes.typography14}>
        {content}
      </Typography>
      {!hideDivider && <Divider className={classes.spaceDivider} />}
    </Box>
  );
};
