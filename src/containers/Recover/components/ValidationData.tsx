import React, { useEffect } from 'react';
import { FormikProps } from 'formik';
import * as yup from 'yup';
/// TYPES
import { IValidationDataForm } from '../../../types/recover.types';
/// MATERIAL-UI
import FormControl from '@material-ui/core/FormControl';
import { Box, makeStyles } from '@material-ui/core';
import ReactCodeInput from 'react-code-input';
import {
  forgotPasswordConfirmCodeService,
  forgotPasswordSendEmailService
} from '../../../services/auth.service';
import { useRouter } from 'next/router';
/// MATERIAL-UI END

interface IProps extends FormikProps<IValidationDataForm> {
  handleLoading(loading: boolean): void;
  handleError: (open: boolean, message?: string) => void;
}

function ValidationData({ values, handleChange, handleLoading, handleError }: IProps): JSX.Element {
  const router = useRouter();
  const classes = useStyles();

  useEffect(() => {
    handleLoading(true);
    forgotPasswordSendEmailService(values.email)
      .catch(err => {
        if (err.response) handleError(true, err.response.data.error.message);
        else
          handleError(
            true,
            'Ha ocurrido un error desconocido. Vuelve a intentarlo o contacta a un administrador.'
          );
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
          if (err.response) handleError(true, err.response.data.error.message);
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
      });
    } else if (values.validPin === '1') {
      handleChange('validPin')('0');
    }
  }, [values.pinCode]);

  return (
    <Box>
      <FormControl fullWidth margin="normal" className={classes.root}>
        <ReactCodeInput
          type="text"
          name="pinCode"
          fields={6}
          inputMode="numeric"
          value={values.pinCode}
          onChange={handleChange('pinCode')}
          disabled={values.validPin === '1'}
        />
      </FormControl>
    </Box>
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
