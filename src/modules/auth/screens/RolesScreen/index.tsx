import React, { useEffect } from 'react';
import { AdminLayout, FormSearch, FormField } from '@app/components';
import {
  WithTranslation,
  FieldInfo,
  FilterWithOffsetPagination,
  TableColumn,
  withTranslation,
  showNotification,
  getErrorMessage,
  DetailDialogParams,
  FieldValueType,
  RowCommand,
  initApolloClient,
  SearchResult,
  catchError,
} from '@app/core';
import { config } from '@app/config';
import debounce from 'lodash/fp/debounce';
import { gql } from 'apollo-boost';
import { withAuth } from '@app/hoc/WithAuth';
import red from '@material-ui/core/colors/red';
import { useImmer } from 'use-immer';
import { Detail, AggregateConfig } from './components';

type Props = WithTranslation;

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
        isActive
        isDefault
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
  const [isBusy, setIsBusy] = useImmer<boolean>(false);
  const [dialogParams, setDialogParams] = useImmer<DetailDialogParams>({
    open: false,
  });

  const create = (): void =>
    setDialogParams(() => ({
      open: true,
      id: undefined,
    }));

  const setOpenDialog = (open: boolean): void =>
    setDialogParams((draft) => {
      draft.open = open;
    });

  const filterFields: FieldInfo<FormData>[] = [
    {
      name: 'filter',
      label: t('filter'),
      md: 12,
      lg: 12,
      xl: 12,
    },
  ];

  const renderIsActive = (data: Record<string, FieldValueType>): JSX.Element => {
    return <FormField value={!!data.isActive} label='' type='switch' />;
  };
  const renderIsDefault = (data: Record<string, FieldValueType>): JSX.Element => (
    <FormField value={!!data.isDefault} label='' type='switch' />
  );
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
      customRender: renderIsActive,
    },
    {
      field: 'isDefault',
      label: t('common:isDefault'),
      minWidth: 100,
      customRender: renderIsDefault,
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

  const [filter, setFilter] = useImmer<FilterWithOffsetPagination>({
    pageIndex: 0,
    itemsPerPage: config.rowsPerPageOptions[0],
  });
  const setFilterDebounce = debounce(config.debounceDelay, setFilter);

  const onFilterChange = (newFilter: FilterWithOffsetPagination, useDebounce: boolean): void => {
    if (useDebounce) {
      setFilterDebounce(() => newFilter);
    } else {
      setFilter(() => newFilter);
    }
  };

  const refresh = (): void => {
    setFilter(() => ({
      ...filter,
    }));
  };

  const rowCommands: RowCommand[] = [
    {
      title: t('common:edit'),
      icon: 'Edit',
      onClick: (data) => {
        setDialogParams(() => ({
          open: true,
          id: data.id,
        }));
      },
    },
    {
      title: t('common:delete'),
      icon: 'Delete',
      onClick: (_data) => {},
      color: red.A400,
    },
  ];

  const [searchResult, setSearchResult] = useImmer<SearchResult>({
    data: [],
    pagination: {
      total: 0,
    },
  });
  useEffect(() => {
    catchError(async () => {
      const apolloClient = initApolloClient();
      const { data, errors } = await apolloClient.query({
        query: GET_ROLES_QUERY,
        variables: filter,
        fetchPolicy: 'network-only',
      });
      if (errors) {
        showNotification({
          type: 'ERROR',
          message: getErrorMessage(errors),
        });
        return;
      }
      setSearchResult(() => data.roles);
    }, setIsBusy)();
  }, [filter]);

  const [aggregateConfigs, setAggregateConfigs] = useImmer<AggregateConfig[]>([]);
  useEffect(() => {
    catchError(async () => {
      const apolloClient = initApolloClient();
      const { data, errors } = await apolloClient.query({
        query: GET_AGGREGATE_CONFIGS_QUERY,
        fetchPolicy: 'network-only',
      });
      if (errors) {
        showNotification({
          type: 'ERROR',
          message: getErrorMessage(errors),
        });
        return;
      }
      setAggregateConfigs(() => data.aggregateConfigs);
    }, setIsBusy)();
  }, []);

  return (
    <AdminLayout title={t('roles')}>
      <FormSearch
        title={t('roles')}
        commandButtons={[
          {
            text: t('common:refresh'),
            onClick: refresh,
            color: 'default',
          },
          {
            text: t('common:create'),
            onClick: create,
          },
        ]}
        defaultFilter={defaultFilter}
        filterFields={filterFields}
        onFilterChange={onFilterChange}
        rowCommands={rowCommands}
        columns={columns}
        rows={searchResult ? searchResult.data : []}
        count={searchResult ? searchResult.pagination.total : 0}
        isBusy={isBusy}
      />
      {dialogParams.open && (
        <Detail
          t={t}
          id={dialogParams.id}
          isBusy={isBusy}
          setIsBusy={setIsBusy}
          open={dialogParams.open}
          setOpen={setOpenDialog}
          aggregateConfigs={aggregateConfigs}
          refresh={refresh}
        />
      )}
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
