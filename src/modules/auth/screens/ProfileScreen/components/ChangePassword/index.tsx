import React from 'react';
import * as yup from 'yup';
import { Formik } from 'formik';
import { FormDialog } from '@app/components';
import { FieldInfo, showNotification, TFunction, catchError } from '@app/core';
import { authService } from '@app/services';
import { config } from '@app/config';

interface Props {
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
  const { t, isBusy, setIsBusy, open, onClose } = props;
  let form: Formik<FormData>;

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
  const onSubmit = catchError(
    async (input: FormData): Promise<void> => {
      await authService.changePassword(input.password);
      showNotification({
        type: 'SUCCESS',
        message: t('common:dataSaved'),
      });
      onClose();
    },
    setIsBusy,
    {
      'auth/requires-recent-login': t('requireRecentLogin'),
    },
  );

  const setForm = (ref: Formik<FormData>): void => {
    form = ref;
  };

  const submitForm = (): void => {
    form && form.submitForm();
  };
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
    />
  );
};
