import React from 'react';
import { AdminLayout } from '@app/components';
import { useStyles } from './styles';

export const Roles = (): JSX.Element => {
  const classes = useStyles();
  return (
    <AdminLayout title='Roles' description='Roles'>
      <h1 className={classes.header}>Roles</h1>
    </AdminLayout>
  );
};
