import { gql } from 'apollo-boost';

export const GET_COUNTRIES_QUERY = gql`
  query GetCountries {
    countries {
      data {
        code
        dialCode
        name
      }
    }
  }
`;
