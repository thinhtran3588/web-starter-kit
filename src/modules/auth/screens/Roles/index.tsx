import React from 'react';
import { AdminLayout, FormHeader } from '@app/components';

export const Roles = (): JSX.Element => {
  const createRole = async (): Promise<void> => {
    // eslint-disable-next-line no-console
    console.log('createRole');
  };
  return (
    <AdminLayout title='Roles' description='Roles'>
      <FormHeader
        breadcrumbLinks={[
          {
            text: 'Auth',
            link: '/admin/users',
          },
          {
            text: 'Roles',
          },
        ]}
        commandButtons={[
          {
            text: 'Create',
            onClick: createRole,
            color: 'primary',
          },
        ]}
      />
    </AdminLayout>
  );
};
