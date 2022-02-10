export const esForms = {
  message: {
    email: {
      required: 'Debes especificar un email.',
      not_found: 'No se ha encontrado ningún usuario que coincida con el correo brindado',
      email_not_found: 'Correo electrónico no encontrado',
      not_received: '¿No recibiste el correo?',
      not_register: 'El correo indicado no está registrado, ¿desea registrarse?',
      is_register: 'Este correo ya fue registrado previamente',
      too_many_request: 'Has superado el límite, por favor inténtalo más tarde.'
    },
    error: {
      fields_required: 'Campos obligatorios, debés de rellenarlos para continuar',
      general_fetch:
        'Ha ocurrido un error desconocido. Vuelve a intentarlo más tarde o contacta a un administrador',
      submit:
        'Ha ocurrido un error desconocido. Vuelve a intentarlo más tarde o contacta a un administrador',
      field_incorrect: 'Campos incorrectos, debés corregirlos para continuar'
    },
    success: {
      generated_user: 'Usuario generado con éxito. ¡Bienvenido a Ospi!'
    },
    password: {
      change_success: 'La contraseña se ha cambiado correctamente.',
      updated: 'Contraseña actualizada'
    }
  },

  validations: {
    required: 'Campo requerido',
    date_invalid: 'Fecha inválida',
    max_18_age: 'Para afiliarse a Ospi debe de ser mayor de edad.',
    min_3: 'Número de caracteres minimos 3',
    min_8: 'Número de caracteres minimos 8',
    min_9: 'Número de caracteres minimos 9',
    min_10_max_15: 'Caracteres mínimos para Residencia 10, máx 15',
    min_9_max_20: 'Número de caracteres mínimos para Pasaporte 9, máx 20',

    password: {
      required: 'Contraseña requerida',
      required_short: 'Contraseña requerida',
      min_8: 'La contraseña debe ser de al menos 8 caracteres',
      max_16: 'La contraseña debe ser máximo de 16 caracteres',
      regex:
        'La contraseña debe contener al menos una letra mayúscula, una letra minúscula y un número',
      matched: 'Contraseñas no coinciden',
      capitalize: 'Usar mayúsculas',
      lowercase: 'Usar minúsculas',
      numbers: 'Usar números',
      characters: 'Tener entre 8 y 16 caracteres'
    },

    email: {
      required: 'Correo electrónico requerido',
      invalid: 'Email inválido',
      incorrect: 'Formato de correo inválido'
    },

    document: {
      invalid: 'Número de identificación incorrecto',
      invalid_pop_up: 'Campos incorrectos, debés corregirlos para continuar',
      crc_physical_document_number: 'Número de identificación no corresponde a 9 dígitos',
      crc_residence_document_number:
        'Número de identificación no corresponde de 10 a 15 caracteres',
      crc_passport_document_number: 'Número de identificación no corresponde de 3 a 20 caracteres',
      mx_elector_document_number: 'Número de identificación no corresponde de 10 a 18 caracteres',
      mx_unique_document_number: 'Número de identificación no corresponde de 10 a 18 caracteres',
      mx_passport_document_number: 'Número de identificación no corresponde de 8 a 10 caracteres'
    },

    code: {
      required: 'Codigo de verificación requerido',
      min: 'El pin debe tener 6 caracteres',
      number: 'El código de verificación debe contener números únicamente',
      incorrect: 'El código de verificación es incorrecto'
    },

    phone: {
      invalid: 'Formato incorrecto de número de teléfono'
    }
  }
};
