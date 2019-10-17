import React from 'react';
import { Grid } from '@material-ui/core';
import { Layout } from '@app/components';
import { Categories, BlogsList } from './components';

export const Blogs = (): JSX.Element => {
  return (
    <Layout title='Blogs' description='Blogs'>
      <Grid container>
        <Grid item xs={1} lg={2}></Grid>
        <Grid item xs={10} lg={8}>
          <Categories />
          <BlogsList />
        </Grid>
        <Grid item xs={1} lg={2}></Grid>
      </Grid>
    </Layout>
  );
};
