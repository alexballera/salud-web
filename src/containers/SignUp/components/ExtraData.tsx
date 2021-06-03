import React from 'react'
import { FormikProps } from 'formik'
/// TYPES
import { IExtraDataForm } from '../index.types'
/// MATERIAL-UI
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl'

/// MATERIAL-UI END

function ExtraData({
  values,
  errors,
  touched,
  handleChange
}: FormikProps<IExtraDataForm>): JSX.Element {
  return (
    <div>
      <FormControl fullWidth margin="normal">
        <InputLabel id="gender-selector-label">
          Sexo biológico designado al nacer
        </InputLabel>
        <Select
          fullWidth
          id="gender-selector"
          value={values.gender}
          variant="filled"
          labelId="gender-selector-label"
          onChange={handleChange}
        >
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>
      <FormControl fullWidth margin="normal">
        <TextField
          fullWidth
          id="mobilePhone1"
          name="mobilePhone1"
          label="Numero de teléfono"
          value={values.mobilePhone1}
          error={touched.mobilePhone1 && Boolean(errors.mobilePhone1)}
          variant="filled"
          onChange={handleChange}
          helperText={touched.mobilePhone1 && errors.mobilePhone1}
        />
      </FormControl>
      <Typography variant="h5" component="h5">
        Domicilio
      </Typography>
      <FormControl fullWidth margin="normal">
        <InputLabel id="province-selector-label">Provincia</InputLabel>
        <Select
          fullWidth
          id="province-selector"
          value={values.gender}
          variant="filled"
          labelId="province-selector-label"
          onChange={handleChange}
        >
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>
      <FormControl fullWidth margin="normal">
        <InputLabel id="canton-selector-label">Cantón</InputLabel>
        <Select
          fullWidth
          id="canton-selector"
          value={values.gender}
          variant="filled"
          labelId="canton-selector-label"
          onChange={handleChange}
        >
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>
      <FormControl fullWidth margin="normal">
        <InputLabel id="district-selector-label">Distrito</InputLabel>
        <Select
          fullWidth
          id="district-selector"
          value={values.gender}
          variant="filled"
          labelId="district-selector-label"
          onChange={handleChange}
        >
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>
    </div>
  )
}

export default ExtraData
