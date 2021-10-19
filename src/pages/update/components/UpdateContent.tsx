import React from 'react';

/// CONTEXT
/// CONTEXT END

/// MATERIAL - UI
import { Typography } from '@material-ui/core';
import UpdateStyles from '../../../styles/js/UpdatePageStyles.module';
/// MATERIAL - UI END

/// SERVICES
/// SERVICES END

/// OWN COMPONENTS
/// OWN COMPONENTS END

/// STYLES & TYPES
/// STYLES & TYPES END

/// FORM STATES & VALIDATIONS
/// FORM STATES & VALIDATIONS END

type Props = {
  label?: string;
  data?: string;
};

const UpdateContent = ({ label, data }: Props): JSX.Element => {
  const classes = UpdateStyles();
  return (
    <>
      {label && (
        <Typography
          data-testid="title-informed-consent"
          className={classes.contentLabel}
          variant="h2"
        >
          {label}
        </Typography>
      )}
      {data && (
        <Typography
          data-testid="title-informed-consent"
          className={classes.contentData}
          variant="h6"
        >
          {data}
        </Typography>
      )}
    </>
  );
};

export default UpdateContent;
