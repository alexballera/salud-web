export const enGlobals = {
  welcome: 'Main',
  title: {
    beneficiaries: 'Beneficiaries',
    credential_data: 'Login Credentials',
    credential_profile: 'Credentials and contact',
    extra_data: 'Additional data',
    identify: 'Identify yourself',
    legal: 'Legal',
    login_page: 'Login',
    login_title: 'Hello, enter your portal',
    logout: 'Logout',
    personal_data: 'Personal information',
    preferences: 'Preferences',
    profile: 'Profile',
    publicity: 'Publicity',
    reminder: 'Reminders',
    edit_beneficiary_title: 'Edit beneficiary',
    recover: {
      forget: 'Recover your password'
    },
    forward_email: 'Check your email',
    new_password: 'New password',
    registered_patient: 'Patient already registered'
  },

  description: {
    beneficiaries: 'The person(s) you want to enjoy the benefits of your plan',
    extra_data: 'These data will be used solely for medical purposes within the platform',
    credential_data: 'Define the credentials you want to use to enter the platform',
    identify: 'To start your registration, provide us with your identification number',
    logout: '¿Are you sure you want to close your session on the platform?',
    login: 'Enter your email and password to access your portal.',
    preferences: 'The person(s) you want to enjoy the benefits of your plan',
    edit_beneficiary: 'Personal information',
    steps_header: 'Step {{step}} of {{totalSteps}}',
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
    continue: 'Continue',
    create_account: 'Create account',
    close: 'Close',
    end: 'Finalize',
    enter: 'Enter',
    exit: 'Exit',
    following: 'Following',
    goto_login: 'Go to login',
    login: 'login',
    logout: 'logout',
    logout_confirm: 'Yes, logout',
    recover: 'Recover',
    register: 'Register',
    save: 'Save',
    save_changes: 'Save changes',
    send: 'Send',
    send_email: 'Send email',
    remove_beneficiary: 'Delete beneficiary',
    show_more: 'Show more'
  },

  label: {
    accept: 'accept',
    birthdate: 'Birthdate',
    date: 'Date',
    change: 'Change',
    consent: 'Informed consent',
    edit: 'Edit',
    go_help: 'Go to help',
    lastname: 'Lastname',
    name: 'Full name',
    no_register: "Aren't you registered in Ospi yet?",
    sms: 'SMS',
    terms: 'Terms and Conditions',
    same_residence: 'Just like my residence',
    residence: 'Residence',
    language: 'Language',
    for: 'For',
    invalid_date_format: 'invalid date format',
    neither: 'Ninguno',

    country: {
      country: 'Country',
      placeholder: 'Select country of residence'
    },

    email: {
      actual: 'Current email',
      change_description: 'Enter your new email to update it on the platform',
      email: 'Email',
      email_en: 'Email',
      new: 'Change email'
    },

    address: {
      address: 'Residence',
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
      type: 'Identification Type',
      number: 'Identification number',
      passport: 'Passport',
      physical: 'Physical ID',
      residence: 'Residence ID',
      placeholder: 'Select document',
      unique: 'Unique Population Registry Code (CURP)',
      elector: 'Voter Credential (INE)'
    },

    gender: {
      gender: 'Biological sex at birth',
      female: 'Female',
      male: 'Male',
      tooltip:
        'This information is for purposes related to health issues and conditions related to biological sex. It has nothing to do with the person is identity.',
      placeholder: 'Select gender'
    },

    password: {
      confirm: 'New password confirmation',
      confirm_password: 'Confirm password',
      password: 'Contraseña',
      new: 'new password',
      change_description: 'Enter your old and new password',
      forget: '¿Did you forget your password?'
    },

    phone: {
      new: 'New phone number',
      change: 'Change phone number',
      change_description: 'Enter your new phone number to update it on the platform',
      actual: 'Current phone number',
      phone: 'Phone number'
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
      error_401: 'The data provided does not match',
      error_429: 'You have made many requests at the same time'
    },
    recover: {
      error_401: 'Invalid token, request it again'
    },
    signup: {
      error_409:
        'The email is already registered in the system. Please indicate another or contact us at OspiCenter for more information'
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
  },

  profile: {
    height: 'Height',
    weight: 'Weight',
    biologicSex: 'Biologic Sex',
    pronoun: 'Pronoun',
    civilStatus: 'Civil status',
    ocupation: 'Ocupation',
    address: 'Address',
    age: 'Age'
  },

  months: {
    0: 'January',
    1: 'February',
    2: 'March',
    3: 'April',
    4: 'May',
    5: 'June',
    6: 'July',
    7: 'August',
    8: 'September',
    9: 'October',
    10: 'November',
    11: 'December'
  },

  config: {
    simple_hour: '{{hour}} hour',
    many_hour: '{{hour}} hours',
    simple_unit: '{{unit}} unit',
    many_unit: '{{unit}} units'
  }
};
