import React from 'react';
import debounce from 'lodash/fp/debounce';
import { WithTranslation } from 'react-i18next';
import { AdminLayout, FormHeader, FormSearch } from '@app/components';
import {
  OffsetPagination,
  Filter,
  FieldInfo,
  PickerDataItem,
  TableColumn,
  FieldValueType,
  withTranslation,
} from '@app/core';
import { config } from '@app/config';

interface Props extends WithTranslation {
  providers: PickerDataItem<string>[];
}

const createData = (name: string, code: string, population: number, size: number): { [id: string]: FieldValueType } => {
  const density = population / size;
  return {
    name,
    code,
    population,
    size,
    density,
  };
};

const rows = [
  createData('India', 'IN', 417135400, 4171354),
  createData('China', 'CN', 1403500365, 9596961),
  createData('Italy', 'IT', 60483973, 301340),
  createData('United States', 'US', 327167434, 9833520),
  createData('Canada', 'CA', 37602103, 9984670),
  createData('Australia', 'AU', 25475400, 7692024),
  createData('Germany', 'DE', 83019200, 357578),
  createData('Ireland', 'IE', 4857000, 70273),
  createData('Mexico', 'MX', 126577691, 1972550),
  createData('Japan', 'JP', 126317000, 377973),
  createData('France', 'FR', 67022000, 640679),
  createData('United Kingdom', 'GB', 67545757, 242495),
  createData('Russia', 'RU', 146793744, 17098246),
  createData('Nigeria', 'NG', 200962417, 923768),
  createData('Brazil', 'BR', 210147125, 8515767),
];

const BaseUsers = (props: Props): JSX.Element => {
  const { t } = props;
  const providers = [
    {
      value: '',
      label: t('all'),
    },
    ...props.providers,
  ];

  const filterFields: FieldInfo[] = [
    {
      name: 'filter',
      text: t('filter'),
    },
    {
      name: 'provider',
      text: t('provider'),
      type: 'picker',
      pickerDataSources: providers,
    },
  ];

  const columns: TableColumn[] = [
    {
      id: 'fullName',
      label: t('fullName'),
      minWidth: 200,
    },
    {
      id: 'email',
      label: t('email'),
      minWidth: 150,
    },
    {
      id: 'phoneNo',
      label: t('phoneNo'),
      minWidth: 150,
    },
    {
      id: 'provider',
      label: t('provider'),
      minWidth: 150,
    },
    {
      id: 'registeredAt',
      label: t('registeredAt'),
      minWidth: 150,
    },
  ];

  const createUser = async (): Promise<void> => {
    // TODO: implementation
  };

  const search = async (_filter: Filter, _pagination: OffsetPagination): Promise<void> => {
    // TODO: implementation
  };
  const onFilterChange = debounce(config.debounceDelay, search);

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
      <FormSearch
        filterFields={filterFields}
        onFilterChange={onFilterChange}
        defaultFilter={{
          filter: '',
          provider: '',
        }}
        columns={columns}
        rows={rows}
        count={rows.length}
      />
    </AdminLayout>
  );
};

BaseUsers.getInitialProps = async () => {
  const providers = [
    {
      value: 'EMAIL',
      label: 'Email',
    },
    {
      value: 'PHONE_NO',
      label: 'Phone No',
    },
    {
      value: 'FACEBOOK',
      label: 'Facebook',
    },
    {
      value: 'GOOGLE',
      label: 'Google',
    },
  ];
  return {
    providers,
    namespacesRequired: ['common', 'admin_users'],
  };
};

export const Users = withTranslation('admin_users')(BaseUsers);
