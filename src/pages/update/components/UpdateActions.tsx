import React from 'react';
import { useRouter } from 'next/router';

/// CONTEXT
/// CONTEXT END

/// MATERIAL - UI
import { Grid } from '@material-ui/core';
/// MATERIAL - UI END

/// SERVICES
/// SERVICES END

/// OWN COMPONENTS
import UpdatePhone from './UpdatePhone';
import UpdatePassword from './UpdatePassword';
import UpdateEmail from './UpdateEmail';
/// OWN COMPONENTS END

/// STYLES & TYPES
/// STYLES & TYPES END

/// FORM STATES & VALIDATIONS
/// FORM STATES & VALIDATIONS END

const UpdateActions = (): JSX.Element => {
  const router = useRouter();
  const showUpdate = (key: string): string => {
    const route = {
      '/update/phone': <UpdatePhone />,
      '/update/password': <UpdatePassword />,
      '/update/email': <UpdateEmail />
    };
    return route[key];
  };
  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        {showUpdate(router.pathname)}
      </Grid>
    </Grid>
  );
};

export default UpdateActions;
