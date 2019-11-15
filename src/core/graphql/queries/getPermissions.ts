import { gql } from 'apollo-boost';

export const GET_PERMISSIONS_QUERY = gql`
  query GetPermissions {
    permissions
  }
`;
