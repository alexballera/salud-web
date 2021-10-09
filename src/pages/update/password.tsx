import React from 'react';

/// CONTEXT
import { withAppContext } from '../../context';
/// CONTEXT END

/// MATERIAL - UI
/// MATERIAL - UI END

/// SERVICES
/// SERVICES END

/// OWN COMPONENTS
import LayoutBasic from '../../layouts/LayoutBasic';
import UpdateActions from './components/UpdateActions';
import UpdateContent from './components/UpdateContent';
import UpdateHeader from './components/UpdateHeader';
/// OWN COMPONENTS END

/// STYLES & TYPES
/// STYLES & TYPES END

/// FORM STATES & VALIDATIONS
/// FORM STATES & VALIDATIONS END

const UpdatePassword = (): JSX.Element => {
  return (
    <LayoutBasic
      header={
        <UpdateHeader
          title="Nueva contraseña"
          description="Ingresá tu contraseña anterior y la nueva"
        />
      }
      content={
        <>
          <UpdateContent label="Número de teléfono actual" data="(+506) 8888-8888" />
        </>
      }
      actions={<UpdateActions />}
    />
  );
};

export default withAppContext(UpdatePassword);
