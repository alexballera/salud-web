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

/// i18n
import { useTranslation } from 'react-i18next';
import { NAMESPACE_KEY } from '../i18n/code_validation/i18n';
/// i18n END

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
import {
  forgotPasswordConfirmCodeService,
  forgotPasswordResendPin,
  getDataFromLocalstorage
} from '../services/auth.service';
import { withAppContext } from '../context';
import { getStaticProps } from './signup';
import { IProps } from '../containers/SignUp/index.types';
import { InferGetStaticPropsType } from 'next';
import { IValidateProps } from '../containers/ValidateCode/types';
import { User } from '../types/auth.types';
/// STYLES & TYPES END

/// FORM STATES & VALIDATIONS
/// FORM STATES & VALIDATIONS END

function ValidateCodePage({
  inputStyle,
  inputStyleInvalid,
  handleError
}: InferGetStaticPropsType<typeof getStaticProps> & IProps & IValidateProps): JSX.Element {
  const { t } = useTranslation([NAMESPACE_KEY, 'globals']);
  const classes = validateCodeStyles();
  const router = useRouter();
  const time = 60;
  const [isPinCodeValid, setIsPinCodeValid] = useState(true);
  const [pinCode, setPinCode] = useState('');
  const [show, setShow] = useState(false);
  const [seconds, setSeconds] = useState(time);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  let user: User;

  useEffect(() => {
    user = getDataFromLocalstorage('user');
    setEmail(user.email);
    setName(user.firstName);
  });

  const checkPinCode = () => {
    if (isPinCodeValid) {
      forgotPasswordConfirmCodeService(email, pinCode)
        .then(() => {
          handleError(true, `${t('message.success', { ns: NAMESPACE_KEY })}`, 'success');
          router.replace('/main');
        })
        .catch(err => {
          const message = err.response.data.error.message;
          handleError(true, message);
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
    forgotPasswordResendPin(email);
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
      title={t('title', { ns: NAMESPACE_KEY })}
      description={t('description', { ns: NAMESPACE_KEY, name })}
      content={
        <>
          <Grid container item xs={12} className={classes.containerContent}>
            <FormControl fullWidth>
              <FormLabel className={classes.label}>{t('label', { ns: NAMESPACE_KEY })}</FormLabel>
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
                  <FormHelperText error>
                    {t('messages.invalid', { ns: NAMESPACE_KEY })}
                  </FormHelperText>
                </ThemeProvider>
              )}
            </FormControl>
          </Grid>
          {!show && (
            <Grid container item xs={12} justify="space-between">
              <Grid item xs={6}>
                <Typography className={classes.desciptionText}>
                  {t('messages.dont_recive', { ns: NAMESPACE_KEY })}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography color="secondary" className={classes.link} onClick={() => handleShow()}>
                  {t('messages.resend_email', { ns: NAMESPACE_KEY })}
                </Typography>
              </Grid>
            </Grid>
          )}
          {show && (
            <Grid item xs={12} md={12}>
              <Paper variant="outlined" className={classes.paperRoot}>
                <AccessTimeIcon color="secondary" className={classes.iconRoot} />
                {t('messages.resend_label', { ns: NAMESPACE_KEY })}{' '}
                {seconds === 60 ? '1:00 min' : `${seconds}s`}
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
          {t('button.back', { ns: 'globals' })}
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
          {t('button.end', { ns: 'globals' })}
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

export default withAppContext(ValidateCodePage);
