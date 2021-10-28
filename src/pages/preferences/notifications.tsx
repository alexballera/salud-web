import React from 'react';
import { useRouter } from 'next/router';
import { Form } from 'formik';

/// CONTEXT
import { withAppContext } from '../../context';
/// CONTEXT END

/// MATERIAL - UI
import { Button } from '@material-ui/core';
/// MATERIAL - UI END

/// SERVICES
/// SERVICES END

/// OWN COMPONENTS
import UpdateHeader from '../update/components/UpdateHeader';
import LayoutBasic from '../../layouts/LayoutBasic';
import LayoutForm from '../../layouts/LayoutForm';
/// OWN COMPONENTS END

/// STYLES & TYPES
/// STYLES & TYPES END

/// FORM STATES & VALIDATIONS
/// FORM STATES & VALIDATIONS END

const UpdateNotifications = (): JSX.Element => {
  const router = useRouter();

  const goBack = () => {
    router.back();
  };
  return (
    <LayoutBasic
      header={
        <UpdateHeader
          title="Notificaciones"
          description="Seleccioná el idioma de tu preferencia para la plataforma"
        />
      }
      form={
        <LayoutForm
          form={<h2>Formulario</h2>}
          buttonLeft={
            <Button fullWidth variant="outlined" onClick={goBack}>
              Volver
            </Button>
          }
          buttonRight={
            <Button
              fullWidth
              type="submit"
              color="primary"
              variant="contained"
              // TODO verificar
              // disabled={!_.isEmpty(formik.errors) || loading}
            >
              Continuar
            </Button>
          }
        />
      }
    />
  );
};

export default withAppContext(UpdateNotifications);
