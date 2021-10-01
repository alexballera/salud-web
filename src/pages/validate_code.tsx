import React, { useState } from 'react';
import { useRouter } from 'next/router';
import ReactCodeInput from 'react-code-input';

/// CONTEXT
/// CONTEXT END

/// MATERIAL - UI
import {
  Button,
  Box,
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
import SvgContainer from '../components/common/SvgContainer';
import SvgBanner from '../components/common/Svg/SvgBanner.component';
/// OWN COMPONENTS END

/// STYLES & TYPES
import { ThemeProvider } from '@material-ui/core/styles';
import theme, { errorColor } from '../styles/js/theme';
import {
  validateCodeCustomTheme,
  validateCodeStyles
} from '../containers/ValidateCode/styles.module';
import { IValidateProps } from '../containers/ValidateCode/types';
/// STYLES & TYPES END

/// FORM STATES & VALIDATIONS
/// FORM STATES & VALIDATIONS END

export default function ValidateCodePage({
  userPinCode,
  userName,
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

  const checkPinCode = () => {
    const isPinCodeValid = pinCode === userPinCode;
    setIsPinCodeValid(isPinCodeValid);
    if (!isPinCodeValid) setPinCode('');
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
    <div className={classes.boxContainer}>
      <Box p={3} style={{ backgroundColor: 'white' }}>
        <Grid container spacing={1} justify="center">
          <Grid item xs={8} md={8} className={classes.imgContainer}>
            <SvgContainer title="Banner Svg" width={173} height={137}>
              <SvgBanner />
            </SvgContainer>
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid item xs={10} md={10}>
            <Typography variant="h2" component="h2" className={classes.title}>
              Cuenta creada exitosamente
            </Typography>
          </Grid>
          <Grid item xs={10} md={10} className={classes.desciption}>
            <Typography variant="h5" component="h5" className={classes.desciptionText}>
              Felicidades {userName}, has creado tu cuenta correctamente, se envió un mensaje a tu
              correo electrónico para que actives tu cuenta.
            </Typography>
          </Grid>
          <Grid item xs={12} md={12}>
            <FormControl fullWidth>
              <FormLabel className={classes.label}>Código de validación</FormLabel>
              <ReactCodeInput
                name="pinCode"
                inputMode="numeric"
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
            <Grid container item xs={12} spacing={2} justify="space-between">
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
                Podés volver a intentar en {seconds === 60 ? '1:00 min' : `${seconds} seg`}
              </Paper>
            </Grid>
          )}
        </Grid>
        <Grid container spacing={1}>
          <Grid item xs={6} md={6}>
            <Button
              fullWidth
              onClick={() => router.back()}
              color="primary"
              variant="outlined"
              className={classes.button}
            >
              Volver
            </Button>
          </Grid>
          <Grid item xs={6} md={6}>
            <Button
              fullWidth
              onClick={() => checkPinCode()}
              color="primary"
              variant="contained"
              className={classes.button}
            >
              Finalizar
            </Button>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}

ValidateCodePage.defaultProps = {
  userPinCode: '123456',
  userName: 'Marco',
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
