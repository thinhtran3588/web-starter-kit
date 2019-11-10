import { gql } from 'apollo-boost';

export const GET_COUNTRIES_QUERY = gql`
  query GetCountries {
    countries {
      code
      dialCode
      name
    }
  }
`;
