import React, { useEffect, useRef, useState } from 'react';
import * as yup from 'yup';
import _ from 'lodash';
import { PHONE_NUMBER_MASK } from '../../utils/constants';
import DatePicker from '../../components/common/DataPicker';
import { personVerifier } from '../../services/personVerifier.service';
import { getDocumentsTypes } from '../../services/getPersonalData.service';
import { convertToMask } from '../../utils/helpers';
import { useRouter } from 'next/router';
import { Form, Formik, FormikProps } from 'formik';
import { IAppProps, withAppContext } from '../../context/index';
import { GetStaticProps, NextPageContext } from 'next';
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import { NAMESPACE_KEY } from '../../i18n/forms/i18n';
import { getProvinces, getCanton, getDistrict } from '../../services/address.service';
import TextMaskCustom from '../../components/common/InputTextMask';
import CustomAutoComplete from '../../components/common/Select';
import TextField from '../../components/common/TextField';

import Paper from '@material-ui/core/Paper';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import { TFunction } from 'i18next';
import { INotificationProps } from '../../context/types';
import { Grid } from '@material-ui/core';

type IProps = {
  handleNotifications: (_args: INotificationProps) => void;
  beneficiary: IFormData;
} & IAppProps;

type IFormData = {
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

export type IPaciente = {
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
  formProps: FormikProps<IFormData>;
};

type TInputHasErrorArgs = {
  inputKey: string;
  formProps: FormikProps<IFormData>;
};

type TSetUserValuesArgs = {
  paciente: IPaciente | null;
  formProps: FormikProps<IFormData>;
};

type TChangeGeoSelect = {
  value: string;
  fieldName: string;
  formProps: FormikProps<IFormData>;
};

const REGEX_ALPHANUMERIC = /^[a-zA-Z0-9]*$/;
const REGEX_NUMERIC = /^[0-9]*$/;

export const getServerSideProps: GetStaticProps = async (ctx: NextPageContext) => {
  const { 'beneficiary-id': id } = ctx.query;
  console.log('id', id);
  // TODO get Beneficiary
  return {
    props: {
      beneficiary: {
        gender: '',
        documentType: '1',
        documentNumber: '5 0413 0864',
        birthDate: '',
        email: '',
        firstName: '',
        lastName: '',
        country: 'CR',
        mobilePhone1: '',
        province: { codigo: '5', nombre: 'Guanacaste' },
        district: {
          codigo: '50602',
          nombre: 'Palmira'
        },
        canton: {
          codigo: '506',
          nombre: 'Cañas'
        }
      } as IFormData
    }
  };
};

const mapDocumentTypesOpts = (t: TFunction, val: number) => {
  const label = {
    1: `${t('label_physical')}`,
    2: `${t('label_residence')}`,
    6: `${t('label_passport')}`
  };
  return label[val];
};

const buildFormSchema = (t: TFunction) => ({
  schema: yup.object().shape({
    documentType: yup.number().required(`${t('validations_required')}`),
    gender: yup.string().required(`${t('validations_required')}`),
    documentNumber: yup
      .string()
      .required(`${t('validations_required')}`)
      .when(['documentType'], {
        is: documentType => documentType === 1,
        then: yup
          .string()
          .transform(value => value.replace(/[^\d]/g, ''))
          .min(9, `${t('validations_min_9')}`)
      })
      .when(['documentType'], {
        is: documentType => documentType === 2,
        then: yup
          .string()
          .transform(value => value.replace(/[^\d]/g, ''))
          .min(10, `${t('validations_min_10_max_15')}`)
          .max(15, `${t('validations_min_10_max_15')}`)
      })
      .when(['documentType'], {
        is: documentType => documentType === 6,
        then: yup
          .string()
          .min(9, `${t('validations_min_10_max_20')}`)
          .max(20, `${t('validations_min_10_max_20')}`)
      }),
    mobilePhone1: yup
      .string()
      .required(`${t('validations_required')}`)
      .transform(value => value.replace(/[^\d]/g, ''))
      .min(8, `${t('validations_min_8')}`),
    email: yup
      .string()
      .email(`${t('validations_email_incorrect')}`)
      .required(`${t('validations_email_required')}`),
    province: yup
      .object()
      .shape({
        codigo: yup.string().required(`${t('validations_required')}`),
        nombre: yup.string().required(`${t('validations_required')}`)
      })
      .nullable()
      .required(`${t('validations_required')}`),
    canton: yup
      .object()
      .shape({
        codigo: yup.string().required(`${t('validations_required')}`),
        nombre: yup.string().required(`${t('validations_required')}`)
      })
      .nullable()
      .required(`${t('validations_required')}`),
    district: yup
      .object()
      .shape({
        codigo: yup.string().required(`${t('validations_required')}`),
        nombre: yup.string().required(`${t('validations_required')}`)
      })
      .nullable()
      .required(`${t('validations_required')}`)
  })
});

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
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
    }
  })
);

function SignUpView({ beneficiary, handleNotifications }: IProps): JSX.Element {
  const { t } = useTranslation(NAMESPACE_KEY, { keyPrefix: 'forms' });
  const inputMaskRef = useRef(null);
  const router = useRouter();
  const classes = useStyles();
  const [provinceStates, setProvinceStates] = useState({ data: [], fetching: false });
  const [cantonStates, setCantonStates] = useState({ data: [], fetching: false });
  const [districtStates, setDistrictStates] = useState({ data: [], fetching: false });
  const [documentTypeOptions, setDocumentTypeOptions] = useState([]);
  const [typeError, setTypeError] = useState<string>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const onSubmit = (values: IFormData) => {
    // TODO: Send ponst data
    console.log('submit values', values);
    handleNotifications({ open: true, message: 'asdf', severity: 'error' });
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

  const isNotPhysicalID = (documentType: IFormData['documentType']) =>
    !!(documentType !== 1 && documentType);

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

  const handleDocumentNumberChange = async ({
    evt,
    formProps
  }: ThandlerChangeDocumentTypeArgs): Promise<void> => {
    const { handleChange, values } = formProps;
    const documentType = getCurrentDocumentType(values.documentType);
    const value = String(evt.target.value || '');

    if (documentType.documentTypeId === 1) {
      handleChange(evt);
      return;
    }

    if (documentType.documentTypeId === 2 && value.length <= 15 && REGEX_NUMERIC.test(value)) {
      handleChange(evt);
      return;
    }

    if ((REGEX_ALPHANUMERIC.test(value) && value.length <= 20) || value === '') {
      handleChange(evt);
    }
  };

  const userValuesAlreadyLoaded = (values: IFormData): boolean => {
    const userValues = {
      firstName: values.firstName,
      lastName: values.lastName,
      birthDate: values.birthDate
    };
    return !Object.values(userValues).some(value => _.isEmpty(value));
  };

  const getDocumentNumberInputComponent = (documentType: IFormData['documentType']) => {
    const findDocumentType = getCurrentDocumentType(documentType)?.mask;
    const mask = convertToMask(findDocumentType);
    return mask ? (TextMaskCustom as any) : 'input';
  };

  const getDocumentNumberInputProps = (documentType: IFormData['documentType']) => {
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

  const fetchPersonVerifier = (formProps: FormikProps<IFormData>) => {
    const {
      values: { documentType, documentNumber },
      setFieldValue
    } = formProps;
    const documentNumberSanitized = documentNumber.replace(/\D+/g, '');
    const findDocumentType = getCurrentDocumentType(documentType);
    if (loading || !findDocumentType || isNotPhysicalID(documentType)) {
      return;
    }
    if (documentNumberSanitized.length !== findDocumentType.length) {
      return;
    }
    setLoading(true);
    personVerifier(documentType, documentNumberSanitized)
      .then(result => {
        const { paciente } = result.data.result;
        setTypeError('');
        setLoading(false);
        setUserValues({ paciente, formProps });
      })
      .catch(err => {
        setLoading(false);
        setFieldValue('firstName', '');
        setFieldValue('lastName', '');
        setFieldValue('birthDate', '');
        printFetchError(t(''), err);
      });
  };

  const fetchDocumentTypes = () => {
    getDocumentsTypes()
      .then(response => {
        const { result } = response.data;
        setDocumentTypeOptions(result);
      })
      .catch(err => printFetchError(t('Error to fetch'), err));
  };

  const fetchProvinces = () => {
    setProvinceStates(prevState => ({
      ...prevState,
      fetching: true
    }));

    getProvinces()
      .then(res => {
        const { primerNivel } = res.data.result;
        setProvinceStates({ data: primerNivel, fetching: false });
        console.log('primer nivel');
      })
      .catch(err => printFetchError(t(''), err));
  };

  const fetchCantons = (provinceCode: string) => {
    setCantonStates(prevState => ({
      ...prevState,
      fetching: true
    }));

    getCanton(provinceCode)
      .then(res => {
        const { segundoNivel: data } = res.data.result;
        setCantonStates({ data, fetching: false });
      })
      .catch(err => printFetchError(t(''), err));
  };

  const fetchDistrics = (cantonCode: string) => {
    setDistrictStates(prevState => ({
      ...prevState,
      fetching: true
    }));

    getDistrict(cantonCode)
      .then(res => {
        const { catalogo: data } = res.data.result;
        setDistrictStates({ data, fetching: false });
      })
      .catch(err => printFetchError(t(''), err));
  };

  const loadGeoData = () => {
    if (!_.isEmpty(beneficiary.province)) {
      fetchCantons(beneficiary.province.codigo);
    }
    if (!_.isEmpty(beneficiary.canton)) {
      fetchDistrics(beneficiary.canton.codigo);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchDocumentTypes();
    fetchProvinces();
    loadGeoData();
    setLoading(false);
  }, []);

  return (
    <Formik
      validateOnMount
      initialValues={beneficiary}
      validationSchema={buildFormSchema(t).schema}
      onSubmit={(values, formik) => {
        console.log(formik);
        formik.setTouched({});
        onSubmit(values);
      }}
    >
      {(formProps: FormikProps<IFormData>) => {
        const { values, touched, errors, handleBlur, handleChange } = formProps;

        useEffect(() => {
          fetchPersonVerifier(formProps);
        }, [values.documentNumber]);

        useEffect(() => {
          if (!_.isEmpty(values.province)) {
            fetchCantons(values.province.codigo);
          }
        }, [values.province]);

        useEffect(() => {
          if (!_.isEmpty(values.canton)) {
            fetchDistrics(values.canton.codigo);
          }
        }, [values.canton]);

        useEffect(() => {
          console.log(errors);
        }, [errors]);

        return (
          <Grid container>
            <Grid item md={4} spacing={3}>
              <Form aria-disabled autoComplete="off">
                <FormControl fullWidth variant="filled">
                  <FormLabel id="document-type-selector-label" style={{ marginBottom: 10 }}>
                    {t('label_document_type')}
                  </FormLabel>
                  <Select
                    fullWidth
                    id="document-type-selector"
                    labelId="document-type-selector-label"
                    data-testid="document-type-selector"
                    name="documentType"
                    color="secondary"
                    variant="outlined"
                    value={values.documentType}
                    onBlur={handleBlur}
                    error={fieldHasError({ inputKey: 'documentType', formProps })}
                    onChange={evt => handlerChangeDocumentType({ evt, formProps })}
                  >
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
                  label={t('label_document_number')}
                  loading={false}
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
                {userValuesAlreadyLoaded(values) && (
                  <Paper square elevation={0}>
                    <TextField
                      formControlProps={{ margin: 'normal' }}
                      id="firstName"
                      name="firstName"
                      data-testid="firstName"
                      label={t('forms_name_label')}
                      disabled={true}
                      value={values.firstName}
                      error={touched.firstName && Boolean(errors.firstName)}
                      helperText={null}
                    />
                    <TextField
                      formControlProps={{ margin: 'normal' }}
                      id="lastName"
                      name="lastName"
                      label={t('forms_lastname_label')}
                      data-testid="lastName"
                      disabled={true}
                      helperText={null}
                      value={values.lastName}
                    />
                    <DatePicker
                      id="birthDate"
                      label={t('forms_birthdate')}
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
                    {t('label_gender')}
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
                    <MenuItem value={'1'}>{t('label_female')}</MenuItem>
                    <MenuItem value={'2'}>{t('label_male')}</MenuItem>
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
                  label={t('label_email')}
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
                  label={t('label_phone')}
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
                <CustomAutoComplete
                  id="province"
                  label={t('label_province')}
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
                  label={t('label_canton')}
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
                  label={t('label_district')}
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
                <button type="submit" disabled={loading}>
                  Submit
                </button>
              </Form>
            </Grid>
          </Grid>
        );
      }}
    </Formik>
  );
}

export default withAppContext(SignUpView);
