import React, { useState } from 'react';
// import _ from 'lodash';
import axios from 'axios';
import { useRouter } from 'next/router';
import { Form, Formik } from 'formik';
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

const stepValidations = [
  PersonalDataForm.validations.schema,
  ExtraDataForm.validations.schema,
  CredentialDataForm.validations.schema
];
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
            title: PersonalDataForm.title,
            description: PersonalDataForm.description,
            component: (
              <PersonalDataForm
                handleNotifications={handleNotifications}
                documentTypesOptions={documentTypeOptions}
                {...formik}
              />
            )
          },
          {
            title: ExtraDataForm.title,
            description: ExtraDataForm.description,
            component: <ExtraDataForm {...formik} />
          },
          {
            title: CredentialDataForm.title,
            description: CredentialDataForm.description,
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
