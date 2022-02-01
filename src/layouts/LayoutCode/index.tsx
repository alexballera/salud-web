import React from 'react';

/// MATERIAL - UI
import { Box, Grid, Hidden, Typography } from '@material-ui/core';
import SvgContainer from '../../components/common/SvgContainer';
import SvgBanner from '../../components/common/Svg/SvgBanner.component';
/// MATERIAL - UI END

/// OWN COMPONENTS
/// OWN COMPONENTS END

/// STYLES & TYPES
import LayoutCodeStyles from './styles.module';
/// STYLES & TYPES END

type LCProps = {
  title: string;
  description: string;
  content?: JSX.Element;
  leftButton: JSX.Element;
  rightButton: JSX.Element;
};

const LayoutCode = ({
  title,
  description,
  content,
  leftButton,
  rightButton
}: LCProps): JSX.Element => {
  const classes = LayoutCodeStyles();
  return (
    <Box>
      <Box p={3}>
        <Grid container spacing={1} className={classes.container}>
          <Grid item xs={12} md={5} className={classes.imgContainer}>
            <Hidden mdUp>
              <SvgContainer title="Banner Svg" width={173} height={137}>
                <SvgBanner />
              </SvgContainer>
            </Hidden>
            <Hidden smDown>
              <SvgContainer title="Banner Svg" width={326} height={261}>
                <SvgBanner device="desktop" />
              </SvgContainer>
            </Hidden>
          </Grid>
          <Grid item xs={12} md={5} className={classes.content}>
            <Grid container spacing={3} className={classes.contentContainer}>
              <Grid item xs={12} md={10} className={classes.contentContainer}>
                <Typography variant="h2" component="h2" className={classes.title}>
                  {title}
                </Typography>
              </Grid>
              <Grid item xs={12} md={10} className={classes.contentContainer}>
                <Typography variant="h5" component="h5" className={classes.description}>
                  {description}
                </Typography>
              </Grid>
              {content && (
                <Grid item xs={12} md={10} className={classes.contentContainer}>
                  {content}
                </Grid>
              )}
            </Grid>
            <Box>
              <Grid container spacing={1}>
                <Grid item xs={6} md={5}>
                  {leftButton}
                </Grid>
                <Grid item xs={6} md={5}>
                  {rightButton}
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};
export default LayoutCode;
