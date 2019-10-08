import React from 'react';
import { AdminLayout, FormHeader } from '@app/components';

export const Users = (): JSX.Element => {
  const createUser = async (): Promise<void> => {
    // eslint-disable-next-line no-console
    console.log('createUser');
  };
  return (
    <AdminLayout title='Users' description='Users'>
      <FormHeader
        breadcrumbLinks={[
          {
            text: 'Auth',
            link: '/admin/users',
          },
          {
            text: 'Users',
          },
        ]}
        commandButtons={[
          {
            text: 'Create',
            onClick: createUser,
            color: 'primary',
          },
        ]}
      />
    </AdminLayout>
  );
};
