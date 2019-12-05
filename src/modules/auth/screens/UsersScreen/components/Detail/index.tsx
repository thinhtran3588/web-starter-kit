import React, { useEffect } from 'react';
import merge from 'lodash/fp/merge';
import * as yup from 'yup';
import { GraphQLError } from 'graphql';
import { useImmer } from 'use-immer';
import { FormDialog, Tabs, renderFormFields } from '@app/components';
import {
  FieldInfo,
  showNotification,
  initApolloClient,
  getErrorMessage,
  catchError,
  TFunction,
  PickerDataItem,
  PermissionTree,
  sanitizeFormData,
  ValidatePermissions,
  getUpdatedData,
} from '@app/core';
import { config } from '@app/config';
import { PermissionsTable } from '../PermissionsTable';
import { GET_USER_QUERY, CREATE_USER_MUTATION, UPDATE_USER_MUTATION } from '../../graphql';

interface Props {
  id?: string;
  t: TFunction;
  isBusy: boolean;
  setIsBusy: (f: (draft: boolean) => boolean | void) => void;
  open: boolean;
  onClose: () => void;
  roles: Role[];
  genders: PickerDataItem<string>[];
  refresh: () => void;
  validatePermissions: ValidatePermissions;
}

interface FormData {
  username: string;
  password: string;
  email: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  phoneNo?: string;
  address?: string;
  dob?: string;
  gender?: string;
  roles: string[];
  isActive: boolean;
  permissions?: string;
  loginDetail: {
    loginType: string;
  };
}

export interface Role {
  id: string;
  name: string;
  permissions: string;
  isActive: boolean;
  isDefault: boolean;
}

const defaultUser: FormData = {
  username: '',
  password: '',
  email: '',
  firstName: '',
  lastName: '',
  phoneNo: '',
  address: '',
  dob: '',
  gender: '',
  roles: [],
  isActive: true,
  loginDetail: {
    loginType: 'EMAIL',
  },
};

export const Detail = (props: Props): JSX.Element => {
  /* --- variables & states - begin --- */
  const { id, t, isBusy, setIsBusy, open, onClose, roles, genders, refresh, validatePermissions } = props;
  const roleLookups: PickerDataItem<string>[] = roles.map((role) => ({
    value: role.id,
    label: role.name,
  }));
  const [user, setUser] = useImmer({
    ...defaultUser,
    roles: roles.filter((role) => role.isActive && role.isDefault).map((role) => role.id),
  });
  const validationSchema = yup.object().shape<Partial<FormData>>({
    username:
      !!id && !validatePermissions('users', 'updateAny', 'username')
        ? undefined
        : yup
            .string()
            .required(
              t('common:requiredError', {
                field: t('username'),
              }),
            )
            .matches(config.regex.username, t('common:invalidUsername')),
    email:
      !!id && !validatePermissions('users', 'updateAny', 'email')
        ? undefined
        : yup
            .string()
            .required(
              t('common:requiredError', {
                field: t('email'),
              }),
            )
            .matches(
              config.regex.email,
              t('common:invalidError', {
                field: t('email'),
              }),
            ),
    password:
      !!id && !validatePermissions('users', 'updateAny', 'password')
        ? undefined
        : yup
            .string()
            .required(
              t('common:requiredError', {
                field: t('password'),
              }),
            )
            .matches(config.regex.password, t('common:invalidPassword')),
    firstName:
      !!id && !validatePermissions('users', 'updateAny', 'firstName')
        ? undefined
        : yup
            .string()
            .required(
              t('common:requiredError', {
                field: t('firstName'),
              }),
            )
            .max(
              config.validation.string.maxLength,
              t('common:maxLengthError', {
                field: t('firstName'),
                maxCharacters: config.validation.string.maxLength,
              }),
            ),
    middleName:
      !!id && !validatePermissions('users', 'updateAny', 'middleName')
        ? undefined
        : yup.string().max(
            config.validation.string.maxLength,
            t('common:maxLengthError', {
              field: t('middleName'),
              maxCharacters: config.validation.string.maxLength,
            }),
          ),
    lastName:
      !!id && !validatePermissions('users', 'updateAny', 'lastName')
        ? undefined
        : yup
            .string()
            .required(
              t('common:requiredError', {
                field: t('lastName'),
              }),
            )
            .max(
              config.validation.string.maxLength,
              t('common:maxLengthError', {
                field: t('lastName'),
                maxCharacters: config.validation.string.maxLength,
              }),
            ),
    phoneNo:
      !!id && !validatePermissions('users', 'updateAny', 'phoneNo')
        ? undefined
        : yup.string().max(
            config.validation.string.maxLength,
            t('common:maxLengthError', {
              field: t('phoneNo'),
              maxCharacters: config.validation.string.maxLength,
            }),
          ),
    address:
      !!id && !validatePermissions('users', 'updateAny', 'address')
        ? undefined
        : yup.string().max(
            config.validation.string.maxLength,
            t('common:maxLengthError', {
              field: t('address'),
              maxCharacters: config.validation.string.maxLength,
            }),
          ),
    dob: !!id && !validatePermissions('users', 'updateAny', 'dob') ? undefined : yup.string(),
    gender: !!id && !validatePermissions('users', 'updateAny', 'gender') ? undefined : yup.string(),
    roles: !!id && !validatePermissions('users', 'updateAny', 'roles') ? undefined : yup.array(),
    isActive: !!id && !validatePermissions('users', 'updateAny', 'isActive') ? undefined : yup.boolean(),
  });
  /* --- variables & states - end --- */

  /* --- actions & events - begin --- */
  const onSubmit = catchError(async (input: FormData) => {
    let errors: readonly GraphQLError[] | undefined;
    if (!id) {
      errors = (await initApolloClient().mutate({
        variables: {
          ...input,
          roles: input.roles || [],
        },
        mutation: CREATE_USER_MUTATION,
      })).errors;
    } else {
      const updatedData = getUpdatedData(user, input, validatePermissions, 'users', 'updateAny');
      if (!updatedData) {
        showNotification({
          type: 'WARNING',
          message: t('common:pleaseUpdateData'),
        });
        return;
      }
      const variables = {
        id,
        ...input,
      };
      if (user.username || !input.username) {
        delete variables.username;
      }
      if (user.loginDetail.loginType === 'EMAIL' || user.loginDetail.loginType === 'GOOGLE') {
        delete variables.email;
      } else if (user.loginDetail.loginType === 'PHONE_NO') {
        delete variables.phoneNo;
      }
      errors = (await initApolloClient().mutate({
        variables,
        mutation: UPDATE_USER_MUTATION,
      })).errors;
    }
    if (errors) {
      showNotification({
        type: 'ERROR',
        message: getErrorMessage(errors, {
          INVALID_PAYLOAD_UNIQUE_USERNAME: t('common:uniqueError', {
            field: t('username'),
          }),
          INVALID_PAYLOAD_UNIQUE_EMAIL: t('common:uniqueError', {
            field: t('email'),
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
        query: GET_USER_QUERY,
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
      setUser(() => sanitizeFormData(data.user));
    }, setIsBusy)();
  }, [id, open]);
  /* --- effects - end --- */

  /* --- renders - begin --- */
  const infoFields: FieldInfo<FormData>[] = [
    {
      name: 'username',
      label: t('username'),
      required: true,
      disabled: !!id && (!!user.username || !validatePermissions('users', 'updateAny', 'username')),
      hidden: !!id && !validatePermissions('users', 'viewAny', 'username'),
    },
    {
      name: 'password',
      label: t('password'),
      required: true,
      disabled: !!id && !validatePermissions('users', 'updateAny', 'password'),
      hidden: !!id || !validatePermissions('users', 'viewAny', 'password'),
    },
    {
      name: 'email',
      label: t('email'),
      required: true,
      disabled:
        !!id &&
        (user.loginDetail.loginType === 'EMAIL' ||
          user.loginDetail.loginType === 'GOOGLE' ||
          !validatePermissions('users', 'updateAny', 'email')),
      hidden: !!id && !validatePermissions('users', 'viewAny', 'email'),
    },
    {
      name: 'firstName',
      label: t('firstName'),
      required: true,
      disabled: !!id && !validatePermissions('users', 'updateAny', 'firstName'),
      hidden: !!id && !validatePermissions('users', 'viewAny', 'firstName'),
    },
    {
      name: 'middleName',
      label: t('middleName'),
      disabled: !!id && !validatePermissions('users', 'updateAny', 'middleName'),
      hidden: !!id && !validatePermissions('users', 'viewAny', 'middleName'),
    },
    {
      name: 'lastName',
      label: t('lastName'),
      required: true,
      disabled: !!id && !validatePermissions('users', 'updateAny', 'lastName'),
      hidden: !!id && !validatePermissions('users', 'viewAny', 'lastName'),
    },
    {
      name: 'phoneNo',
      label: t('phoneNo'),
      disabled:
        !!id && (user.loginDetail.loginType === 'PHONE_NO' || !validatePermissions('users', 'updateAny', 'phoneNo')),
      hidden: !!id && !validatePermissions('users', 'viewAny', 'phoneNo'),
    },
    {
      name: 'address',
      label: t('address'),
      disabled: !!id && !validatePermissions('users', 'updateAny', 'address'),
      hidden: !!id && !validatePermissions('users', 'viewAny', 'address'),
    },
    {
      name: 'dob',
      label: t('dob'),
      type: 'datepicker',
      disabled: !!id && !validatePermissions('users', 'updateAny', 'dob'),
      hidden: !!id && !validatePermissions('users', 'viewAny', 'dob'),
    },
    {
      name: 'gender',
      label: t('gender'),
      type: 'picker',
      pickerDataSources: genders,
      disabled: !!id && !validatePermissions('users', 'updateAny', 'gender'),
      hidden: !!id && !validatePermissions('users', 'viewAny', 'gender'),
    },
    {
      name: 'isActive',
      label: t('common:isActive'),
      required: true,
      type: 'switch',
      disabled: !!id && !validatePermissions('users', 'updateAny', 'isActive'),
      hidden: !!id && !validatePermissions('users', 'viewAny', 'isActive'),
    },
  ];
  const rolesAndPermissionsFields: FieldInfo<FormData>[] = [
    {
      name: 'roles',
      label: t('roles'),
      required: true,
      type: 'multipicker',
      pickerDataSources: roleLookups,
      disabled: !!id && !validatePermissions('users', 'updateAny', 'roles'),
      hidden: !validatePermissions('users', 'viewAny', 'roles'),
    },
    {
      name: 'permissions',
      label: t('permissions'),
      required: true,
      customRender({ data }) {
        let permissionTree: PermissionTree = {};
        ((data.roles as string[]) || []).forEach((roleId) => {
          const role = roles.find((r) => r.id === roleId);
          if (role && role.isActive) {
            permissionTree = merge(permissionTree, JSON.parse(role.permissions));
          }
        });
        return <PermissionsTable data={JSON.stringify(permissionTree)} t={t} />;
      },
      hidden: !validatePermissions('users', 'viewAny', 'roles'),
    },
  ];
  /* --- renders - end --- */

  return (
    <FormDialog
      title={`${id ? t('common:create') : t('common:update')} ${t('users')}`}
      open={open}
      onClose={onClose}
      initialValues={user}
      fields={[]}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      isBusy={isBusy}
      buttons={[
        validatePermissions('users', 'updateAny') && {
          type: 'submit',
          color: 'primary',
          title: t('common:save'),
        },
        {
          title: t('common:back'),
          onClick: onClose,
          color: 'default',
        },
      ]}
      fullScreen
      noPadding
    >
      {(context) => {
        return (
          <Tabs
            tabs={[
              {
                label: t('info'),
                content: renderFormFields(infoFields, context, isBusy),
              },
              {
                label: t('rolesAndPermissions'),
                content: renderFormFields(rolesAndPermissionsFields, context, isBusy),
              },
            ]}
          />
        );
      }}
    </FormDialog>
  );
};
