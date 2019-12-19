import React, { useEffect } from 'react';
import { AdminLayout, FormSearch, FormField, ConfirmationDialog, Icon } from '@app/components';
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
  AuthProps,
  formatWithLookup,
} from '@app/core';
import { config } from '@app/config';
import debounce from 'lodash/fp/debounce';
import { withAuth } from '@app/hoc/WithAuth';
import { useImmer } from 'use-immer';
import { Detail, MenuItemType, types, langs } from './components';
import { GET_MENU_ITEMS_QUERY, DELETE_MENU_ITEM_MUTATION, UPDATE_MENU_ITEM_MUTATION } from './graphql';

type Props = WithTranslation & AuthProps;

interface FormData {
  type: MenuItemType | '';
  lang: string;
}

const defaultFilter: FormData = {
  type: '',
  lang: '',
};

const Screen = (props: Props): JSX.Element => {
  /* --- variables & states - begin --- */
  const { t, validatePermissions } = props;
  const [isBusy, setIsBusy] = useImmer<boolean>(false);
  const [filter, setFilter] = useImmer<FilterWithOffsetPagination>({
    pageIndex: 0,
    itemsPerPage: config.rowsPerPageOptions[0],
  });
  const [searchResult, setSearchResult] = useImmer<SearchResult>({
    data: [],
    pagination: {
      total: 0,
    },
  });
  const setFilterDebounce = debounce(config.debounceDelay, setFilter);
  const [detailParams, setDetailParams] = useImmer<DialogParams>({
    open: false,
  });
  const [deleteParams, setDeleteParams] = useImmer<DialogParams>({
    open: false,
  });
  const lookupTypes = [
    {
      value: '',
      label: t('common:all'),
    },
    ...types,
  ];
  const lookupLangs = [
    {
      value: '',
      label: t('common:all'),
    },
    ...langs,
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

  const deleteMenuItem = catchError(async () => {
    const { errors } = await initApolloClient().mutate({
      variables: {
        id: deleteParams.id,
      },
      mutation: DELETE_MENU_ITEM_MUTATION,
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

  const updateSearchResult = catchError(async (field: string, id: string, value: FieldValueType) => {
    const variables = {
      id,
      [field]: value,
    };
    const { errors } = await initApolloClient().mutate({
      variables,
      mutation: UPDATE_MENU_ITEM_MUTATION,
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
  /* --- actions & events - end --- */

  /* --- effects - begin --- */
  useEffect(() => {
    catchError(async () => {
      const { data, errors } = await initApolloClient().query({
        query: GET_MENU_ITEMS_QUERY,
        variables: {
          ...filter,
          type: filter.type || undefined,
        },
      });
      if (errors) {
        showNotification({
          type: 'ERROR',
          message: getErrorMessage(errors),
        });
        return;
      }
      setSearchResult(() => data.menuItems);
    }, setIsBusy)();
  }, [filter]);
  /* --- effects - end --- */

  /* --- renders - begin */
  const filterFields: FieldInfo<FormData>[] = [
    {
      name: 'type',
      label: t('type'),
      type: 'picker',
      pickerDataSources: lookupTypes,
    },
    {
      name: 'lang',
      label: t('lang'),
      type: 'picker',
      pickerDataSources: lookupLangs,
    },
  ];

  const columns: (TableColumn | false)[] = [
    {
      field: 'id',
      label: t('id'),
      minWidth: 100,
    },
    validatePermissions('menuItems', 'viewAny', 'name') && {
      field: 'name',
      label: t('name'),
      minWidth: 150,
    },
    validatePermissions('menuItems', 'viewAny', 'lang') && {
      field: 'lang',
      label: t('lang'),
      minWidth: 150,
      sortable: false,
      format: formatWithLookup(lookupLangs),
    },
    validatePermissions('menuItems', 'viewAny', 'url') && {
      field: 'url',
      label: t('url'),
      minWidth: 150,
      sortable: false,
    },
    validatePermissions('menuItems', 'viewAny', 'icon') && {
      field: 'icon',
      label: t('icon'),
      minWidth: 80,
      customRender(data) {
        return <Icon name={data.icon} />;
      },
      sortable: false,
    },
    validatePermissions('menuItems', 'viewAny', 'permissions') && {
      field: 'permissions',
      label: t('permissions'),
      minWidth: 150,
      sortable: false,
    },
    validatePermissions('menuItems', 'viewAny', 'isActive') && {
      field: 'isActive',
      label: t('common:isActive'),
      minWidth: 100,
      customRender(data) {
        return (
          <FormField
            value={!!data.isActive}
            label=''
            type='switch'
            disabled={isBusy || !validatePermissions('menuItems', 'updateAny', 'isActive')}
            onValueChange={(value) => updateSearchResult('isActive', data.id, value)}
          />
        );
      },
      sortable: false,
    },
    validatePermissions('menuItems', 'viewAny', 'parentId') && {
      field: 'parentId',
      label: t('parentId'),
      minWidth: 100,
      sortable: false,
    },
    validatePermissions('menuItems', 'viewAny', 'sortOrder') && {
      field: 'sortOrder',
      label: t('sortOrder'),
      minWidth: 80,
    },
    validatePermissions('menuItems', 'viewAny', 'type') && {
      field: 'type',
      label: t('type'),
      minWidth: 100,
      sortable: false,
    },
    validatePermissions('menuItems', 'viewAny', 'createdBy') && {
      field: 'createdByName',
      label: t('common:createdBy'),
      minWidth: 200,
      sortable: false,
    },
    validatePermissions('menuItems', 'viewAny', 'createdAt') && {
      field: 'createdAt',
      label: t('common:createdAt'),
      minWidth: 200,
      format: formatDateTime,
    },
    validatePermissions('menuItems', 'viewAny', 'lastModifiedBy') && {
      field: 'lastModifiedByName',
      label: t('common:lastModifiedBy'),
      minWidth: 200,
      sortable: false,
    },
    validatePermissions('menuItems', 'viewAny', 'lastModifiedAt') && {
      field: 'lastModifiedAt',
      label: t('common:lastModifiedAt'),
      minWidth: 200,
      format: formatDateTime,
    },
  ];
  /* --- renders --- end */

  return (
    <AdminLayout title={t('menuItems')}>
      <FormSearch
        title={t('menuItems')}
        commandButtons={[
          {
            title: t('common:refresh'),
            onClick: refresh,
            disabled: isBusy,
            color: 'default',
          },
          validatePermissions('menuItems', 'create') && {
            title: t('common:create'),
            onClick: create,
            disabled: isBusy,
          },
        ]}
        defaultFilter={defaultFilter}
        filterFields={filterFields}
        onFilterChange={onFilterChange}
        rowCommands={[
          validatePermissions('menuItems', 'viewAny') && {
            title: t('common:viewDetail'),
            icon: 'FindInPage',
            onClick: openDetailDialog,
          },
          validatePermissions('menuItems', 'deleteAny') && {
            title: t('common:delete'),
            icon: 'Delete',
            onClick: openDeleteConfirmationDialog,
            color: 'error',
          },
        ]}
        columns={columns}
        rows={searchResult ? searchResult.data : []}
        count={searchResult ? searchResult.pagination.total : 0}
        isBusy={isBusy}
        sortable
        orderBy={{
          field: 'sortOrder',
          direction: 'asc',
        }}
      />
      {detailParams.open && (
        <Detail
          t={t}
          id={detailParams.id}
          isBusy={isBusy}
          setIsBusy={setIsBusy}
          open={detailParams.open}
          onClose={closeDetailDialog}
          refresh={refresh}
          validatePermissions={validatePermissions}
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
              color: 'error',
              title: t('common:delete'),
              onClick: deleteMenuItem,
            },
            {
              color: 'default',
              title: t('common:back'),
              onClick: closeDeleteConfirmationDialog,
            },
          ]}
          color='error'
        />
      )}
    </AdminLayout>
  );
};

const ScreenBeforeTranslation = withAuth(Screen, (validatePermissions) => validatePermissions('menuItems', 'viewAny'));

ScreenBeforeTranslation.getInitialProps = async () => {
  return {
    namespacesRequired: ['common', 'admin_menu_items'],
  };
};

export const MenuItemsScreen = withTranslation('admin_menu_items')(ScreenBeforeTranslation);
