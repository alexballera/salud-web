import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import ReactCodeInput from 'react-code-input';

/// CONTEXT
/// CONTEXT END

/// MATERIAL - UI
import {
  Button,
  Grid,
  Typography,
  FormControl,
  FormHelperText,
  FormLabel,
  Paper
} from '@material-ui/core';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
/// MATERIAL - UI END

/// SERVICES
/// SERVICES END

/// OWN COMPONENTS
import LayoutCode from '../layouts/LayoutCode';
/// OWN COMPONENTS END

/// STYLES & TYPES
import { ThemeProvider } from '@material-ui/core/styles';
import theme, { errorColor } from '../styles/js/theme';
import {
  validateCodeCustomTheme,
  validateCodeStyles
} from '../containers/ValidateCode/styles.module';
import { IValidateProps } from '../containers/ValidateCode/types';
import {
  forgotPasswordConfirmCodeService,
  getDataUserStorage,
  ISignUpBody
} from '../services/auth.service';
/// STYLES & TYPES END

/// FORM STATES & VALIDATIONS
/// FORM STATES & VALIDATIONS END

export default function ValidateCodePage({
  inputStyle,
  inputStyleInvalid
}: IValidateProps): JSX.Element {
  const classes = validateCodeStyles();
  const router = useRouter();
  const time = 60;
  const [isPinCodeValid, setIsPinCodeValid] = useState(true);
  const [pinCode, setPinCode] = useState('');
  const [show, setShow] = useState(false);
  const [seconds, setSeconds] = useState(time);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');

  useEffect(() => {
    getDataUserStorage('person');
    const user: ISignUpBody = getDataUserStorage('person');
    setEmail(user.email);
    setName(user.firstName);
  });

  const checkPinCode = () => {
    if (isPinCodeValid) {
      forgotPasswordConfirmCodeService(email, pinCode)
        .then(res => {
          console.log('res', res);
          router.replace('/main');
        })
        .catch(err => {
          console.log(err.response.data.error.message);
          setIsPinCodeValid(false);
        });
    } else {
      setPinCode('');
    }
  };

  const handlePinChange = (pinCode: string) => {
    setPinCode(pinCode);
    if (pinCode.length < 6) setIsPinCodeValid(true);
  };

  const handleShow = () => {
    setShow(true);
    let count = 0;
    const handleCount = setInterval(() => {
      count++;
      setSeconds(seconds - count);
    }, 1000);
    setTimeout(() => {
      setShow(false);
      setSeconds(time);
      clearInterval(handleCount);
    }, time * 1000);
  };

  return (
    <LayoutCode
      title={'Cuenta creada exitosamente'}
      description={`Felicidades ${name}, has creado tu cuenta correctamente, se envió un mensaje a tu
      correo electrónico para que actives tu cuenta.`}
      content={
        <>
          <Grid container item xs={12} className={classes.containerContent}>
            <FormControl fullWidth>
              <FormLabel className={classes.label}>Código de validación</FormLabel>
              <ReactCodeInput
                name="pinCode"
                inputMode="tel"
                type="tel"
                isValid={isPinCodeValid}
                fields={6}
                onChange={handlePinChange}
                value={pinCode}
                inputStyle={inputStyle}
                inputStyleInvalid={inputStyleInvalid}
              />
              {!isPinCodeValid && (
                <ThemeProvider theme={validateCodeCustomTheme}>
                  <FormHelperText error>Código inválido</FormHelperText>
                </ThemeProvider>
              )}
            </FormControl>
          </Grid>
          {!show && (
            <Grid container item xs={12} justify="space-between">
              <Grid item xs={6}>
                <Typography className={classes.desciptionText}>¿No recibiste el código?</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography color="secondary" className={classes.link} onClick={() => handleShow()}>
                  Reenviar correo
                </Typography>
              </Grid>
            </Grid>
          )}
          {show && (
            <Grid item xs={12} md={12}>
              <Paper variant="outlined" className={classes.paperRoot}>
                <AccessTimeIcon color="secondary" className={classes.iconRoot} />
                Podés volver a intentar en {seconds === 60 ? '1:00 min' : `${seconds}s`}
              </Paper>
            </Grid>
          )}
        </>
      }
      leftButton={
        <Button
          fullWidth
          onClick={() => router.back()}
          color="primary"
          variant="outlined"
          className={classes.button}
        >
          Volver
        </Button>
      }
      rightButton={
        <Button
          fullWidth
          onClick={() => checkPinCode()}
          color="primary"
          variant="contained"
          className={classes.button}
        >
          Finalizar
        </Button>
      }
    />
  );
}

ValidateCodePage.defaultProps = {
  inputStyle: {
    width: 43,
    height: 43,
    fontSize: 20,
    textAlign: 'center',
    marginRight: 5,
    borderWidth: 1,
    borderRadius: 4,
    borderColor: 'rgba(0,0,0,.23)',
    outlineColor: theme.palette.secondary.main
  },
  inputStyleInvalid: {
    width: 43,
    height: 43,
    fontSize: 20,
    textAlign: 'center',
    marginRight: 5,
    borderWidth: 1,
    borderRadius: 4,
    borderColor: errorColor,
    outlineColor: errorColor,
    color: errorColor
  }
};
