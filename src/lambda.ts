import serverless from 'serverless-http';
// import { config } from '@app/config';
import { express } from './express';

module.exports.handler = serverless(express());
// const handler = serverless(express());
// // eslint-disable-next-line @typescript-eslint/no-explicit-any
// module.exports.handler = async (event: any, context: any) => {
//   if (event.path && event.path.indexOf('/_next') === 0) {
//     const newLocation = `${config.storageLocation.base}${event.path}`;
//     // eslint-disable-next-line no-console
//     console.log(event.path, newLocation);
//     return {
//       statusCode: 301,
//       headers: {
//         Location: newLocation,
//         'Cache-Control': 'max-age=public,max-age=31536000,immutable',
//       },
//     };
//   }
//   return handler(event, context);
// };
