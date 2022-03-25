import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Formik, FormikErrors, FormikProps } from 'formik';
import { useRouter } from 'next/router';
import * as yup from 'yup';

/// MATERIAL UI
import { Box, Button, Grid } from '@material-ui/core';
/// MATERIAL UI END

/// OWN COMPONENTS
import LayoutFormBasic from '../../layouts/LayoutFormBasic';
import { TitleContent } from '../../components/common/TitleContent';
/// OWN COMPONENTS END

/// i18n
import { useTranslation } from 'react-i18next';
import { NAMESPACE_KEY as i18nGlobal } from '../../i18n/globals/i18n';
import { NAMESPACE_KEY as i18nForms } from '../../i18n/forms/i18n';
/// i18n END

/// CONTEXT
import { withAppContext } from '../../context';
/// CONTEXT END

/// SERVICES
import api from '../../api/api';
/// SERVICES END

/// STYLES & TYPES
import recoverStyles from '../../styles/js/RecoverPageStyles.module';
import { setDataToSessionStorage } from '../../services/localStorage.service';
import TextField from '../../components/common/TextField';
import SecurityPasswordIndicator from '../../components/common/SecurityPasswordIndicator';
/// STYLES & TYPES END

/// TYPES
import { uiOnAlert } from '@/src/store/slice/ui.slice';
import { useDispatch } from 'react-redux';

type TRecoverData = {
  password: string;
  passwordConfirm: string;
};

type TProps = {
  handleLogin: (user: any) => void;
  handleLoading: (isLoading: boolean) => void;
  handleError: (open: boolean, message?: string) => void;
  fetching: boolean;
};

/// TYPES END
const initialValues: any = {
  password: '',
  passwordConfirm: ''
};

const PASS_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;

function ChangePassword({ handleLoading }: TProps): JSX.Element {
  const { t } = useTranslation([i18nGlobal, i18nForms]);
  const classes = recoverStyles();
  const router = useRouter();
  const [fetchHasError, setFetchHasError] = useState(false);
  const dispatch = useDispatch();

  const VALIDATIONS = {
    name: 'ChangePassword',
    schema: yup.object().shape({
      password: yup
        .string()
        .required(t('validations.required', { ns: i18nForms }))
        .matches(PASS_REGEX, t('validations.password.regex', { ns: i18nForms })),
      passwordConfirm: yup
        .string()
        .required(t('validations.required', { ns: i18nForms }))
        .matches(PASS_REGEX, t('validations.password.regex', { ns: i18nForms }))
        .test(
          'confirm_pass',
          t('validations.password.matched', { ns: i18nForms }),
          function (value = '') {
            const regex = PASS_REGEX;
            const password = this.parent?.password || '';
            if (!regex.test(value)) {
              return false;
            }
            return password === value;
          }
        )
    })
  };

  const getErrorMessage = (code: number): string => {
    const message = {
      401: actionsToError401(),
      default: t('message.error.general_fetch', { ns: i18nForms })
    };
    return message[code] || message['default'];
  };

  const actionsToError401 = () => {
    // TODO por verificar flujo con UX
    // router.push('/recover_password/forward_email');
    return t('responses.recover.error_401', { ns: i18nGlobal });
  };

  const getGlobalFormErrors = (values: TRecoverData, errors: FormikErrors<TRecoverData>) => {
    const { password, passwordConfirm } = values;
    if (!password.length && !passwordConfirm.length && Object.values(errors).length) {
      return 'message.error.fields_required';
    }
    if (
      (!password.length && passwordConfirm.length) ||
      (password.length && !passwordConfirm.length)
    ) {
      return 'message.error.fields_required';
    }
    if (password !== passwordConfirm) {
      return 'message.error.field_incorrect';
    }
    return null;
  };

  const handleGlobalFormErrors = (values: TRecoverData, errors: FormikErrors<TRecoverData>) => {
    const i18Key = getGlobalFormErrors(values, errors);
    if (i18Key) {
      dispatch(
        uiOnAlert({
          type: 'error',
          message: t(i18Key, { ns: i18nForms })
        })
      );
    }
  };

  const handleSubmit = ({ password, passwordConfirm }: TRecoverData) => {
    const { secret, userId } = router.query;
    api
      .restorePasswordConfirmation(userId as string, secret as string, password, passwordConfirm)
      .then(() => {
        setFetchHasError(false);
        setDataToSessionStorage('updated_password', 'updated');
        router.push('/login');
      })
      .catch(err => {
        setFetchHasError(true);
        dispatch(
          uiOnAlert({
            type: 'error',
            message: getErrorMessage(err.code)
          })
        );
      })
      .finally(() => handleLoading && handleLoading(false));
  };

  return (
    <LayoutFormBasic
      header={
        <>
          <TitleContent titleWithSubtitle title={t('title.new_password', { ns: i18nGlobal })} />
          <TitleContent paragraph title={t('description.new_password', { ns: i18nGlobal })} />
        </>
      }
      form={
        <Formik
          validateOnMount
          initialValues={initialValues}
          validationSchema={VALIDATIONS.schema}
          onSubmit={handleSubmit}
        >
          {({
            errors,
            handleChange,
            handleBlur,
            values,
            handleSubmit: formikSubmit,
            touched,
            submitCount,
            validateForm
          }: FormikProps<TRecoverData>) => {
            useEffect(() => {
              handleGlobalFormErrors(values, errors);
              validateForm();
            }, [submitCount]);

            useEffect(() => {
              if (fetchHasError === true) {
                setFetchHasError(false);
              }
            }, [values]);
            return (
              <form onSubmit={formikSubmit} noValidate={true} className={classes.containerForm}>
                <TextField
                  fullWidth
                  id="password"
                  data-testid="password-input"
                  name="password"
                  label={t('label.password.new')}
                  type="password"
                  onBlur={handleBlur}
                  value={values.password}
                  onChange={handleChange}
                  error={(errors.password && touched.password) || fetchHasError}
                  helperText={errors.password}
                  handleLblError
                  inputProps={{
                    maxLength: 16
                  }}
                />
                <SecurityPasswordIndicator value={values.password} />
                <TextField
                  fullWidth
                  id="passwordConfirm"
                  data-testid="password-confirm-input"
                  name="passwordConfirm"
                  label={t('label.password.confirm')}
                  type="password"
                  onBlur={handleBlur}
                  value={values.passwordConfirm}
                  onChange={handleChange}
                  error={(errors.passwordConfirm && touched.passwordConfirm) || fetchHasError}
                  helperText={errors.passwordConfirm}
                  handleLblError
                  inputProps={{
                    maxLength: 16
                  }}
                />
                <Box mt={5}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={5}>
                      <Box>
                        <Button
                          fullWidth
                          type="submit"
                          color="primary"
                          variant="contained"
                          size="large"
                        >
                          {t('button.save', { ns: i18nGlobal })}
                        </Button>
                      </Box>
                    </Grid>
                    <Grid item xs={12} md={5}>
                      <Box>
                        <Link href="/login" passHref>
                          <Button
                            fullWidth
                            type="button"
                            color="primary"
                            variant="outlined"
                            size="large"
                          >
                            {t('button.cancel', { ns: i18nGlobal })}
                          </Button>
                        </Link>
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
              </form>
            );
          }}
        </Formik>
      }
    />
  );
}

export default withAppContext(ChangePassword);
