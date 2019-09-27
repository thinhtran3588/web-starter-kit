import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import NextHead from 'next/head';
import { config } from '@app/config';
import Header from './Header';

interface Props {
  children?: React.ReactNode;
  title?: string;
  description?: string;
}

export const Layout = ({ children, title = config.siteName, description = '' }: Props): JSX.Element => (
  <>
    <NextHead>
      <title>{title}</title>
      <meta name='viewport' content='minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no' />
      <meta name='Description' content={description}></meta>
    </NextHead>
    <CssBaseline />
    <Header />
    {children}
  </>
);
