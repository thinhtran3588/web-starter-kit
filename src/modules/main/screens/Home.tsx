import React from 'react';
import Button from '@material-ui/core/Button';
import { Layout } from '@app/components/Layout';

export const Home = (): JSX.Element => (
  <Layout description='Home page'>
    <h1>Home</h1>
    <Button variant='contained' color='primary'>
      Hello World
    </Button>
  </Layout>
);
