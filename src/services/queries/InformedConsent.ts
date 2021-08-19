import { gql } from '@apollo/client';

export const INFORMED_CONSENT = gql`
  {
    getPageInformedConsent(where: {}) {
      data {
        content
      }
      error {
        message
      }
    }
  }
`;

export interface IResponseInformedConsent {
  getPageInformedConsent: {
    data: {
      content: any[];
    };
    error: {
      message;
    };
  };
}
