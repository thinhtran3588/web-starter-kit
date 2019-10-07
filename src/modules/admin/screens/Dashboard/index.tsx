import React from 'react';
import { AdminLayout } from '@app/components';
import { useStyles } from './styles';

export const Dashboard = (): JSX.Element => {
  const classes = useStyles();
  return (
    <AdminLayout title='Dashboard' description='Dashboard'>
      <h1 className={classes.header}>Dashboard</h1>
    </AdminLayout>
  );
};
