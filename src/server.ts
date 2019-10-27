import { express } from './express';

(async () => {
  const port = process.env.PORT || 3000;
  await express().listen(port);
  if (process.env.NODE_ENV !== 'production') {
    global.console.log(`> Ready on http://localhost:${port}`);
  }
})();
