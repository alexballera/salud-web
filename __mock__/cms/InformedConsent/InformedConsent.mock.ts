import { INFORMED_CONSENT } from '../../../src/services/queries/InformedConsent';

export const mockSuccess = {
  request: {
    query: INFORMED_CONSENT
  },
  result: {
    data: {
      getPageInformedConsent: {
        data: {
          content: [
            {
              id: 'Bn15M0vEmM',
              type: 'header',
              data: {
                text: 'Consentimiento Informado',
                level: 2,
                textAlign: 'left',
                className: 'ce-header ce-header-text--left'
              }
            },
            {
              id: 'Ht4XPA-xrM',
              type: 'paragraph',
              data: {
                text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum tincidunt condimentum mauris vitae luctus. Nunc congue quis ipsum vel egestas. Praesent urna libero, laoreet ac lacus et, tristique blandit urna. Morbi nec pulvinar metus. Aenean vel eros ullamcorper, scelerisque turpis nec, consequat diam. Sed ultricies est finibus, sollicitudin metus scelerisque, mollis massa. Quisque sagittis dictum dui non convallis.',
                textAlign: 'left'
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
    query: INFORMED_CONSENT
  },
  result: {
    data: {
      getPageInformedConsent: {
        error: {
          code: 'NOT_FOUND',
          message: 'Entry not found!'
        },
        data: null
      }
    }
  }
};
