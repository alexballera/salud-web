export const esForms = {
  message: {
    email: {
      required: 'Debes especificar un email.',
      not_found: 'Correo electrónico no encontrado',
      not_received: '¿No recibiste el correo?',
      not_register: 'El correo indicado no está registrado, ¿desea registrarse?',
      is_register: 'Este correo ya fue registrado previamente'
    },
    error: {
      submit:
        'Ha ocurrido un error desconocido. Vuelve a intentarlo o contacta a un administrador.',
      field_incorrect: 'Campos incorrectos, corregir para continuar.'
    },
    password: {
      change_success: 'La contraseña se ha cambiado correctamente.'
    }
  },

  validations: {
    required: 'Campo requerido',
    date_invalid: 'Fecha inválida',
    min_3: 'Número de caracteres minimos 3',
    min_8: 'Número de caracteres minimos 8',
    min_9: 'Número de caracteres minimos 9',
    min_10_max_15: 'Caracteres mínimos para Residencia 10, máx 15',
    min_9_max_20: 'Número de caracteres mínimos para Pasaporte 9, máx 20',

    password: {
      required: 'Debes especificar una contraseña.',
      required_short: 'Contraseña requerida.',
      min_8: 'La contraseña debe ser de al menos 8 caracteres',
      max_16: 'La contraseña debe ser máximo de 16 caracteres',
      regex:
        'La contraseña debe contener al menos una letra mayúscula, una letra minúscula y un número',
      matched: 'La contraseña no coincide'
    },

    email: {
      required: 'Email requerido.',
      invalid: 'Email inválido.',
      incorrect: 'Formato de correo incorrecto.'
    },

    document: {
      invalid: 'Cédula inválida'
    }
  }
};
