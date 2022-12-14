/// BASE IMPORTS
import { useState, useEffect, useContext } from 'react';
import { addYears } from 'date-fns';
import { useRouter } from 'next/router';
import _ from 'lodash';
import * as yup from 'yup';
/// BASE IMPORTS END

/// FORM
import { Formik, FormikErrors, FormikProps } from 'formik';
/// FORM END

/// CONTEXT
import { withAppContext } from '../../context/index';
/// CONTEXT END

/// TYPES
import type {
  // TProps,
  TFormData,
  TCountryDocumentTypeItem
} from '../../containers/SignUp/index.types';
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

/// SERVICES
import countriesPhoneNumbers from '../../services/countriesPhoneNumbers.service';
import api, { TPatient } from '../../api/api';
/// SERVICES END

/// CONTEXT
import { UserContext } from '@/src/context/UserContext';
/// CONTEXT END

/// i18n
import { useTranslation } from 'react-i18next';
import { NAMESPACE_KEY as i18Global, i18n } from '../../i18n/globals/i18n';
import { NAMESPACE_KEY as i18Forms } from '../../i18n/forms/i18n';
/// i18n END

import { uiOnAlert, uiClean } from '@/src/store/slice/ui.slice';
import { userSet } from '@/src/store/slice/user.slice';
import { useDispatch } from 'react-redux';
import { useCreateAccountMutation } from '@/src/services/apiBFF';

type TSteper = {
  [key: number]: {
    Component: (formik: FormikProps<TFormData>) => JSX.Element;
    title: string;
    description: string;
    yupSchema: any;
  };
};

const PASS_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
const INIT_FORM_STATE: TFormData = {
  country: '',
  documentType: '',
  documentNumber: '',
  fullName: '',
  birthDate: '',
  gender: '',
  firstLevel: '',
  secondLevel: '',
  thirdLevel: '',
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
      lineHeight: '32px',
      textTransform: 'uppercase'
    },
    button: {
      paddingLeft: 49,
      paddingRight: 49
    }
  })
);

function SignUpView(): JSX.Element {
  const classes = useStyles();
  const router = useRouter();
  const { t } = useTranslation(i18Global);
  const { initializeGuestSession } = useContext(UserContext);
  const [customPopUpError, setCustomPopUpError] = useState<null | string>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [customSubmitCount, setCustomSubmitCount] = useState(0);
  const [currDocTypeArgs, setCurrDocTypeArgs] = useState<TCountryDocumentTypeItem | null>(null);
  const dispatch = useDispatch();
  const [createAccount] = useCreateAccountMutation();

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
      gender: yup.string().required(t('validations.required', { ns: i18Forms })),
      pronoun: yup.string().required(t('validations.required', { ns: i18Forms })),
      firstLevel: yup.string().required(t('validations.required', { ns: i18Forms })),
      secondLevel: yup.string().required(t('validations.required', { ns: i18Forms })),
      thirdLevel: yup.string().required(t('validations.required', { ns: i18Forms })),
      mobilePhone1: yup
        .string()
        .required(t('validations.required', { ns: i18Forms }))
        .test('custom-mp1', t('validations.phone.invalid', { ns: i18Forms }), (value = '') => {
          const splitValue = value.replace(/[+]/g, '').split(' ');
          const [countryCode, ...rest] = splitValue;

          if (!countryCode) return false;

          const { validation } = _.find(countriesPhoneNumbers, { countryCode });
          if (!validation) return false;

          return validation.test(rest.join(''));
        })
    })
  };

  const yupCredentialData = {
    name: 'CredentialStep',
    schema: yup.object().shape({
      terms: yup
        .bool()
        .required(t('validations.required', { ns: i18Forms }).concat(' ')) // Adding the empty space to avoid required message
        .oneOf([true], t('validations.required', { ns: i18Forms }).concat(' ')),
      services: yup
        .bool()
        .required(t('validations.required', { ns: i18Forms }).concat(' '))
        .oneOf([true], t('validations.required', { ns: i18Forms }).concat(' ')),
      email: yup
        .string()
        .email(t('validations.email.incorrect', { ns: i18Forms }))
        .required(t('validations.required', { ns: i18Forms })),
      password: yup
        .string()
        .required(t('validations.required', { ns: i18Forms }))
        .matches(
          /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/,
          t('validations.password.regex', { ns: i18Forms })
        ),
      confirmPassword: yup
        .string()
        .required(t('validations.required', { ns: i18Forms }))
        .matches(PASS_REGEX, t('validations.password.regex', { ns: i18Forms }))
        .test(
          'confirm_pass',
          t('validations.password.matched', { ns: i18Forms }),
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
            setCustomPopUpError={setCustomPopUpError}
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
        return <ExtraDataForm {...formik} currDocTypeArgs={currDocTypeArgs} />;
      }
    },
    2: {
      yupSchema: yupCredentialData,
      title: 'title.credential_data',
      description: 'description.credential_data',
      Component: function FormStep(formik: FormikProps<TFormData>) {
        return <CredentialDataForm {...formik} setCustomPopUpError={setCustomPopUpError} />;
      }
    }
  };

  const StepForm = MAP_STEPS[currentStep];

  const mapAndGetFormErrors = (errors: FormikErrors<TFormData>) => {
    const flatErrors = Object.values(errors);
    if (customPopUpError) {
      return customPopUpError;
    }
    if (flatErrors.includes(t('validations.required', { ns: i18Forms }))) {
      return t('message.error.fields_required', { ns: i18Forms });
    }
    if (flatErrors.length) {
      return t('message.error.field_incorrect', { ns: i18Forms });
    }
  };

  const handleGlobalFormErrors = (errors: FormikErrors<TFormData>) => {
    const formError = mapAndGetFormErrors(errors);
    if (formError) {
      dispatch(
        uiOnAlert({
          type: 'error',
          message: formError
        })
      );
    }
  };

  const setPatient = (values: TFormData): TPatient => {
    return {
      email: values.email.toString(),
      password: values.password.toString(),
      fullName: values.fullName.toString(),
      pronoun: values.pronoun.toString(),
      biologicalSex: values.gender.toString(),
      documentType: values.documentType.toString(),
      documentNumber: values.documentNumber,
      birthDate: values.birthDate,
      phoneNumbers: [values.mobilePhone1],
      province: values.firstLevel.toString(),
      canton: values.secondLevel.toString(),
      district: values.thirdLevel.toString(),
      // userId: appWriteUserId,
      country: values.country
    };
  };

  const storeUser = async (values: any) => {
    const { email, password } = values;
    try {
      // const user = await api.createAccount('unique()', email, password, fullName);

      const user = await createAccount(setPatient(values)).unwrap();
      dispatch(userSet({ idUser: user.userId }));

      const session = await api.createSession(email, password);

      // await api.createPatient(setPatient(values, user.$id));

      await api.emailVerification();

      initializeGuestSession(session);

      router.push('/signup/email_verification');
    } catch (e) {
      console.log('error', e);
      dispatch(
        uiOnAlert({
          type: 'error',
          message: mapFetchErrors(e.code)
        })
      );
    }
  };

  const mapFetchErrors = (code: -1) => {
    const i18nKey = `responses.signup.error_${code}`;
    if (i18n.exists(i18nKey, { ns: i18Global })) {
      return t(i18nKey, { ns: i18Global });
    }
    return t('message.error.general_fetch', { ns: i18Forms });
  };

  const handleNext = (values: TFormData) => {
    dispatch(uiClean());
    console.log('activar Next');
    setCustomPopUpError(null);
    if (MAP_STEPS[currentStep + 1]) {
      setCurrentStep(currentStep + 1);
      window.scrollTo(0, 0);
      return;
    }
    storeUser(values);
  };

  const handlePrev = () => {
    if (MAP_STEPS[currentStep - 1]) {
      dispatch(uiClean());
      console.log('activar Next');
      setCustomPopUpError(null);
      setCurrentStep(currentStep - 1);
      window.scrollTo(0, 0);
      return;
    }
    router.back();
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
            initialValues={INIT_FORM_STATE}
            validationSchema={StepForm.yupSchema.schema}
            onSubmit={(values, formik) => {
              formik.setTouched({});
              formik.setErrors({});
              handleNext(values);
            }}
          >
            {(formik: FormikProps<TFormData>) => {
              useEffect(() => {
                handleGlobalFormErrors(formik.errors);
              }, [customSubmitCount]);

              return (
                <form
                  noValidate={true}
                  onSubmit={e => {
                    formik.handleSubmit(e);
                    setTimeout(() => {
                      setCustomSubmitCount(prevState => prevState + 1);
                    }, 100);
                  }}
                >
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
                        className={classes.button}
                        onClick={handlePrev}
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
