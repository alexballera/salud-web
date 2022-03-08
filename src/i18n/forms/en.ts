export const enForms = {
  message: {
    email: {
      required: 'Debes especificar un email.',
      not_found: 'No user has been found that matches the email provided',
      email_not_found: 'Email not found',
      not_received: '¿No recibiste el correo?',
      not_register: 'El correo indicado no está registrado, ¿desea registrarse?',
      is_register: 'Este correo ya fue registrado previamente',
      too_many_request: 'You have exceeded the limit, please try again later'
    },
    error: {
      fields_required: 'Mandatory fields, you must fill them in to continue',
      general_fetch:
        'An unknown error has occurred. Please try again later or contact an administrator.',
      submit: 'An unknown error has occurred. Please try again later or contact an administrator.',
      field_incorrect: 'Incorrect fields, you must correct them to continue'
    },
    success: {
      generated_user: 'Successfully generated user. Welcome to Ospi!'
    },
    password: {
      change_success: 'La contraseña se ha cambiado correctamente.',
      updated: 'Updated password'
    }
  },

  validations: {
    required: 'Campo requerido',
    date_invalid: 'Fecha inválida',
    max_18_age: 'Para afiliarse a Ospi debe de ser mayor de edad',
    min_3: 'Número de caracteres minimos 3',
    min_8: 'Número de caracteres minimos 8',
    min_9: 'Número de caracteres minimos 9',
    min_10_max_15: 'Caracteres mínimos para Residencia 10, máx 15',
    min_9_max_20: 'Número de caracteres mínimos para Pasaporte 9, máx 20',
    terms: 'You must accept the Terms and Conditions to continue',
    services: 'You must accept the Informed Consent to continue',
    userExists: 'Ya existe un paciente con ese número de identidad registrado en Ospi',
    userNotFound: 'User not found',

    password: {
      required: 'Password required',
      required_short: 'Contraseña requerida',
      min_8: 'La contraseña debe ser de al menos 8 caracteres',
      max_16: 'La contraseña debe ser máximo de 16 caracteres',
      regex:
        'La contraseña debe contener al menos una letra mayúscula, una letra minúscula y un número',
      matched: 'Passwords do not match',
      capitalize: 'Use lowercase',
      lowercase: 'Usar minúsculas',
      numbers: 'Use numbers',
      characters: 'Be between 8 and 16 characters'
    },

    document: {
      invalid: 'Wrong identification number',
      invalid_pop_up: 'Incorrect fields, you must correct them to continue',
      crc_physical_document_number: 'Identification number does not correspond to 9 digits',
      crc_residence_document_number: 'Identification number does not apply 10 to 15 characters',
      crc_passport_document_number: 'Identification number does not apply from 3 to 20 characters',
      mx_elector_document_number: 'Identification number does not apply from 10 to 18 characters',
      mx_unique_document_number: 'Identification number does not apply from 10 to 18 characters',
      mx_passport_document_number: 'ID number does not apply 8 to 10 characters'
    },

    email: {
      required: 'Email required',
      invalid: 'Invalid email',
      incorrect: 'Invalid email format'
    },

    phone: {
      invalid: 'Incorrect phone number format'
    }
  }
};
