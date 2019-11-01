import React from 'react';
import { Layout } from '@app/components';
import { CoverImage, Features, Quote, Help } from './components';

const Screen = (): JSX.Element => {
  return (
    <Layout description='Home page'>
      <CoverImage />
      <Features />
      <Quote />
      <Help />
    </Layout>
  );
};

Screen.getInitialProps = async () => {
  return {
    namespacesRequired: ['common', 'home'],
  };
};

export const HomeScreen = Screen;
