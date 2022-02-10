export const enGlobals = {
  title: {
    beneficiaries: 'Beneficiarios',
    credential_data: 'Credenciales de ingreso',
    credential_profile: 'Credenciales y contacto',
    extra_data: 'Datos adicionales',
    identify: 'Identifícate',
    legal: 'Legal',
    login_page: 'Login',
    login_title: 'Hola, ingresá a tu portal',
    logout: 'Cerrar sesión',
    personal_data: 'Datos personales',
    preferences: 'Preferencias',
    profile: 'Perfil',
    publicity: 'Publicidad',
    reminder: 'Recordatorios',
    edit_beneficiary_title: 'Editar beneficiario',
    recover: {
      forget: 'Recover your password'
    },
    forward_email: 'Check your email',
    new_password: 'New password',
    registered_patient: 'Patient already registered'
  },

  description: {
    beneficiaries: 'La o las personas que querés que disfruten los beneficios de tu plan',
    extra_data: 'Estos datos se usarán únicamente con propósitos médicos dentro de la plataforma',
    credential_data:
      'Estos datos se usarán únicamente con propósitos médicos dentro de la plataforma',
    identify: 'Para empezar tu registro bríndanos tu número de identificación',
    logout: '¿Estás seguro que querés cerrar tu sesión en plataforma?',
    login: 'Coloca tu correo electrónico y contraseña para acceder a tu portal.',
    preferences: 'La o las personas que querés que disfruten los beneficios de tu plan',
    edit_beneficiary: 'Información personal',
    steps_header: 'Paso {{step}} de {{totalSteps}}',
    recover: {
      forget: 'To recover your password we need to verify your identity.'
    },
    forward_email:
      'A link to change your password was sent to your email and will be active for 1 hour.',
    new_password: 'Enter your new password',
    registered_patient: 'There is already a patient with that identity number registered in Ospi.',
    registered_patient_2: 'We can send you more information to your email: {{email}}',
    email_verification:
      'A link to validate your account was sent to your email and will be active for 24 hours.'
  },

  button: {
    back: 'Go back',
    cancel: 'Cancel',
    continue: 'Continuar',
    create_account: 'Crear cuenta',
    close: 'Close',
    end: 'Finalizar',
    enter: 'Ingresar',
    exit: 'Salir',
    following: 'Siguiente',
    goto_login: 'Go to login',
    login: 'Iniciar sesión',
    logout: 'Cerrar sesión',
    logout_confirm: 'Si, cerrar sesión',
    recover: 'Recuperar',
    register: 'Registrarse',
    save: 'Save',
    save_changes: 'Guardar cambios',
    send: 'Enviar',
    send_email: 'Send email',
    remove_beneficiary: 'Eliminar beneficiario'
  },

  label: {
    accept: 'Acepto',
    birthdate: 'Fecha de nacimiento',
    change: 'Cambiar',
    consent: 'Consentimiento informado',
    edit: 'Editar',
    go_help: 'Ir a ayuda',
    lastname: 'Apellidos',
    name: 'Full name',
    no_register: "Aren't you registered in Ospi yet?",
    sms: 'SMS',
    terms: 'Términos y condiciones',
    same_residence: 'Igual que mi domicilio',
    residence: 'Domicilio',
    language: 'Idioma',

    country: {
      country: 'Country',
      placeholder: 'Select country of residence'
    },

    email: {
      actual: 'Correo electrónico actual',
      change_description: 'Ingresá tu nuevo correo electrónico para actualizarlo en la plataforma',
      email: 'Email',
      email_en: 'Email',
      new: 'Cambiar correo electrónico'
    },

    address: {
      address: 'Domicilio',
      placeholder: 'Select {{child}}',
      crc: {
        firstLevel: 'Province',
        secondLevel: 'Canton',
        thirdLevel: 'District'
      },
      mx: {
        firstLevel: 'State',
        secondLevel: 'Municipality / Mayor',
        thirdLevel: 'Colony'
      }
    },

    document: {
      type: 'Tipo de identificación',
      number: 'Número de identificación',
      passport: 'Pasaporte',
      physical: 'Cédula Física',
      residence: 'Cédula de Residencia',
      placeholder: 'Select document',
      unique: 'Unique Population Registry Code (CURP)',
      elector: 'Voter Credential (INE)'
    },

    gender: {
      gender: 'Sexo biológico designado al nacer',
      female: 'Femenino',
      male: 'Masculino',
      tooltip:
        'This information is for purposes related to health issues and conditions related to biological sex. It has nothing to do with the person is identity.',
      placeholder: 'Select gender'
    },

    password: {
      confirm: 'New password confirmation',
      password: 'Contraseña',
      new: 'new password',
      change_description: 'Ingresá tu contraseña anterior y la nueva',
      forget: '¿Olvidaste tu contraseña?'
    },

    phone: {
      new: 'Nuevo número de teléfono',
      change: 'Cambiar número de teléfono',
      change_description: 'Ingresá tu nuevo número de teléfono para actualizarlo en la plataforma',
      actual: 'Número de teléfono actual',
      phone: 'Número de teléfono'
    },

    pronoun: {
      pronoun: 'Pronoun with which he identifies',
      placeholder: 'Select pronoun',
      she: 'She',
      he: 'He',
      they: 'They'
    }
  },

  responses: {
    signin: {
      error_400: 'The data provided does not match',
      error_401: 'The data provided does not match'
    },
    recover: {
      error_401: 'Invalid token, request it again'
    }
  },

  countries: {
    mx: 'Mexico',
    crc: 'Costa Rica'
  },

  forward_email: {
    messages: {
      dont_recive: 'Didn`t you get the mail?',
      resend_email: 'Resend e-mail',
      resend_label: 'Waiting'
    }
  },

  contact: {
    title: 'Need help?',
    label: 'Contact us at our ',
    ospi_center: 'Ospi Center at {{telephone}}'
  }
};
