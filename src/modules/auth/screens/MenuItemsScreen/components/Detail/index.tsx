import React, { useEffect } from 'react';
import * as yup from 'yup';
import { GraphQLError } from 'graphql';
import { useImmer } from 'use-immer';
import { FormDialog } from '@app/components';
import {
  FieldInfo,
  showNotification,
  initApolloClient,
  getErrorMessage,
  catchError,
  TFunction,
  ValidatePermissions,
  getUpdatedData,
  getStringValidationSchema,
  getBooleanValidationSchema,
  getNumberValidationSchema,
  PickerDataItem,
} from '@app/core';
import { config } from '@app/config';
import { GET_MENU_ITEM_QUERY, CREATE_MENU_ITEM_MUTATION, UPDATE_MENU_ITEM_MUTATION } from '../../graphql';

interface Props {
  id?: string;
  t: TFunction;
  isBusy: boolean;
  setIsBusy: (f: (draft: boolean) => boolean | void) => void;
  open: boolean;
  onClose: () => void;
  refresh: () => void;
  validatePermissions: ValidatePermissions;
}

export type MenuItemType = 'ADMIN' | 'WEBSITE';

interface FormData {
  id?: string;
  name: string;
  lang: string;
  url: string;
  icon: string;
  permissions: string;
  isActive: boolean;
  sortOrder: number | string;
  type: MenuItemType;
  parentId?: string;
}

const defaultMenuItem: FormData = {
  name: '',
  lang: config.i18n.defaultLang,
  url: '',
  icon: '',
  permissions: '',
  isActive: true,
  sortOrder: '0',
  type: 'ADMIN',
  parentId: '',
};

export const types: PickerDataItem<MenuItemType>[] = [
  {
    value: 'ADMIN',
    label: 'ADMIN',
  },
  {
    value: 'WEBSITE',
    label: 'WEBSITE',
  },
];

export const langs: PickerDataItem<string>[] = config.i18n.languages.map((lang) => ({
  value: lang.code,
  label: lang.name,
}));

export const Detail = (props: Props): JSX.Element => {
  /* --- variables & states - begin --- */
  const { id, t, isBusy, setIsBusy, open, onClose, refresh, validatePermissions } = props;
  const [menuItem, setMenuItem] = useImmer(defaultMenuItem);
  const validationParams = {
    id,
    t,
    validatePermissions,
    aggregateName: 'menuItems',
  };
  const validationSchema = yup.object().shape<Partial<FormData>>({
    name: getStringValidationSchema({
      ...validationParams,
      field: 'name',
      required: true,
    }),
    lang: getStringValidationSchema({
      ...validationParams,
      field: 'lang',
      required: true,
    }),
    url: getStringValidationSchema({
      ...validationParams,
      field: 'url',
    }),
    icon: getStringValidationSchema({
      ...validationParams,
      field: 'icon',
    }),
    permissions: getStringValidationSchema({
      ...validationParams,
      field: 'permissions',
    }),
    parentId: getStringValidationSchema({
      ...validationParams,
      field: 'parentId',
    }),
    isActive: getBooleanValidationSchema({
      ...validationParams,
      field: 'isActive',
      required: true,
    }),
    type: getStringValidationSchema({
      ...validationParams,
      field: 'parentId',
      required: true,
    }) as yup.Schema<MenuItemType>,
    sortOrder: getNumberValidationSchema({
      ...validationParams,
      field: 'sortOrder',
      required: true,
      integer: true,
      min: 0,
    }),
  });
  /* --- variables & states - end --- */

  /* --- actions & events - begin --- */
  const onSubmit = catchError(async (input: FormData) => {
    let errors: readonly GraphQLError[] | undefined;
    if (!id) {
      errors = (await initApolloClient().mutate({
        variables: {
          ...input,
          sortOrder: parseInt(input.sortOrder as string, 10),
        },
        mutation: CREATE_MENU_ITEM_MUTATION,
      })).errors;
    } else {
      const updatedData = getUpdatedData(menuItem, input, validatePermissions, 'menuItems', 'updateAny');
      if (updatedData && updatedData.sortOrder !== undefined) {
        updatedData.sortOrder = parseInt(updatedData.sortOrder as string, 10);
      }
      if (!updatedData) {
        showNotification({
          type: 'WARNING',
          message: t('common:pleaseUpdateData'),
        });
        return;
      }
      errors = (await initApolloClient().mutate({
        variables: {
          id,
          ...updatedData,
        },
        mutation: UPDATE_MENU_ITEM_MUTATION,
      })).errors;
    }
    if (errors) {
      showNotification({
        type: 'ERROR',
        message: getErrorMessage(errors, {
          INVALID_PAYLOAD_UNIQUE_NAME: t('common:uniqueError', {
            field: t('name'),
          }),
        }),
      });
    } else {
      showNotification({
        type: 'SUCCESS',
        message: t('common:dataSaved'),
      });
      refresh();
      onClose();
    }
  }, setIsBusy);
  /* --- actions & events - end --- */

  /* --- effects - begin --- */
  useEffect(() => {
    if (!id || !open) {
      return;
    }
    catchError(async () => {
      const { data, errors } = await initApolloClient().query({
        query: GET_MENU_ITEM_QUERY,
        variables: {
          id,
        },
      });
      if (errors) {
        showNotification({
          type: 'ERROR',
          message: getErrorMessage(errors),
        });
        return;
      }
      setMenuItem(() => ({
        ...data.menuItem,
        url: data.menuItem.url || '',
        icon: data.menuItem.icon || '',
        permissions: data.menuItem.permissions || '',
        parentId: data.menuItem.parentId || '',
      }));
    }, setIsBusy)();
  }, [id, open]);
  /* --- effects - end --- */

  /* --- renders - begin --- */
  const fields: FieldInfo<FormData>[] = [
    {
      name: 'id',
      label: t('id'),
      disabled: true,
    },
    {
      name: 'name',
      label: t('name'),
      required: true,
      disabled: !!id && !validatePermissions('menuItems', 'updateAny', 'name'),
      hidden: !!id && !validatePermissions('menuItems', 'viewAny', 'name'),
    },
    {
      name: 'isActive',
      label: t('common:isActive'),
      required: true,
      type: 'switch',
      disabled: !!id && !validatePermissions('menuItems', 'updateAny', 'isActive'),
      hidden: !!id && !validatePermissions('menuItems', 'viewAny', 'isActive'),
    },
    {
      name: 'type',
      label: t('type'),
      required: true,
      disabled: !!id && !validatePermissions('menuItems', 'updateAny', 'type'),
      hidden: !!id && !validatePermissions('menuItems', 'viewAny', 'type'),
      type: 'picker',
      pickerDataSources: types,
    },
    {
      name: 'lang',
      label: t('lang'),
      required: true,
      disabled: !!id && !validatePermissions('menuItems', 'updateAny', 'lang'),
      hidden: !!id && !validatePermissions('menuItems', 'viewAny', 'lang'),
      type: 'picker',
      pickerDataSources: langs,
    },
    {
      name: 'sortOrder',
      label: t('sortOrder'),
      required: true,
      disabled: !!id && !validatePermissions('menuItems', 'updateAny', 'sortOrder'),
      hidden: !!id && !validatePermissions('menuItems', 'viewAny', 'sortOrder'),
    },
    {
      name: 'url',
      label: t('url'),
      disabled: !!id && !validatePermissions('menuItems', 'updateAny', 'url'),
      hidden: !!id && !validatePermissions('menuItems', 'viewAny', 'url'),
    },
    {
      name: 'icon',
      label: t('icon'),
      disabled: !!id && !validatePermissions('menuItems', 'updateAny', 'icon'),
      hidden: !!id && !validatePermissions('menuItems', 'viewAny', 'icon'),
    },
    {
      name: 'permissions',
      label: t('permissions'),
      disabled: !!id && !validatePermissions('menuItems', 'updateAny', 'permissions'),
      hidden: !!id && !validatePermissions('menuItems', 'viewAny', 'permissions'),
    },
    {
      name: 'parentId',
      label: t('parentId'),
      disabled: !!id && !validatePermissions('menuItems', 'updateAny', 'parentId'),
      hidden: !!id && !validatePermissions('menuItems', 'viewAny', 'parentId'),
    },
  ];
  /* --- renders - end --- */

  return (
    <FormDialog
      title={`${id ? t('common:create') : t('common:update')} ${t('menuItems')}`}
      open={open}
      onClose={onClose}
      initialValues={menuItem}
      fields={fields}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      isBusy={isBusy}
      buttons={[
        validatePermissions('menuItems', 'updateAny') && {
          type: 'submit',
          title: t('common:save'),
        },
        {
          title: t('common:back'),
          onClick: onClose,
          color: 'default',
        },
      ]}
      fullScreen
    />
  );
};
