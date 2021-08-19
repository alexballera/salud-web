import { gql } from '@apollo/client';

export const TERMS_AND_CONDITIONS = gql`
  {
    getPageTermsAndConditions(where: {}) {
      error {
        code
        message
      }
      data {
        content
      }
    }
  }
`;
