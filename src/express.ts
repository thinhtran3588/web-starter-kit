import baseExpress, { Express } from 'express';
import next from 'next';
import nextI18NextMiddleware from 'next-i18next/middleware';
import { nextI18next } from '@app/core/i18n';

export const express = (): Express => {
  const app = next({
    dev: process.env.NODE_ENV !== 'production',
  });
  const handle = app.getRequestHandler();
  app.prepare();
  const server = baseExpress();
  server.use(nextI18NextMiddleware(nextI18next));
  server.get('*', (req, res) => handle(req, res));
  return server;
};
