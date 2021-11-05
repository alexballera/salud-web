import React, { ChangeEvent, useState } from 'react';
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
  Switch,
  Theme
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
import { withStyles } from '@material-ui/core/styles';
const useStyle = makeStyles(() =>
  createStyles({
    legend: {
      marginBottom: 24
    },
    label: {
      justifyContent: 'space-between',
      marginBottom: '16px !important',
      width: '100%'
    },
    divider: {
      marginBottom: 28,
      marginTop: 28
    }
  })
);
/// STYLES & TYPES END

const AntSwitch = withStyles((theme: Theme) => ({
  root: {
    width: 28,
    height: 16,
    padding: 0,
    display: 'flex'
  },
  switchBase: {
    padding: 2,
    color: theme.palette.grey[500],
    '&$checked': {
      transform: 'translateX(12px)',
      color: theme.palette.common.white,
      '& + $track': {
        opacity: 1,
        backgroundColor: '#4caf50',
        borderColor: '#4caf50'
      }
    }
  },
  thumb: {
    width: 12,
    height: 12,
    boxShadow: 'none'
  },
  track: {
    border: `1px solid ${theme.palette.grey[500]}`,
    borderRadius: 16 / 2,
    opacity: 1,
    backgroundColor: theme.palette.common.white
  },
  checked: {}
}))(Switch);

const UpdateNotifications = (): JSX.Element => {
  const classes = useStyle();
  const router = useRouter();
  const [state, setState] = useState({
    sms: true,
    email: true,
    push: true,
    novedades: true,
    promociones: true,
    recordatorios: true,
    campanas: true
  });

  const type = [
    {
      value: 'sms',
      label: 'SMS',
      checked: state.sms
    },
    {
      value: 'email',
      label: 'Correos electrónicos',
      checked: state.email
    },
    {
      value: 'push',
      label: 'Push notifications',
      checked: state.push
    }
  ];

  const preferences = [
    {
      value: 'novedades',
      label: 'Novedades',
      checked: state.novedades
    },
    {
      value: 'promociones',
      label: 'Promociones',
      checked: state.promociones
    },
    {
      value: 'recordatorios',
      label: 'Recordatorios',
      checked: state.recordatorios
    },
    {
      value: 'campanas',
      label: 'Campañas',
      checked: state.campanas
    }
  ];

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      [event.target.name]: event.target.checked
    });
  };

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
              <FormLabel component="legend" className={classes.legend}>
                Tipo
              </FormLabel>
              <FormGroup aria-label="position" row>
                {type.map(item => (
                  <FormControlLabel
                    key={item.value}
                    value={item.value}
                    control={
                      <AntSwitch checked={item.checked} onChange={handleChange} name={item.value} />
                    }
                    label={item.label}
                    labelPlacement="start"
                    className={classes.label}
                  />
                ))}
              </FormGroup>

              <Divider className={classes.divider} />

              <FormLabel component="legend" className={classes.legend}>
                Preferencias
              </FormLabel>
              <FormGroup aria-label="position" row>
                {preferences.map(item => (
                  <FormControlLabel
                    key={item.value}
                    value={item.value}
                    control={
                      <AntSwitch checked={item.checked} onChange={handleChange} name={item.value} />
                    }
                    label={item.label}
                    labelPlacement="start"
                    className={classes.label}
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
