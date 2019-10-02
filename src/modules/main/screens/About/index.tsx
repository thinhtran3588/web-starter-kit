import React from 'react';
import { Layout } from '@app/components/Layout';
import { useStyles } from './styles';

export const About = (): JSX.Element => {
  const classes = useStyles();
  return (
    <Layout title='About' description='About me'>
      <h1 className={classes.header}>About</h1>
    </Layout>
  );
};
