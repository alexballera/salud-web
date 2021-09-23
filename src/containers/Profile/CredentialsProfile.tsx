import React from 'react';
import { Grid } from '@material-ui/core';
import { SectionTitle } from './components/SectionTitle';
import { FieldTextData } from './components/FieldTextData';

export const CredentialsProfile = (): JSX.Element => {
  const changePhoneNumber = () => {
    console.log('Cambiar teléfono');
  };
  const changeEmail = () => {
    console.log('Cambiar email');
  };
  const changePassword = () => {
    console.log('Cambiar password');
  };
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <SectionTitle title="Credenciales y contacto" />
      </Grid>
      <Grid item xs={12}>
        <FieldTextData
          title="Número de teléfono"
          data="(+506) 8888-8888"
          linkText="Cambiar"
          onClickLink={changePhoneNumber}
        />
      </Grid>
      <Grid item xs={12}>
        <FieldTextData
          title="Correo electrónico"
          data="mmorales@gmail.com"
          linkText="Cambiar"
          onClickLink={changeEmail}
        />
      </Grid>
      <Grid item xs={12}>
        <FieldTextData
          title="Contraseña"
          data="••••••••••"
          linkText="Cambiar"
          onClickLink={changePassword}
        />
      </Grid>
    </Grid>
  );
};
