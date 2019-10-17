import React from 'react';
import { Layout } from '@app/components';
import { Grid } from '@material-ui/core';
import { useStyles } from './styles';
import { Content, SideMenu } from './components';

export const BlogDetail = (): JSX.Element => {
  const classes = useStyles();

  return (
    <Layout title='Blog detail' description='Blog detail'>
      <Grid container className={classes.blogDetailContainer}>
        <Grid item xs={1} lg={2}></Grid>
        <Grid item xs={10} lg={8}>
          <Grid container spacing={2}>
            <Grid item xs={12} lg={9}>
              <Content />
            </Grid>
            <Grid item xs={false} lg={3}>
              <SideMenu />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={1} lg={2}></Grid>
      </Grid>
    </Layout>
  );
};
