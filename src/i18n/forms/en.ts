export const enForms = {
  message: {
    email: {
      required: 'You must specify an email.',
      not_found: 'No user has been found that matches the email provided',
      email_not_found: 'Email not found',
      not_received: '¿You did not receive the mail?',
      not_register: 'The indicated email is not registered, ¿want to register?',
      is_register: 'This email was previously registered',
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
      change_success: 'The password has been changed successfully.',
      updated: 'Updated password'
    }
  },

  validations: {
    required: 'Required field',
    date_invalid: 'Invalid date',
    max_18_age: 'To join Ospi you must be of legal age',
    min_3: 'Minimum number of characters 3',
    min_8: 'Minimum number of characters 8',
    min_9: 'Minimum number of characters 9',
    min_10_max_15: 'Minimum characters for residence 10, máx 15',
    min_9_max_20: 'Minimum number of characters for passport 9, máx 20',
    terms: 'You must accept the Terms and Conditions to continue',
    services: 'You must accept the Informed Consent to continue',
    userExists: 'There is already a patient with that identity number registered in Ospi',
    userNotFound: 'User not found',

    password: {
      required: 'Password required',
      required_short: 'Password required',
      min_8: 'The password must be at least 8 characters',
      max_16: 'The password must be maximum de 16 characters',
      regex:
        'Password must contain at least one uppercase letter, one lowercase letter and one number',
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
