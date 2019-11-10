import { gql } from 'apollo-boost';

export const GET_CURRENT_USER_QUERY = gql`
  query GetCurrentUser {
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
