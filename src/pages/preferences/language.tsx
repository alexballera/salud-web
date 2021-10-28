import React from 'react';
import { useRouter } from 'next/router';
import { Form } from 'formik';

/// CONTEXT
import { withAppContext } from '../../context';
/// CONTEXT END

/// MATERIAL - UI
import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup
} from '@material-ui/core';
/// MATERIAL - UI END

/// SERVICES
/// SERVICES END

/// OWN COMPONENTS
import LayoutBasic from '../../layouts/LayoutBasic';
import LayoutForm from '../../layouts/LayoutForm';
import UpdateHeader from '../update/components/UpdateHeader';
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

const LanguageForm = () => (
  <FormControl component="fieldset">
    <RadioGroup aria-label="gender" defaultValue={data[0].value} name="radio-buttons-group">
      {data.map(item => (
        <FormControlLabel
          key={item.value}
          value={item.value}
          labelPlacement="start"
          control={<Radio />}
          label={item.label}
          className="border-bottom-desktop"
        />
      ))}
    </RadioGroup>
  </FormControl>
);

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
