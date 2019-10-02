import React from 'react';
import NextHead from 'next/head';
import { config } from '@app/config';

interface Props {
  children?: React.ReactNode;
  title?: string;
  description?: string;
}

export const AdminLayout = ({ children, title = config.siteName, description = '' }: Props): JSX.Element => (
  <>
    <NextHead>
      <title>{title}</title>
      <meta name='Description' content={description}></meta>
    </NextHead>
    {children}
  </>
);
