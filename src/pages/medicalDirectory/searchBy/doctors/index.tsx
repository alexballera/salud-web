import React from 'react';
import { useRouter } from 'next/router';
import Grid from '@mui/material/Grid';
import doctorResultsStyles from './styles.module';
import { Chip, Typography } from '@mui/material';
import { ScrollMenu } from 'react-horizontal-scrolling-menu';

const doctorResults = (): JSX.Element => {
  const classes = doctorResultsStyles();
  const router = useRouter();

  const items = [router.query.searchField];

  return (
    <>
      <Grid container>
        <Grid item xs={12} className={classes.contentChip}>
          <ScrollMenu
            scrollContainerClassName={classes.root}
            separatorClassName={classes.separator}
          >
            {items.map((item, i) => (
              <Chip key={i} label={item} className={classes.chipColor} />
            ))}
          </ScrollMenu>
        </Grid>
        <Grid item xs={12} m={3}>
          <Typography variant="subtitle2" className={classes.subTitle}>
            Resultados de búsqueda
          </Typography>
        </Grid>
      </Grid>
    </>
  );
};

export default doctorResults;
