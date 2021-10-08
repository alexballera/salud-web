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
  title: string;
  description: string;
};

const UpdateHeader = ({ title, description }: Props): JSX.Element => {
  const classes = UpdateStyles();
  return (
    <>
      <Typography data-testid="title-informed-consent" className={classes.headerTitle} variant="h2">
        {title}
      </Typography>
      <Typography
        data-testid="title-informed-consent"
        className={classes.headerDescription}
        variant="h6"
      >
        {description}
      </Typography>
    </>
  );
};

export default UpdateHeader;
