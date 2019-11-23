import React, { useEffect } from 'react';
import * as yup from 'yup';
import { TFunction } from 'next-i18next';
import { FormDialog } from '@app/components';
import { FieldInfo, showNotification, FieldValueType, initApolloClient, getErrorMessage, catchError } from '@app/core';
import { config } from '@app/config';
import { Formik } from 'formik';
import { GraphQLError } from 'graphql';
import { useImmer } from 'use-immer';
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
  const { id, t, isBusy, setIsBusy, open, onClose, aggregateConfigs, refresh } = props;
  const [role, setRole] = useImmer(defaultRole);
  const fields: FieldInfo<FormData>[] = [
    {
      name: 'name',
      label: t('name'),
      required: true,
    },
    {
      name: 'description',
      label: t('description'),
      required: true,
    },
    {
      name: 'isActive',
      label: t('common:isActive'),
      required: true,
      type: 'switch',
    },
    {
      name: 'isDefault',
      label: t('common:isDefault'),
      required: true,
      type: 'switch',
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
          />
        );
      },
    },
  ];
  const validationSchema = yup.object().shape<FormData>({
    name: yup
      .string()
      .required(
        t('common:requiredError', {
          field: t('name'),
        }),
      )
      .max(
        config.validation.string.maxLength,
        t('common:maxLengthError', {
          field: t('name'),
          maxCharacters: config.validation.string.maxLength,
        }),
      ),
    description: yup
      .string()
      .required(
        t('common:requiredError', {
          field: t('description'),
        }),
      )
      .max(
        config.validation.string.descriptionMaxLength,
        t('common:maxLengthError', {
          field: t('description'),
          maxCharacters: config.validation.string.descriptionMaxLength,
        }),
      ),
    isActive: yup.boolean(),
    isDefault: yup.boolean(),
    permissions: yup.string(),
  });
  let form: Formik<FormData>;
  /* --- variables & states - end --- */

  /* --- actions & events - begin --- */
  const setForm = (ref: Formik<FormData>): void => {
    form = ref;
  };

  const submitForm = (): void => {
    form.submitForm();
  };

  const onSubmit = catchError(async (input: FormData) => {
    let errors: readonly GraphQLError[] | undefined;
    if (!id) {
      errors = (await initApolloClient().mutate({
        variables: input,
        mutation: CREATE_ROLE_MUTATION,
        errorPolicy: 'all',
      })).errors;
    } else {
      errors = (await initApolloClient().mutate({
        variables: {
          id,
          ...input,
        },
        mutation: UPDATE_ROLE_MUTATION,
        errorPolicy: 'all',
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

  /* --- effects - start --- */
  useEffect(() => {
    catchError(async () => {
      if (!id || !open) {
        return;
      }
      const { data, errors } = await initApolloClient().query({
        query: GET_ROLE_QUERY,
        variables: {
          id,
        },
        fetchPolicy: 'network-only',
      });
      if (errors) {
        showNotification({
          type: 'ERROR',
          message: getErrorMessage(errors),
        });
        return;
      }
      setRole(() => data.role);
    }, setIsBusy)();
  }, [id, open]);
  /* --- effects - end --- */

  return (
    <FormDialog
      title={`${id ? t('common:create') : t('common:update')} ${t('roles')}`}
      open={open}
      onClose={onClose}
      initialValues={role}
      fields={fields}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      isBusy={isBusy}
      buttons={[
        {
          color: 'primary',
          title: t('common:save'),
          onClick: submitForm,
        },
        {
          title: t('common:back'),
          onClick: onClose,
          color: 'default',
        },
      ]}
      setForm={setForm}
      fullScreen
    />
  );
};
