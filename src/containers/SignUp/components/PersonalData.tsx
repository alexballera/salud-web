// BASE IMPORTS
import { useState, useEffect, useRef } from 'react';
import { addYears } from 'date-fns';
import { convertToMask, upperCamelCase } from '../../../utils/helpers';
/// BASE IMPORTS END

/// FORM
import { FormikProps } from 'formik';
/// FORM END

/// SERVICE
import countriesDocumentTypes from '../../../services/countriesDocumentTypes.service';
/// SERVICE END

/// OWN COMPONENTS
import TextField from '../../../components/common/TextField';
import DatePicker from '../../../components/common/DataPicker';
import TextMaskCustom from '../../../components/common/InputTextMask';
/// OWN COMPONENTS END

/// MATERIAL-UI
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
/// MATERIAL-UI END

/// i18n
import { TFunction, useTranslation } from 'react-i18next';
import { NAMESPACE_KEY as i18Global } from '../../../i18n/globals/i18n';
import { NAMESPACE_KEY as i18Forms } from '../../../i18n/forms/i18n';
/// i18n END

/// TYPES
import {
  TPersonalDataProps,
  TFormData,
  TAutocompleteUser,
  TCountryDocumentType
} from '../index.types';
/// TYPES END

/// STYLES
import { makeStyles, createStyles } from '@material-ui/core/styles';
/// STYLES END

type THandleDocNumberChange = {
  docType: string;
  docNumber: string;
};

type TFetchUserDateState = {
  isLoading: boolean;
  error: null | string;
};
/// STYLES END

const FETCH_USER_DATA_STATE: TFetchUserDateState = {
  isLoading: false,
  error: null
};

const useStyles = makeStyles(() =>
  createStyles({
    selectPlaceholder: {
      display: 'none'
    }
  })
);

const buildCountryDocTypeOptions = (countryCode = '', t: TFunction) => {
  const mapDoctypes = countriesDocumentTypes.find(item => item.code === countryCode);
  const options = mapDoctypes?.items || [];
  if (!options.length) {
    return null;
  }
  return options.map((option, i) => (
    <MenuItem key={`${countryCode}-${i}`} value={option.id}>
      {t(`label.document.${option.name}`)}
    </MenuItem>
  ));
};

function PersonalData({
  values,
  errors,
  touched,
  handleBlur,
  handleChange,
  setFieldError,
  setFieldTouched,
  setFieldValue,
  setCustomPopUpError,
  handleNotifications,
  setCurrDocTypeArgs,
  currDocTypeArgs
}: TPersonalDataProps & FormikProps<TFormData>): JSX.Element {
  const classes = useStyles();
  const { t } = useTranslation([i18Global, i18Forms]);
  const inputMaskRef = useRef(null);
  const [fetchUserDataState, setFetchUserDateState] = useState(FETCH_USER_DATA_STATE);

  const handlerError = (code = '') => {
    switch (code) {
      case 'sld-user-2':
        return t('validations.userExists', { ns: i18Forms });
      default:
        return t('validations.document.invalid', { ns: i18Forms });
    }
  };

  const handleCurrDocTypeChange = ({ documentType, country }: TFormData) => {
    const documentTypes = countriesDocumentTypes.find(item => item.code === country)?.items || [];
    const findDocumentType = documentTypes.find(item => item.id === documentType);
    setFetchUserDateState(FETCH_USER_DATA_STATE);
    setCurrDocTypeArgs(findDocumentType);
  };

  const handlerDocNumberChange = ({ docType, docNumber }: THandleDocNumberChange) => {
    const { validation, autocompleteUserDataFn } = currDocTypeArgs;
    const docNumberSanitized = docNumber.replace(/\D+/g, '');
    const docNumberIsValid = validation.test(docNumberSanitized);

    if (typeof autocompleteUserDataFn !== 'function') {
      return;
    }

    if (fetchUserDataState.isLoading || !docNumberIsValid || !currDocTypeArgs.reqFetchPerInf) {
      return;
    }

    setFetchUserDateState({ isLoading: true, error: null });
    autocompleteUserDataFn({ docType, docNumber: docNumberSanitized })
      .then(setUserValues)
      .catch(error => {
        const searchError = handlerError(error.response.data.error.code);
        const i18nPopUpError = t('validations.document.invalid_pop_up', { ns: i18Forms });
        setUserValues(null); // Reset user info inputs
        setCustomPopUpError(i18nPopUpError); // Save this error on form state, it should be appear if continue button is clicked
        handleNotifications({ open: true, message: i18nPopUpError, severity: 'error' }); /// Handle Form pop up error
        // Handle input error
        setFetchUserDateState(prevState => ({
          ...prevState,
          error: searchError
        }));
        // Focus the input
        setTimeout(() => {
          inputMaskRef.current.focus();
          inputMaskRef.current.setSelectionRange(0, 0);
        }, 200);
      })
      .finally(() => {
        setTimeout(() => {
          setFetchUserDateState(prevState => ({ ...prevState, isLoading: false }));
        }, 300);
      });
  };

  const cleanFormInputs = (inputs: string[]) => {
    inputs.forEach(value => {
      setFieldValue(value, '');
      setFieldError(value, '');
      setFieldTouched(value, false);
    });
  };

  const setUserValues = (data: TAutocompleteUser | null) => {
    setFieldValue('fullName', data ? upperCamelCase(data.fullName) : '');
    setFieldValue('birthDate', data ? data.birthDate : '');
  };

  const setTransformUpperCalmelCase = (s: string): void => {
    setFieldValue('fullName', upperCamelCase(s));
  };

  useEffect(() => {
    handleCurrDocTypeChange(values);
  }, [values.documentType]);

  return (
    <div>
      <FormControl fullWidth margin="normal" variant="filled">
        <FormLabel
          id="country-selector-label"
          style={{ marginBottom: 10 }}
          error={touched.country && !!errors.country}
        >
          {t('label.country.country', { ns: i18Global })}
        </FormLabel>
        <Select
          fullWidth
          displayEmpty
          defaultValue=""
          id="country-selector"
          name="country"
          color="secondary"
          labelId="country-selector-label"
          variant="outlined"
          error={touched.country && !!errors.country}
          value={values.country}
          onBlur={handleBlur}
          onChange={e => {
            cleanFormInputs([
              'documentType',
              'documentNumber',
              'fullName',
              'birthDate',
              'firstLevel',
              'secondLevel',
              'thirdLevel'
            ]);
            handleChange(e);
          }}
        >
          <MenuItem value="" disabled className={classes.selectPlaceholder}>
            {t('label.country.placeholder', { ns: i18Global })}
          </MenuItem>
          {countriesDocumentTypes.map(({ code }: TCountryDocumentType, i) => (
            <MenuItem key={`${code}-${i}`} value={code}>
              {t(`countries.${code}`, { ns: i18Global })}
            </MenuItem>
          ))}
        </Select>
        {touched.country && errors.country && (
          <FormHelperText error>{errors.country}</FormHelperText>
        )}
      </FormControl>
      <FormControl fullWidth variant="filled">
        <FormLabel
          id="document-type-selector-label"
          style={{ marginBottom: 10, marginTop: 10 }}
          error={touched.documentType && !!errors.documentType}
        >
          {t('label.document.type', { ns: i18Global })}
        </FormLabel>
        <Select
          fullWidth
          displayEmpty
          defaultValue=""
          id="document-type-selector"
          name="documentType"
          color="secondary"
          labelId="document-type-selector-label"
          variant="outlined"
          data-testid="document-type-selector"
          disabled={!values.country}
          value={values.documentType}
          error={touched.documentType && Boolean(errors.documentType)}
          onBlur={handleBlur}
          onChange={e => {
            cleanFormInputs(['documentNumber', 'fullName', 'birthDate']);
            handleChange(e);
          }}
        >
          <MenuItem value="" disabled className={classes.selectPlaceholder}>
            {t('label.document.placeholder', { ns: i18Global })}
          </MenuItem>
          {buildCountryDocTypeOptions(values.country, t)}
        </Select>
        {touched.documentType && errors.documentType && (
          <FormHelperText error>{errors.documentType}</FormHelperText>
        )}
      </FormControl>
      <TextField
        handleLblError
        type="text"
        id="documentNumber"
        name="documentNumber"
        label={t('label.document.number', { ns: i18Global })}
        onBlur={handleBlur}
        inputRef={inputMaskRef}
        loading={fetchUserDataState.isLoading}
        disabled={!values.documentType}
        helperText={fetchUserDataState.error || errors.documentNumber}
        value={values.documentNumber}
        error={(touched.documentNumber && !!errors.documentNumber) || !!fetchUserDataState.error}
        onChange={e => {
          handleChange(e);
          handlerDocNumberChange({
            docNumber: e.target.value,
            docType: values.documentType
          });

          // Reset fetch message
          if (fetchUserDataState.error) {
            setFetchUserDateState(prevState => ({ ...prevState, error: null }));
          }
        }}
        inputComponent={convertToMask(currDocTypeArgs?.mask) ? (TextMaskCustom as any) : 'input'}
        inputProps={{
          mask: convertToMask(currDocTypeArgs?.mask),
          'data-testid': 'documentNumber'
        }}
      />
      {values.documentType && currDocTypeArgs && (
        <>
          <TextField
            handleLblError
            id="fullName"
            name="fullName"
            data-testid="fullName"
            label={t('label.name', { ns: i18Global })}
            value={values.fullName}
            helperText={errors.fullName}
            disabled={currDocTypeArgs.reqFetchPerInf}
            error={touched.fullName && !currDocTypeArgs.reqFetchPerInf && !!errors.fullName}
            onBlur={handleBlur}
            onChange={e => {
              handleChange(e);
              setTransformUpperCalmelCase(e.target.value);
            }}
            formControlProps={{ margin: 'normal' }}
          />
          <DatePicker
            openTo="year"
            id="birthDate"
            views={['year', 'month', 'date']}
            label={t('label.birthdate', { ns: i18Global })}
            margin="normal"
            format="dd/MM/yyyy"
            variant="inline"
            inputVariant="outlined"
            autoOk={true}
            value={values.birthDate === '' ? null : values.birthDate}
            disabled={currDocTypeArgs.reqFetchPerInf}
            onChange={value => setFieldValue('birthDate', value)}
            formControlProps={{ margin: 'normal' }}
            onBlur={handleBlur}
            maxDate={addYears(new Date(), -18)}
            error={touched.birthDate && !currDocTypeArgs.reqFetchPerInf && !!errors.birthDate}
            helperText={touched.birthDate && !currDocTypeArgs.reqFetchPerInf && errors.birthDate}
            labelProps={{
              error: touched.birthDate && !currDocTypeArgs.reqFetchPerInf && !!errors.birthDate
            }}
          />
        </>
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
