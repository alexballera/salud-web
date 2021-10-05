import React, { useState } from 'react';

/// MATERIAL UI
import { Grid } from '@material-ui/core';
/// MATERIAL UI END

/// OWN COMPONENTS
import { SectionTitle } from './components/SectionTitle';
import { FieldTextData } from './components/FieldTextData';
import UpdatePhone from './components/UpdatePhone';
/// OWN COMPONENTS END

import styles from '../../styles/scss/PersonalProfile.module.scss';

export const CredentialsProfile = (): JSX.Element => {
  const [showPhoneForm, setShowPhoneForm] = useState<boolean>(false);

  const changePhoneNumber = () => {
    setShowPhoneForm(!showPhoneForm);
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
      {showPhoneForm && (
        <Grid item xs={12} className={styles.fadeIn}>
          <UpdatePhone onClickLink={changePhoneNumber} />
        </Grid>
      )}
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
