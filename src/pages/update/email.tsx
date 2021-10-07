import React from 'react';

/// CONTEXT
import { withAppContext } from '../../context';
import LayoutBasic from '../../layouts/LayoutBasic';
/// CONTEXT END

/// MATERIAL - UI
/// MATERIAL - UI END

/// SERVICES
/// SERVICES END

/// OWN COMPONENTS
/// OWN COMPONENTS END

/// STYLES & TYPES
/// STYLES & TYPES END

/// FORM STATES & VALIDATIONS
/// FORM STATES & VALIDATIONS END

const UpdateEmail = (): JSX.Element => (
  <LayoutBasic header={<h2>Header</h2>} content={<h2>Contenido</h2>} actions={<h2>Botones</h2>} />
);

export default withAppContext(UpdateEmail);
