import React from 'react';
import * as yup from 'yup';
import { TFunction } from 'next-i18next';
import { FormDialog } from '@app/components';
import { handleError, FieldInfo, showNotification, FieldValueType, initApolloClient, getErrorMessage } from '@app/core';
import { config } from '@app/config';
import { Formik } from 'formik';
import { gql } from 'apollo-boost';
import { GraphQLError } from 'graphql';
import { PermissionsTable, AggregateConfig } from '../PermissionsTable';

interface Props {
  id?: string;
  t: TFunction;
  title: string;
  isBusy: boolean;
  setIsBusy: (isBusy: boolean) => void;
  open: boolean;
  setOpen: (open: boolean) => void;
  aggregateConfigs?: AggregateConfig[];
}

interface FormData {
  name: string;
  description: string;
  permissions: string;
  isActive: boolean;
  isDefault: boolean;
}

type RenderPermissionTable = (params: { setFieldValue: (field: string, value: FieldValueType) => void }) => JSX.Element;

const defaultEntity: FormData = {
  name: '',
  description: '',
  permissions: '{}',
  isActive: true,
  isDefault: false,
};

const CREATE_ROLE_MUTATION = gql`
  mutation CreateRole(
    $name: String!
    $description: String!
    $isActive: Boolean!
    $isDefault: Boolean!
    $permissions: String!
  ) {
    roles {
      create(
        payload: {
          name: $name
          description: $description
          isActive: $isActive
          isDefault: $isDefault
          permissions: $permissions
        }
      ) {
        id
      }
    }
  }
`;

const UPDATE_ROLE_MUTATION = gql`
  mutation UpdateRole(
    $id: ID!
    $name: String
    $description: String
    $isActive: Boolean
    $isDefault: Boolean
    $permissions: String
  ) {
    roles {
      update(
        payload: {
          id: $id
          name: $name
          description: $description
          isActive: $isActive
          isDefault: $isDefault
          permissions: $permissions
        }
      ) {
        id
      }
    }
  }
`;

export const Detail = (props: Props): JSX.Element => {
  const { id, t, isBusy, setIsBusy, open, setOpen, title, aggregateConfigs } = props;
  const entity = defaultEntity;
  const renderPermissionTable: RenderPermissionTable = ({ setFieldValue }) => (
    <PermissionsTable aggregateConfigs={aggregateConfigs} t={t} setFieldValue={setFieldValue} />
  );
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
      customRender: renderPermissionTable,
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

  const onSubmit = async (input: FormData): Promise<void> => {
    try {
      setIsBusy(true);
      const apolloClient = initApolloClient();
      let errors: readonly GraphQLError[] | undefined;
      if (!id) {
        errors = (await apolloClient.mutate({
          variables: input,
          mutation: CREATE_ROLE_MUTATION,
        })).errors;
      } else {
        errors = (await apolloClient.mutate({
          variables: {
            id,
            ...input,
          },
          mutation: UPDATE_ROLE_MUTATION,
        })).errors;
      }
      if (errors) {
        showNotification({
          type: 'ERROR',
          message: getErrorMessage(errors, {}),
        });
        return;
      }
      showNotification({
        type: 'SUCCESS',
        message: t('common:dataSaved'),
      });
      // setOpen(false);
    } catch (error) {
      handleError(error, {});
    } finally {
      setIsBusy(false);
    }
  };

  const handleClose = (): void => setOpen(false);

  let form: Formik<FormData>;
  const submitForm = (): void => {
    form.submitForm();
  };

  return (
    <FormDialog
      title={title}
      open={open}
      setOpen={handleClose}
      initialValues={entity}
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
          onClick: handleClose,
        },
      ]}
      setForm={(ref) => {
        form = ref;
      }}
      fullScreen
    />
  );
};
