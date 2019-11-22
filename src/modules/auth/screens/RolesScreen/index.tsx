import React, { useEffect } from 'react';
import { AdminLayout, FormSearch, FormField, ConfirmationDialog } from '@app/components';
import {
  WithTranslation,
  FieldInfo,
  FilterWithOffsetPagination,
  TableColumn,
  withTranslation,
  showNotification,
  getErrorMessage,
  DialogParams,
  FieldValueType,
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

const DELETE_ROLE_MUTATION = gql`
  mutation DeleteRole($id: ID!) {
    roles {
      delete(payload: { id: $id }) {
        id
      }
    }
  }
`;

const Screen = (props: Props): JSX.Element => {
  const { t } = props;
  const [isBusy, setIsBusy] = useImmer<boolean>(false);
  const [detailParams, setDetailParams] = useImmer<DialogParams>({
    open: false,
  });
  const [deleteParams, setDeleteParams] = useImmer<DialogParams>({
    open: false,
  });

  const create = (): void =>
    setDetailParams(() => ({
      open: true,
      id: undefined,
    }));

  const setOpenDetailDialog = (open: boolean): void =>
    setDetailParams((draft) => {
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

  const [searchResult, setSearchResult] = useImmer<SearchResult>({
    data: [],
    pagination: {
      total: 0,
    },
  });
  useEffect(() => {
    catchError(async () => {
      const { data, errors } = await initApolloClient().query({
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
      const { data, errors } = await initApolloClient().query({
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

  const closeDeleteConfirmationDialog = (): void =>
    setDeleteParams(() => ({
      open: false,
    }));

  const deleteRole = catchError(async () => {
    const { errors } = await initApolloClient().mutate({
      variables: {
        id: deleteParams.id,
      },
      mutation: DELETE_ROLE_MUTATION,
      errorPolicy: 'all',
    });
    if (errors) {
      showNotification({
        type: 'ERROR',
        message: getErrorMessage(errors),
      });
    } else {
      showNotification({
        type: 'SUCCESS',
        message: t('common:dataDeleted'),
      });
      refresh();
      closeDeleteConfirmationDialog();
    }
  }, setIsBusy);

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
        rowCommands={[
          {
            title: t('common:update'),
            icon: 'Edit',
            onClick: (data) => {
              setDetailParams(() => ({
                open: true,
                id: data.id,
              }));
            },
          },
          {
            title: t('common:delete'),
            icon: 'Delete',
            onClick: (data) => {
              setDeleteParams(() => ({
                open: true,
                id: data.id,
              }));
            },
            color: red.A400,
          },
        ]}
        columns={columns}
        rows={searchResult ? searchResult.data : []}
        count={searchResult ? searchResult.pagination.total : 0}
        isBusy={isBusy}
      />
      {detailParams.open && (
        <Detail
          t={t}
          id={detailParams.id}
          isBusy={isBusy}
          setIsBusy={setIsBusy}
          open={detailParams.open}
          setOpen={setOpenDetailDialog}
          aggregateConfigs={aggregateConfigs}
          refresh={refresh}
        />
      )}
      {deleteParams.open && (
        <ConfirmationDialog
          title={t('common:deleteConfirmationTitle')}
          message={t('common:deleteConfirmationMessage')}
          open={deleteParams.open}
          setOpen={(open) =>
            setDeleteParams(() => ({
              open,
            }))
          }
          buttons={[
            {
              color: 'primary',
              title: t('common:delete'),
              onClick: deleteRole,
            },
            {
              title: t('common:back'),
              onClick: closeDeleteConfirmationDialog,
            },
          ]}
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
