import React, { useState } from 'react';
import produce from 'immer';
import { AdminLayout, FormHeader, Form, Field, Table } from '@app/components';
import { useStyles } from './styles';

interface Filter {
  filter: string;
  provider: string;
}

export const Users = (): JSX.Element => {
  const classes = useStyles();

  const [filter, setFilter] = useState<Filter>({
    filter: '',
    provider: '',
  });
  // const providers = [
  //   {
  //     value: 'EMAIL',
  //     text: 'Email',
  //   },
  //   {
  //     value: 'PHONE_NO',
  //     text: 'Phone No',
  //   },
  //   {
  //     value: 'FACEBOOK',
  //     text: 'Facebook',
  //   },
  //   {
  //     value: 'GOOGLE',
  //     text: 'Google',
  //   },
  // ];

  const handleChange = (fieldName: keyof Filter) => (value: string) =>
    setFilter(
      produce((draft: Filter) => {
        draft[fieldName] = value;
      }),
    );

  // const findUsers = async (): Promise<void> => {
  //   console.log('findUsers');
  // };

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
      <div className={classes.filter}>
        <Form>
          <Field type={'text'} label='Filter' value={filter.filter} onChange={handleChange('filter')} />
          <Field type={'text'} label='Provider' value={filter.provider} onChange={handleChange('provider')} />
        </Form>
      </div>
      <Table className={classes.table} />
    </AdminLayout>
  );
};
