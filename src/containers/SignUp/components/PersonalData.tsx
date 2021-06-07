import React, { useState, useEffect } from 'react';
/// FORM
import * as yup from 'yup';
import { FormikProps } from 'formik';
/// SERVICE
import { personVerifier } from '../../../services/personVerifier.service';
/// TYPES
import { IPersonalDataForm, IPersonalDataProps } from '../index.types';
/// OWN COMPONENTS
import TextMaskCustom from '../../../components/common/InputTextMask';
/// MATERIAL-UI
import Input from '@material-ui/core/Input';
import Paper from '@material-ui/core/Paper';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import InputAdornment from '@material-ui/core/InputAdornment';
import CircularProgress from '@material-ui/core/CircularProgress';
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
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const currentDocumentType = documentTypesOptions.find(
    data => data.documentTypeId === values.documentType
  );
  const documentNumberSanitized = values.documentNumber.replace(/\D+/g, '');

  const compareLenghtRequired = () => {
    return currentDocumentType
      ? currentDocumentType.length !== documentNumberSanitized.length
      : false;
  };
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
        <InputLabel id="document-type-selector-label">Tipo de identificación</InputLabel>
        <Select
          fullWidth
          id="document-type-selector"
          name="documentType"
          value={values.documentType}
          error={touched.documentType && Boolean(errors.documentType)}
          onBlur={handleBlur}
          labelId="document-type-selector-label"
          onChange={handleChange}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
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
      <FormControl variant="filled" fullWidth margin="normal">
        <InputLabel htmlFor="documentNumber">Numero de identificación</InputLabel>
        <Input
          fullWidth
          id="documentNumber"
          name="documentNumber"
          value={values.documentNumber}
          onBlur={handleBlur}
          disabled={!values.documentType}
          onChange={handleChange}
          inputProps={{
            mask: [
              /[1-9]/,
              /\d/,
              /\d/,
              ' ',
              '-',
              ' ',
              /\d/,
              /\d/,
              /\d/,
              ' ',
              '-',
              ' ',
              /\d/,
              /\d/,
              /\d/
            ]
          }}
          endAdornment={
            <InputAdornment position="end">
              {loading && <CircularProgress size={20} />}
            </InputAdornment>
          }
          inputComponent={TextMaskCustom as any}
        />
        {((touched.documentNumber && errors.documentNumber) || compareLenghtRequired()) && (
          <FormHelperText error>
            {errors.documentNumber
              ? errors.documentNumber
              : `Caracteres requeridos: ${currentDocumentType.length}`}
          </FormHelperText>
        )}
      </FormControl>
      {data && (
        <Paper style={{ padding: 10, backgroundColor: '#F5F5F5' }} square elevation={0}>
          <FormControl fullWidth>
            <TextField
              fullWidth
              id="firstName"
              name="firstName"
              label="Nombre"
              value={values.firstName}
              error={touched.firstName && Boolean(errors.firstName)}
              margin="normal"
              onBlur={handleBlur}
              disabled={true}
              onChange={handleChange}
              helperText={touched.firstName && errors.firstName}
            />
          </FormControl>
          <FormControl fullWidth>
            <TextField
              fullWidth
              id="lastName"
              name="lastName"
              label="Nombre"
              value={values.lastName}
              error={touched.lastName && Boolean(errors.lastName)}
              margin="normal"
              onBlur={handleBlur}
              disabled={true}
              onChange={handleChange}
              helperText={touched.lastName && errors.lastName}
            />
          </FormControl>
          <FormControl fullWidth>
            <TextField
              fullWidth
              id="birthDate"
              name="birthDate"
              label="Fecha de nacimiento"
              value={values.birthDate}
              error={touched.birthDate && Boolean(errors.birthDate)}
              margin="normal"
              onBlur={handleBlur}
              disabled={true}
              onChange={handleChange}
              helperText={touched.birthDate && errors.birthDate}
            />
          </FormControl>
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
