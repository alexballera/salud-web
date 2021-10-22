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
import UpdateActions from './components/UpdateActions';
import UpdateContent from './components/UpdateContent';
import UpdateHeader from './components/UpdateHeader';
/// OWN COMPONENTS END

/// STYLES & TYPES
/// STYLES & TYPES END

/// FORM STATES & VALIDATIONS
/// FORM STATES & VALIDATIONS END

const UpdateEmail = (): JSX.Element => (
  <LayoutBasic
    contentDivider
    header={
      <UpdateHeader
        title="Cambiar correo electrónico"
        description="Ingresá tu nuevo correo electrónico para actualizarlo en la plataforma"
      />
    }
    content={<UpdateContent label="Correo electrónico actual" data="mmorales@gmail.com" />}
    form={<UpdateActions />}
  />
);

export default withAppContext(UpdateEmail);
