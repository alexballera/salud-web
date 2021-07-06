import { TERMS_AND_CONDITIONS } from '../../../src/services/queries/TermsAndConditions';

export const mockSuccess = {
  request: {
    query: TERMS_AND_CONDITIONS
  },
  result: {
    data: {
      getPageTermsAndConditions: {
        data: {
          content: [
            {
              id: '7md4ywWKo0',
              type: 'header',
              data: {
                text: 'Términos y condiciones',
                level: 2,
                textAlign: 'left',
                className: 'ce-header ce-header-text--left'
              }
            },
            {
              id: 'mA4WdIBML9',
              type: 'paragraph',
              data: {
                text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum tincidunt condimentum mauris vitae luctus. Nunc congue quis ipsum vel egestas. Praesent urna libero, laoreet ac lacus et, tristique blandit urna. Morbi nec pulvinar metus. Aenean vel eros ullamcorper, scelerisque turpis nec, consequat diam. Sed ultricies est finibus, sollicitudin metus scelerisque, mollis massa. Quisque sagittis dictum dui non convallis.',
                textAlign: 'left',
                className: ''
              }
            }
          ]
        },
        error: null
      }
    }
  }
};

export const mockFailure = {
  request: {
    query: TERMS_AND_CONDITIONS
  },
  result: {
    data: {
      getPageTermsAndConditions: {
        error: {
          code: 'NOT_FOUND',
          message: 'Entry not found!'
        },
        data: null
      }
    }
  }
};
