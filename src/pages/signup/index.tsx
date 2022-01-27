/// BASE IMPORTS
import { useState, useEffect } from 'react';
import { addYears } from 'date-fns';
import * as yup from 'yup';
/// BASE IMPORTS END

/// FORM
import { Formik, FormikErrors, FormikProps } from 'formik';
/// FORM END

/// CONTEXT
import { withAppContext } from '../../context/index';
/// CONTEXT END

/// TYPES
import { TProps, TFormData } from '../../containers/SignUp/index.types';
/// TYPES END

/// OWN COMPONENTS
import { TitleContent } from '../../components/common/TitleContent';
import ExtraDataForm from '../../containers/SignUp/components/ExtraData';
import PersonalDataForm from '../../containers/SignUp/components/PersonalData';
import CredentialDataForm from '../../containers/SignUp/components/CredentialData';
/// OWN COMPONENTS END

/// MATERIAL - UI
import { Box, Button } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
/// MATERIAL - UI END

/// STYLES
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';
/// STYLES END

/// LAYOUT
import Layout from '../../layouts/LayoutFormBasic';
/// LAYOUT END

/// i18n
import { useTranslation } from 'react-i18next';
import { NAMESPACE_KEY as i18Global } from '../../i18n/globals/i18n';
import { NAMESPACE_KEY as i18Forms } from '../../i18n/forms/i18n';
/// i18n END

type TSteper = {
  [key: number]: {
    Component: (formik: FormikProps<TFormData>) => JSX.Element;
    title: string;
    description: string;
    yupSchema: any;
  };
};

const INIT_FORM_STATE: TFormData = {
  country: '',
  documentType: '',
  documentNumber: '',
  fullName: '',
  birthDate: '',
  gender: '',
  canton: '',
  district: '',
  province: '',
  mobilePhone1: '',
  pronoun: '',
  email: '',
  password: '',
  confirmPassword: '',
  services: false,
  superappUser: false,
  terms: false
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formContainer: {
      width: '100%',
      padding: 24,
      paddingTop: 0,
      [theme.breakpoints.up('md')]: {
        padding: 0,
        width: 461
      }
    },
    stepIndicator: {
      color: 'rgba(0, 0, 0, 0.87)',
      fontSize: 12,
      letterSpacing: 1,
      marginBottom: 8,
      textTransform: 'uppercase'
    },
    button: {
      paddingLeft: 49,
      paddingRight: 49
    }
  })
);

function SignUpView(props: TProps): JSX.Element {
  const classes = useStyles();
  const { handleNotifications } = props;
  const { t } = useTranslation(i18Global);
  const [data, setData] = useState(INIT_FORM_STATE);
  const [currentStep, setCurrentStep] = useState(0);
  const [currDocTypeArgs, setCurrDocTypeArgs] = useState<any>(null);

  const yupPersonalData = {
    name: 'PersonalData',
    schema: yup.object().shape({
      country: yup.string().required(`${t('validations.required', { ns: i18Forms })}`),
      documentType: yup.number().required(`${t('validations.required', { ns: i18Forms })}`),
      documentNumber: yup
        .string()
        .transform(value => value.replaceAll(' ', ''))
        .required(`${t('validations.required', { ns: i18Forms })}`)
        .matches(
          currDocTypeArgs?.validation || /^\s*$/,
          t(`validations.document.${currDocTypeArgs?.i18n || ''}`, { ns: i18Forms })
        ),
      fullName: yup
        .string()
        .required(`${t('validations.required', { ns: i18Forms })}`)
        .min(3, `${t('validations.min_3', { ns: i18Forms })}`),
      birthDate: yup
        .date()
        .required(`${t('validations.required', { ns: i18Forms })}`)
        .max(addYears(new Date(), -18), `${t('validations.max_18_age', { ns: i18Forms })}`)
    })
  };

  const yupExtraData = {
    name: 'ExtraData',
    schema: yup.object().shape({
      gender: yup.string().required(`${t('validations.required', { ns: i18Forms })}`),
      canton: yup
        .object()
        .shape({
          codigo: yup.string().required(`${t('validations.required', { ns: i18Forms })}`),
          nombre: yup.string().required(`${t('validations.required', { ns: i18Forms })}`)
        })
        .nullable()
        .required(`${t('validations.required', { ns: i18Forms })}`),
      district: yup
        .object()
        .shape({
          codigo: yup.string().required(`${t('validations.required', { ns: i18Forms })}`),
          nombre: yup.string().required(`${t('validations.required', { ns: i18Forms })}`)
        })
        .nullable()
        .required(`${t('validations.required', { ns: i18Forms })}`),
      province: yup
        .object()
        .shape({
          codigo: yup.string().required(`${t('validations.required', { ns: i18Forms })}`),
          nombre: yup.string().required(`${t('validations.required', { ns: i18Forms })}`)
        })
        .nullable()
        .required(`${t('validations.required', { ns: i18Forms })}`),
      mobilePhone1: yup
        .string()
        .required(`${t('validations.required', { ns: i18Forms })}`)
        .transform(value => value.replace(/[^\d]/g, ''))
        .min(8, `${t('validations.min_8', { ns: i18Forms })}`)
    })
  };

  const yupCredentialData = {
    name: 'CredentialStep',
    schema: yup.object().shape({
      terms: yup
        .bool()
        .oneOf([true], `${t('validations.required', { ns: i18Forms })}`)
        .required(`${t('validations.required', { ns: i18Forms })}`),
      services: yup
        .bool()
        .oneOf([true], `${t('validations.required', { ns: i18Forms })}`)
        .required(`${t('validations.required', { ns: i18Forms })}`),
      email: yup
        .string()
        .email(`${t('validations.email.incorrect', { ns: i18Forms })}`)
        .required(`${t('validations.email.required', { ns: i18Forms })}`),
      password: yup
        .string()
        .required(`${t('validations.password.required_short', { ns: i18Forms })}`)
        .min(8, `${t('validations.password.min_8', { ns: i18Forms })}`)
        .max(16, `${t('validations.password.max_16', { ns: i18Forms })}`)
        .matches(
          /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/,
          `${t('validations.password.regex', { ns: i18Forms })}`
        ),
      confirmPassword: yup
        .string()
        .oneOf(
          [yup.ref('password'), null],
          `${t('validations.password.matched', { ns: i18Forms })}`
        )
        .required(`${t('validations.required', { ns: i18Forms })}`)
        .min(8, `${t('validations.password.min_8', { ns: i18Forms })}`)
        .max(16, `${t('validations.password.max_16', { ns: i18Forms })}`)
    })
  };

  const MAP_STEPS: TSteper = {
    0: {
      title: 'title.identify',
      description: 'description.identify',
      yupSchema: yupPersonalData,
      Component: function FormStep(formik: FormikProps<TFormData>) {
        return (
          <PersonalDataForm
            setCurrDocTypeArgs={setCurrDocTypeArgs}
            currDocTypeArgs={currDocTypeArgs}
            handleNotifications={handleNotifications}
            documentTypesOptions={[]}
            {...formik}
          />
        );
      }
    },
    1: {
      yupSchema: yupExtraData,
      title: 'title.extra_data',
      description: 'description.extra_data',
      Component: function FormStep(formik: FormikProps<TFormData>) {
        return <ExtraDataForm {...formik} />;
      }
    },
    2: {
      yupSchema: yupCredentialData,
      title: 'title.credential_data',
      description: 'description.credential_data',
      Component: function FormStep(formik: FormikProps<TFormData>) {
        return <CredentialDataForm handleNotifications={handleNotifications} {...formik} />;
      }
    }
  };

  const StepForm = MAP_STEPS[currentStep];

  const handleGlobalFormErrors = (errors: FormikErrors<any>) => {
    const flatErrors = Object.values(errors);
    if (flatErrors.includes(t('validations.required', { ns: i18Forms }))) {
      handleNotifications({
        open: true,
        severity: 'error',
        message: t('message.error.fields_required', { ns: i18Forms })
      });
      return;
    }
    if (flatErrors.length) {
      handleNotifications({
        open: true,
        severity: 'error',
        message: t('message.error.field_incorrect', { ns: i18Forms })
      });
    }
  };

  const storeUser = () => {
    console.log('storeee');
  };

  const handleNext = () => {
    if (MAP_STEPS[currentStep + 1]) {
      setCurrentStep(currentStep + 1);
      return;
    }
    storeUser();
  };

  const handlePrev = () => {
    if (MAP_STEPS[currentStep - 1]) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <Layout
      header={
        StepForm && (
          <>
            <Typography className={classes.stepIndicator} variant="h5" component="h5">
              {t('description.steps_header', {
                step: currentStep + 1,
                totalSteps: Object.keys(MAP_STEPS).length
              })}
            </Typography>
            <TitleContent titleWithSubtitle title={t(StepForm.title, { ns: i18Global })} />
            <TitleContent paragraph title={t(StepForm.description, { ns: i18Global })} />
          </>
        )
      }
      form={
        StepForm && (
          <Formik
            initialValues={data}
            validationSchema={StepForm.yupSchema.schema}
            onSubmit={handleNext}
          >
            {(formik: FormikProps<TFormData>) => {
              useEffect(() => {
                formik.validateForm();
                handleGlobalFormErrors(formik.errors);
              }, [formik.submitCount]);

              return (
                <form onSubmit={formik.handleSubmit} noValidate={true}>
                  {StepForm.Component(formik)}
                  <Box
                    display={{ xs: 'block', md: 'flex' }}
                    mt={5}
                    alignItems="center"
                    flexDirection="row-reverse"
                    justifyContent="flex-end"
                  >
                    <Box>
                      <Button
                        fullWidth
                        variant="contained"
                        type="submit"
                        color="primary"
                        data-testid="login-button"
                        className={classes.button}
                      >
                        {t('button.continue')}
                      </Button>
                    </Box>
                    <Box mt={{ xs: 2, md: 0 }} mr={{ md: 2 }}>
                      <Button
                        fullWidth
                        type="button"
                        variant="outlined"
                        data-testid="login-button"
                        onClick={handlePrev}
                        className={classes.button}
                      >
                        {t('button.back')}
                      </Button>
                    </Box>
                  </Box>
                </form>
              );
            }}
          </Formik>
        )
      }
    />
  );
}

export default withAppContext(SignUpView);
