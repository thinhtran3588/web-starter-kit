import React, { useState } from 'react';
import { WithTranslation } from 'react-i18next';
import debounce from 'lodash/fp/debounce';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import { AdminLayout, FormHeader, FormSearch } from '@app/components';
import {
  FieldInfo,
  PickerDataItem,
  TableColumn,
  withTranslation,
  FilterWithOffsetPagination,
  OffsetPaginationResult,
  SearchRecord,
  formatWithLookup,
  formatDateTime,
} from '@app/core';
import { config } from '@app/config';
import { withApollo } from '@app/hoc';

interface Props extends WithTranslation {
  loginTypes: PickerDataItem<string>[];
  roles: PickerDataItem<string>[];
}

interface SearchResult {
  users: {
    data: SearchRecord[];
    pagination: OffsetPaginationResult;
  };
}

const GET_USERS_QUERY = gql`
  query getUsers($filter: String, $role: String, $loginType: String, $pageIndex: Int!, $itemsPerPage: Int!) {
    users(filter: $filter, role: $role, loginType: $loginType, pageIndex: $pageIndex, itemsPerPage: $itemsPerPage) {
      data {
        id
        email
        username
        fullName
        loginDetail {
          ... on FacebookLogin {
            loginType
          }
          ... on GoogleLogin {
            loginType
          }
          ... on EmailLogin {
            loginType
          }
          ... on PhoneNoLogin {
            loginType
          }
        }
        isActive
        registeredAt
        lastLoggedInAt
      }
      pagination {
        type
        total
      }
    }
  }
`;

const BaseUsers = (props: Props): JSX.Element => {
  const { t } = props;
  const loginTypes = [
    {
      value: '',
      label: t('all'),
    },
    ...props.loginTypes,
  ];
  const roles = [
    {
      value: '',
      label: t('all'),
    },
    ...props.roles,
  ];

  const filterFields: FieldInfo[] = [
    {
      name: 'filter',
      text: t('filter'),
    },
    {
      name: 'loginType',
      text: t('loginType'),
      type: 'picker',
      pickerDataSources: loginTypes,
    },
    {
      name: 'role',
      text: t('role'),
      type: 'picker',
      pickerDataSources: roles,
    },
  ];

  const columns: TableColumn[] = [
    {
      field: 'username',
      label: t('username'),
      minWidth: 100,
    },
    {
      field: 'fullName',
      label: t('fullName'),
      minWidth: 200,
    },
    {
      field: 'email',
      label: t('email'),
      minWidth: 120,
    },
    {
      field: 'phoneNo',
      label: t('phoneNo'),
      minWidth: 90,
    },
    {
      field: ['loginDetail', 'loginType'],
      label: t('loginType'),
      minWidth: 90,
      format: formatWithLookup(props.loginTypes),
    },
    {
      field: 'isActive',
      label: t('isActive'),
      minWidth: 90,
      align: 'center',
      format: (value) => (value ? t('active') : t('inactive')),
    },
    {
      field: 'lastLoggedInAt',
      label: t('lastLoggedInAt'),
      minWidth: 90,
      align: 'center',
      format: formatDateTime,
    },
    {
      field: 'registeredAt',
      label: t('registeredAt'),
      minWidth: 90,
      align: 'center',
      format: formatDateTime,
    },
  ];

  const createUser = async (): Promise<void> => {
    // TODO: implementation
  };

  const [filter, setFilter] = useState<FilterWithOffsetPagination>({
    pageIndex: 0,
    itemsPerPage: config.rowsPerPageOptions[0],
  });
  const setFilterDebounce = debounce(config.debounceDelay, setFilter);

  const onFilterChange = (newFilter: FilterWithOffsetPagination, useDebounce: boolean): void => {
    if (useDebounce) {
      setFilterDebounce(newFilter);
    } else {
      setFilter(newFilter);
    }
  };

  const { data } = useQuery<SearchResult>(GET_USERS_QUERY, {
    variables: filter,
  });

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
          loginType: loginTypes[0].value,
          role: roles[0].value,
        }}
        columns={columns}
        rows={data ? data.users.data : []}
        count={data ? data.users.pagination.total : 0}
      />
    </AdminLayout>
  );
};

BaseUsers.getInitialProps = async () => {
  const loginTypes = [
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
  const roles = [
    {
      value: '0',
      label: 'Admin',
    },
    {
      value: '1',
      label: 'Normal User',
    },
  ];
  return {
    loginTypes,
    roles,
    namespacesRequired: ['common', 'admin_users'],
  };
};

export const Users = withApollo(withTranslation('admin_users')(BaseUsers));
