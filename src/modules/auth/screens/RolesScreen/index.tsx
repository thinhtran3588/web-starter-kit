import React, { useState } from 'react';
import { AdminLayout, FormSearch } from '@app/components';
import {
  WithTranslation,
  FieldInfo,
  FilterWithOffsetPagination,
  SearchRecord,
  OffsetPaginationResult,
  TableColumn,
  withTranslation,
  showNotification,
  getErrorMessage,
} from '@app/core';
import { config } from '@app/config';
import debounce from 'lodash/fp/debounce';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { withAuth } from '@app/hoc/WithAuth';

type Props = WithTranslation;

interface SearchResult {
  roles: {
    data: SearchRecord[];
    pagination: OffsetPaginationResult;
  };
}

interface FormData {
  filter: string;
}

const defaultFilter: FormData = {
  filter: '',
};

const GET_ROLES_QUERY = gql`
  query getUsers($filter: String, $pageIndex: Int!, $itemsPerPage: Int!) {
    roles(payload: { filter_textSearch: $filter, pageIndex: $pageIndex, itemsPerPage: $itemsPerPage }) {
      data {
        id
        name
        description
        createdAt
        createdBy
        lastModifiedAt
        lastModifiedBy
      }
      pagination {
        type
        total
      }
    }
  }
`;

const Screen = (props: Props): JSX.Element => {
  const { t } = props;
  const create = async (): Promise<void> => {
    // TODO: implementation
  };

  const filterFields: FieldInfo<FormData>[] = [
    {
      name: 'filter',
      label: t('filter'),
      lg: 6,
      xl: 6,
    },
  ];

  const columns: TableColumn[] = [
    {
      field: 'name',
      label: t('name'),
      minWidth: 150,
    },
    {
      field: 'description',
      label: t('description'),
      minWidth: 300,
    },
    {
      field: 'createdBy',
      label: t('common:createdBy'),
      minWidth: 100,
    },
    {
      field: 'createdAt',
      label: t('common:createdAt'),
      minWidth: 100,
    },
    {
      field: 'lastModifiedBy',
      label: t('common:lastModifiedBy'),
      minWidth: 100,
    },
    {
      field: 'lastModifiedAt',
      label: t('common:lastModifiedAt'),
      minWidth: 100,
    },
  ];

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

  const { data, error } = useQuery<SearchResult>(GET_ROLES_QUERY, {
    variables: filter,
    fetchPolicy: 'no-cache',
  });

  if (error) {
    showNotification({
      type: 'ERROR',
      message: error.graphQLErrors.length > 0 ? getErrorMessage(error.graphQLErrors, {}) : error.message,
    });
  }

  return (
    <AdminLayout title={t('roles')}>
      <FormSearch
        title={t('roles')}
        commandButtons={[
          {
            text: t('common:create'),
            onClick: create,
          },
        ]}
        defaultFilter={defaultFilter}
        filterFields={filterFields}
        onFilterChange={onFilterChange}
        columns={columns}
        rows={data ? data.roles.data : []}
        count={data ? data.roles.pagination.total : 0}
      />
    </AdminLayout>
  );
};

const ScreenBeforeTranslation = withAuth(Screen);

ScreenBeforeTranslation.getInitialProps = async () => {
  return {
    namespacesRequired: ['common', 'admin_roles'],
  };
};

export const RolesScreen = withTranslation('admin_roles')(ScreenBeforeTranslation);
