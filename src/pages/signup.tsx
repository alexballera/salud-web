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
  const { t } = useTranslation(NAMESPACE_KEY, { keyPrefix: 'forms' });
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
        .required(`${t('validations_required')}`)
        .min(3, `${t('validations_min_3')}`),
      birthDate: yup
        .date()
        .max(new Date(), 'validations_date_invalid')
        .required(`${t('validations_required')}`),
      firstName: yup
        .string()
        .required(`${t('validations_required')}`)
        .min(3, `${t('validations_min_3')}`),
      documentType: yup.number().required(`${t('validations_required')}`),
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
        })
    })
  };
  const ExtraDataValidations = {
    name: 'ExtraData',
    schema: yup.object().shape({
      gender: yup.string().required(`${t('validations_required')}`),
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
        .required(`${t('validations_required')}`),
      province: yup
        .object()
        .shape({
          codigo: yup.string().required(`${t('validations_required')}`),
          nombre: yup.string().required(`${t('validations_required')}`)
        })
        .nullable()
        .required(`${t('validations_required')}`),
      mobilePhone1: yup
        .string()
        .required(`${t('validations_required')}`)
        .transform(value => value.replace(/[^\d]/g, ''))
        .min(8, `${t('validations_min_8')}`)
    })
  };

  const CredentialDataValidations = {
    name: 'CredentialStep',
    schema: yup.object().shape({
      terms: yup
        .bool()
        .oneOf([true], `${t('validations_required')}`)
        .required(`${t('validations_required')}`),
      services: yup
        .bool()
        .oneOf([true], `${t('validations_required')}`)
        .required(`${t('validations_required')}`),
      email: yup
        .string()
        .email(`${t('validations_email_incorrect')}`)
        .required(`${t('validations_email_required')}`),
      password: yup
        .string()
        .required(`${t('validations_password_required_short')}`)
        .min(8, `${t('validations_password_min_8')}`)
        .max(16, `${t('validations_password_max_16')}`)
        .matches(
          /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/,
          `${t('validations_password_regex')}`
        ),
      confirmPassword: yup
        .string()
        .oneOf([yup.ref('password'), null], `${t('validations_password_matched')}`)
        .required(`${t('validations_required')}`)
        .min(8, `${t('validations_password_min_8')}`)
        .max(16, `${t('validations_password_max_16')}`)
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
            title: `${t('personal_data_title')}`,
            description: `${t('personal_data_description')}`,
            component: (
              <PersonalDataForm
                handleNotifications={handleNotifications}
                documentTypesOptions={documentTypeOptions}
                {...formik}
              />
            )
          },
          {
            title: `${t('extra_data_title')}`,
            description: `${t('extra_data_description')}`,
            component: <ExtraDataForm {...formik} />
          },
          {
            title: `${t('credential_data_title')}`,
            description: `${t('credential_data_description')}`,
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
                        {t('button_back')}
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
                          ? `${t('button_send')}`
                          : `${t('button_continue')}`}
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
