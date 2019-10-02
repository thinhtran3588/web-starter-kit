import React from 'react';
import Button from '@material-ui/core/Button';
import { Layout } from '@app/components/Layout';
import { useStyles } from './styles';

export const About = (): JSX.Element => {
  const styles = useStyles();
  return (
    <Layout title='About' description='About me'>
      <h1 className={styles.header}>About</h1>
      <Button variant='contained' color='primary'>
        Hello World
      </Button>
    </Layout>
  );
};
