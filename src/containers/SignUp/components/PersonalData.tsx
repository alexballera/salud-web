import React from 'react';
import { FormikProps } from 'formik';
/// TYPES
import { IPersonalDataForm } from '../index.types';
/// MATERIAL-UI
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
/// MATERIAL-UI END

function PersonalData({
  values,
  errors,
  touched,
  handleChange
}: FormikProps<IPersonalDataForm>): JSX.Element {
  return (
    <div>
      <FormControl fullWidth>
        <InputLabel id="document-type-selector-label">Tipo de identificación</InputLabel>
        <Select
          fullWidth
          id="document-type-selector"
          value={values.documentType}
          variant="filled"
          labelId="document-type-selector-label"
          onChange={handleChange}
        >
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>
      <FormControl fullWidth>
        <TextField
          fullWidth
          id="documentNumber"
          name="documentNumber"
          label="Numero de Identificación"
          value={values.documentNumber}
          error={touched.documentNumber && Boolean(errors.documentNumber)}
          margin="normal"
          variant="filled"
          onChange={handleChange}
          helperText={touched.documentNumber && errors.documentNumber}
        />
      </FormControl>
    </div>
  );
}

export default PersonalData;
