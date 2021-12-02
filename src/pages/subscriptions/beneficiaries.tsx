import React from 'react';
import { useRouter } from 'next/router';
// import { Form } from 'formik';

/// i18n
import { useTranslation } from 'react-i18next';
import { NAMESPACE_KEY } from '../../i18n/forms/i18n';
/// i18n END

/// CONTEXT
import { withAppContext } from '../../context';
/// CONTEXT END

/// MATERIAL - UI
import { Button, FormControl, FormControlLabel, Radio, RadioGroup } from '@material-ui/core';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
/// MATERIAL - UI END

/// SERVICES
/// SERVICES END

/// OWN COMPONENTS
import LayoutBasic from '../../layouts/LayoutBasic';
import LayoutForm from '../../layouts/LayoutForm';
import UpdateHeader from '../update/components/UpdateHeader';
import theme from '../../styles/js/theme';
import LayoutLoggedIn from '../../layouts/LayoutLoggedIn';

/// OWN COMPONENTS END

/// STYLES & TYPES
/// STYLES & TYPES END

/// FORM STATES & VALIDATIONS
/// FORM STATES & VALIDATIONS END

export const useStyle = createMuiTheme({
  overrides: {
    MuiFormControlLabel: {
      root: {
        justifyContent: 'space-between',
        marginLeft: '0px !important'
      }
    },
    MuiRadio: {
      colorSecondary: {
        color: theme.palette.secondary.main,
        '&.Mui-checked': {
          color: theme.palette.secondary.main
        }
      }
    }
  }
});

const LanguageForm = () => {
  const { t } = useTranslation(NAMESPACE_KEY, { keyPrefix: 'forms' });
  const data = [
    {
      value: 'dispositivo',
      label: `${t('label_language_device')}`
    },
    {
      value: 'ingles',
      label: `${t('label_language_english')}`
    },
    {
      value: 'frances',
      label: `${t('label_language_french')}`
    },
    {
      value: 'mandarin',
      label: `${t('label_language_mandarin')}`
    }
  ];
  return (
    <FormControl component="fieldset">
      <RadioGroup aria-label="gender" defaultValue={data[0].value} name="radio-buttons-group">
        {data.map(item => (
          <ThemeProvider theme={useStyle} key={item.value}>
            <FormControlLabel
              value={item.value}
              labelPlacement="start"
              control={<Radio color="secondary" />}
              label={item.label}
              className="border-bottom-desktop"
            />
          </ThemeProvider>
        ))}
      </RadioGroup>
    </FormControl>
  );
};

const Beneficiaries = (): JSX.Element => {
  const { t } = useTranslation(NAMESPACE_KEY, { keyPrefix: 'forms' });
  const router = useRouter();

  const goBack = () => {
    router.back();
  };

  return (
    <LayoutLoggedIn>
      <LayoutBasic
        header={
          <UpdateHeader
            title={t('beneficiaries_title')}
            description={t('beneficiaries_description')}
          />
        }
        form={
          <LayoutForm
            form={<LanguageForm />}
            buttonLeft={
              <Button fullWidth variant="outlined" onClick={goBack}>
                {t('button_back')}
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
                {t('button_continue')}
              </Button>
            }
          />
        }
      />
    </LayoutLoggedIn>
  );
};

export default withAppContext(Beneficiaries);
