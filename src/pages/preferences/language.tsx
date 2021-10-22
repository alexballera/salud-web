import React from 'react';
import { withAppContext } from '../../context';
import LayoutBasic from '../../layouts/LayoutBasic';
import UpdateHeader from '../update/components/UpdateHeader';

const UpdateLanguage = (): JSX.Element => (
  <LayoutBasic
    header={
      <UpdateHeader
        title="Editar idioma"
        description="Seleccioná el idioma de tu preferencia para la plataforma"
      />
    }
    content={<h2>Contenido</h2>}
    form={<h2>Actions</h2>}
  />
);

export default withAppContext(UpdateLanguage);
