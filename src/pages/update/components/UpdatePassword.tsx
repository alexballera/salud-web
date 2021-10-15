import React, { useState } from 'react';
// import _ from 'lodash';
import axios from 'axios';
import { useRouter } from 'next/router';
import { Form, Formik } from 'formik';

/// CONTEXT
import { withAppContext } from '../../../context';

/// SERVICES
import { ISignUpBody, signUp } from '../../../services/auth.service';

/// TYPES
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { ICredentialDataProps, IFormData, IProps } from '../../../containers/SignUp/index.types';
/// TYPES END

/// OWN COMPONENTS
import LayoutForm from '../../../layouts/LayoutForm';
import CredentialData from '../../../containers/SignUp/components/CredentialData';
import CustomTextField from '../../../components/common/TextField';
/// OWN COMPONENTS END

/// MATERIAL - UI
import { Button } from '@material-ui/core';
/// MATERIAL - UI END

/// STYLES
/// STYLES END

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
function UpdatePassword({
  handleLogin,
  handleError,
  handleNotifications
}: ICredentialDataProps & InferGetStaticPropsType<typeof getStaticProps> & IProps): JSX.Element {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

  const goBack = () => {
    router.back();
  };

  const onSubmit = (values: IFormData) => {
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
      })
      .catch(err => {
        handleError(true, err.response.data.error.message);
      })
      .finally(() => {
        setTimeout(() => {
          setLoading(false);
        }, 500);
      });
  };

  return (
    <Formik
      validateOnMount
      onSubmit={(values, formik) => {
        formik.setTouched({});
        onSubmit(values);
      }}
      initialValues={initialValues}
    >
      {formik => {
        console.log(formik);
        return (
          <Form autoComplete="off">
            <LayoutForm
              form={
                <>
                  <CustomTextField
                    fullWidth
                    id="password"
                    name="password"
                    type="password"
                    label="Contraseña"
                    value={formik.values.password}
                    error={formik.touched.password && Boolean(formik.errors.password)}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    helperText={formik.errors.password}
                    inputProps={{
                      maxLength: 16
                    }}
                  />
                  <CredentialData
                    handleNotifications={handleNotifications}
                    updatePassword
                    {...formik}
                  />
                </>
              }
              buttonLeft={
                <Button fullWidth variant="outlined" onClick={goBack}>
                  Volver
                </Button>
              }
              buttonRight={
                <Button
                  fullWidth
                  type="submit"
                  color="primary"
                  variant="contained"
                  // TODO verificar
                  // disabled={!_.isEmpty(formik.errors) || loading}
                >
                  Continuar
                </Button>
              }
            />
          </Form>
        );
      }}
    </Formik>
  );
}

export default withAppContext(UpdatePassword);
