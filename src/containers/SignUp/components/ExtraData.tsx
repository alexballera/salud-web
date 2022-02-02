/// IMPORTS
import React, { useEffect, useState } from 'react';
import _ from 'lodash';
/// IMPORTS END

/// FORM
import { FormikProps } from 'formik';
/// FORM END

/// SERVICES
import { getProvinces, getCanton, getDistrict } from '../../../services/address.service';
import countryConfig from '../../../services/countriesConfig';
/// SERVICES END

/// TYPES
import { TExtraDataProps, IGeneralAdressState, TFormData, TCountryConfig } from '../index.types';
/// TYPES END

/// OWN COMPONENTS
import CustomAutoComplete from '../../../components/common/Select';
import PhoneNumberInputText from '../../../components/common/PhoneNumberInputText';
/// OWN COMPONENTS END

/// MATERIAL-UI
import Tooltip from '@material-ui/core/Tooltip';
import Box from '@material-ui/core/Box';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import SignUpStyles from '../styles.module';
import HelpOutlineOutlinedIcon from '@material-ui/icons/HelpOutlineOutlined';
/// MATERIAL-UI END

/// i18n
import { useTranslation } from 'react-i18next';
import { NAMESPACE_KEY as i18Global } from '../../../i18n/globals/i18n';
import { NAMESPACE_KEY as i18Forms } from '../../../i18n/forms/i18n';
/// i18n END

/// INITIAL STATES
const GENDERS = [
  { label: 'label.gender.female', value: 1 },
  { label: 'label.gender.male', value: 2 }
];

const PRONOUNS = [
  { label: '', value: '' },
  { label: '', value: '' }
];

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
  setFieldTouched,
  updatePersonalData,
  updatePhone
}: TExtraDataProps & FormikProps<TFormData>): JSX.Element {
  const { t } = useTranslation(['globals', 'forms']);
  const classes = SignUpStyles();
  const [cantonStates, setCantonStates] = useState(initialCantonStates);
  const [provinceStates, setProvinceStates] = useState(initialProvinceStates);
  const [districtStates, setDistrictStates] = useState(initialDistrictStates);

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

  /// USE EFFECTS
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
        <>
          <Box display="flex" justifyContent="center" alignItems="center">
            <FormControl fullWidth margin="normal" variant="filled">
              <FormLabel id="gender-selector-label" style={{ marginBottom: 10 }}>
                {t('label.gender.gender', { ns: 'globals' })}
              </FormLabel>
              <Select
                fullWidth
                defaultValue=""
                id="gender-selector"
                name="gender"
                value={values.gender}
                color="secondary"
                labelId="gender-selector-label"
                onBlur={handleBlur}
                variant="outlined"
                onChange={handleChange}
              >
                <MenuItem value="" disabled className={classes.selectPlaceholder}>
                  {t('label.gender.placeholder', { ns: i18Global })}
                </MenuItem>
                <MenuItem value={'1'}>{t('label.gender.female', { ns: 'globals' })}</MenuItem>
                <MenuItem value={'2'}>{t('label.gender.male', { ns: 'globals' })}</MenuItem>
              </Select>
              {touched.gender && errors.gender && (
                <FormHelperText error>{errors.gender}</FormHelperText>
              )}
            </FormControl>
            <Tooltip
              arrow
              leaveTouchDelay={3000}
              enterTouchDelay={50}
              placement="left"
              title={t('label.gender.tooltip', { ns: i18Global })}
              classes={{ tooltip: classes.tooltip }}
            >
              <Box marginTop="30px" marginLeft="10px">
                <HelpOutlineOutlinedIcon />
              </Box>
            </Tooltip>
          </Box>
          <FormControl fullWidth margin="normal" variant="filled">
            <FormLabel id="pronoun-selector-label" style={{ marginBottom: 10 }}>
              {t('label.pronoun.pronoun', { ns: 'globals' })}
            </FormLabel>
            <Select
              fullWidth
              defaultValue=""
              id="gender-selector"
              name="gender"
              value={values.pronoun}
              color="secondary"
              labelId="pronoun-selector-label"
              onBlur={handleBlur}
              variant="outlined"
              onChange={handleChange}
            >
              <MenuItem value="" disabled className={classes.selectPlaceholder}>
                {t('label.pronoun.placeholder', { ns: i18Global })}
              </MenuItem>
              {GENDERS.map((item, idx) => (
                <MenuItem key={idx} value={item.value}>
                  {t(item.label, { ns: 'globals' })}
                </MenuItem>
              ))}
            </Select>
            {touched.gender && errors.gender && (
              <FormHelperText error>{errors.gender}</FormHelperText>
            )}
          </FormControl>
        </>
      )}
      {!updatePersonalData && (
        <PhoneNumberInputText
          id="mobilePhone1"
          name="mobilePhone1"
          type="text"
          onResetValue={value => {
            setFieldValue('mobilePhone1', value);
            setFieldTouched('mobilePhone1', false);
          }}
          label={`${t(`label.phone.${updatePhone ? 'new' : 'phone'}`, { ns: i18Global })}`}
          value={values.mobilePhone1}
          error={touched.mobilePhone1 && Boolean(errors.mobilePhone1)}
          onBlur={handleBlur}
          onChange={handleChange}
          helperText={errors.mobilePhone1}
          formControlProps={{
            style: {
              marginTop: 0
            }
          }}
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
