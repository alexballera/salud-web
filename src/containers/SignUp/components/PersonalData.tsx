import React, { useState, useEffect, useRef } from 'react';
import _ from 'lodash';
import { convertToMask } from '../../../utils/helpers';
/// FORM
import * as yup from 'yup';
import { FormikProps } from 'formik';
/// SERVICE
import { personVerifier } from '../../../services/personVerifier.service';
/// TYPES
import {
  IPersonalDataForm,
  IPersonalDataProps,
  IPaciente,
  ResponseDataError
} from '../index.types';
/// OWN COMPONENTS
import TextField from '../../../components/common/TextField';
import DatePicker from '../../../components/common/DataPicker';
import TextMaskCustom from '../../../components/common/InputTextMask';
/// MATERIAL-UI
import Paper from '@material-ui/core/Paper';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
/// MATERIAL-UI END

function PersonalData({
  values,
  errors,
  touched,
  handleBlur,
  handleChange,
  setFieldValue,
  handleNotifications,
  documentTypesOptions
}: IPersonalDataProps & FormikProps<IPersonalDataForm>): JSX.Element {
  const inputMaskRef = useRef(null);
  const [data, setData] = useState<any>(null);
  const [typeError, setTypeError] = useState<string>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const isNotPhysicalID = !!(values.documentType !== 1 && values.documentType);

  const currentDocumentType = documentTypesOptions.find(
    data => data.documentTypeId === values.documentType
  );
  const documentNumberSanitized = values.documentNumber.replace(/\D+/g, '');

  /// HANDLERS

  const handlerChangeSelector = (e: React.ChangeEvent<{ name?: string; value: unknown }>): void => {
    handleChange(e);
    setUserValues();
    setFieldValue('documentNumber', '');
    setTimeout(() => {
      inputMaskRef.current.focus();
      inputMaskRef.current.setSelectionRange(0, 0);
    }, 100);
  };

  const handlerChangeDocument = (e: React.ChangeEvent<{ name?: string; value: string }>): void => {
    const regexAlphanumeric = /^[a-zA-Z0-9]*$/;
    const regexNumeric = /^[0-9]*$/;
    const value = e.target.value;

    if (currentDocumentType.documentTypeId === 1) {
      handleChange(e);
    } else if (currentDocumentType.documentTypeId === 2) {
      if (value.length <= 15 && regexNumeric.test(value)) {
        handleChange(e);
      }
    } else {
      if ((regexAlphanumeric.test(value) && value.length <= 20) || value === '') {
        handleChange(e);
      }
    }
  };

  const handleChangePicker = (date: Date): void => {
    setFieldValue('birthDate', date);
  };

  const handleChangeCustom = (e: React.ChangeEvent<{ name?: string; value: string }>): void => {
    const regex = /[^a-zA-Z]/;
    const value = e.target.value;

    if (!regex.test(value) || value === '') {
      handleChange(e);
    }
  };

  const handleChangeLabel = (val: number) => {
    const label = {
      1: 'Cédula Física',
      2: 'Cédula de Residencia',
      6: 'Pasaporte'
    };
    return label[val];
  };

  const handleChangeError = (err: string) => {
    return err;
  };

  const userValuesAlreadyExist = (): boolean => {
    const stepValues = {
      lastName: values.lastName,
      firstName: values.firstName,
      birthDate: values.birthDate,
      documentType: values.documentType,
      documentNumber: values.documentNumber
    };

    return !Object.values(stepValues).some(value => _.isEmpty(value));
  };

  const setUserValues = (data: IPaciente = null) => {
    setData(data);
    setFieldValue('firstName', data ? data.name : '');
    setFieldValue('lastName', data ? `${data.surname} ${data?.lastSurname ?? ''}` : '');
    setFieldValue('birthDate', data ? data.dateOfBirth : '');
  };

  const getResponseDataError = (responseDataError: ResponseDataError) => {
    setTypeError(responseDataError.type);
  };

  const showMessageDataError = (message: string) => {
    const type = {
      'Usuario no encontrado': 'Campos incorrectos, corregir para continuar.',
      default: message
    };
    return type[message] || type.default;
  };
  /// HANDLERS END

  /// USE EFFECTS
  useEffect(() => {
    if (currentDocumentType && !isNotPhysicalID) {
      if (documentNumberSanitized.length === currentDocumentType.length) {
        setLoading(true);
        personVerifier(values.documentType, documentNumberSanitized)
          .then(res => {
            const data = res.data.result.paciente;
            setUserValues(data);
          })
          .catch(err => {
            const message = showMessageDataError(err.response.data.error.message);
            handleNotifications({ open: true, message, severity: 'error' });
            getResponseDataError(err.response.data.error);
            setUserValues();
          })
          .finally(() => setLoading(false));
      }
    }
  }, [values.documentNumber]);
  /// USE EFFECTS END
  return (
    <div>
      <FormControl fullWidth variant="filled">
        <FormLabel id="document-type-selector-label" style={{ marginBottom: 10 }}>
          Tipo de identificación
        </FormLabel>
        <Select
          fullWidth
          id="document-type-selector"
          name="documentType"
          value={values.documentType}
          error={touched.documentType && Boolean(errors.documentType)}
          color="secondary"
          onBlur={handleBlur}
          labelId="document-type-selector-label"
          variant="outlined"
          onChange={handlerChangeSelector}
          data-testid="document-type-selector"
        >
          {documentTypesOptions.map((option, i) => (
            <MenuItem key={i} value={option.documentTypeId}>
              {handleChangeLabel(option.documentTypeId)}
            </MenuItem>
          ))}
        </Select>
        {touched.documentType && errors.documentType && (
          <FormHelperText error>{errors.documentType}</FormHelperText>
        )}
      </FormControl>
      <TextField
        id="documentNumber"
        name="documentNumber"
        type="text"
        label="Número de identificación"
        value={values.documentNumber}
        error={(touched.documentNumber && Boolean(errors.documentNumber)) || Boolean(typeError)}
        errorType={typeError}
        onBlur={handleBlur}
        loading={loading}
        inputRef={inputMaskRef}
        disabled={!values.documentType}
        onChange={handlerChangeDocument}
        helperText={handleChangeError(errors.documentNumber)}
        inputProps={{
          mask: convertToMask(currentDocumentType?.mask),
          'data-testid': 'documentNumber'
        }}
        inputComponent={
          convertToMask(currentDocumentType?.mask) ? (TextMaskCustom as any) : 'input'
        }
      />
      {(data || userValuesAlreadyExist() || isNotPhysicalID) && (
        <Paper square elevation={0}>
          <TextField
            id="firstName"
            name="firstName"
            label="Nombre"
            value={values.firstName}
            error={touched.firstName && Boolean(errors.firstName)}
            onBlur={handleBlur}
            disabled={!isNotPhysicalID}
            onChange={handleChangeCustom}
            helperText={errors.firstName}
            data-testid="firstName"
            formControlProps={{ margin: 'normal' }}
          />
          <TextField
            id="lastName"
            name="lastName"
            label="Apellido"
            value={values.lastName}
            error={touched.lastName && Boolean(errors.lastName)}
            onBlur={handleBlur}
            disabled={!isNotPhysicalID}
            onChange={handleChangeCustom}
            helperText={errors.lastName}
            data-testid="lastName"
            formControlProps={{ margin: 'normal' }}
          />
          <DatePicker
            id="birthDate"
            label="Fecha de nacimiento"
            value={values.birthDate === '' ? null : values.birthDate}
            margin="normal"
            format="MM/dd/yyyy"
            onBlur={handleBlur}
            variant="inline"
            onChange={handleChangePicker}
            disabled={!isNotPhysicalID}
            inputVariant="outlined"
            maxDate={new Date()}
            error={touched.birthDate && !!errors.birthDate}
            helperText={touched.birthDate && !!errors.birthDate ? errors.birthDate : ''}
          />
        </Paper>
      )}
    </div>
  );
}

PersonalData.title = 'Identifícate';
PersonalData.description = 'Para empezar tu registro bríndanos tu número de identificación';
PersonalData.validations = {
  name: 'PersonalData',
  schema: yup.object().shape({
    lastName: yup.string().required('Campo requerido').min(3, 'Número de caracteres minimos 3'),
    birthDate: yup.date().max(new Date(), 'Fecha inválida').required('Campo requerido'),
    firstName: yup.string().required('Campo requerido').min(3, 'Número de caracteres minimos 3'),
    documentType: yup.number().required('Campo requerido'),
    documentNumber: yup
      .string()
      .required('Campo requerido')
      .when(['documentType'], {
        is: documentType => documentType === 1,
        then: yup
          .string()
          .transform(value => value.replace(/[^\d]/g, ''))
          .min(9, 'Número de caracteres minimos 9')
      })
      .when(['documentType'], {
        is: documentType => documentType === 2,
        then: yup
          .string()
          .transform(value => value.replace(/[^\d]/g, ''))
          .min(10, 'Caracteres mínimos para Residencia 10, máx 15')
          .max(15, 'Caracteres mínimos para Residencia 10, máx 15')
      })
      .when(['documentType'], {
        is: documentType => documentType === 6,
        then: yup
          .string()
          .min(9, 'Número de caracteres mínimos para Pasaporte 9, máx 20')
          .max(20, 'Número de caracteres mínimos para Pasaporte 9, máx 20')
      })
  })
};
/// STEP PARAMS END

/// DEFAULT PROPS
PersonalData.defaultProps = {
  documentTypesOptions: ''
};
/// DEFAULT PROPS END

export default PersonalData;
