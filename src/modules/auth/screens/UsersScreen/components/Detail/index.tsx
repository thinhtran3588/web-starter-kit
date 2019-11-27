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
  const { id, t, isBusy, setIsBusy, open, onClose, roles, genders, refresh } = props;
  const roleLookups: PickerDataItem<string>[] = roles.map((role) => ({
    value: role.id,
    label: role.name,
  }));
  const [user, setUser] = useImmer({
    ...defaultUser,
    roles: roles.filter((role) => role.isActive && role.isDefault).map((role) => role.id),
  });
  const [validationSchema, setValidationSchema] = useImmer<yup.ObjectSchema<yup.Shape<object, FormData>> | undefined>(
    yup.object().shape<FormData>({
      username: yup
        .string()
        .required(
          t('common:requiredError', {
            field: t('username'),
          }),
        )
        .matches(config.regex.username, t('common:invalidUsername')),
      email: yup
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
      password: yup
        .string()
        .required(
          t('common:requiredError', {
            field: t('password'),
          }),
        )
        .matches(config.regex.password, t('common:invalidPassword')),
      firstName: yup
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
      middleName: yup.string().max(
        config.validation.string.maxLength,
        t('common:maxLengthError', {
          field: t('middleName'),
          maxCharacters: config.validation.string.maxLength,
        }),
      ),
      lastName: yup
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
      phoneNo: yup.string().max(
        config.validation.string.maxLength,
        t('common:maxLengthError', {
          field: t('phoneNo'),
          maxCharacters: config.validation.string.maxLength,
        }),
      ),
      address: yup.string().max(
        config.validation.string.maxLength,
        t('common:maxLengthError', {
          field: t('address'),
          maxCharacters: config.validation.string.maxLength,
        }),
      ),
      dob: yup.string(),
      gender: yup.string(),
      roles: yup.array(),
      isActive: yup.boolean(),
      loginDetail: yup.object(),
    }),
  );
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
      const variables = {
        id,
        ...input,
        roles: input.roles || [],
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
      setValidationSchema(() =>
        yup.object().shape<FormData>({
          username: yup.string().matches(config.regex.username, t('common:invalidUsername')),
          email: yup.string().matches(
            config.regex.email,
            t('common:invalidError', {
              field: t('email'),
            }),
          ),
          password: yup.string(),
          firstName: yup
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
          middleName: yup.string().max(
            config.validation.string.maxLength,
            t('common:maxLengthError', {
              field: t('middleName'),
              maxCharacters: config.validation.string.maxLength,
            }),
          ),
          lastName: yup
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
          phoneNo: yup.string().max(
            config.validation.string.maxLength,
            t('common:maxLengthError', {
              field: t('phoneNo'),
              maxCharacters: config.validation.string.maxLength,
            }),
          ),
          address: yup.string().max(
            config.validation.string.maxLength,
            t('common:maxLengthError', {
              field: t('address'),
              maxCharacters: config.validation.string.maxLength,
            }),
          ),
          dob: yup.string(),
          gender: yup.string(),
          roles: yup.array(),
          isActive: yup.boolean(),
          loginDetail: yup.object(),
        }),
      );
    }, setIsBusy)();
  }, [id, open]);
  /* --- effects - end --- */

  /* --- renders - begin --- */
  const infoFields: FieldInfo<FormData>[] = [
    {
      name: 'username',
      label: t('username'),
      required: true,
      disabled: !!user.username,
    },
    {
      name: 'password',
      label: t('password'),
      required: true,
      hidden: !!id,
    },
    {
      name: 'email',
      label: t('email'),
      required: true,
      disabled: user.loginDetail.loginType === 'EMAIL' || user.loginDetail.loginType === 'GOOGLE',
    },
    {
      name: 'firstName',
      label: t('firstName'),
      required: true,
    },
    {
      name: 'middleName',
      label: t('middleName'),
    },
    {
      name: 'lastName',
      label: t('lastName'),
      required: true,
    },
    {
      name: 'phoneNo',
      label: t('phoneNo'),
      disabled: user.loginDetail.loginType === 'PHONE_NO',
    },
    {
      name: 'address',
      label: t('address'),
    },
    {
      name: 'dob',
      label: t('dob'),
      type: 'datepicker',
    },
    {
      name: 'gender',
      label: t('gender'),
      type: 'picker',
      pickerDataSources: genders,
    },
    {
      name: 'isActive',
      label: t('common:isActive'),
      required: true,
      type: 'switch',
    },
  ];
  const rolesAndPermissionsFields: FieldInfo<FormData>[] = [
    {
      name: 'roles',
      label: t('roles'),
      required: true,
      type: 'multipicker',
      pickerDataSources: roleLookups,
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
        {
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
