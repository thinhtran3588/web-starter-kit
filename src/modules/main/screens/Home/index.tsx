import React from 'react';
import { Layout } from '@app/components';
import { CoverImage, Features, Quote, Help } from './components';

export const Home = (): JSX.Element => {
  return (
    <Layout description='Home page'>
      <CoverImage />
      <Features />
      <Quote />
      <Help />
    </Layout>
  );
};
