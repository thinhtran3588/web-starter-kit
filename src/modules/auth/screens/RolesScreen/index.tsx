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
  formatDateTime,
} from '@app/core';
import { config } from '@app/config';
import debounce from 'lodash/fp/debounce';
import { withAuth } from '@app/hoc/WithAuth';
import red from '@material-ui/core/colors/red';
import { useImmer } from 'use-immer';
import { Detail, AggregateConfig } from './components';
import { GET_ROLES_QUERY, GET_AGGREGATE_CONFIGS_QUERY, DELETE_ROLE_MUTATION, UPDATE_ROLE_MUTATION } from './graphql';

type Props = WithTranslation;

interface FormData {
  filter: string;
}

const defaultFilter: FormData = {
  filter: '',
};

const Screen = (props: Props): JSX.Element => {
  /* --- variables & states - begin --- */
  const { t } = props;
  const [isBusy, setIsBusy] = useImmer<boolean>(false);
  const [filter, setFilter] = useImmer<FilterWithOffsetPagination>({
    pageIndex: 0,
    itemsPerPage: config.rowsPerPageOptions[0],
  });
  const setFilterDebounce = debounce(config.debounceDelay, setFilter);
  const [aggregateConfigs, setAggregateConfigs] = useImmer<AggregateConfig[]>([]);
  const [detailParams, setDetailParams] = useImmer<DialogParams>({
    open: false,
  });
  const [deleteParams, setDeleteParams] = useImmer<DialogParams>({
    open: false,
  });
  const [searchResult, setSearchResult] = useImmer<SearchResult>({
    data: [],
    pagination: {
      total: 0,
    },
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

  const updateSearchResult = catchError(async (field: string, id: string, value: FieldValueType) => {
    const variables = {
      id,
      [field]: value,
    };
    const { errors } = await initApolloClient().mutate({
      variables,
      mutation: UPDATE_ROLE_MUTATION,
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
        message: t('common:dataSaved'),
      });
    }
    setSearchResult((draft) => {
      const record = draft.data.find((m) => m.id === id);
      if (record) {
        record[field] = value;
      }
    });
  }, setIsBusy);

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
      customRender(data) {
        return (
          <FormField
            value={!!data.isActive}
            label=''
            type='switch'
            disabled={isBusy}
            onValueChange={(value) => updateSearchResult('isActive', data.id, value)}
          />
        );
      },
    },
    {
      field: 'isDefault',
      label: t('common:isDefault'),
      minWidth: 100,
      customRender(data) {
        return (
          <FormField
            value={!!data.isDefault}
            label=''
            type='switch'
            disabled={isBusy}
            onValueChange={(value) => updateSearchResult('isDefault', data.id, value)}
          />
        );
      },
    },
    {
      field: 'createdByName',
      label: t('common:createdBy'),
      minWidth: 100,
    },
    {
      field: 'createdAt',
      label: t('common:createdAt'),
      minWidth: 100,
      format: formatDateTime,
    },
    {
      field: 'lastModifiedByName',
      label: t('common:lastModifiedBy'),
      minWidth: 100,
    },
    {
      field: 'lastModifiedAt',
      label: t('common:lastModifiedAt'),
      minWidth: 100,
      format: formatDateTime,
    },
  ];
  /* --- variables & states - end --- */

  /* --- actions & events - begin --- */
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

  const create = (): void =>
    setDetailParams(() => ({
      open: true,
      id: undefined,
    }));

  const openDetailDialog = (data: Record<string, FieldValueType>): void =>
    setDetailParams(() => ({
      open: true,
      id: data.id as string,
    }));

  const closeDetailDialog = (): void =>
    setDetailParams(() => ({
      open: false,
    }));

  const openDeleteConfirmationDialog = (data: Record<string, FieldValueType>): void =>
    setDeleteParams(() => ({
      open: true,
      id: data.id as string,
    }));

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
  /* --- actions & events - end --- */

  /* --- effects - start --- */
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
  /* --- effects - end --- */

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
            onClick: openDetailDialog,
          },
          {
            title: t('common:delete'),
            icon: 'Delete',
            onClick: openDeleteConfirmationDialog,
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
          onClose={closeDetailDialog}
          aggregateConfigs={aggregateConfigs}
          refresh={refresh}
        />
      )}
      {deleteParams.open && (
        <ConfirmationDialog
          title={t('common:deleteConfirmationTitle')}
          message={t('common:deleteConfirmationMessage')}
          open={deleteParams.open}
          onClose={closeDeleteConfirmationDialog}
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
