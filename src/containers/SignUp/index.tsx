import React from 'react';
import { useFormik } from 'formik';
/// TYPES
import { IFormData } from './index.types';
/// OWN COMPONENTS
import ExtraDataForm from './components/ExtraData';
import PersonalDataForm from './components/PersonalData';
import CredentialDataForm from './components/CredentialData';
import Wizard, { IWizardDataSourceItem } from '../../components/common/Wizard';
/// OWN COMPONENTS END

/// STYLES
import '../../styles/Signup.module.scss';

const initialValues: IFormData = {
  email: 'prueba1010@hotmail.com',
  terms: false,
  gender: '2',
  canton: '118',
  country: 'CR',
  password: 'Pac1234567',
  province: '1',
  district: '11802',
  lastName: 'Prueba 1010',
  services: false,
  firstName: 'Prueba',
  birthDate: '1981-03-15T13:49:54+00:00',
  superappUser: false,
  documentType: 1,
  mobilePhone1: '232323232',
  documentNumber: '16111134',
  confirmPassword: 'Pac1234567'
};

function SignUpView(): JSX.Element {
  const formik = useFormik({
    initialValues,
    onSubmit: (values: IFormData) => {
      alert(JSON.stringify(values, null, 2));
    }
  });

  const dataSource: IWizardDataSourceItem[] = [
    {
      title: 'Registrese',
      description:
        'Estos datos se usarán unicamente con propósitos médicos dentro de la plataforma',
      component: <PersonalDataForm {...formik} />
    },
    {
      title: 'Datos adicionales',
      description:
        'Estos datos se usarán unicamente con propósitos médicos dentro de la plataforma',
      component: <ExtraDataForm {...formik} />
    },
    {
      title: 'Credenciales de ingreso',
      description:
        'Estos datos se usarán unicamente con propósitos médicos dentro de la plataforma',
      component: <CredentialDataForm {...formik} />
    }
  ];
  return (
    <section>
      <form action="" onSubmit={formik.handleSubmit}>
        <Wizard dataSource={dataSource} />
      </form>
    </section>
  );
}

export default SignUpView;
