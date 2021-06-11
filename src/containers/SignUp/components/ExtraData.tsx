import React, { useEffect, useState } from 'react';
/// FORM
import * as yup from 'yup';
import { FormikProps } from 'formik';
/// SERVICES
import { getProvinces, getCanton, getDistrict } from '../../../services/address.service';
/// TYPES
import { IExtraDataForm, IGeneralAdressState } from '../index.types';
/// MATERIAL-UI
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Autocomplete from '@material-ui/lab/Autocomplete';
import FormHelperText from '@material-ui/core/FormHelperText';
import LinearProgress from '@material-ui/core/LinearProgress';
/// MATERIAL-UI END

/// INITIAL STATES
const initialProvinceStates: IGeneralAdressState = {
  data: [],
  fetching: true
};

const initialDistrictStates: IGeneralAdressState = {
  data: [],
  fetching: false
};

const initialCantonStates: IGeneralAdressState = {
  data: [],
  fetching: false
};

/// INITIAL STATES END

function ExtraData({
  values,
  errors,
  touched,
  handleBlur,
  handleChange,
  setFieldValue
}: FormikProps<IExtraDataForm>): JSX.Element {
  const [cantonStates, setCantonStates] = useState(initialCantonStates);
  const [provinceStates, setProvinceStates] = useState(initialProvinceStates);
  const [districtStates, setDistrictStates] = useState(initialDistrictStates);
  /// USE EFFECTS

  const onChangeSelect = (value: any, fieldName: string) => {
    setFieldValue(fieldName, value?.codigo);

    switch (fieldName) {
      case 'province':
        setFieldValue('canton', '');
        setFieldValue('district', '');

        setCantonStates({ ...cantonStates, data: [] });
        setDistrictStates({ ...districtStates, data: [] });
        break;
      case 'canton':
        setFieldValue('district', '');
        setDistrictStates({ ...districtStates, data: [] });
        break;

      default:
        break;
    }
  };

  /* PRVINCES FETCHER */
  useEffect(() => {
    getProvinces().then(res => {
      setProvinceStates({
        data: res.data.result.primerNivel,
        fetching: false
      });
    });
  }, []);

  /* CANTON FETCHER */
  useEffect(() => {
    if (values.province) {
      setCantonStates({ ...cantonStates, fetching: true });

      getCanton(values.province).then(res => {
        setCantonStates({
          data: res.data.result.segundoNivel,
          fetching: false
        });
      });
    }
  }, [values.province]);

  /* DISTRICT FETCHER */
  useEffect(() => {
    if (values.canton) {
      getDistrict(values.canton).then(res => {
        setDistrictStates({
          data: res.data.result.catalogo,
          fetching: false
        });
      });
    }
  }, [values.canton]);
  /// USE EFFECTS END
  return (
    <div>
      <FormControl fullWidth margin="normal" variant="filled">
        <InputLabel id="gender-selector-label">Sexo biológico designado al nacer</InputLabel>
        <Select
          fullWidth
          id="gender-selector"
          name="gender"
          value={values.gender}
          labelId="gender-selector-label"
          onBlur={handleBlur}
          onChange={handleChange}
        >
          <MenuItem value={''}>
            <em>None</em>
          </MenuItem>
          <MenuItem value={'1'}>Femenino</MenuItem>
          <MenuItem value={'2'}>Masculino</MenuItem>
        </Select>
        {touched.gender && errors.gender && <FormHelperText error>{errors.gender}</FormHelperText>}
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
          onBlur={handleBlur}
          onChange={handleChange}
          helperText={touched.mobilePhone1 && errors.mobilePhone1}
        />
      </FormControl>
      <Typography variant="h5" component="h5">
        Domicilio
      </Typography>
      <FormControl fullWidth margin="normal" variant="filled">
        <Autocomplete
          id="province-selector"
          onBlur={handleBlur}
          options={provinceStates.data}
          onChange={(_e, value) => onChangeSelect(value, 'province')}
          renderInput={params => (
            <TextField {...params} name="province" label="Seleccione Provincia" variant="filled" />
          )}
          getOptionLabel={option => option.nombre}
          getOptionSelected={(option, value) => option.nombre === value.nombre}
        />
        {provinceStates.fetching && <LinearProgress data-testid="provinces-loader" />}
        {touched.province && errors.province && (
          <FormHelperText error>{errors.province}</FormHelperText>
        )}
      </FormControl>
      <FormControl fullWidth margin="normal" variant="filled">
        <Autocomplete
          id="canton-selector-label"
          onBlur={handleBlur}
          options={cantonStates.data}
          onChange={(_e, value) => onChangeSelect(value, 'canton')}
          renderInput={params => (
            <TextField {...params} name="canton" label="Seleccione Canton" variant="filled" />
          )}
          getOptionLabel={option => option.nombre}
        />
        {cantonStates.fetching && <LinearProgress data-testid="cantones-loader" />}
        {touched.canton && errors.canton && <FormHelperText error>{errors.canton}</FormHelperText>}
      </FormControl>
      <FormControl fullWidth margin="normal" variant="filled">
        <Autocomplete
          id="district-selector-label"
          onBlur={handleBlur}
          options={districtStates.data}
          onChange={(_e, value) => onChangeSelect(value, 'district')}
          renderInput={params => (
            <TextField {...params} name="district" label="Seleccione Distrito" variant="filled" />
          )}
          getOptionLabel={option => option.nombre}
        />
        {districtStates.fetching && <LinearProgress data-testid="district-loader" />}
        {touched.district && errors.district && (
          <FormHelperText error>{errors.district}</FormHelperText>
        )}
      </FormControl>
    </div>
  );
}

/// STEP VALIDATIONS
ExtraData.title = 'Datos adicionales';
ExtraData.description =
  'Estos datos se usarán unicamente con propósitos médicos dentro de la plataforma';
ExtraData.validations = {
  name: 'ExtraData',
  schema: yup.object().shape({
    canton: yup.string().required('Campo requerido'),
    gender: yup.string().required('Campo requerido'),
    district: yup.string().required('Campo requerido'),
    province: yup.string().required('Campo requerido'),
    mobilePhone1: yup.string().required('Campo requerido')
  })
};
/// STEP VALIDATIONS END

export default ExtraData;
