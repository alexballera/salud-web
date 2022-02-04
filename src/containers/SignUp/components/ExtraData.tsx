/// IMPORTS
import React, { useEffect, useState } from 'react';
import _ from 'lodash';
/// IMPORTS END

/// FORM
import { FormikProps } from 'formik';
/// FORM END

/// SERVICES
import countryDocumentTypes from '../../../services/countriesDocumentTypes.service';
import { getFirstLevel, getSecondLevel, getThirdLevel } from '../../../services/address.service';
/// SERVICES END

/// TYPES
import { TExtraDataProps, IGeneralAdressState, TFormData } from '../index.types';
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
import { NAMESPACE_KEY as i18nGlobal } from '../../../i18n/globals/i18n';
/// i18n END

type TLevelKey = 'firstLevel' | 'secondLevel' | 'thirdLevel';

const GENDERS = [
  { label: 'female', value: 1 },
  { label: 'male', value: 2 }
];

const PRONOUNS = [
  { label: 'she', value: 1 },
  { label: 'he', value: 2 },
  { label: 'they', value: 3 }
];

const INITIAL_LEVEL_STATUS: IGeneralAdressState = {
  data: [],
  fetching: true
};

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
  const { t } = useTranslation([i18nGlobal]);
  const classes = SignUpStyles();
  const [firstLevel, setFirstLevel] = useState(INITIAL_LEVEL_STATUS);
  const [secondLevel, setSecondLevel] = useState({ ...INITIAL_LEVEL_STATUS, fetching: false });
  const [thirdLevel, setThirdLevel] = useState({ ...INITIAL_LEVEL_STATUS, fetching: false });

  const selectedCountry =
    _.find(countryDocumentTypes, { code: values.country }) || countryDocumentTypes[0];

  const onChangeSelect = (value: string, fieldName: TLevelKey) => {
    setFieldValue(fieldName, _.get(value, 'code', ''));
    switch (fieldName) {
      case 'firstLevel':
        setFieldValue('secondLevel', '');
        setFieldValue('thirdLevel', '');

        setSecondLevel({ ...secondLevel, data: [] });
        setThirdLevel({ ...thirdLevel, data: [] });
        break;
      case 'secondLevel':
        setFieldValue('district', '');
        setThirdLevel({ ...thirdLevel, data: [] });
        break;

      default:
        break;
    }
  };

  const getLevelValueByKey = (stateKey: TLevelKey) => {
    switch (stateKey) {
      case 'firstLevel':
        if (!firstLevel.data.length) {
          return null;
        }
        return _.find(firstLevel.data, { code: values.firstLevel }) || '';
      case 'secondLevel':
        if (!secondLevel.data.length) {
          return null;
        }
        return _.find(secondLevel.data, { code: values.secondLevel }) || '';
      case 'thirdLevel':
        if (!thirdLevel.data.length) {
          return null;
        }
        return _.find(thirdLevel.data, { code: values.thirdLevel }) || '';
      default:
        break;
    }
  };

  const getLabelOrPlaceholderText = (labelKey: string, hasPlaceholder?: boolean) => {
    const text = t(`label.address.${selectedCountry.code}.${labelKey}`, { ns: i18nGlobal });
    if (hasPlaceholder) {
      return `${t('label.address.placeholder', { ns: i18nGlobal })} ${text.toLowerCase()}`;
    }
    return text;
  };

  /// USE EFFECTS
  /* PRVINCES FETCHER */
  useEffect(() => {
    getFirstLevel(selectedCountry.sacCode || '1').then(res => {
      const firstLevel = res.data.result.primerNivel;
      const data = firstLevel.map(item => ({ code: item.codigo, label: item.nombre }));
      setFirstLevel({
        fetching: false,
        data
      });
    });
  }, []);

  /* SECOND LEVEL FETCHER */
  useEffect(() => {
    if (!_.isEmpty(values.firstLevel)) {
      setSecondLevel({ ...secondLevel, fetching: true });
      getSecondLevel(selectedCountry.sacCode || '1', values.firstLevel).then(res => {
        const secondLevel = res.data.result.segundoNivel;
        const data = secondLevel.map(item => ({ code: item.codigo, label: item.nombre }));
        setSecondLevel({
          fetching: false,
          data
        });
      });
    }
  }, [values.firstLevel]);

  /* DISTRICT FETCHER */
  useEffect(() => {
    if (!_.isEmpty(values.secondLevel)) {
      setThirdLevel({ ...thirdLevel, fetching: true });
      getThirdLevel(selectedCountry.sacCode || '1', values.secondLevel).then(res => {
        const thirdLevel = res.data.result.catalogo;
        const data = thirdLevel.map(item => ({ code: item.codigo, label: item.nombre }));
        setThirdLevel({
          fetching: false,
          data
        });
      });
    }
  }, [values.secondLevel]);
  /// USE EFFECTS END

  return (
    <div>
      {!updatePhone && (
        <>
          <Box display="flex" justifyContent="center" alignItems="center">
            <FormControl fullWidth margin="normal" variant="filled">
              <FormLabel
                id="gender-selector-label"
                error={touched.gender && !!errors.gender}
                style={{ marginBottom: 10 }}
              >
                {t('label.gender.gender', { ns: i18nGlobal })}
              </FormLabel>
              <Select
                fullWidth
                displayEmpty
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
                  {t('label.gender.placeholder', { ns: i18nGlobal })}
                </MenuItem>
                {GENDERS.map((item, idx) => (
                  <MenuItem key={idx} value={item.value}>
                    {t(`label.gender.${item.label}`, { ns: i18nGlobal })}
                  </MenuItem>
                ))}
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
              title={t('label.gender.tooltip', { ns: i18nGlobal })}
              classes={{ tooltip: classes.tooltip }}
            >
              <Box marginTop="30px" marginLeft="10px">
                <HelpOutlineOutlinedIcon />
              </Box>
            </Tooltip>
          </Box>
          <FormControl fullWidth margin="normal" variant="filled">
            <FormLabel
              id="pronoun-selector-label"
              error={touched.pronoun && !!errors.pronoun}
              style={{ marginBottom: 10 }}
            >
              {t('label.pronoun.pronoun', { ns: i18nGlobal })}
            </FormLabel>
            <Select
              fullWidth
              displayEmpty
              defaultValue=""
              id="pronoun-selector"
              name="pronoun"
              value={values.pronoun}
              color="secondary"
              labelId="pronoun-selector-label"
              onBlur={handleBlur}
              variant="outlined"
              onChange={handleChange}
            >
              <MenuItem value="" disabled className={classes.selectPlaceholder}>
                {t('label.pronoun.placeholder', { ns: i18nGlobal })}
              </MenuItem>
              {PRONOUNS.map((item, idx) => (
                <MenuItem key={idx} value={item.value}>
                  {t(`label.pronoun.${item.label}`, { ns: i18nGlobal })}
                </MenuItem>
              ))}
            </Select>
            {touched.pronoun && errors.pronoun && (
              <FormHelperText error>{errors.pronoun}</FormHelperText>
            )}
          </FormControl>
        </>
      )}
      {!updatePersonalData && (
        <PhoneNumberInputText
          id="mobilePhone1"
          name="mobilePhone1"
          type="text"
          label={`${t(`label.phone.${updatePhone ? 'new' : 'phone'}`, { ns: i18nGlobal })}`}
          value={values.mobilePhone1}
          error={touched.mobilePhone1 && Boolean(errors.mobilePhone1)}
          helperText={errors.mobilePhone1}
          onBlur={handleBlur}
          onChange={handleChange}
          onResetValue={value => {
            setFieldValue('mobilePhone1', value);
            setFieldTouched('mobilePhone1', false);
          }}
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
            {t('label.address.address', { ns: i18nGlobal })}
          </Typography>
          <CustomAutoComplete
            id="firstLevel"
            placeholder={getLabelOrPlaceholderText('firstLevel', true)}
            label={getLabelOrPlaceholderText('firstLevel')}
            linearProgressProps={{ 'data-testid': 'firstLevel-loader' }}
            error={touched.firstLevel && Boolean(errors.firstLevel)}
            onBlur={handleBlur}
            options={firstLevel.data}
            loading={firstLevel.fetching}
            helperText={errors.firstLevel}
            onChange={(_e, value) => onChangeSelect(value, 'firstLevel')}
            getOptionSelected={option => option.code}
            getOptionLabel={option => option.label || ''}
            value={getLevelValueByKey('firstLevel')}
          />
          <CustomAutoComplete
            id="secondLevel"
            label={getLabelOrPlaceholderText('secondLevel')}
            placeholder={getLabelOrPlaceholderText('secondLevel', true)}
            linearProgressProps={{ 'data-testid': 'secondLevel-loader' }}
            error={touched.secondLevel && Boolean(errors.secondLevel)}
            onBlur={handleBlur}
            options={secondLevel.data}
            loading={secondLevel.fetching}
            onChange={(_e, value) => onChangeSelect(value, 'secondLevel')}
            helperText={errors.secondLevel}
            getOptionSelected={option => option.code}
            getOptionLabel={option => option.label || ''}
            value={getLevelValueByKey('secondLevel')}
          />
          <CustomAutoComplete
            id="thirdLevel"
            label={getLabelOrPlaceholderText('thirdLevel')}
            placeholder={getLabelOrPlaceholderText('thirdLevel', true)}
            linearProgressProps={{ 'data-testid': 'thirdLevel-loader' }}
            error={touched.thirdLevel && Boolean(errors.thirdLevel)}
            onBlur={handleBlur}
            options={thirdLevel.data}
            loading={thirdLevel.fetching}
            onChange={(_e, value) => onChangeSelect(value, 'thirdLevel')}
            helperText={errors.thirdLevel}
            getOptionSelected={option => option.code}
            getOptionLabel={option => option.label || ''}
            value={getLevelValueByKey('thirdLevel')}
          />
        </>
      )}
    </div>
  );
}

export default ExtraData;
