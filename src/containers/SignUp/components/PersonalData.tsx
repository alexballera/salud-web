import React, { useState, useEffect, useRef } from 'react';
import _ from 'lodash';
import { addYears } from 'date-fns';
import { convertToMask } from '../../../utils/helpers';

/// FORM
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

/// i18n
import { useTranslation } from 'react-i18next';
/// i18n END

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
  const { t } = useTranslation(['globals', 'forms']);
  const inputMaskRef = useRef(null);
  const [data, setData] = useState<IPaciente>(null);
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
    touched.documentType = false;
    touched.documentNumber = false;
    touched.birthDate = false;
    touched.firstName = false;
    touched.lastName = false;
    setData(null);
    setFieldValue('firstName', '');
    setFieldValue('lastName', '');
    setFieldValue('birthDate', '');
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
    const regex =
      /[^a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$ /g;
    const value = e.target.value;

    if (!regex.test(value) || value === '') {
      handleChange(e);
    }
  };

  const handleChangeLabel = (val: number) => {
    const label = {
      1: `${t('label.document.physical', { ns: 'globals' })}`,
      2: `${t('label.document.residence', { ns: 'globals' })}`,
      6: `${t('label.document.passport', { ns: 'globals' })}`
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

  const setDataBirth = (date: string): string => {
    const toDate = new Date(date);
    if (toDate instanceof Date && !isNaN(toDate.getTime())) {
      return toDate.toISOString();
    }
    return '';
  };

  const setUserValues = (data: IPaciente = null) => {
    setData(data);
    setFieldValue('firstName', data ? data.name : '');
    setFieldValue('lastName', data ? `${data.surname} ${data?.lastSurname ?? ''}` : '');
    setFieldValue('birthDate', data ? setDataBirth(data.dateOfBirth) : '');
  };

  const getResponseDataError = (responseDataError: ResponseDataError, currentDocumentType) => {
    if (currentDocumentType.documentTypeId === 1) {
      setTypeError(responseDataError.type);
    }
  };

  const showMessageDataError = (message: string) => {
    const type = {
      'Usuario no encontrado': `${t('message.error.field_incorrect', { ns: 'forms' })}`,
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
            setTypeError('');
            setUserValues(data);
          })
          .catch(err => {
            const message = showMessageDataError(err.response.data.error.message);
            handleNotifications({ open: true, message, severity: 'error' });
            getResponseDataError(err.response.data.error, currentDocumentType);
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
          {t('label.document.type', { ns: 'globals' })}
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
        label={t('label.document.number')}
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
            label={t('label.name', { ns: 'globals' })}
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
            label={t('label.lastname', { ns: 'globals' })}
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
            label={t('label.birthdate', { ns: 'globals' })}
            value={values.birthDate === '' ? null : values.birthDate}
            margin="normal"
            format="dd/MM/yyyy"
            onBlur={handleBlur}
            variant="inline"
            onChange={handleChangePicker}
            disabled={!isNotPhysicalID}
            inputVariant="outlined"
            maxDate={addYears(new Date(), -18)}
            error={touched.birthDate && !!errors.birthDate}
            helperText={touched.birthDate && !!errors.birthDate ? errors.birthDate : ''}
            formControlProps={{ margin: 'normal' }}
          />
        </Paper>
      )}
    </div>
  );
}

/// DEFAULT PROPS
PersonalData.defaultProps = {
  documentTypesOptions: ''
};
/// DEFAULT PROPS END

export default PersonalData;
