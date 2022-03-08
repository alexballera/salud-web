export const esGlobals = {
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
      forget: 'Recuperá tu contraseña'
    },
    forward_email: 'Revisá tu correo',
    new_password: 'Nueva contraseña',
    registered_patient: 'Paciente ya registrado'
  },

  description: {
    beneficiaries: 'La o las personas que querés que disfruten los beneficios de tu plan',
    extra_data: 'Estos datos se usarán únicamente con propósitos médicos dentro de la plataforma',
    credential_data: 'Definí las credenciales que querés utilizar para ingresar a la plataforma',
    identify: 'Para empezar tu registro bríndanos tu número de identificación',
    logout: '¿Estás seguro que querés cerrar tu sesión en plataforma?',
    login: 'Coloca tu correo electrónico y contraseña para acceder a tu portal.',
    preferences: 'La o las personas que querés que disfruten los beneficios de tu plan',
    edit_beneficiary: 'Información personal',
    steps_header: 'Paso {{step}} de {{totalSteps}}',
    recover: {
      forget: 'Para recuperar tu contraseña requerimos verificar tu identidad.'
    },
    forward_email:
      'Se envío a tu correo un link de cambio de contraseña que estará activo por 1 hora.',
    new_password: 'Ingresá tu contraseña nueva',
    registered_patient_1: 'Ya existe un paciente con ese número de identidad registrado en Ospi.',
    registered_patient_2: 'Podemos enviarte más información a tu correo: {{email}}',
    email_verification:
      'Se envío a tu correo un link para validar tu cuenta que estará activo por 24 horas.'
  },

  button: {
    back: 'Volver',
    cancel: 'Cancelar',
    continue: 'Continuar',
    create_account: 'Crear cuenta',
    close: 'Cerrar',
    end: 'Finalizar',
    enter: 'Ingresar',
    exit: 'Salir',
    following: 'Siguiente',
    goto_login: 'Ir a inicio de sesión',
    login: 'Iniciar sesión',
    logout: 'Cerrar sesión',
    logout_confirm: 'Si, cerrar sesión',
    recover: 'Recuperar',
    register: 'Registrarse',
    save: 'Guardar',
    save_changes: 'Guardar cambios',
    send: 'Enviar',
    send_email: 'Enviar correo',
    remove_beneficiary: 'Eliminar beneficiario',
    show_more: 'Ver más'
  },

  label: {
    accept: 'Acepto',
    birthdate: 'Fecha de nacimiento',
    date: 'Fecha',
    change: 'Cambiar',
    consent: 'Consentimiento informado',
    edit: 'Editar',
    go_help: 'Ir a ayuda',
    lastname: 'Apellidos',
    name: 'Nombre completo',
    no_register: '¿Aún no estás registrado en Ospi?',
    sms: 'SMS',
    terms: 'Términos y condiciones',
    same_residence: 'Igual que mi domicilio',
    residence: 'Domicilio',
    language: 'Idioma',
    for: 'Por',

    country: {
      country: 'País de residencia',
      placeholder: 'Seleccionar país de residencia'
    },

    email: {
      actual: 'Correo electrónico actual',
      change_description: 'Ingresá tu nuevo correo electrónico para actualizarlo en la plataforma',
      email: 'Correo electrónico',
      email_en: 'Email',
      new: 'Cambiar correo electrónico'
    },

    address: {
      address: 'Domicilio',
      placeholder: 'Seleccione',
      crc: {
        firstLevel: 'Provincia',
        secondLevel: 'Cantón',
        thirdLevel: 'Distrito'
      },
      mx: {
        firstLevel: 'Estado',
        secondLevel: 'Municipio / Alcaldía',
        thirdLevel: 'Colonia'
      }
    },

    document: {
      type: 'Tipo de identificación',
      number: 'Número de identificación',
      passport: 'Pasaporte',
      physical: 'Cédula Física',
      residence: 'Cédula de Residencia',
      placeholder: 'Seleccionar documento',
      unique: 'Clave Única de Registro Poblacional (CURP)',
      elector: 'Credencial de Elector (INE)'
    },

    gender: {
      gender: 'Sexo biológico al nacer',
      female: 'Femenino',
      male: 'Masculino',
      tooltip:
        'Esta información tiene propósitos relacionados a temas de salud y las condiciones relacionadas al sexo biológico. No tiene relación con la identidad de la persona.',
      placeholder: 'Seleccione sexo'
    },

    password: {
      confirm: 'Confirmación de la contraseña nueva',
      confirm_password: 'Confirmar contraseña',
      password: 'Contraseña',
      new: 'Contraseña nueva',
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
      pronoun: 'Pronombre con el que se identifica',
      placeholder: 'Seleccione pronombre',
      she: 'Ella',
      he: 'El',
      they: 'Elle'
    }
  },

  responses: {
    signin: {
      error_400: 'Los datos brindados no coinciden',
      error_401: 'Los datos brindados no coinciden',
      error_429: 'Has realizo muchas solicitudes al mismo tiempo'
    },
    recover: {
      error_401: 'Token inválido, solicítalo nuevamente'
    },
    signup: {
      error_409: 'Ya existe un paciente con ese número de identidad registrado en Ospi'
    }
  },

  countries: {
    mx: 'México',
    crc: 'Costa Rica'
  },

  forward_email: {
    messages: {
      dont_recive: '¿No te llegó el correo?',
      resend_email: 'Reenviar correo',
      resend_label: 'Espera'
    }
  },

  contact: {
    title: '¿Necesitás ayuda?',
    label: 'Contactanos a nuestro ',
    ospi_center: 'Ospi Center al {{telephone}}'
  },

  profile: {
    height: 'Altura',
    weight: 'Peso',
    biologicSex: 'Sexo biológico',
    pronoun: 'Pronombre',
    civilStatus: 'Estado civil',
    ocupation: 'Profesión',
    address: 'Dirección',
    age: 'Edad'
  },

  months: {
    0: 'Enero',
    1: 'Febrero',
    2: 'Marzo',
    3: 'Abril',
    4: 'Mayo',
    5: 'Junio',
    6: 'Julio',
    7: 'Agosto',
    8: 'Septiembre',
    9: 'Octubre',
    10: 'Noviembre',
    11: 'Diciembre'
  },

  config: {
    simple_hour: '{{hour}} hora',
    many_hour: '{{hour}} horas',
    simple_unit: '{{unit}} unidad',
    many_unit: '{{unit}} unidades'
  }
};
