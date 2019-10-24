import React from 'react';
import NextHead from 'next/head';
import { config } from '@app/config';

interface Props {
  title?: string;
  description?: string;
}

export const Head = ({ title, description }: Props): JSX.Element => {
  return (
    <NextHead>
      <title>{title || config.siteName}</title>
      <meta name='viewport' content='minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no' />
      <meta name='Description' content={description || title || config.siteName}></meta>
    </NextHead>
  );
};
