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
  DialogParams,
} from '@app/core';
import { config } from '@app/config';
import debounce from 'lodash/fp/debounce';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { withAuth } from '@app/hoc/WithAuth';
import { Detail, AggregateConfig } from './components';

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

const GET_AGGREGATE_CONFIGS_QUERY = gql`
  query getAggregateConfigs {
    aggregateConfigs {
      id
      name
      viewFields
      updateFields
      customActions
      excludedActions
    }
  }
`;

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
  const [isBusy, setIsBusy] = useState<boolean>(false);
  const [dialogInfo, setDialogInfo] = useState<DialogParams<string>>({
    open: false,
    mode: 'create',
  });

  const create = (): void =>
    setDialogInfo({
      mode: 'create',
      open: true,
    });

  const setOpenDialog = (open: boolean): void =>
    setDialogInfo({
      ...dialogInfo,
      open,
    });

  const filterFields: FieldInfo<FormData>[] = [
    {
      name: 'filter',
      label: t('filter'),
      lg: 12,
      xl: 12,
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
      field: 'isActive',
      label: t('common:isActive'),
      minWidth: 100,
    },
    {
      field: 'isDefault',
      label: t('common:isDefault'),
      minWidth: 100,
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

  const { data: aggregateConfigsData, error: aggregateConfigsError } = useQuery<{
    aggregateConfigs: AggregateConfig[];
  }>(GET_AGGREGATE_CONFIGS_QUERY, {
    variables: filter,
    fetchPolicy: 'no-cache',
  });
  const aggregateConfigs = aggregateConfigsData ? aggregateConfigsData.aggregateConfigs : undefined;

  if (aggregateConfigsError) {
    showNotification({
      type: 'ERROR',
      message:
        aggregateConfigsError.graphQLErrors.length > 0
          ? getErrorMessage(aggregateConfigsError.graphQLErrors, {})
          : aggregateConfigsError.message,
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
      <Detail
        t={t}
        title={`${dialogInfo.mode ? t('common:create') : t('common:edit')} ${t('roles')}`}
        isBusy={isBusy}
        setIsBusy={setIsBusy}
        open={dialogInfo.open}
        setOpen={setOpenDialog}
        aggregateConfigs={aggregateConfigs}
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
