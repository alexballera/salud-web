import React from 'react';
import { useRouter } from 'next/router';

/// CONTEXT
/// CONTEXT END

/// MATERIAL - UI
import { Grid } from '@material-ui/core';
import UpdatePhone from './UpdatePhone';
import UpdatePassword from './UpdatePassword';
import UpdateEmail from './UpdateEmail';
/// MATERIAL - UI END

/// SERVICES
/// SERVICES END

/// OWN COMPONENTS
/// OWN COMPONENTS END

/// STYLES & TYPES
/// STYLES & TYPES END

/// FORM STATES & VALIDATIONS
/// FORM STATES & VALIDATIONS END

const UpdateActions = (): JSX.Element => {
  const router = useRouter();
  const showUpdate = () => {
    switch (router.pathname) {
      case '/update/phone':
        return <UpdatePhone />;
      case '/update/password':
        return <UpdatePassword />;
      case '/update/email':
        return <UpdateEmail />;
      default:
        break;
    }
  };
  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        {showUpdate()}
      </Grid>
    </Grid>
  );
};

export default UpdateActions;
