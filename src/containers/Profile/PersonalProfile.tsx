import React from 'react';
import { Grid } from '@material-ui/core';
import { SectionTitle } from './components/SectionTitle';
import { FieldTextData } from './components/FieldTextData';

export const PersonalProfile = (): JSX.Element => {
  const onClickLink = () => {
    console.log('Editar datos');
  };
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <SectionTitle title="Datos personales" linkText="Editar" onClickLink={onClickLink} />
      </Grid>
      <Grid item xs={12}>
        <FieldTextData title="Fecha de nacimiento" data="23/07/1992" />
      </Grid>
      <Grid item xs={12}>
        <FieldTextData title="Sexo asignado al nacer" data="Femenino" />
      </Grid>
      <Grid item xs={12}>
        <FieldTextData title="Domicilio" data="San José, San José, Carmen" />
      </Grid>
    </Grid>
  );
};
