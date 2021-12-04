export const esForms = {
  personal_data_title: 'Identifícate',
  personal_data_description: 'Para empezar tu registro bríndanos tu número de identificación',

  extra_data_title: 'Datos adicionales',
  extra_data_description:
    'Estos datos se usarán únicamente con propósitos médicos dentro de la plataforma',

  credential_data_title: 'Credenciales de ingreso',
  credential_data_description:
    'Estos datos se usarán únicamente con propósitos médicos dentro de la plataforma',

  credential_profile_title: 'Credenciales y contacto',

  logout_title: 'Cerrar sesión',
  logout_description: '¿Estás seguro que querés cerrar tu sesión en plataforma?',

  code_title: 'Cuenta creada exitosamente',
  code_description:
    'Felicidades {{name}}, has creado tu cuenta correctamente, se envió un mensaje a tu correo electrónico para que actives tu cuenta.',

  beneficiaries_title: 'Beneficiarios',
  beneficiaries_description: 'La o las personas que querés que disfruten los beneficios de tu plan',

  preferences_title: 'Preferencias',
  preferences_description: 'La o las personas que querés que disfruten los beneficios de tu plan',

  publicity_title: 'Publicidad',
  reminder_title: 'Recordatorios',
  profile_title: 'Perfil',
  legal_title: 'Legal',
  personal_title: 'Datos personales',

  code_label: 'Código de validación',
  code_success: 'Usuario activado correctamente',
  code_invalid: 'Código inválido',
  code_dont_recive: '¿No recibiste el código?',
  code_resend_email: 'Reenviar correo',
  code_resend_label: 'Podés volver a intentar en',

  message: {
    email: {
      required: 'Debes especificar un email.',
      not_found: 'Correo electrónico no encontrado',
      not_register: 'El correo indicado no está registrado, ¿desea registrarse?',
      is_register: 'Este correo ya fue registrado previamente'
    },
    error: {
      submit:
        'Ha ocurrido un error desconocido. Vuelve a intentarlo o contacta a un administrador.',
      unknown:
        'Ha ocurrido un error desconocido. Vuelve a intentarlo o contacta a un administrador.'
    },
    password: {
      change_success: 'La contraseña se ha cambiado correctamente.'
    },
    field_incorrect: 'Campos incorrectos, corregir para continuar.'
  },

  validations: {
    required: 'Campo requerido',
    date_invalid: 'Fecha inválida',
    min_3: 'Número de caracteres minimos 3',
    min_8: 'Número de caracteres minimos 8',
    min_9: 'Número de caracteres minimos 9',
    min_10_max_15: 'Caracteres mínimos para Residencia 10, máx 15',
    min_10_max_20: 'Número de caracteres mínimos para Pasaporte 9, máx 20',

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
    }
  }
};
