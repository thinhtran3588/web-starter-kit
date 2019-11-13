import React from 'react';
import * as yup from 'yup';
import { Form, Button } from '@app/components';
import { handleError, FieldInfo, writeDataModel } from '@app/core';
import { config } from '@app/config';
import { navigationService, authService } from '@app/services';
import { TFunction } from 'next-i18next';
import { useStyles } from './styles';

interface Props {
  t: TFunction;
  isBusy: boolean;
  setIsBusy: (isBusy: boolean) => void;
}

interface FormData {
  email: string;
  password: string;
}

const initialValues: FormData = {
  email: '',
  password: '',
};

export const EmailLogin = (props: Props): JSX.Element => {
  const { t, isBusy, setIsBusy } = props;
  const classes = useStyles();
  const fields: FieldInfo<FormData>[] = [
    {
      name: 'email',
      label: t('email'),
      required: true,
    },
    {
      name: 'password',
      label: t('password'),
      required: true,
      isPassword: true,
    },
  ];
  const validationSchema = yup.object().shape<FormData>({
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
  });

  const onSubmit = async (input: FormData): Promise<void> => {
    try {
      setIsBusy(true);
      const currentUser = await authService.signInWithEmailAndPassword(input.email, input.password);
      writeDataModel(currentUser, 'currentUser');
      navigationService.navigateTo({
        url: currentUser.emailVerified ? '/' : '/verifyEmail',
      });
    } catch (error) {
      handleError(error, {
        'auth/invalid-email': t('wrongLoginCredentials'),
        'auth/user-disabled': t('userDisabled'),
        'auth/user-not-found': t('wrongLoginCredentials'),
        'auth/wrong-password': t('wrongLoginCredentials'),
      });
    } finally {
      setIsBusy(false);
    }
  };

  return (
    <Form initialValues={initialValues} fields={fields} validationSchema={validationSchema} onSubmit={onSubmit}>
      <Button disabled={isBusy} type='submit' fullWidth variant='contained' color='primary' className={classes.button}>
        {props.t('login')}
      </Button>
    </Form>
  );
};
