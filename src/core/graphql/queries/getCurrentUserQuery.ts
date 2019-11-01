import { gql } from 'apollo-boost';

export const GET_CURRENT_USER_QUERY = gql`
  {
    currentUser @client {
      id
      displayName
      avatarUrl
      isLoggedIn
      email
      emailVerified
      loginType
    }
  }
`;
