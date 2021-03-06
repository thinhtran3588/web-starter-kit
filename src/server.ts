import fs from 'fs';
import http from 'http';
import https from 'https';
import { express } from './express';

(() => {
  const app = express();
  if (process.env.HTTPS === 'TRUE') {
    const key = fs.readFileSync(`${__dirname}/../selfsigned.key`);
    const cert = fs.readFileSync(`${__dirname}/../selfsigned.crt`);
    const httpsServer = https.createServer(
      {
        key,
        cert,
      },
      app,
    );
    const port = process.env.SSL_PORT || 443;
    httpsServer.listen(port);
    if (process.env.NODE_ENV !== 'production') {
      global.console.log(`> Ready on https://localhost:${port}`);
    }
  } else {
    const httpServer = http.createServer(app);
    const port = process.env.PORT || 3000;
    httpServer.listen(port);
    if (process.env.NODE_ENV !== 'production') {
      global.console.log(`> Ready on http://localhost:${port}`);
    }
  }
})();
