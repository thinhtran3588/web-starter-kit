import React from 'react';
import * as yup from 'yup';
import { Formik } from 'formik';
import { Form, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@app/components';
import { handleError, FieldInfo, showNotification, TFunction } from '@app/core';
import { authService } from '@app/services';
import { config } from '@app/config';

interface Props {
  t: TFunction;
  isBusy: boolean;
  setIsBusy: (isBusy: boolean) => void;
  open: boolean;
  setOpen: (open: boolean) => void;
}

interface FormData {
  password: string;
}

const initialValues: FormData = {
  password: '',
};

export const ChangePassword = (props: Props): JSX.Element => {
  const { t, isBusy, setIsBusy, open, setOpen } = props;
  const fields: FieldInfo<FormData>[] = [
    {
      name: 'password',
      label: t('newPassword'),
      required: true,
      isPassword: true,
    },
  ];
  const validationSchema = yup.object().shape<FormData>({
    password: yup
      .string()
      .required(
        t('common:requiredError', {
          field: t('newPassword'),
        }),
      )
      .matches(config.regex.password, t('common:invalidPassword')),
  });

  const onSubmit = async (input: FormData): Promise<void> => {
    try {
      setIsBusy(true);
      await authService.changePassword(input.password);
      showNotification({
        type: 'SUCCESS',
        message: t('common:dataSaved'),
      });
      setOpen(false);
    } catch (error) {
      handleError(error, {});
    } finally {
      setIsBusy(false);
    }
  };

  let form: Formik<FormData>;
  const save = (): void => {
    form && form.submitForm();
  };

  const handleClose = (): void => setOpen(false);

  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby={t('changePassword')} fullWidth={true}>
      <DialogTitle>{t('changePassword')}</DialogTitle>
      <DialogContent>
        <Form
          initialValues={initialValues}
          fields={fields}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
          isBusy={isBusy}
          setForm={(ref) => {
            form = ref;
          }}
        ></Form>
      </DialogContent>
      <DialogActions>
        <Button disabled={isBusy} variant='contained' color='primary' onClick={save}>
          {props.t('common:save')}
        </Button>
        <Button disabled={isBusy} variant='contained' onClick={handleClose}>
          {props.t('common:back')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
