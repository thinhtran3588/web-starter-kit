import React from 'react';
import { AdminLayout } from '@app/components';
import { useStyles } from './styles';

export const AdminBlogs = (): JSX.Element => {
  const classes = useStyles();
  return (
    <AdminLayout title='AdminBlogs' description='AdminBlogs'>
      <h1 className={classes.header}>AdminBlogs</h1>
    </AdminLayout>
  );
};
