import React from 'react';
import { AdminLayout } from '@app/components';
import { useStyles } from './styles';

export const Users = (): JSX.Element => {
  const classes = useStyles();
  return (
    <AdminLayout title='Users' description='Users'>
      <h1 className={classes.header}>Users</h1>
    </AdminLayout>
  );
};
