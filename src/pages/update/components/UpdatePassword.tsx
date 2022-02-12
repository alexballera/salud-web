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
import { TCredentialDataProps, TFormData, TProps } from '../../../containers/SignUp/index.types';
/// TYPES END

/// OWN COMPONENTS
import LayoutForm from '../../../layouts/LayoutForm';
import CredentialData from '../../../containers/SignUp/components/CredentialData';
import CustomTextField from '../../../components/common/TextField';
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
const initialValues: TFormData = {
  email: '',
  terms: false,
  gender: '',
  country: 'CR',
  firstLevel: '',
  secondLevel: '',
  thirdLevel: '',
  password: '',
  fullName: '',
  pronoun: '',
  services: false,
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
}: TCredentialDataProps & InferGetStaticPropsType<typeof getStaticProps> & TProps): JSX.Element {
  const { t } = useTranslation(NAMESPACE_KEY);
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

  const goBack = () => {
    router.back();
  };

  const onSubmit = (values: TFormData) => {
    setLoading(true);
    // TODO: this function will be changed for appwrite
    signUp(values as any)
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
                <>
                  <CustomTextField
                    fullWidth
                    id="password"
                    name="password"
                    type="password"
                    label={t('label.password.password')}
                    value={formik.values.password}
                    error={formik.touched.password && Boolean(formik.errors.password)}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    helperText={formik.errors.password}
                    inputProps={{
                      maxLength: 16
                    }}
                  />
                  <CredentialData updatePassword {...formik} />
                </>
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

export default withAppContext(UpdatePassword);
