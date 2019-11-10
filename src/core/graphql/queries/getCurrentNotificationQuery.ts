import { gql } from 'apollo-boost';

export const GET_CURRENT_NOTIFICATION_QUERY = gql`
  query GetCurrentNotification {
    currentNotification @client {
      type
      message
      open
    }
  }
`;
