import React, { useEffect, useRef, useState } from 'react';
import * as yup from 'yup';
import _ from 'lodash';
import { useTranslation, withTranslation } from 'react-i18next';
import { TFunction } from 'i18next';
import { Box, Button, Checkbox, FormControlLabel, Grid, Typography } from '@material-ui/core';
import { useRouter } from 'next/router';
import { Form, Formik, FormikProps } from 'formik';
import { GetStaticProps, NextPageContext } from 'next';
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';
import { PHONE_NUMBER_MASK } from '../../utils/constants';
import { personVerifier } from '../../services/personVerifier.service';
import { getDocumentsTypes } from '../../services/getPersonalData.service';
import { convertToMask } from '../../utils/helpers';
import { IAppProps, withAppContext } from '../../context/index';
import { getProvinces, getCanton, getDistrict } from '../../services/address.service';
import { INotificationProps } from '../../context/types';
import CustomAutoComplete from '../../components/common/Select';
import TextMaskCustom from '../../components/common/InputTextMask';
import DatePicker from '../../components/common/DataPicker';
import TextField from '../../components/common/TextField';
import Paper from '@material-ui/core/Paper';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import DeleteIcon from '@material-ui/icons/Delete';
import { NAMESPACE_KEY as i18Global } from '../../i18n/globals/i18n';
import { NAMESPACE_KEY as i18Forms } from '../../i18n/forms/i18n';

type TProps = {
  handleNotifications: (_args: INotificationProps) => void;
  beneficiary: TFormData;
} & IAppProps;

type TFormData = {
  gender: '1' | '2' | '' | null;
  documentType: number | string;
  documentNumber: string;
  birthDate: string;
  email: string;
  firstName: string;
  lastName: string;
  country: string;
  mobilePhone1: string;
  province: { codigo: string; nombre: string } | null;
  canton: { codigo: string; nombre: string } | null;
  district: { codigo: string; nombre: string } | null;
};

export type TPaciente = {
  name: string;
  gender: 'F' | 'M';
  surname: string;
  dateOfBirth: string;
  lastSurname: string;
};

type TDocumentType = {
  documentTypeId: number;
  length: number;
  mask: string;
  name: string;
};

type ThandlerChangeDocumentTypeArgs = {
  evt: React.ChangeEvent<{ name?: string; value: unknown }>;
  formProps: FormikProps<TFormData>;
};

type TInputHasErrorArgs = {
  inputKey: string;
  formProps: FormikProps<TFormData>;
};

type TSetUserValuesArgs = {
  paciente: TPaciente | null;
  formProps: FormikProps<TFormData>;
};

type TChangeGeoSelect = {
  value: string;
  fieldName: string;
  formProps: FormikProps<TFormData>;
};

type TFetchProvincesArgs = {
  setFieldValue?: FormikProps<TFormData>['setFieldValue'];
  provinceCode?: string;
};

type TFetchCantonsArgs = {
  setFieldValue?: FormikProps<TFormData>['setFieldValue'];
  provinceCode: string;
  cantonCode?: string;
};

type TFetchDistricsArgs = {
  setFieldValue?: FormikProps<TFormData>['setFieldValue'];
  cantonCode: string;
  districtCode?: string;
};

type TLoading = 'verify-user' | 'update-user' | 'before-mount' | '';

const INIT_FORM_GEO_ITEM = { data: [], fetching: false };
const REGEX_ALPHANUMERIC = /^[a-zA-Z0-9]*$/;
const REGEX_NUMERIC = /^[0-9]*$/;

export const getServerSideProps: GetStaticProps = async (ctx: NextPageContext) => {
  const { 'beneficiary-id': id } = ctx.query;
  console.log('beneficiaryId', id);
  // TODO: Fetch beneficiaryget Beneficiary here and then reaplace this return data
  return {
    props: {
      beneficiary: {
        gender: '',
        documentType: '1',
        documentNumber: '5 0413 0861',
        birthDate: '',
        email: '',
        firstName: '',
        lastName: '',
        country: 'CR',
        mobilePhone1: '',
        province: { codigo: '1', nombre: '' },
        canton: { codigo: '102', nombre: '' },
        district: { codigo: '10202', nombre: '' }
      }
    }
  };
};

const mapDocumentTypesOpts = (t: TFunction, val: number) => {
  const i18nKey = { ns: i18Global };
  const label = {
    1: `${t('label.document.physical', i18nKey)}`,
    2: `${t('label.document.residence', i18nKey)}`,
    6: `${t('label.document.passport', i18nKey)}`
  };
  return label[val];
};

const buildFormSchema = (t: TFunction) => {
  const i18nKey = { ns: i18Forms };
  return {
    schema: yup.object().shape({
      documentType: yup.number().required(`${t('validations.required', i18nKey)}`),
      gender: yup.string().required(`${t('validations.required', i18nKey)}`),
      documentNumber: yup
        .string()
        .required(`${t('validations.required', i18nKey)}`)
        .when(['documentType'], {
          is: documentType => documentType === 1,
          then: yup
            .string()
            .transform(value => value.replace(/[^\d]/g, ''))
            .min(9, `${t('validations.min_9', i18nKey)}`)
        })
        .when(['documentType'], {
          is: documentType => documentType === 2,
          then: yup
            .string()
            .transform(value => value.replace(/[^\d]/g, ''))
            .min(10, `${t('validations.min_10_max_15', i18nKey)}`)
            .max(15, `${t('validations.min_10_max_15', i18nKey)}`)
        })
        .when(['documentType'], {
          is: documentType => documentType === 6,
          then: yup
            .string()
            .min(9, `${t('validations.min_10_max_20', i18nKey)}`)
            .max(20, `${t('validations.min_10_max_20', i18nKey)}`)
        }),
      mobilePhone1: yup
        .string()
        .required(`${t('validations.required', i18nKey)}`)
        .transform(value => value.replace(/[^\d]/g, ''))
        .min(8, `${t('validations.min_8', i18nKey)}`),
      email: yup
        .string()
        .email(`${t('validations.email.incorrect', i18nKey)}`)
        .required(`${t('validations.email.required', i18nKey)}`),
      province: yup
        .object()
        .shape({
          codigo: yup.string().required(`${t('validations.required', i18nKey)}`),
          nombre: yup.string().required(`${t('validations.required', i18nKey)}`)
        })
        .nullable()
        .required(`${t('validations.required', i18nKey)}`),
      canton: yup
        .object()
        .shape({
          codigo: yup.string().required(`${t('validations.required', i18nKey)}`),
          nombre: yup.string().required(`${t('validations.required', i18nKey)}`)
        })
        .nullable()
        .required(`${t('validations.required', i18nKey)}`),
      district: yup
        .object()
        .shape({
          codigo: yup.string().required(`${t('validations.required', i18nKey)}`),
          nombre: yup.string().required(`${t('validations.required', i18nKey)}`)
        })
        .nullable()
        .required(`${t('validations.required', i18nKey)}`)
    })
  };
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    wrapper: {
      [theme.breakpoints.up('md')]: {
        paddingLeft: '20%',
        paddingRight: '20%'
      }
    },
    containerButton: {
      backgroundColor: 'white',
      bottom: 6,
      left: 4,
      padding: 36,
      position: 'fixed',
      zIndex: 1000,
      [theme.breakpoints.up('md')]: {
        borderTop: '1px solid rgba(0, 0, 0, 0.12)',
        paddingRight: '15%'
      }
    },
    buttonLeftContainer: {
      paddingLeft: '0px !important'
    },
    buttonRightContainer: {
      paddingRight: '0px !important'
    },
    containerForm: {
      marginBottom: 96
    },
    btnRemoveBeneficiary: {
      background: 'none',
      border: 'none',
      textTransform: 'unset',
      color: theme.palette.secondary.main
    }
  })
);

function EditBeneficiary({ beneficiary, handleNotifications }: TProps): JSX.Element {
  const { t } = useTranslation([i18Global, i18Forms]);
  const inputMaskRef = useRef(null);
  const router = useRouter();
  const classes = useStyles();
  const [provinceStates, setProvinceStates] = useState(INIT_FORM_GEO_ITEM);
  const [cantonStates, setCantonStates] = useState(INIT_FORM_GEO_ITEM);
  const [districtStates, setDistrictStates] = useState(INIT_FORM_GEO_ITEM);
  const [autoFillGeoInfo, setAutoFillGeoInfo] = useState(false);
  const [documentTypeOptions, setDocumentTypeOptions] = useState([]);
  const [typeError, setTypeError] = useState<string>(null);
  const [loading, setLoading] = useState<TLoading>('before-mount');

  const onSubmit = (values: TFormData) => {
    // TODO: Send this data to update beneficiary
    console.log('submit values', values);
  };

  const setRootUserGeoInf = ({ setFieldValue }: FormikProps<TFormData>) => {
    // TODO: Replace this data to current user geo info
    const rootGeoInfo = {
      province: { codigo: '2', nombre: '' },
      canton: { codigo: '202', nombre: '' },
      district: { codigo: '20202', nombre: '' }
    };

    const {
      province: { codigo: provinceCode },
      canton: { codigo: cantonCode },
      district: { codigo: districtCode }
    } = rootGeoInfo;

    if (autoFillGeoInfo) {
      setAutoFillGeoInfo(!autoFillGeoInfo);
      return;
    }

    if (_.isEmpty(rootGeoInfo)) {
      const errMsj = 'No local user geo data found';
      printFetchError(t(errMsj), new Error(errMsj));
      return;
    }

    fetchProvinces({ provinceCode, setFieldValue });
    fetchCantons({ provinceCode, cantonCode, setFieldValue });
    fetchDistrics({ cantonCode, districtCode, setFieldValue });
    setAutoFillGeoInfo(!autoFillGeoInfo);
  };

  const handlerChangeDocumentType = ({ evt, formProps }: ThandlerChangeDocumentTypeArgs): void => {
    const { handleChange, touched, setFieldValue } = formProps;
    handleChange(evt);
    touched.documentType = false;
    touched.documentNumber = false;
    touched.birthDate = false;
    touched.firstName = false;
    touched.lastName = false;
    setFieldValue('firstName', '');
    setFieldValue('lastName', '');
    setFieldValue('birthDate', '');
    setFieldValue('documentNumber', '');
    setTimeout(() => {
      inputMaskRef.current.focus();
      inputMaskRef.current.setSelectionRange(0, 0);
    }, 100);
  };

  const fieldHasError = ({ inputKey, formProps }: TInputHasErrorArgs) => {
    const { touched, errors } = formProps;
    return touched[inputKey] && Boolean(errors[inputKey]);
  };

  const isNotPhysicalID = (documentType: TFormData['documentType']) => {
    const parseDocumentType = Number(documentType);
    return !!(parseDocumentType !== 1 && parseDocumentType);
  };

  const getCurrentDocumentType = (key: string | number): TDocumentType | null =>
    documentTypeOptions.find(data => data.documentTypeId === Number(key));

  const setUserValues = ({ paciente, formProps }: TSetUserValuesArgs) => {
    if (paciente) {
      const { name, surname, lastSurname = '', dateOfBirth } = paciente;
      const { setFieldValue } = formProps;
      setFieldValue('firstName', name);
      setFieldValue('lastName', `${surname} ${lastSurname}`);
      setFieldValue('birthDate', dateOfBirth ? `${dateOfBirth}` : '');
    }
  };

  const userValuesIsAlreadyLoaded = (values: TFormData): boolean => {
    const userValues = {
      firstName: values.firstName,
      lastName: values.lastName,
      birthDate: values.birthDate
    };
    return !Object.values(userValues).some(value => _.isEmpty(value));
  };

  const handleDocumentNumberChange = async ({
    evt,
    formProps
  }: ThandlerChangeDocumentTypeArgs): Promise<void> => {
    const { handleChange, values } = formProps;
    const documentType = getCurrentDocumentType(values.documentType);
    const value = String(evt.target.value || '');

    if (documentType?.documentTypeId === 1) {
      handleChange(evt);
      return;
    }

    if (documentType?.documentTypeId === 2 && value.length <= 15 && REGEX_NUMERIC.test(value)) {
      handleChange(evt);
      return;
    }

    if ((REGEX_ALPHANUMERIC.test(value) && value.length <= 20) || value === '') {
      handleChange(evt);
    }
  };

  const getDocumentNumberInputComponent = (documentType: TFormData['documentType']) => {
    const findDocumentType = getCurrentDocumentType(documentType)?.mask;
    const mask = convertToMask(findDocumentType);
    return mask ? (TextMaskCustom as any) : 'input';
  };

  const getDocumentNumberInputProps = (documentType: TFormData['documentType']) => {
    const findDocumentType = getCurrentDocumentType(documentType)?.mask;
    const mask = convertToMask(findDocumentType);
    return {
      mask,
      'data-testid': 'documentNumber'
    };
  };

  const handleChangeGeoSelect = ({ fieldName, value, formProps }: TChangeGeoSelect) => {
    const { setFieldValue } = formProps;
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

  const printFetchError = (message: string, err: unknown) => {
    handleNotifications({ open: true, message, severity: 'error' });
    console.error(err);
  };

  const fetchPersonVerifier = (formProps: FormikProps<TFormData>) => {
    const { values, setFieldValue } = formProps;
    const { documentType, documentNumber } = values;
    const documentNumberSanitized = documentNumber.replace(/\D+/g, '');
    const findDocumentType = getCurrentDocumentType(documentType);

    if (loading || !findDocumentType || isNotPhysicalID(documentType)) {
      return;
    }

    if (documentNumberSanitized.length !== findDocumentType.length) {
      return;
    }

    setLoading('verify-user');
    setTypeError('');
    personVerifier(documentType, documentNumberSanitized)
      .then(result => {
        const { paciente } = result.data.result;
        setLoading('');
        setUserValues({ paciente, formProps });
      })
      .catch(err => {
        setLoading('');
        setFieldValue('firstName', '');
        setFieldValue('lastName', '');
        setFieldValue('birthDate', '');
        printFetchError(t('message.email.is_register', { ns: i18Forms }), err);
      });
  };

  const fetchDocumentTypes = () => {
    getDocumentsTypes()
      .then(response => {
        const { result } = response.data;
        setDocumentTypeOptions(result);
      })
      .catch(err => printFetchError(t('message.error.general_fetch', { ns: i18Forms }), err));
  };

  const fetchProvinces = ({ provinceCode = '-', setFieldValue }: TFetchProvincesArgs) => {
    setProvinceStates(prevState => ({
      ...prevState,
      fetching: true
    }));

    getProvinces()
      .then(res => {
        const { primerNivel: data } = res.data.result;
        const province = data.find(province => province.codigo === provinceCode);
        if (province) {
          setFieldValue('province', province);
        }
        setProvinceStates({ data, fetching: false });
      })
      .catch(err => printFetchError(t('message.error.general_fetch', { ns: i18Forms }), err));
  };

  const fetchCantons = ({ cantonCode, provinceCode, setFieldValue }: TFetchCantonsArgs) => {
    setCantonStates(prevState => ({
      ...prevState,
      fetching: true
    }));

    getCanton(provinceCode)
      .then(res => {
        const { segundoNivel: data } = res.data.result;
        const canton = data.find(canton => canton.codigo === cantonCode);
        if (canton) {
          setFieldValue('canton', canton);
        }
        setCantonStates({ data, fetching: false });
      })
      .catch(err => printFetchError(t('message.error.general_fetch', { ns: i18Forms }), err));
  };

  const fetchDistrics = ({ districtCode, cantonCode, setFieldValue }: TFetchDistricsArgs) => {
    setDistrictStates(prevState => ({
      ...prevState,
      fetching: true
    }));

    getDistrict(cantonCode)
      .then(res => {
        const { catalogo: data } = res.data.result;
        const district = data.find(district => district.codigo === districtCode);
        if (district) {
          setFieldValue('district', district);
        }
        setDistrictStates({ data, fetching: false });
      })
      .catch(err => printFetchError(t('message.error.general_fetch', { ns: i18Forms }), err));
  };

  const loadGeoData = (setFieldValue: FormikProps<TFormData>['setFieldValue']) => {
    const { province, canton, district } = beneficiary;
    fetchProvinces({ provinceCode: province.codigo, setFieldValue });

    if (!_.isEmpty(beneficiary.province)) {
      fetchCantons({ provinceCode: province.codigo, cantonCode: canton.codigo, setFieldValue });
    }

    if (!_.isEmpty(beneficiary.canton)) {
      fetchDistrics({ cantonCode: canton.codigo, districtCode: district.codigo, setFieldValue });
    }
  };

  return (
    <Formik
      validateOnMount
      initialValues={beneficiary}
      validationSchema={buildFormSchema(t).schema}
      onSubmit={(values, formik) => {
        formik.setTouched({});
        onSubmit(values);
      }}
    >
      {(formProps: FormikProps<TFormData>) => {
        const { values, touched, errors, handleBlur, handleChange } = formProps;

        useEffect(() => {
          fetchPersonVerifier(formProps);
        }, [values.documentNumber]);

        useEffect(() => {
          if (!_.isEmpty(values.province)) {
            fetchCantons({ provinceCode: values.province.codigo });
          }
        }, [values.province]);

        useEffect(() => {
          if (!_.isEmpty(values.canton)) {
            fetchDistrics({ cantonCode: values.canton.codigo });
          }
        }, [values.canton]);

        useEffect(() => {
          fetchDocumentTypes();
          loadGeoData(formProps.setFieldValue);
          setLoading('');
        }, []);

        return (
          <Form autoComplete="off">
            <Grid container className={classes.wrapper}>
              <Grid item xs={12} md={8}>
                <Box p={3}>
                  <Typography variant="h5" component="h5" gutterBottom>
                    {t('title.edit_beneficiary_title', { ns: i18Global })}
                  </Typography>
                  <Typography className="mb-1">
                    {t('description.edit_beneficiary', { ns: i18Global })}
                  </Typography>
                  <FormControl fullWidth variant="filled">
                    <FormLabel id="document-type-selector-label" style={{ marginBottom: 10 }}>
                      {t('label.document.type', { ns: i18Global })}
                    </FormLabel>
                    <Select
                      fullWidth
                      id="document-type-selector"
                      labelId="document-type-selector-label"
                      data-testid="document-type-selector"
                      name="documentType"
                      color="secondary"
                      variant="outlined"
                      defaultValue={beneficiary.documentType}
                      value={values.documentType}
                      onBlur={handleBlur}
                      error={fieldHasError({ inputKey: 'documentType', formProps })}
                      onChange={evt => handlerChangeDocumentType({ evt, formProps })}
                    >
                      {!documentTypeOptions.length && <MenuItem value="">No item</MenuItem>}
                      {documentTypeOptions.map((option, i) => (
                        <MenuItem key={i} value={option.documentTypeId}>
                          {mapDocumentTypesOpts(t, option.documentTypeId)}
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
                    label={t('label.document.number', { ns: i18Global })}
                    loading={loading === 'verify-user'}
                    errorType={typeError}
                    onBlur={handleBlur}
                    inputRef={inputMaskRef}
                    disabled={!values.documentType}
                    value={values.documentNumber}
                    helperText={errors.documentNumber}
                    error={fieldHasError({ inputKey: 'documentNumber', formProps })}
                    onChange={evt => handleDocumentNumberChange({ evt, formProps })}
                    inputProps={getDocumentNumberInputProps(values.documentType)}
                    inputComponent={getDocumentNumberInputComponent(values.documentType)}
                  />
                  {userValuesIsAlreadyLoaded(values) && (
                    <Paper square elevation={0}>
                      <TextField
                        formControlProps={{ margin: 'normal' }}
                        id="firstName"
                        name="firstName"
                        data-testid="firstName"
                        label={t('label.name', { ns: i18Global })}
                        disabled={true}
                        value={values.firstName}
                        error={touched.firstName && Boolean(errors.firstName)}
                        helperText={null}
                      />
                      <TextField
                        formControlProps={{ margin: 'normal' }}
                        id="lastName"
                        name="lastName"
                        data-testid="lastName"
                        label={t('label.lastname', { ns: i18Global })}
                        disabled={true}
                        helperText={null}
                        value={values.lastName}
                      />
                      <DatePicker
                        id="birthDate"
                        label={t('label.birthdate', { ns: i18Global })}
                        value={values.birthDate === '' ? null : values.birthDate}
                        margin="normal"
                        format="dd/MM/yyyy"
                        variant="inline"
                        inputVariant="outlined"
                        disabled={true}
                        onBlur={handleBlur}
                        onChange={null}
                        maxDate={new Date()}
                        formControlProps={{ margin: 'normal' }}
                      />
                    </Paper>
                  )}
                  <FormControl fullWidth margin="normal" variant="filled">
                    <FormLabel id="gender-selector-label" style={{ marginBottom: 10 }}>
                      {t('label.gender.gender', { ns: i18Global })}
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
                      <MenuItem value={'1'}>{t('label.gender.female', { ns: i18Global })}</MenuItem>
                      <MenuItem value={'2'}>{t('label.gender.male', { ns: i18Global })}</MenuItem>
                    </Select>
                    {touched.gender && errors.gender && (
                      <FormHelperText error>{errors.gender}</FormHelperText>
                    )}
                  </FormControl>
                  <TextField
                    fullWidth
                    id="email"
                    name="email"
                    type="text"
                    label={t('label.email.email', { ns: i18Global })}
                    value={values.email}
                    error={fieldHasError({ inputKey: 'email', formProps })}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    helperText={errors.email}
                  />
                  <TextField
                    id="mobilePhone1"
                    name="mobilePhone1"
                    type="text"
                    label={t('label.phone.phone', { ns: i18Global })}
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
                  <FormControl fullWidth style={{ marginTop: 20 }}>
                    <FormLabel style={{ marginBottom: 10 }}>
                      {t('label.residence', { ns: i18Global })}
                    </FormLabel>
                    <FormControlLabel
                      control={
                        <Checkbox
                          id="geoAutoFill"
                          checked={autoFillGeoInfo}
                          onChange={() => setRootUserGeoInf(formProps)}
                          name="autoFillGeoInfo"
                          color="primary"
                        />
                      }
                      label={
                        <Typography component="label" variant="body1">
                          {t('label.same_residence', { ns: i18Global })}
                        </Typography>
                      }
                    />
                  </FormControl>
                  {!autoFillGeoInfo && loading !== 'before-mount' && (
                    <>
                      <CustomAutoComplete
                        id="province"
                        label={t('label.address.province', { ns: i18Global })}
                        autoComplete={false}
                        value={values.province}
                        error={touched.province && Boolean(errors.province)}
                        onBlur={handleBlur}
                        options={provinceStates.data}
                        loading={provinceStates.fetching}
                        helperText={errors.province}
                        getOptionLabel={option => option.nombre}
                        getOptionSelected={(option, value) => option.nombre === value.nombre}
                        linearProgressProps={{ 'data-testid': 'provinces-loader' }}
                        onChange={(_e, value) =>
                          handleChangeGeoSelect({ value, formProps, fieldName: 'province' })
                        }
                      />
                      <CustomAutoComplete
                        id="canton"
                        label={t('label.address.canton', { ns: i18Global })}
                        value={values.canton}
                        error={touched.canton && Boolean(errors.canton)}
                        onBlur={handleBlur}
                        options={cantonStates.data}
                        loading={cantonStates.fetching}
                        helperText={errors.canton}
                        getOptionLabel={option => option.nombre}
                        getOptionSelected={(option, value) => option.nombre === value.nombre}
                        onChange={(_e, value) =>
                          handleChangeGeoSelect({ value, formProps, fieldName: 'canton' })
                        }
                      />
                      <CustomAutoComplete
                        id="district"
                        label={t('label.address.district', { ns: i18Global })}
                        value={values.district}
                        error={touched.district && Boolean(errors.district)}
                        onBlur={handleBlur}
                        options={districtStates.data}
                        loading={districtStates.fetching}
                        helperText={errors.district}
                        getOptionLabel={option => option.nombre}
                        getOptionSelected={(option, value) => option.nombre === value.nombre}
                        onChange={(_e, value) =>
                          handleChangeGeoSelect({ value, formProps, fieldName: 'district' })
                        }
                      />
                    </>
                  )}
                </Box>
                <Grid container justify="center" className={classes.containerForm}>
                  <Button
                    className={classes.btnRemoveBeneficiary}
                    type="submit"
                    onClick={() => alert('handle remove')}
                  >
                    {t('button.remove_beneficiary', { ns: i18Global })}
                    <DeleteIcon />
                  </Button>
                </Grid>
              </Grid>
            </Grid>
            <Box p={3}>
              <Grid
                container
                item
                xs={12}
                spacing={1}
                justify="flex-end"
                className={classes.containerButton}
              >
                <Grid item xs={6} md={2} className={classes.buttonLeftContainer}>
                  <Button fullWidth onClick={() => router.back()} variant="outlined">
                    {t('button.cancel', { ns: i18Global })}
                  </Button>
                </Grid>
                <Grid item xs={6} md={2} className={classes.buttonRightContainer}>
                  <Button
                    fullWidth
                    type="submit"
                    color="primary"
                    variant="contained"
                    disabled={!_.isEmpty(errors) || loading !== ''}
                  >
                    {t('button.save', { ns: i18Global })}
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Form>
        );
      }}
    </Formik>
  );
}

export default withTranslation([i18Global, i18Forms])(withAppContext(EditBeneficiary));
