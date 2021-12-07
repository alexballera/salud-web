import React, { useEffect, useState } from 'react';
import _ from 'lodash';
/// FORM
import { FormikProps } from 'formik';
import { PHONE_NUMBER_MASK } from '../../../utils/constants';
/// SERVICES
import { getProvinces, getCanton, getDistrict } from '../../../services/address.service';
/// TYPES
import { IExtraDataForm, IExtraDataProps, IGeneralAdressState } from '../index.types';
/// OWN COMPONENTS
import TextMaskCustom from '../../../components/common/InputTextMask';
import CustomTextField from '../../../components/common/TextField';
import CustomAutoComplete from '../../../components/common/Select';
/// MATERIAL-UI
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import SignUpStyles from '../styles.module';
/// MATERIAL-UI END

/// i18n
import { useTranslation } from 'react-i18next';
/// i18n END

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
  setFieldValue,
  updatePersonalData,
  updatePhone
}: IExtraDataProps & FormikProps<IExtraDataForm>): JSX.Element {
  const { t } = useTranslation(['globals', 'forms']);
  const classes = SignUpStyles();
  const [cantonStates, setCantonStates] = useState(initialCantonStates);
  const [provinceStates, setProvinceStates] = useState(initialProvinceStates);
  const [districtStates, setDistrictStates] = useState(initialDistrictStates);
  /// USE EFFECTS

  const onChangeSelect = (value: any, fieldName: string) => {
    setFieldValue(fieldName, value);

    switch (fieldName) {
      case 'province':
        setFieldValue('canton', null);
        setFieldValue('district', null);

        setCantonStates({ ...cantonStates, data: [] });
        setDistrictStates({ ...districtStates, data: [] });
        break;
      case 'canton':
        setFieldValue('district', null);
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
    if (!_.isEmpty(values.province)) {
      setCantonStates({ ...cantonStates, fetching: true });

      getCanton(values.province.codigo).then(res => {
        setCantonStates({
          data: res.data.result.segundoNivel,
          fetching: false
        });
      });
    }
  }, [values.province]);

  /* DISTRICT FETCHER */
  useEffect(() => {
    if (!_.isEmpty(values.canton)) {
      setDistrictStates({ ...districtStates, fetching: true });

      getDistrict(values.canton.codigo).then(res => {
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
      {!updatePhone && (
        <FormControl fullWidth margin="normal" variant="filled">
          <FormLabel id="gender-selector-label" style={{ marginBottom: 10 }}>
            {t('label.gender.gender', { ns: 'globals' })}
          </FormLabel>
          <Select
            fullWidth
            id="gender-selector"
            name="gender"
            value={values.gender}
            color="secondary"
            labelId="gender-selector-label"
            onBlur={handleBlur}
            variant="outlined"
            onChange={handleChange}
          >
            <MenuItem value={'1'}>{t('label.gender.female', { ns: 'globals' })}</MenuItem>
            <MenuItem value={'2'}>{t('label.gender.male', { ns: 'globals' })}</MenuItem>
          </Select>
          {touched.gender && errors.gender && (
            <FormHelperText error>{errors.gender}</FormHelperText>
          )}
        </FormControl>
      )}
      {!updatePersonalData && (
        <CustomTextField
          id="mobilePhone1"
          name="mobilePhone1"
          type="text"
          label={
            updatePhone
              ? `${t('label.phone.new', { ns: 'globals' })}`
              : `${t('label.phone.phone', { ne: 'globals' })}`
          }
          value={values.mobilePhone1}
          error={touched.mobilePhone1 && Boolean(errors.mobilePhone1)}
          onBlur={handleBlur}
          onChange={handleChange}
          helperText={errors.mobilePhone1}
          inputProps={{
            mask: PHONE_NUMBER_MASK
          }}
          inputComponent={TextMaskCustom as any}
        />
      )}
      {!updatePhone && (
        <>
          <Typography variant="h5" component="h5" className={classes.titleSection}>
            {t('label.address.address', { ns: 'globals' })}
          </Typography>
          <CustomAutoComplete
            id="province"
            label={t('label.address.province', { ns: 'globals' })}
            value={values.province}
            error={touched.province && Boolean(errors.province)}
            onBlur={handleBlur}
            options={provinceStates.data}
            loading={provinceStates.fetching}
            onChange={(_e, value) => onChangeSelect(value, 'province')}
            helperText={errors.province}
            getOptionLabel={option => option.nombre}
            getOptionSelected={(option, value) => option.nombre === value.nombre}
            linearProgressProps={{ 'data-testid': 'provinces-loader' }}
          />

          <CustomAutoComplete
            id="canton"
            label={t('label.address.canton', { ns: 'globals' })}
            value={values.canton}
            error={touched.canton && Boolean(errors.canton)}
            onBlur={handleBlur}
            options={cantonStates.data}
            loading={cantonStates.fetching}
            onChange={(_e, value) => onChangeSelect(value, 'canton')}
            helperText={errors.canton}
            getOptionLabel={option => option.nombre}
            getOptionSelected={(option, value) => option.nombre === value.nombre}
          />

          <CustomAutoComplete
            id="district"
            label={t('label.address.district', { ns: 'globals' })}
            value={values.district}
            error={touched.district && Boolean(errors.district)}
            onBlur={handleBlur}
            options={districtStates.data}
            loading={districtStates.fetching}
            onChange={(_e, value) => onChangeSelect(value, 'district')}
            helperText={errors.district}
            getOptionLabel={option => option.nombre}
            getOptionSelected={(option, value) => option.nombre === value.nombre}
          />
        </>
      )}
    </div>
  );
}

export default ExtraData;
