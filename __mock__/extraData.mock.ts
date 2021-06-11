export const mockProvincesResult = {
  primerNivel: [{ codigo: 'provincia', nombre: 'provincia' }]
};

export const mockCantonesResult = {
  segundoNivel: [{ codigo: 'canton', nombre: 'canton' }]
};

export const mockDistrictResult = {
  catalogo: [{ codigo: 'distrito', nombre: 'distrito' }]
};

export const wrapperOptions = {
  formikProps: {
    initialValues: {
      gender: '',
      canton: '',
      province: '',
      district: '',
      mobilePhone1: ''
    }
  },
  componentProps: {}
};
