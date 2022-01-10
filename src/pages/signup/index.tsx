import React, { useState } from 'react';
// import date-fns
import { addYears } from 'date-fns';
// import _ from 'lodash';
import axios from 'axios';
import { useRouter } from 'next/router';
import { Form, Formik } from 'formik';
import * as yup from 'yup';
/// CONTEXT
import { withAppContext } from '../../context/index';
/// SERVICES
import { signUp, setDataToLocalstorage } from '../../services/auth.service';
/// TYPES
import { IFormData, IProps } from '../../containers/SignUp/index.types';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
/// OWN COMPONENTS
import Wizard from '../../components/common/Wizard';
import ExtraDataForm from '../../containers/SignUp/components/ExtraData';
import PersonalDataForm from '../../containers/SignUp/components/PersonalData';
import CredentialDataForm from '../../containers/SignUp/components/CredentialData';

/// OWN COMPONENTS END
/// MATERIAL - UI
import { Button, Box, Grid } from '@material-ui/core';
/// MATERIAL - UI END

/// STYLES
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';
import { ISignUpBody } from '../../types/auth.types';
/// STYLES END

/// i18n
import { useTranslation } from 'react-i18next';
import { NAMESPACE_KEY } from '../../i18n/forms/i18n';
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
  const { t } = useTranslation(['global', NAMESPACE_KEY]);
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
        .required(`${t('validations.required', { ns: NAMESPACE_KEY })}`)
        .min(3, `${t('validations.min_3', { ns: NAMESPACE_KEY })}`),
      birthDate: yup
        .date()
        .max(addYears(new Date(), -18), `${t('validations.max_18_age', { ns: NAMESPACE_KEY })}`)
        .required(`${t('validations.required', { ns: NAMESPACE_KEY })}`),
      firstName: yup
        .string()
        .required(`${t('validations.required', { ns: NAMESPACE_KEY })}`)
        .min(3, `${t('validations.min_3', { ns: NAMESPACE_KEY })}`),
      documentType: yup.number().required(`${t('validations.required', { ns: NAMESPACE_KEY })}`),
      documentNumber: yup
        .string()
        .required(`${t('validations.required', { ns: NAMESPACE_KEY })}`)
        .when(['documentType'], {
          is: (documentType: number) => documentType === 1,
          then: yup
            .string()
            .transform(value => value.replace(/[^\d]/g, ''))
            .min(9, `${t('validations.min_9', { ns: NAMESPACE_KEY })}`)
        })
        .when(['documentType'], {
          is: (documentType: number) => documentType === 2,
          then: yup
            .string()
            .transform(value => value.replace(/[^\d]/g, ''))
            .min(10, `${t('validations.min_10_max_15', { ns: NAMESPACE_KEY })}`)
            .max(15, `${t('validations.min_10_max_15', { ns: NAMESPACE_KEY })}`)
        })
        .when(['documentType'], {
          is: (documentType: number) => documentType === 6,
          then: yup
            .string()
            .min(9, `${t('validations.min_9_max_20', { ns: NAMESPACE_KEY })}`)
            .max(20, `${t('validations.min_9_max_20', { ns: NAMESPACE_KEY })}`)
        })
    })
  };
  const ExtraDataValidations = {
    name: 'ExtraData',
    schema: yup.object().shape({
      gender: yup.string().required(`${t('validations.required', { ns: NAMESPACE_KEY })}`),
      canton: yup
        .object()
        .shape({
          codigo: yup.string().required(`${t('validations.required', { ns: NAMESPACE_KEY })}`),
          nombre: yup.string().required(`${t('validations.required', { ns: NAMESPACE_KEY })}`)
        })
        .nullable()
        .required(`${t('validations.required', { ns: NAMESPACE_KEY })}`),
      district: yup
        .object()
        .shape({
          codigo: yup.string().required(`${t('validations.required', { ns: NAMESPACE_KEY })}`),
          nombre: yup.string().required(`${t('validations.required', { ns: NAMESPACE_KEY })}`)
        })
        .nullable()
        .required(`${t('validations.required', { ns: NAMESPACE_KEY })}`),
      province: yup
        .object()
        .shape({
          codigo: yup.string().required(`${t('validations.required', { ns: NAMESPACE_KEY })}`),
          nombre: yup.string().required(`${t('validations.required', { ns: NAMESPACE_KEY })}`)
        })
        .nullable()
        .required(`${t('validations.required', { ns: NAMESPACE_KEY })}`),
      mobilePhone1: yup
        .string()
        .required(`${t('validations.required', { ns: NAMESPACE_KEY })}`)
        .transform(value => value.replace(/[^\d]/g, ''))
        .min(8, `${t('validations.min_8', { ns: NAMESPACE_KEY })}`)
    })
  };

  const CredentialDataValidations = {
    name: 'CredentialStep',
    schema: yup.object().shape({
      terms: yup
        .bool()
        .oneOf([true], `${t('validations.required', { ns: NAMESPACE_KEY })}`)
        .required(`${t('validations.required', { ns: NAMESPACE_KEY })}`),
      services: yup
        .bool()
        .oneOf([true], `${t('validations.required', { ns: NAMESPACE_KEY })}`)
        .required(`${t('validations.required', { ns: NAMESPACE_KEY })}`),
      email: yup
        .string()
        .email(`${t('validations.email.incorrect', { ns: NAMESPACE_KEY })}`)
        .required(`${t('validations.email.required', { ns: NAMESPACE_KEY })}`),
      password: yup
        .string()
        .required(`${t('validations.password.required_short', { ns: NAMESPACE_KEY })}`)
        .min(8, `${t('validations.password.min_8', { ns: NAMESPACE_KEY })}`)
        .max(16, `${t('validations.password.max_16', { ns: NAMESPACE_KEY })}`)
        .matches(
          /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/,
          `${t('validations.password.regex', { ns: NAMESPACE_KEY })}`
        ),
      confirmPassword: yup
        .string()
        .oneOf(
          [yup.ref('password'), null],
          `${t('validations.password.matched', { ns: NAMESPACE_KEY })}`
        )
        .required(`${t('validations.required', { ns: NAMESPACE_KEY })}`)
        .min(8, `${t('validations.password.min_8', { ns: NAMESPACE_KEY })}`)
        .max(16, `${t('validations.password.max_16', { ns: NAMESPACE_KEY })}`)
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
            title: `${t('title.identify', { ns: 'globals' })}`,
            description: `${t('description.identify', { ns: 'globals' })}`,
            component: (
              <PersonalDataForm
                handleNotifications={handleNotifications}
                documentTypesOptions={documentTypeOptions}
                {...formik}
              />
            )
          },
          {
            title: `${t('title.extra_data', { ns: 'globals' })}`,
            description: `${t('description.extra_data', { ns: 'globals' })}`,
            component: <ExtraDataForm {...formik} />
          },
          {
            title: `${t('title.credential_data', { ns: 'globals' })}`,
            description: `${t('description.credential_data', { ns: 'globals' })}`,
            component: <CredentialDataForm handleNotifications={handleNotifications} {...formik} />
          }
        ];
        return (
          <Form autoComplete="off">
            <Wizard
              stepIndicator
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
                        {t('button.back', { ns: 'globals' })}
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
                          ? `${t('button.send', { ns: 'globals' })}`
                          : `${t('button.continue', { ns: 'globals' })}`}
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
