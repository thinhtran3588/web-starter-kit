import React from 'react';
import Button from '@material-ui/core/Button';
import { Layout } from '@app/components/Layout';
import { useStyles } from './styles';

export const Home = (): JSX.Element => {
  const styles = useStyles();
  return (
    <Layout description='Home page'>
      <h1 className={styles.header}>Home</h1>
      <Button variant='contained' color='primary'>
        Hello World
      </Button>
    </Layout>
  );
};
