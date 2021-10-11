import React from 'react';

/// CONTEXT
import { withAppContext } from '../../context';
import LayoutBasic from '../../layouts/LayoutBasic';
import UpdateActions from './components/UpdateActions';
import UpdateContent from './components/UpdateContent';
import UpdateHeader from './components/UpdateHeader';
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

const UpdatePhone = (): JSX.Element => {
  return (
    <LayoutBasic
      header={
        <UpdateHeader
          title="Cambiar número de teléfono"
          description="Ingresá tu nuevo número de teléfono para actualizarlo en la plataforma"
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

export default withAppContext(UpdatePhone);
