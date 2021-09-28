import React, { useState } from 'react';

/// MATERIAL UI
import { Grid } from '@material-ui/core';
/// MATERIAL UI END

/// OWN COMPONENTS
import { SectionTitle } from './components/SectionTitle';
import { FieldTextData } from './components/FieldTextData';
import UpdatePersonalData from './components/UpdatePersonalData';
/// OWN COMPONENTS END

export const PersonalProfile = (): JSX.Element => {
  const [showForm, setShowForm] = useState<boolean>(false);
  const onClickLink = () => {
    setShowForm(!showForm);
  };
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <SectionTitle title="Datos personales" linkText="Editar" onClickLink={onClickLink} />
      </Grid>
      <Grid item xs={12}>
        <FieldTextData title="Fecha de nacimiento" data="23/07/1992" />
      </Grid>
      {!showForm && (
        <>
          <Grid item xs={12}>
            <FieldTextData title="Sexo asignado al nacer" data="Femenino" />
          </Grid>
          <Grid item xs={12}>
            <FieldTextData title="Domicilio" data="San José, San José, Carmen" />
          </Grid>
        </>
      )}
      {showForm && (
        <Grid item xs={12}>
          <UpdatePersonalData onClickLink={onClickLink} />
        </Grid>
      )}
    </Grid>
  );
};
