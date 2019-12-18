import { ApolloClient, HttpLink, InMemoryCache, IntrospectionFragmentMatcher } from 'apollo-boost';
import { setContext } from 'apollo-link-context';
import { config } from '@app/config';
import { persistCache } from 'apollo-cache-persist';
import fetch from 'isomorphic-unfetch';
import firebase from 'firebase/app';
import { i18n } from '../i18n';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type CacheShape = any;
let apolloClient: ApolloClient<CacheShape> | undefined;
const cache = new InMemoryCache({
  fragmentMatcher: new IntrospectionFragmentMatcher({
    introspectionQueryResultData: {
      __schema: {
        types: [
          {
            kind: 'UNION',
            name: 'ExternalLogin',
            possibleTypes: [
              {
                name: 'FacebookLogin',
              },
              {
                name: 'GoogleLogin',
              },
              {
                name: 'EmailLogin',
              },
              {
                name: 'PhoneNoLogin',
              },
            ],
          },
        ],
      },
    },
  }),
});

// await before instantiating ApolloClient, else queries might run before the cache is persisted
if (typeof window !== 'undefined') {
  persistCache({
    cache,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    storage: window.localStorage as any,
  });
}

const httpLink = new HttpLink({
  uri: config.apiEndpoint, // Server URL (must be absolute)
  fetch,
});

const authLink = setContext(async (_, { headers }) => {
  const user = firebase.auth().currentUser;
  const token = user ? await user.getIdToken() : '';
  const lang = i18n.language;
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token,
      'Content-Language': lang,
    },
  };
});

/**
 * Creates and configures the ApolloClient
 * @param  {Object} [initialState={}]
 */
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const createApolloClient = () => {
  // Check out https://github.com/zeit/next.js/pull/4611 if you want to use the AWSAppSyncClient
  const client = new ApolloClient({
    ssrMode: typeof window === 'undefined', // Disables forceFetch on the server (so queries are only run once)
    link: authLink.concat(httpLink),
    cache,
    resolvers: {},
    defaultOptions: {
      mutate: {
        errorPolicy: 'all',
      },
      query: {
        errorPolicy: 'all',
        fetchPolicy: 'network-only',
      },
    },
  });
  client.writeData({
    data: {
      currentNotification: {
        open: false,
        __typename: 'currentNotification',
      },
    },
  });
  return client;
};

/**
 * Always creates a new apollo client on the server
 * Creates or reuses apollo client in the browser.
 */
export const initApolloClient = (): ApolloClient<CacheShape> => {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (typeof window === 'undefined') {
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    return createApolloClient();
  }

  // Reuse client on the client-side
  if (!apolloClient) {
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    apolloClient = createApolloClient();
  }

  return apolloClient;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const writeData = (data: Record<string, any>): void => {
  apolloClient &&
    apolloClient.writeData({
      data,
    });
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const writeDataModel = (data: Record<string, any>, modelName: string): void => {
  apolloClient &&
    apolloClient.writeData({
      data: {
        [modelName]: {
          ...data,
          __typename: modelName,
        },
      },
    });
};

export const resetStore = (): void => {
  apolloClient && apolloClient.resetStore();
};
