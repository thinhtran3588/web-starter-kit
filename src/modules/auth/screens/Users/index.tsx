import React from 'react';
import debounce from 'lodash/fp/debounce';
import { AdminLayout, FormHeader, FormSearch } from '@app/components';
import { OffsetPagination, Filter, FieldInfo, PickerDataItem, TableColumn, FieldValueType } from '@app/core';
import { config } from '@app/config';

interface UsersFilter {
  filter: string;
  provider: string;
}

interface Props {
  providers: PickerDataItem<string>[];
}

const columns: TableColumn[] = [
  {
    id: 'name',
    label: 'Name',
    minWidth: 170,
  },
  {
    id: 'code',
    label: 'ISO\u00a0Code',
    minWidth: 100,
  },
  {
    id: 'population',
    label: 'Population',
    minWidth: 170,
    align: 'right',
    format: (value: number) => value.toLocaleString(),
  },
  {
    id: 'size',
    label: 'Size\u00a0(km\u00b2)',
    minWidth: 170,
    align: 'right',
    format: (value: number) => value.toLocaleString(),
  },
  {
    id: 'density',
    label: 'Density',
    minWidth: 170,
    align: 'right',
    format: (value: number) => value.toFixed(2),
  },
];

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

const Users = (props: Props): JSX.Element => {
  const { providers } = props;

  const filterFields: FieldInfo[] = [
    {
      name: 'filter',
      text: 'Filter',
    },
    {
      name: 'provider',
      text: 'Provider',
      type: 'picker',
      pickerDataSources: providers,
    },
  ];

  const createUser = async (): Promise<void> => {
    // eslint-disable-next-line no-console
    console.log('createUser');
  };

  const search = async (filter: Filter, pagination: OffsetPagination): Promise<void> => {
    // eslint-disable-next-line no-console
    console.log(filter, pagination);
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

Users.getInitialProps = async () => {
  const providers = [
    {
      value: '',
      label: 'All',
    },
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
  };
};

export { Users };
