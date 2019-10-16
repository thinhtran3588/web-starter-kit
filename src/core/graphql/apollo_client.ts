import ApolloClient, { gql } from 'apollo-boost';
import fetch from 'isomorphic-unfetch';
import { config } from '@app/config';

export const apolloClient = new ApolloClient({
  uri: config.apiEndpoint,
  fetch,
});
export { gql };
