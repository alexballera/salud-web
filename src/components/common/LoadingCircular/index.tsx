/// BASE
import React from 'react';
/// BASE END

/// MUI
import { Box, CircularProgress, Grid, ThemeProvider } from '@mui/material';
/// MUI END

/// STYLES
import muiTheme from '@/src/styles/js/muiTheme';
/// STYLES END

const LoadingCircular = (): JSX.Element => (
  <ThemeProvider theme={muiTheme}>
    <Box px={3} py={4}>
      <Grid
        container
        item
        xs={12}
        direction="column"
        justifyContent="center"
        alignItems="center"
        sx={{ height: 'calc(100vh - 104px)' }}
      >
        <CircularProgress color="secondary" />
      </Grid>
    </Box>
  </ThemeProvider>
);

export default LoadingCircular;
