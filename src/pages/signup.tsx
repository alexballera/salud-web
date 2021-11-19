import React, { useState } from 'react';
// import _ from 'lodash';
import axios from 'axios';
import { useRouter } from 'next/router';
import { Form, Formik } from 'formik';
import * as yup from 'yup';
/// CONTEXT
import { withAppContext } from '../context/index';
/// SERVICES
import { signUp, setDataToLocalstorage } from '../services/auth.service';
/// TYPES
import { IFormData, IProps } from '../containers/SignUp/index.types';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
/// OWN COMPONENTS
import Wizard from '../components/common/Wizard';
import ExtraDataForm from '../containers/SignUp/components/ExtraData';
import PersonalDataForm from '../containers/SignUp/components/PersonalData';
import CredentialDataForm from '../containers/SignUp/components/CredentialData';

/// OWN COMPONENTS END
/// MATERIAL - UI
import { Button, Box, Grid } from '@material-ui/core';
/// MATERIAL - UI END

/// STYLES
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';
import { ISignUpBody } from '../types/auth.types';
/// STYLES END

/// i18n
import { useTranslation } from 'react-i18next';
import { NAMESPACE_KEY } from '../i18n/forms/i18n';
/// i18n END

/// GET SERVICE
export const getStaticProps: GetStaticProps = async () => {
  const res = await axios.get(`${process.env.apiUrl}general/document-types`);
  const data = await res.data.result;

  return {
    props: { documentTypeOptions: data } // will be passed to the page component as props
  };
};
/// GET SERVICE END

/// FORM STATES & VALIDATIONS
const initialValues: IFormData = {
  email: '',
  terms: false,
  gender: '',
  canton: null,
  country: 'CR',
  password: '',
  province: null,
  district: null,
  lastName: '',
  services: false,
  firstName: '',
  birthDate: '',
  superappUser: false,
  documentType: '',
  mobilePhone1: '',
  documentNumber: '',
  confirmPassword: ''
};

/// FORM STATES & VALIDATIONS END

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

function SignUpView({
  handleLogin,
  handleError,
  documentTypeOptions,
  handleNotifications
}: InferGetStaticPropsType<typeof getStaticProps> & IProps): JSX.Element {
  const { t } = useTranslation(NAMESPACE_KEY);
  const classes = useStyles();
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [currentStep, setCurrentState] = useState<number>(0);
  const goBack = () => {
    if (currentStep > 0) setCurrentState(currentStep - 1);
    else router.back();
  };

  const PersonalDataValidations = {
    name: 'PersonalData',
    schema: yup.object().shape({
      lastName: yup
        .string()
        .required(`${t('forms_field_required')}`)
        .min(3, `${t('forms_validations_min_3')}`),
      birthDate: yup
        .date()
        .max(new Date(), 'Fecha inválida')
        .required(`${t('forms_field_required')}`),
      firstName: yup
        .string()
        .required(`${t('forms_field_required')}`)
        .min(3, `${t('forms_validations_min_3')}`),
      documentType: yup.number().required(`${t('forms_field_required')}`),
      documentNumber: yup
        .string()
        .required(`${t('forms_field_required')}`)
        .when(['documentType'], {
          is: documentType => documentType === 1,
          then: yup
            .string()
            .transform(value => value.replace(/[^\d]/g, ''))
            .min(9, `${t('forms_validations_min_9')}`)
        })
        .when(['documentType'], {
          is: documentType => documentType === 2,
          then: yup
            .string()
            .transform(value => value.replace(/[^\d]/g, ''))
            .min(10, `${t('forms_validations_min_10_max_15')}`)
            .max(15, `${t('forms_validations_min_10_max_15')}`)
        })
        .when(['documentType'], {
          is: documentType => documentType === 6,
          then: yup
            .string()
            .min(9, `${t('forms_validations_min_10_max_20')}`)
            .max(20, `${t('forms_validations_min_10_max_20')}`)
        })
    })
  };
  const ExtraDataValidations = {
    name: 'ExtraData',
    schema: yup.object().shape({
      gender: yup.string().required(`${t('forms_field_required')}`),
      canton: yup
        .object()
        .shape({
          codigo: yup.string().required(`${t('forms_field_required')}`),
          nombre: yup.string().required(`${t('forms_field_required')}`)
        })
        .nullable()
        .required(`${t('forms_field_required')}`),
      district: yup
        .object()
        .shape({
          codigo: yup.string().required(`${t('forms_field_required')}`),
          nombre: yup.string().required(`${t('forms_field_required')}`)
        })
        .nullable()
        .required(`${t('forms_field_required')}`),
      province: yup
        .object()
        .shape({
          codigo: yup.string().required(`${t('forms_field_required')}`),
          nombre: yup.string().required(`${t('forms_field_required')}`)
        })
        .nullable()
        .required(`${t('forms_field_required')}`),
      mobilePhone1: yup
        .string()
        .required(`${t('forms_field_required')}`)
        .transform(value => value.replace(/[^\d]/g, ''))
        .min(8, `${t('forms_validations_min_8')}`)
    })
  };

  const CredentialDataValidations = {
    name: 'CredentialStep',
    schema: yup.object().shape({
      terms: yup.bool().oneOf([true], 'Campo requerido').required('Campo requerido'),
      services: yup.bool().oneOf([true], 'Campo requerido').required('Campo requerido'),
      email: yup.string().email('Formato de correo incorrecto').required('Email requerido'),
      password: yup
        .string()
        .required('Contraseña requerida')
        .min(8, 'La contraseña debe ser de al menos 8 caracteres')
        .max(16, 'La contraseña debe ser máximo de 16 caracteres')
        .matches(
          /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/,
          'La contraseña debe contener al menos una letra mayúscula, una letra minúscula y un número'
        ),
      confirmPassword: yup
        .string()
        .oneOf([yup.ref('password'), null], 'La contraseña no coincide')
        .required('Campo Requerido')
        .min(8, 'La contraseña debe ser de al menos 8 caracteres')
        .max(16, 'La contraseña debe ser máximo de 16 caracteres')
    })
  };

  const stepValidations = [
    PersonalDataValidations.schema,
    ExtraDataValidations.schema,
    CredentialDataValidations.schema
  ];

  const onSubmit = (values: IFormData) => {
    if (currentStep === 2) {
      setLoading(true);
      const body: ISignUpBody = {
        email: values.email,
        terms: values.terms,
        gender: values.gender,
        canton: values.canton.codigo,
        country: values.country,
        province: values.province.codigo,
        password: values.password,
        lastName: values.lastName,
        district: values.district.codigo,
        services: values.services,
        firstName: values.firstName,
        birthDate: values.birthDate,
        superappUser: values.superappUser,
        mobilePhone1: values.mobilePhone1,
        documentType: values.documentType,
        documentNumber: values.documentNumber
      };

      signUp(body)
        .then(res => {
          handleLogin(res.data.result);
          setDataToLocalstorage('user', res.data.result);
          router.replace('/validate_code');
        })
        .catch(err => {
          handleError(true, err.response.data.error.message);
        })
        .finally(() => {
          setTimeout(() => {
            setLoading(false);
          }, 500);
        });
    } else {
      setCurrentState(currentStep + 1);
    }
  };

  return (
    <Formik
      validateOnMount
      onSubmit={(values, formik) => {
        formik.setTouched({});
        onSubmit(values);
      }}
      initialValues={initialValues}
      validationSchema={stepValidations[currentStep]}
    >
      {formik => {
        const dataSource = [
          {
            title: `${t('forms_personal_data_title')}`,
            description: `${t('forms_personal_data_description')}`,
            component: (
              <PersonalDataForm
                handleNotifications={handleNotifications}
                documentTypesOptions={documentTypeOptions}
                {...formik}
              />
            )
          },
          {
            title: `${t('forms_extra_data_title')}`,
            description: `${t('forms_extra_data_description')}`,
            component: <ExtraDataForm {...formik} />
          },
          {
            title: `${t('forms_credential_data_title')}`,
            description: `${t('forms_credential_data_description')}`,
            component: <CredentialDataForm handleNotifications={handleNotifications} {...formik} />
          }
        ];
        return (
          <Form autoComplete="off">
            <Wizard
              footer={
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
                      <Button fullWidth onClick={goBack} variant="outlined">
                        {t('forms_signup_back_button')}
                      </Button>
                    </Grid>
                    <Grid item xs={6} md={2} className={classes.buttonRightContainer}>
                      <Button
                        fullWidth
                        type="submit"
                        color="primary"
                        variant="contained"
                        disabled={loading}
                        // TODO verificar
                        // disabled={!_.isEmpty(formik.errors) || loading}
                      >
                        {currentStep === dataSource.length
                          ? `${t('forms_signup_send_button')}`
                          : `${t('forms_signup_continue_button')}`}
                      </Button>
                    </Grid>
                  </Grid>
                </Box>
              }
              activeStep={currentStep}
              dataSource={dataSource}
            />
          </Form>
        );
      }}
    </Formik>
  );
}

export default withAppContext(SignUpView);
