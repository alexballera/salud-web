import React, { useEffect, useState } from 'react';
import { FormikProps } from 'formik';
import * as yup from 'yup';
/// TYPES
import { IValidationDataForm } from '../../../types/recover.types';
/// MATERIAL-UI
import FormControl from '@material-ui/core/FormControl';
import {
  Box,
  Button,
  Slide,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Typography,
  makeStyles,
  InputLabel
} from '@material-ui/core';
import ReactCodeInput from 'react-code-input';
import {
  forgotPasswordConfirmCodeService,
  forgotPasswordResendPin,
  forgotPasswordSendEmailService
} from '../../../services/auth.service';
import { useRouter } from 'next/router';
/// MATERIAL-UI END

interface IProps extends FormikProps<IValidationDataForm> {
  handleLoading(loading: boolean): void;
  handleError: (open: boolean, message?: string) => void;
}

const Transition = React.forwardRef(function Transition(
  props: { children: React.ReactElement<any, any> },
  ref
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ResendButton = props => {
  const [modifiedDate, setModifiedDate] = useState(new Date(0));
  const [restTime, setRestTime] = useState('');

  useEffect(() => {
    let continued = true;

    const loopFunction = () => {
      const modified = modifiedDate.getTime();
      const now = Date.now();
      console.log({ modified, now, rest: modified - now, rest2: now - modified });

      const rest = (now - modified) / 1000;

      if (rest < 60) {
        setRestTime(` (Vuelve a probar en ${60 - Math.floor(rest)} segundos)`);
      } else {
        setRestTime('');
      }
      if (continued) setTimeout(loopFunction, 1000);
    };

    loopFunction();

    return () => {
      continued = false;
    };
  }, [modifiedDate]);

  const _handleClick = () => {
    props.onClick();
    setModifiedDate(new Date(Date.now()));
  };

  return (
    <Button disabled={restTime !== ''} onClick={_handleClick} data-testid="resend-button">
      Reenviar correo{restTime}
    </Button>
  );
};

function ValidationData({
  values,
  handleChange,
  handleLoading,
  handleError,
  handleSubmit
}: IProps): JSX.Element {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [expiredDialogOpen, setExpiredDialogOpen] = useState(false);
  const router = useRouter();
  const classes = useStyles();

  const _handleResend = (email: string) => {
    handleLoading(true);
    forgotPasswordResendPin(email)
      .then(res => {
        console.log({ res, result: { ...res } });
      })
      .catch(err => {
        console.log({ err, error: { ...err } });
      })
      .finally(() => handleLoading(false));
  };

  useEffect(() => {
    handleLoading(true);
    // Add aria-label to input
    /* const wrapper = document.getElementsByClassName('react-code-input')[0];
    const nodes = wrapper.children;
    for (let i = 0; i < nodes.length; i++) {
      nodes[i].setAttribute('aria-label', 'Código de validación en el índice ' + i);
    } */

    forgotPasswordSendEmailService(values.email)
      .catch(err => {
        if (err.response && err.response.status === 404) {
          return setDialogOpen(true);
        } else if (err.response) {
          handleError(true, err.response.data.error.message);
        } else {
          handleError(
            true,
            'Ha ocurrido un error desconocido. Vuelve a intentarlo o contacta a un administrador.'
          );
        }
        router.back();
      })
      .finally(() => {
        handleLoading(false);
      });
  }, []);

  useEffect(() => {
    if (values.pinCode.length === 6) {
      const confirmPinCode = async () => {
        try {
          const isValidResponse = await forgotPasswordConfirmCodeService(
            values.email,
            values.pinCode
          );
          if (isValidResponse) return true;
          else
            handleError(
              true,
              'Ha ocurrido un error desconocido. Vuelve a intentarlo o contacta a un administrador.'
            );
        } catch (err) {
          if (err.response?.data.error.code === 'sld-user-14') {
            setExpiredDialogOpen(true);
            _handleResend(values.email);
          } else if (err.response) handleError(true, err.response.data.error.message);
          else
            handleError(
              true,
              'Ha ocurrido un error desconocido. Vuelve a intentarlo o contacta a un administrador.'
            );
          return false;
        }
      };

      handleLoading(true);
      confirmPinCode().then(res => {
        handleChange('validPin')(res ? '1' : '0');
        handleLoading(false);
        if (res) {
          handleSubmit();
        }
      });
    } else if (values.validPin === '1') {
      handleChange('validPin')('0');
    }
  }, [values.pinCode]);

  return (
    <>
      <Box>
        <FormControl fullWidth margin="normal" className={classes.root}>
          <label
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              color: 'transparent'
            }}
          >
            Código de validación
            <ReactCodeInput
              type="text"
              name="pinCode"
              fields={6}
              inputMode="numeric"
              value={values.pinCode}
              onChange={handleChange('pinCode')}
              disabled={values.validPin === '1'}
            />
          </label>
        </FormControl>
        <Box display="flex" alignItems="center" justifyContent="center">
          <Typography>¿No recibiste el correo?</Typography>
          <ResendButton onClick={() => _handleResend(values.email)} />
        </Box>
      </Box>

      <Dialog
        open={dialogOpen}
        TransitionComponent={Transition}
        keepMounted
        onClose={router.back}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">Correo electrónico no encontrado</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            El correo indicado no está registrado, ¿desea registrarse?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => router.back()} color="secondary">
            Cancelar
          </Button>
          <Button onClick={() => router.replace('/signup')} color="primary">
            Registrarse
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={expiredDialogOpen}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => setExpiredDialogOpen(false)}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">Código de validación expirado</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            El código ingresado se ha vencido, se le ha enviado un nuevo código al correo
            electrónico
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setExpiredDialogOpen(false)} color="secondary">
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
}));

ValidationData.title = 'Código de verificación';
ValidationData.description =
  'Ingrese el código de validación que se le envió al correo electrónico para continuar';

ValidationData.validations = {
  name: 'ValidationStep',
  schema: yup.object().shape({
    pinCode: yup
      .string()
      .required('Codigo de verificación requerido')
      .min(6, 'El pin debe tener 6 caracteres')
      .matches(/^[0-9]{0,6}$/, 'El código de verificación debe contener números únicamente'),
    validPin: yup.string().equals(['1'], 'El código de verificación es incorrecto')
  })
};

export default ValidationData;
