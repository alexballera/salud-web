import React, { useState } from 'react';
import { useRouter } from 'next/router';
import {
  Button,
  Box,
  Grid,
  Typography,
  FormControl,
  FormHelperText,
  FormLabel,
  createMuiTheme,
  Paper
} from '@material-ui/core';
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import SvgContainer from '../components/common/SvgContainer';
import ReactCodeInput from 'react-code-input';
import theme, { errorColor } from '../styles/js/theme';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import SvgBanner from '../components/common/Svg/SvgBanner.component';

const customTheme = createMuiTheme({
  overrides: {
    MuiFormHelperText: {
      root: {
        '&$error': {
          textAlign: 'left'
        }
      }
    }
  }
});
const useStyles = makeStyles({
  boxContainer: {
    position: 'absolute',
    top: 0,
    backgroundColor: 'white',
    zIndex: 1200,
    height: '100vh',
    width: '100%'
  },
  button: {
    textTransform: 'initial'
  },
  imgContainer: {
    marginBottom: 16,
    marginTop: 56,
    textAlign: 'center'
  },
  title: {
    fontSize: 20,
    fontWeight: 500,
    letterSpacing: 0.15,
    marginBottom: 8
  },
  desciption: {
    color: 'rgba(0, 0, 0, 0.6)',
    fontSize: 14,
    letterSpacing: 0.15,
    marginBottom: 40
  },
  label: {
    color: 'rgba(0, 0, 0, 0.87)',
    marginBottom: 10,
    fontSize: 14,
    fontWeight: 500
  },
  input: {
    marginBottom: 34
  },
  paperRoot: {
    fontSize: 14,
    marginBottom: 24,
    padding: 15
  },
  iconRoot: {
    height: 20,
    width: 20,
    marginRight: 16
  }
});

type Props = {
  userPinCode: string;
  userName: string;
  inputStyle: Record<string, unknown>;
  inputStyleInvalid: Record<string, unknown>;
};

export default function ValidateCodePage({
  userPinCode,
  userName,
  inputStyle,
  inputStyleInvalid
}: Props): JSX.Element {
  const classes = useStyles();
  const router = useRouter();
  const [isPinCodeValid, setIsPinCodeValid] = useState(true);
  const [pinCode, setPinCode] = useState('');

  const checkPinCode = () => {
    const isPinCodeValid = pinCode === userPinCode;
    setIsPinCodeValid(isPinCodeValid);
    if (!isPinCodeValid) setPinCode('');
  };

  const handlePinChange = (pinCode: string) => {
    setPinCode(pinCode);
    if (pinCode.length < 6) setIsPinCodeValid(true);
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

        <Grid container>
          <Grid item xs={10} md={10}>
            <Typography variant="h2" component="h2" className={classes.title}>
              Cuenta creada exitosamente
            </Typography>
          </Grid>
          <Grid item xs={10} md={10}>
            <Typography variant="h5" component="h5" className={classes.desciption}>
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
                className={classes.input}
              />
              {!isPinCodeValid && (
                <ThemeProvider theme={customTheme}>
                  <FormHelperText error>Código inválido</FormHelperText>
                </ThemeProvider>
              )}
            </FormControl>
          </Grid>

          <Grid item xs={12} md={12}>
            <Paper variant="outlined" className={classes.paperRoot}>
              <AccessTimeIcon color="secondary" className={classes.iconRoot} />
              Podés volver a intentar en 01:00
            </Paper>
          </Grid>
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
