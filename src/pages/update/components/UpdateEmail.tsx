import React, { useState } from 'react';
// import _ from 'lodash';
import axios from 'axios';
import { useRouter } from 'next/router';
import { Form, Formik } from 'formik';

/// CONTEXT
import { withAppContext } from '../../../context';

/// SERVICES
import { signUp } from '../../../services/auth.service';

/// i18n
import { useTranslation } from 'react-i18next';
import { NAMESPACE_KEY } from '../../../i18n/globals/i18n';
/// i18n END

/// TYPES
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { ICredentialDataProps, IFormData, IProps } from '../../../containers/SignUp/index.types';
/// TYPES END

/// OWN COMPONENTS
import LayoutForm from '../../../layouts/LayoutForm';
import CredentialData from '../../../containers/SignUp/components/CredentialData';
/// OWN COMPONENTS END

/// MATERIAL - UI
import { Button } from '@material-ui/core';
import { ISignUpBody } from '../../../types/auth.types';
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
function UpdateEmail({
  handleLogin,
  handleError,
  handleNotifications
}: ICredentialDataProps & InferGetStaticPropsType<typeof getStaticProps> & IProps): JSX.Element {
  const { t } = useTranslation(NAMESPACE_KEY);
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
        return (
          <Form autoComplete="off">
            <LayoutForm
              form={
                <CredentialData handleNotifications={handleNotifications} updateEmail {...formik} />
              }
              buttonLeft={
                <Button fullWidth variant="outlined" onClick={goBack}>
                  {t('button.back')}
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
                  {t('button.continue')}
                </Button>
              }
            />
          </Form>
        );
      }}
    </Formik>
  );
}

export default withAppContext(UpdateEmail);
