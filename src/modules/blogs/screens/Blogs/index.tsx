import React from 'react';
import { Layout } from '@app/components';
import { useStyles } from './styles';

export const Blogs = (): JSX.Element => {
  const classes = useStyles();
  return (
    <Layout title='Blogs' description='Blogs'>
      <h1 className={classes.header}>Blogs</h1>
    </Layout>
  );
};
