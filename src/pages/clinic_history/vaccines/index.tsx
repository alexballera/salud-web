/// BASE IMPORTS
import React from 'react';
import muiTheme from '@/src/styles/js/muiTheme';
import { ThemeProvider } from '@mui/styles';
/// BASE IMPORTS

/// i18n
/// i18n END

/// MUI COMPONENTS
import { Box } from '@material-ui/core';
/// MUI COMPONENTS END

/// OWN COMPONENTS
/// OWN COMPONENTS END

/// STYLES
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
