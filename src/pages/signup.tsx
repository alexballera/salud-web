import React, { useState } from 'react';
import _ from 'lodash';
import axios from 'axios';
import { Form, Formik } from 'formik';
/// TYPES
import { IFormData } from '../containers/SignUp/index.types';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
/// OWN COMPONENTS
import Wizard from '../components/common/Wizard';
import ExtraDataForm from '../containers/SignUp/components/ExtraData';
import PersonalDataForm from '../containers/SignUp/components/PersonalData';
import CredentialDataForm from '../containers/SignUp/components/CredentialData';
/// OWN COMPONENTS END
/// MATERIAL - UI
import Button from '@material-ui/core/Button';
/// MATERIAL - UI END

/// STYLES
import '../styles/Signup.module.scss';

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
  canton: '',
  country: '',
  password: '',
  province: '',
  district: '',
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

function SignUpView({
  documentTypeOptions
}: InferGetStaticPropsType<typeof getStaticProps>): JSX.Element {
  const [currentStep, setCurrentState] = useState<number>(0);

  return (
    <section className="container signup-wrapper">
      <Formik
        validateOnMount
        initialValues={initialValues}
        validationSchema={stepValidations[currentStep]}
        onSubmit={(values: IFormData) => {
          if (currentStep === 2) {
            alert(JSON.stringify(values, null, 2));
          } else {
            setCurrentState(currentStep + 1);
          }
        }}
      >
        {formik => {
          const dataSource = [
            {
              title: PersonalDataForm.title,
              description: PersonalDataForm.description,
              component: <PersonalDataForm documentTypesOptions={documentTypeOptions} {...formik} />
            },
            {
              title: ExtraDataForm.title,
              description: ExtraDataForm.description,
              component: <ExtraDataForm {...formik} />
            },
            {
              title: CredentialDataForm.title,
              description: CredentialDataForm.description,
              component: <CredentialDataForm {...formik} />
            }
          ];
          return (
            <Form autoComplete="off">
              <Wizard
                footer={
                  <Button
                    fullWidth
                    type="submit"
                    color="primary"
                    variant="contained"
                    disabled={!_.isEmpty(formik.errors)}
                  >
                    {currentStep === dataSource.length ? 'Enviar' : 'Siguiente'}
                  </Button>
                }
                activeStep={currentStep}
                dataSource={dataSource}
              />
            </Form>
          );
        }}
      </Formik>
    </section>
  );
}

export default SignUpView;
