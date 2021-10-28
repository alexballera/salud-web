import React from 'react';
import { useRouter } from 'next/router';
// import { Form } from 'formik';

/// CONTEXT
import { withAppContext } from '../../context';
/// CONTEXT END

/// MATERIAL - UI
import {
  Button,
  createStyles,
  Divider,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  makeStyles,
  Switch
} from '@material-ui/core';
/// MATERIAL - UI END

/// SERVICES
/// SERVICES END

/// OWN COMPONENTS
import UpdateHeader from '../update/components/UpdateHeader';
import LayoutBasic from '../../layouts/LayoutBasic';
import LayoutForm from '../../layouts/LayoutForm';
/// OWN COMPONENTS END

/// FORM STATES & VALIDATIONS
/// FORM STATES & VALIDATIONS END

/// STYLES & TYPES
const useStyle = makeStyles(() =>
  createStyles({
    containerLegend: {
      marginTop: 28
    }
  })
);
/// STYLES & TYPES END

const type = [
  {
    value: 'sms',
    label: 'SMS'
  },
  {
    value: 'email',
    label: 'Correos electrónicos'
  },
  {
    value: 'push_notifications',
    label: 'Push notifications'
  }
];

const preferences = [
  {
    value: 'novedades',
    label: 'Novedades'
  },
  {
    value: 'promociones',
    label: 'Promociones'
  },
  {
    value: 'recordatorios',
    label: 'Recordatorios'
  },
  {
    value: 'campanas',
    label: 'Campañas'
  }
];

const UpdateNotifications = (): JSX.Element => {
  const classes = useStyle();
  const router = useRouter();

  const goBack = () => {
    router.back();
  };
  return (
    <LayoutBasic
      header={
        <UpdateHeader
          title="Notificaciones"
          description="Indicá cuales son tus preferencias de notificaciones"
        />
      }
      form={
        <LayoutForm
          form={
            <FormControl component="fieldset">
              <FormLabel component="legend">Tipo</FormLabel>
              <FormGroup aria-label="position" row>
                {type.map(item => (
                  <FormControlLabel
                    key={item.value}
                    value={item.value}
                    control={<Switch color="secondary" />}
                    label={item.label}
                    labelPlacement="start"
                  />
                ))}
              </FormGroup>

              <Divider />

              <FormLabel className={classes.containerLegend} component="legend">
                Preferencias
              </FormLabel>
              <FormGroup aria-label="position" row>
                {preferences.map(item => (
                  <FormControlLabel
                    key={item.value}
                    value={item.value}
                    control={<Switch color="secondary" />}
                    label={item.label}
                    labelPlacement="start"
                  />
                ))}
              </FormGroup>
            </FormControl>
          }
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
