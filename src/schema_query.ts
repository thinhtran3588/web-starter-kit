/* eslint-disable no-underscore-dangle */
import fetch from 'isomorphic-unfetch';
import { writeFileSync } from 'fs';
import { config } from '@app/config';

// eslint-disable-next-line max-len
// https://medium.com/commutatus/whats-going-on-with-the-heuristic-fragment-matcher-in-graphql-apollo-client-e721075e92be
fetch(config.apiEndpoint, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    variables: {},
    query: `
      {
        __schema {
          types {
            kind
            name
            possibleTypes {
              name
            }
          }
        }
      }
    `,
  }),
})
  .then((result) => result.json())
  .then((result) => {
    // here we're filtering out any type information unrelated to unions or interfaces
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, no-null/no-null
    const filteredData = result.data.__schema.types.filter((type: any) => type.possibleTypes !== null);
    // eslint-disable-next-line no-param-reassign
    result.data.__schema.types = filteredData;
    try {
      writeFileSync('./src/fragmentTypes.json', JSON.stringify(result.data));
    } catch (err) {
      if (err) {
        // eslint-disable-next-line no-console
        console.error('Error writing fragmentTypes file', err);
      } else {
        // eslint-disable-next-line no-console
        console.log('Fragment types successfully extracted!');
      }
    }
  });
