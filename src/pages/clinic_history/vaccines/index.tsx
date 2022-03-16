/// BASE IMPORTS
import React from 'react';
/// BASE IMPORTS

/// i18n
/// i18n END

/// MUI COMPONENTS
import { Box } from '@mui/material';
/// MUI COMPONENTS END

/// OWN COMPONENTS
/// OWN COMPONENTS END

/// STYLES
import muiTheme from '@/src/styles/js/muiTheme';
import { ThemeProvider } from '@mui/styles';
/// STYLES END

const Vaccines = (): JSX.Element => {
  return (
    <ThemeProvider theme={muiTheme}>
      <Box p={3}>
        <h2>Mis vacunas</h2>
      </Box>
    </ThemeProvider>
  );
};

export default Vaccines;
