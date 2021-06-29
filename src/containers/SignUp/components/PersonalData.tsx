import React, { useState, useEffect, useRef } from 'react';
import _ from 'lodash';
/// FORM
import * as yup from 'yup';
import { FormikProps } from 'formik';
/// SERVICE
import { personVerifier } from '../../../services/personVerifier.service';
/// TYPES
import { IPersonalDataForm, IPersonalDataProps } from '../index.types';
/// OWN COMPONENTS
import TextField from '../../../components/common/TextField';
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
  documentTypesOptions
}: IPersonalDataProps & FormikProps<IPersonalDataForm>): JSX.Element {
  const inputMaskRef = useRef(null);
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const currentDocumentType = documentTypesOptions.find(
    data => data.documentTypeId === values.documentType
  );
  const documentNumberSanitized = values.documentNumber.replace(/\D+/g, '');

  /// HANDLERS
  const compareLenghtRequired = () => {
    return currentDocumentType
      ? currentDocumentType.length !== documentNumberSanitized.length
      : false;
  };

  const handlerChangeSelector = (e: React.ChangeEvent<{ name?: string; value: unknown }>): void => {
    handleChange(e);
    setTimeout(() => {
      inputMaskRef.current.focus();
      inputMaskRef.current.setSelectionRange(0, 0);
      setFieldValue('documentNumber', '');
    }, 100);
  };

  const userValuesAlreadyExist = (): boolean => {
    let valuesAlreadyExist = false;
    const stepValues = {
      lastName: values.lastName,
      firstName: values.firstName,
      birthDate: values.birthDate,
      documentType: values.documentType,
      documentNumber: values.documentNumber
    };

    // eslint-disable-next-line no-unreachable-loop
    for (const key in stepValues) {
      if (_.isEmpty(stepValues[key])) {
        return valuesAlreadyExist;
      } else {
        valuesAlreadyExist = true;
        return valuesAlreadyExist;
      }
    }
  };
  /// HANDLERS END

  /// USE EFFECTS
  useEffect(() => {
    if (currentDocumentType) {
      if (documentNumberSanitized.length === currentDocumentType.length) {
        setLoading(true);
        personVerifier(values.documentType, documentNumberSanitized)
          .then(res => {
            const data = res.data.result.paciente;
            setData(data);
            setFieldValue('firstName', data.name);
            setFieldValue('lastName', data.surname);
            setFieldValue('birthDate', data.dateOfBirth);
          })
          .catch(err => ({ err }))
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
              {option.name}
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
        label="Numero de identificación"
        value={values.documentNumber}
        error={
          (touched.documentNumber && Boolean(errors.documentNumber)) || compareLenghtRequired()
        }
        onBlur={handleBlur}
        loading={loading}
        inputRef={inputMaskRef}
        disabled={!values.documentType}
        onChange={handleChange}
        helperText={
          errors.documentNumber
            ? errors.documentNumber
            : `Caracteres requeridos: ${currentDocumentType?.length}`
        }
        inputProps={{
          // eslint-disable-next-line prettier/prettier
          mask: [/[1-9]/, ' ', /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/],
          'data-testid': 'documentNumber'
        }}
        inputComponent={TextMaskCustom as any}
      />
      {(data || userValuesAlreadyExist()) && (
        <Paper style={{ padding: 10, backgroundColor: '#F5F5F5' }} square elevation={0}>
          <TextField
            id="firstName"
            name="firstName"
            label="Nombre"
            value={values.firstName}
            error={touched.firstName && Boolean(errors.firstName)}
            onBlur={handleBlur}
            disabled={true}
            onChange={handleChange}
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
            disabled={true}
            onChange={handleChange}
            helperText={errors.lastName}
            data-testid="lastName"
            formControlProps={{ margin: 'normal' }}
          />
          <TextField
            id="birthDate"
            name="birthDate"
            label="Fecha de nacimiento"
            value={values.birthDate}
            error={touched.birthDate && Boolean(errors.birthDate)}
            onBlur={handleBlur}
            disabled={true}
            onChange={handleChange}
            helperText={errors.birthDate}
            data-testid="birthDate"
            formControlProps={{ margin: 'normal' }}
          />
        </Paper>
      )}
    </div>
  );
}

/// STEP PARAMS
PersonalData.title = 'Registrese';
PersonalData.description =
  'Estos datos se usarán unicamente con propósitos médicos dentro de la plataforma';
PersonalData.validations = {
  name: 'PersonalData',
  schema: yup.object().shape({
    lastName: yup.string().required('Campo requerido'),
    birthDate: yup.string().required('Campo requerido'),
    firstName: yup.string().required('Campo requerido'),
    documentType: yup.number().required('Campo requerido'),
    documentNumber: yup.string().required('Campo requerido')
  })
};
/// STEP PARAMS END

/// DEFAULT PROPS
PersonalData.defaultProps = {
  documentTypesOptions: []
};
/// DEFAULT PROPS END

export default PersonalData;
