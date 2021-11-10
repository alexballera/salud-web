import React from 'react';
import { useRouter } from 'next/router';
// import { Form } from 'formik';

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

/// OWN COMPONENTS END

/// STYLES & TYPES
/// STYLES & TYPES END

/// FORM STATES & VALIDATIONS
/// FORM STATES & VALIDATIONS END
const data = [
  {
    value: 'dispositivo',
    label: 'Idioma del dispositivo'
  },
  {
    value: 'ingles',
    label: 'Inglés'
  },
  {
    value: 'frances',
    label: 'Francés'
  },
  {
    value: 'mandarin',
    label: 'Mandarín'
  }
];

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

const UpdateLanguage = (): JSX.Element => {
  const router = useRouter();

  const goBack = () => {
    router.back();
  };

  return (
    <LayoutBasic
      header={
        <UpdateHeader
          title="Editar idioma"
          description="Seleccioná el idioma de tu preferencia para la plataforma"
        />
      }
      form={
        <LayoutForm
          form={<LanguageForm />}
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
      }
    />
  );
};

export default withAppContext(UpdateLanguage);
