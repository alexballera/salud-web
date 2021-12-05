import React, { useEffect, useState } from 'react';
import { FormikProps } from 'formik';
import * as yup from 'yup';
/// TYPES
import { IValidationDataForm } from '../../../types/recover.types';
/// MATERIAL-UI
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Typography
} from '@material-ui/core';
import ReactCodeInput from '../../../components/common/CodeInput';
import {
  forgotPasswordConfirmCodeService,
  forgotPasswordResendPin,
  forgotPasswordSendEmailService
} from '../../../services/auth.service';
import { useRouter } from 'next/router';
/// MATERIAL-UI END

/// i18n
import { useTranslation } from 'react-i18next';
import { NAMESPACE_KEY } from '../../../i18n/globals/i18n';
/// i18n END

interface IProps extends FormikProps<IValidationDataForm> {
  handleLoading(loading: boolean): void;
  handleError: (open: boolean, message?: string) => void;
}

const ResendButton = props => {
  const [modifiedDate, setModifiedDate] = useState(new Date(0));
  const [restTime, setRestTime] = useState('');

  useEffect(() => {
    let continued = true;

    const loopFunction = () => {
      const modified = modifiedDate.getTime();
      const now = Date.now();

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
  handleSubmit,
  setFieldValue
}: IProps): JSX.Element {
  const { t } = useTranslation([NAMESPACE_KEY, 'forms', 'code']);
  const [initialized, setInitialized] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [expiredDialogOpen, setExpiredDialogOpen] = useState(false);
  const router = useRouter();

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

    if (values.pinCode.length === 0) {
      forgotPasswordSendEmailService(values.email)
        .catch(err => {
          if (err.response && err.response.status === 404) {
            return setDialogOpen(true);
          } else if (err.response) {
            handleError(true, err.response.data.error.message);
          } else {
            handleError(true, `${t('message.error.submit', { ns: 'forms' })}`);
          }
          router.back();
        })
        .finally(() => {
          handleLoading(false);
        });
    }
  }, []);

  useEffect(() => {
    if (!initialized) {
      setFieldValue('validPin', '0');
      setFieldValue('pinCode', '');
      setInitialized(true);
      return;
    }

    if (values.pinCode.length === 6) {
      const confirmPinCode = async () => {
        try {
          const isValidResponse = await forgotPasswordConfirmCodeService(
            values.email,
            values.pinCode
          );
          if (isValidResponse) return true;
          else handleError(true, `${t('message.error.submit', { ns: 'forms' })}`);
        } catch (err) {
          if (err.response) {
            const message = err.response.data.error.message;

            // Pa un futuro esto servirá para
            switch (err.response.data.error.code) {
              case 'sld-user-14':
                setExpiredDialogOpen(true);
                _handleResend(values.email);
                return;
            }

            handleError(true, message);
          } else handleError(true, `${t('message.error.submit', { ns: 'forms' })}`);
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
        <ReactCodeInput
          type="text"
          label={t('label', { ns: 'code' })}
          name="pinCode"
          fields={6}
          inputMode="numeric"
          value={values.pinCode}
          onChange={handleChange('pinCode')}
          disabled={values.validPin === '1'}
          formLabelProps={{
            style: {
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }
          }}
        />
        <Box display="flex" alignItems="center" justifyContent="center">
          <Typography>{t('message.email.not_received', { ns: 'forms' })}</Typography>
          <ResendButton onClick={() => _handleResend(values.email)} />
        </Box>
      </Box>

      <Dialog
        open={dialogOpen}
        keepMounted
        onClose={router.back}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">
          {t('message.email.not_found', { ns: 'forms' })}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {t('message.email.not_register', { ns: 'forms' })}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => router.back()} color="secondary">
            {t('button.cancel', { ns: NAMESPACE_KEY })}
          </Button>
          <Button onClick={() => router.replace('/signup')} color="primary">
            {t('button.register', { ns: NAMESPACE_KEY })}
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={expiredDialogOpen}
        keepMounted
        onClose={() => setExpiredDialogOpen(false)}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">
          {t('messages.expired', { ns: 'code' })}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {t('message.expired_description', { ns: 'code' })}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setExpiredDialogOpen(false)} color="secondary">
            {t('button.close', { ns: NAMESPACE_KEY })}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

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
