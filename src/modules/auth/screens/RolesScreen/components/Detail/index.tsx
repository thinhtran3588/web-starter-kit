import React, { useEffect } from 'react';
import * as yup from 'yup';
import { GraphQLError } from 'graphql';
import { useImmer } from 'use-immer';
import { FormDialog } from '@app/components';
import {
  FieldInfo,
  showNotification,
  FieldValueType,
  initApolloClient,
  getErrorMessage,
  catchError,
  TFunction,
  ValidatePermissions,
  getUpdatedData,
  getStringValidationSchema,
  getBooleanValidationSchema,
} from '@app/core';
import { config } from '@app/config';
import { PermissionsTable, AggregateConfig } from '../PermissionsTable';
import { GET_ROLE_QUERY, CREATE_ROLE_MUTATION, UPDATE_ROLE_MUTATION } from '../../graphql';

interface Props {
  id?: string;
  t: TFunction;
  isBusy: boolean;
  setIsBusy: (f: (draft: boolean) => boolean | void) => void;
  open: boolean;
  onClose: () => void;
  aggregateConfigs?: AggregateConfig[];
  refresh: () => void;
  validatePermissions: ValidatePermissions;
}

interface FormData {
  name: string;
  description: string;
  permissions: string;
  isActive: boolean;
  isDefault: boolean;
}

type RenderPermissionTable = (params: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
  setFieldValue: (field: string, value: FieldValueType) => void;
}) => JSX.Element;

const defaultRole: FormData = {
  name: '',
  description: '',
  permissions: '{}',
  isActive: true,
  isDefault: false,
};

export const Detail = (props: Props): JSX.Element => {
  /* --- variables & states - begin --- */
  const { id, t, isBusy, setIsBusy, open, onClose, aggregateConfigs, refresh, validatePermissions } = props;
  const [role, setRole] = useImmer(defaultRole);
  const validationParams = {
    id,
    t,
    validatePermissions,
    aggregateName: 'users',
  };
  const validationSchema = yup.object().shape<Partial<FormData>>({
    name: getStringValidationSchema({
      ...validationParams,
      field: 'name',
      required: true,
    }),
    description: getStringValidationSchema({
      ...validationParams,
      field: 'description',
      required: true,
      max: config.validation.string.descriptionMaxLength,
    }),
    isActive: getBooleanValidationSchema({
      ...validationParams,
      field: 'isActive',
      required: true,
    }),
    isDefault: getBooleanValidationSchema({
      ...validationParams,
      field: 'isDefault',
      required: true,
    }),
    permissions: getStringValidationSchema({
      ...validationParams,
      field: 'permissions',
      max: config.validation.string.descriptionMaxLength,
    }),
  });
  /* --- variables & states - end --- */

  /* --- actions & events - begin --- */
  const onSubmit = catchError(async (input: FormData) => {
    let errors: readonly GraphQLError[] | undefined;
    if (!id) {
      errors = (await initApolloClient().mutate({
        variables: input,
        mutation: CREATE_ROLE_MUTATION,
      })).errors;
    } else {
      const updatedData = getUpdatedData(role, input, validatePermissions, 'roles', 'updateAny');
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
        mutation: UPDATE_ROLE_MUTATION,
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
        query: GET_ROLE_QUERY,
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
      setRole(() => data.rolesById);
    }, setIsBusy)();
  }, [id, open]);
  /* --- effects - end --- */

  /* --- renders - begin --- */
  const fields: FieldInfo<FormData>[] = [
    {
      name: 'name',
      label: t('name'),
      required: true,
      disabled: !!id && !validatePermissions('roles', 'updateAny', 'name'),
      hidden: !!id && !validatePermissions('roles', 'viewAny', 'name'),
    },
    {
      name: 'description',
      label: t('description'),
      required: true,
      disabled: !!id && !validatePermissions('roles', 'updateAny', 'description'),
      hidden: !!id && !validatePermissions('roles', 'viewAny', 'description'),
    },
    {
      name: 'isActive',
      label: t('common:isActive'),
      required: true,
      type: 'switch',
      disabled: !!id && !validatePermissions('roles', 'updateAny', 'isActive'),
      hidden: !!id && !validatePermissions('roles', 'viewAny', 'isActive'),
    },
    {
      name: 'isDefault',
      label: t('common:isDefault'),
      required: true,
      type: 'switch',
      disabled: !!id && !validatePermissions('roles', 'updateAny', 'isDefault'),
      hidden: !!id && !validatePermissions('roles', 'viewAny', 'isDefault'),
    },
    {
      name: 'permissions',
      label: t('permissions'),
      required: true,
      customRender({ data, setFieldValue }) {
        return (
          <PermissionsTable
            aggregateConfigs={aggregateConfigs}
            t={t}
            setFieldValue={setFieldValue}
            data={data.permissions}
            isBusy={isBusy}
            disabled={!!id && !validatePermissions('roles', 'updateAny', 'permissions')}
          />
        );
      },
      hidden: !!id && !validatePermissions('roles', 'viewAny', 'permissions'),
    },
  ];
  /* --- renders - end --- */

  return (
    <FormDialog
      title={`${!id ? t('common:create') : t('common:update')} ${t('roles')}`}
      open={open}
      onClose={onClose}
      initialValues={role}
      fields={fields}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      isBusy={isBusy}
      buttons={[
        validatePermissions('roles', 'updateAny') && {
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
