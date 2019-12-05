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
  DialogParams,
  FieldValueType,
  initApolloClient,
  SearchResult,
  catchError,
  formatDateTime,
  PickerDataItem,
  formatWithLookup,
  AuthProps,
} from '@app/core';
import { config } from '@app/config';
import debounce from 'lodash/fp/debounce';
import { withAuth } from '@app/hoc/WithAuth';
import { useImmer } from 'use-immer';
import { Detail, Role, ChangePassword } from './components';
import { UPDATE_USER_MUTATION, GET_USERS_QUERY, GET_USERS_LOOKUPS_QUERY } from './graphql';

type Props = WithTranslation & AuthProps;

interface FormData {
  filter: string;
  loginType: string;
  role: string;
}

const defaultFilter: FormData = {
  filter: '',
  loginType: '',
  role: 'role',
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
  const [roles, setRoles] = useImmer<Role[]>([]);
  const [roleLookups, setRoleLookups] = useImmer<PickerDataItem<string>[]>([]);
  const [genders, setGenders] = useImmer<PickerDataItem<string>[]>([]);
  const [detailParams, setDetailParams] = useImmer<DialogParams>({
    open: false,
  });
  const [changePasswordParams, setChangePasswordParams] = useImmer<DialogParams>({
    open: false,
  });
  const loginTypes: PickerDataItem<string>[] = [
    {
      value: '',
      label: t('common:all'),
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

  const openChangePasswordDialog = (data: Record<string, FieldValueType>): void =>
    setChangePasswordParams(() => ({
      open: true,
      id: data.id as string,
    }));

  const closeChangePasswordDialog = (): void =>
    setChangePasswordParams(() => ({
      open: false,
    }));

  const updateSearchResult = catchError(async (field: string, id: string, value: FieldValueType) => {
    const variables = {
      id,
      [field]: value,
    };
    const { errors } = await initApolloClient().mutate({
      variables,
      mutation: UPDATE_USER_MUTATION,
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
        query: GET_USERS_QUERY,
        variables: filter,
      });
      if (errors) {
        showNotification({
          type: 'ERROR',
          message: getErrorMessage(errors),
        });
        return;
      }
      setSearchResult(() => data.users);
    }, setIsBusy)();
  }, [filter]);

  useEffect(() => {
    catchError(async () => {
      const { data, errors } = await initApolloClient().query({
        query: GET_USERS_LOOKUPS_QUERY,
      });
      if (errors) {
        showNotification({
          type: 'ERROR',
          message: getErrorMessage(errors),
        });
        return;
      }
      setRoleLookups(() => [
        {
          value: '',
          label: t('common:none'),
        },
        ...(data
          ? data.roles.data.map((role: { id: string; name: string }) => ({
              value: role.id,
              label: role.name,
            }))
          : []),
      ]);
      setRoles(() => (data ? data.roles.data : []));
      setGenders(() => [
        {
          value: '',
          label: t('common:none'),
        },
        ...(data ? (data.genders.data as PickerDataItem<string>[]) : []),
      ]);
    }, setIsBusy)();
  }, []);
  /* --- effects - end --- */

  /* --- renders - begin */
  const filterFields: FieldInfo<FormData>[] = [
    {
      name: 'filter',
      label: t('filter'),
    },
    {
      name: 'loginType',
      label: t('loginType'),
      type: 'picker',
      pickerDataSources: loginTypes,
    },
    {
      name: 'role',
      label: t('role'),
      type: 'picker',
      pickerDataSources: roleLookups,
    },
  ];

  const columns: (TableColumn | false)[] = [
    validatePermissions('users', 'viewAny', 'displayName') && {
      field: 'displayName',
      label: t('displayName'),
      minWidth: 250,
    },
    validatePermissions('users', 'viewAny', 'username') && {
      field: 'username',
      label: t('username'),
      minWidth: 150,
    },
    validatePermissions('users', 'viewAny', 'email') && {
      field: 'email',
      label: t('email'),
      minWidth: 150,
    },
    validatePermissions('users', 'viewAny', 'phoneNo') && {
      field: 'phoneNo',
      label: t('phoneNo'),
      minWidth: 120,
    },
    validatePermissions('users', 'viewAny', 'loginDetail') && {
      field: ['loginDetail', 'loginType'],
      label: t('loginType'),
      minWidth: 120,
      format: formatWithLookup(loginTypes),
    },
    validatePermissions('users', 'viewAny', 'isActive') && {
      field: 'isActive',
      label: t('common:isActive'),
      minWidth: 100,
      customRender(data) {
        return (
          <FormField
            value={!!data.isActive}
            label=''
            type='switch'
            disabled={isBusy || !validatePermissions('users', 'updateAny', 'isActive')}
            onValueChange={(value) => updateSearchResult('isActive', data.id, value)}
          />
        );
      },
    },
    validatePermissions('users', 'viewAny', 'lastLoggedInAt') && {
      field: 'lastLoggedInAt',
      label: t('lastLoggedInAt'),
      minWidth: 200,
      align: 'center',
      format: formatDateTime,
    },
    validatePermissions('users', 'viewAny', 'createdBy') && {
      field: 'createdByName',
      label: t('common:createdBy'),
      minWidth: 200,
    },
    validatePermissions('users', 'viewAny', 'createdAt') && {
      field: 'createdAt',
      label: t('common:createdAt'),
      minWidth: 200,
      format: formatDateTime,
    },
    validatePermissions('users', 'viewAny', 'lastModifiedBy') && {
      field: 'lastModifiedByName',
      label: t('common:lastModifiedBy'),
      minWidth: 200,
    },
    validatePermissions('users', 'viewAny', 'lastModifiedAt') && {
      field: 'lastModifiedAt',
      label: t('common:lastModifiedAt'),
      minWidth: 200,
      format: formatDateTime,
    },
  ];
  /* --- renders --- end */
  return (
    <AdminLayout title={t('users')}>
      <FormSearch
        title={t('users')}
        commandButtons={[
          {
            title: t('common:refresh'),
            onClick: refresh,
            disabled: isBusy,
            color: 'default',
          },
          validatePermissions('users', 'create') && {
            title: t('common:create'),
            onClick: create,
            disabled: isBusy,
          },
        ]}
        defaultFilter={defaultFilter}
        filterFields={filterFields}
        onFilterChange={onFilterChange}
        rowCommands={[
          validatePermissions('users', 'viewAny') && {
            title: t('common:viewDetail'),
            icon: 'FindInPage',
            onClick: openDetailDialog,
          },
          validatePermissions('users', 'updateAny', 'password') && {
            title: t('changePassword'),
            icon: 'Lock',
            onClick: openChangePasswordDialog,
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
          refresh={refresh}
          roles={roles}
          genders={genders}
          validatePermissions={validatePermissions}
        />
      )}
      {changePasswordParams.open && changePasswordParams.id && (
        <ChangePassword
          t={t}
          id={changePasswordParams.id}
          isBusy={isBusy}
          setIsBusy={setIsBusy}
          open={changePasswordParams.open}
          onClose={closeChangePasswordDialog}
        />
      )}
    </AdminLayout>
  );
};

const ScreenBeforeTranslation = withAuth(Screen, (validatePermissions) => validatePermissions('users', 'viewAny'));

ScreenBeforeTranslation.getInitialProps = async () => {
  return {
    namespacesRequired: ['common', 'admin_users'],
  };
};

export const UsersScreen = withTranslation('admin_users')(ScreenBeforeTranslation);
