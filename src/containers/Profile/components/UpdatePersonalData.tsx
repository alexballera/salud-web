import React, { useState } from 'react';
import axios from 'axios';
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

/// OWN COMPONENTS
import ExtraData from '../../SignUp/components/ExtraData';
/// OWN COMPONENTS END

/// MATERIAL - UI
import { Button, Box, Grid } from '@material-ui/core';
/// MATERIAL - UI END

/// STYLES & PROPS
import { TFormData, TProps } from '../../SignUp/index.types';
import ProfileStyles from '../styles.module';
import { ISignUpBody } from '../../../types/auth.types';

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
  firstLevel: '',
  country: 'CR',
  password: '',
  secondLevel: '',
  thirdLevel: '',
  services: false,
  fullName: '',
  birthDate: '',
  superappUser: false,
  documentType: '',
  mobilePhone1: '',
  documentNumber: '',
  pronoun: '',
  confirmPassword: ''
};

/// FORM STATES & VALIDATIONS END
function UpdatePersonalData({
  handleLogin,
  handleError,
  onClickLink
}: InferGetStaticPropsType<typeof getStaticProps> & TProps): JSX.Element {
  const { t } = useTranslation(NAMESPACE_KEY);
  const classes = ProfileStyles();
  const [loading, setLoading] = useState<boolean>(false);

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
            <ExtraData updatePersonalData {...formik} />
            <Box p={3} className={classes.containerButton}>
              <Grid container spacing={1} justify="flex-end">
                <Grid item xs={4}>
                  <Button fullWidth onClick={onClickLink} variant="outlined">
                    {t('button.back')}
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
                    {t('button.save')}
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
