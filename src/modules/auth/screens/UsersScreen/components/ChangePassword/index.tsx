import React from 'react';
import * as yup from 'yup';
import { FormDialog } from '@app/components';
import { FieldInfo, showNotification, TFunction, catchError, getErrorMessage, initApolloClient } from '@app/core';
import { config } from '@app/config';
import { UPDATE_USER_MUTATION } from '../../graphql';

interface Props {
  id: string;
  t: TFunction;
  isBusy: boolean;
  setIsBusy: (f: (draft: boolean) => boolean | void) => void;
  open: boolean;
  onClose: () => void;
}

interface FormData {
  password: string;
  confirmPassword: string;
}

const formData: FormData = {
  password: '',
  confirmPassword: '',
};

export const ChangePassword = (props: Props): JSX.Element => {
  /* --- variables & states - begin --- */
  const { id, t, isBusy, setIsBusy, open, onClose } = props;

  const validationSchema = yup.object().shape<FormData>({
    password: yup
      .string()
      .required(
        t('common:requiredError', {
          field: t('newPassword'),
        }),
      )
      .matches(config.regex.password, t('common:invalidPassword')),
    confirmPassword: yup.string().when('password', {
      is: (password) => Boolean(password),
      then: yup
        .string()
        .required(
          t('common:requiredError', {
            field: t('confirmPassword'),
          }),
        )
        .oneOf([yup.ref('password')], t('confirmPasswordNotMatch')),
      otherwise: yup.string().required(
        t('common:requiredError', {
          field: t('confirmPassword'),
        }),
      ),
    }),
  });
  /* --- variables & states - end --- */

  /* --- actions & events - begin --- */
  const onSubmit = catchError(async (input: FormData): Promise<void> => {
    const { errors } = await initApolloClient().mutate({
      variables: {
        id,
        password: input.password,
      },
      mutation: UPDATE_USER_MUTATION,
    });
    if (errors) {
      showNotification({
        type: 'ERROR',
        message: getErrorMessage(errors, {}),
      });
    } else {
      showNotification({
        type: 'SUCCESS',
        message: t('common:dataSaved'),
      });
      onClose();
    }
  }, setIsBusy);
  /* --- actions & events - end --- */

  /* --- renders - begin --- */
  const fields: FieldInfo<FormData>[] = [
    {
      name: 'password',
      label: t('newPassword'),
      required: true,
      isPassword: true,
    },
    {
      name: 'confirmPassword',
      label: t('confirmPassword'),
      required: true,
      isPassword: true,
    },
  ];
  /* --- renders - end --- */
  return (
    <FormDialog
      title={t('changePassword')}
      open={open}
      onClose={onClose}
      initialValues={formData}
      fields={fields}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      isBusy={isBusy}
      buttons={[
        {
          type: 'submit',
          title: t('common:save'),
        },
        {
          title: t('common:back'),
          onClick: onClose,
          color: 'default',
        },
      ]}
    />
  );
};
