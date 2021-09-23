import React from 'react';
import { Grid } from '@material-ui/core';
import { SectionTitle } from './components/SectionTitle';
import { FieldTextData } from './components/FieldTextData';

export const SecondaryContactsProfile = (): JSX.Element => {
  const onClickLink = () => {
    console.log('Editar datos');
  };
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <SectionTitle title="Contactos secundarios" linkText="Editar" onClickLink={onClickLink} />
      </Grid>
      <Grid item xs={12}>
        <FieldTextData title="María Fernanda Mora" data="2234-6789" relationship="Hermana" />
      </Grid>
    </Grid>
  );
};
