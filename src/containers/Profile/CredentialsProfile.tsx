import React from 'react';
import Link from 'next/link';

/// MATERIAL UI
import { Grid } from '@material-ui/core';
/// MATERIAL UI END

/// OWN COMPONENTS
import { SectionTitle } from './components/SectionTitle';
import { FieldTextData } from './components/FieldTextData';
/// OWN COMPONENTS END

export const CredentialsProfile = (): JSX.Element => {
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
          text="Cambiar"
          href="/update/phone"
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
