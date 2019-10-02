import React from 'react';
import { Layout } from '@app/components/Layout';
import { useStyles } from './styles';

export const Home = (): JSX.Element => {
  const classes = useStyles();
  return (
    <Layout description='Home page'>
      <h1 className={classes.header}>Home</h1>
    </Layout>
  );
};
