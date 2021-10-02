import React, { useState } from 'react';
import axios from 'axios';
import { Form, Formik } from 'formik';

/// CONTEXT
import { withAppContext } from '../../../context';

/// SERVICES
import { ISignUpBody, signUp } from '../../../services/auth.service';

/// TYPES
import { GetStaticProps, InferGetStaticPropsType } from 'next';

/// OWN COMPONENTS
import ExtraData from '../../SignUp/components/ExtraData';
/// OWN COMPONENTS END

/// MATERIAL - UI
import { Button, Box, Grid } from '@material-ui/core';
/// MATERIAL - UI END

/// STYLES & PROPS
import { IFormData, IProps } from '../../SignUp/index.types';
import ProfileStyles from '../styles.module';

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
function UpdatePersonalData({
  handleLogin,
  handleError,
  onClickLink
}: InferGetStaticPropsType<typeof getStaticProps> & IProps): JSX.Element {
  const classes = ProfileStyles();
  const [loading, setLoading] = useState<boolean>(false);

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
            <ExtraData updatePersonalData {...formik} />
            <Box p={3} className={classes.containerButton}>
              <Grid container spacing={1} justify="flex-end">
                <Grid item xs={4}>
                  <Button fullWidth onClick={onClickLink} variant="outlined">
                    Volver
                  </Button>
                </Grid>
                <Grid item xs={4}>
                  <Button
                    fullWidth
                    type="submit"
                    color="primary"
                    variant="contained"
                    disabled={loading}
                    // TODO verificar
                    // disabled={!_.isEmpty(formik.errors) || loading}
                  >
                    Guardar
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

export default withAppContext(UpdatePersonalData);
