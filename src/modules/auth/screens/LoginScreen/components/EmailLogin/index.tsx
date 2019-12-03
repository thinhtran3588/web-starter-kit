import React from 'react';
import * as yup from 'yup';
import { Form, Button } from '@app/components';
import { FieldInfo, writeDataModel, TFunction, catchError } from '@app/core';
import { config } from '@app/config';
import { navigationService, authService } from '@app/services';
import { useStyles } from './styles';

interface Props {
  t: TFunction;
  isBusy: boolean;
  setIsBusy: (f: (draft: boolean) => boolean | void) => void;
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
  /* --- variables & states - begin --- */
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
  /* --- variables & states - end --- */

  /* --- actions & events - begin --- */
  const onSubmit = catchError(
    async (input: FormData): Promise<void> => {
      const currentUser = await authService.signInWithEmailAndPassword(input.email, input.password);
      writeDataModel(currentUser, 'currentUser');
      navigationService.navigateTo({
        url: currentUser.emailVerified ? '/' : '/verifyEmail',
      });
    },
    setIsBusy,
    {
      'auth/invalid-email': t('wrongLoginCredentials'),
      'auth/user-disabled': t('userDisabled'),
      'auth/user-not-found': t('wrongLoginCredentials'),
      'auth/wrong-password': t('wrongLoginCredentials'),
    },
  );
  /* --- actions & events - end --- */

  return (
    <Form
      initialValues={initialValues}
      fields={fields}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      isBusy={isBusy}
    >
      <Button disabled={isBusy} type='submit' fullWidth variant='contained' color='primary' className={classes.button}>
        {props.t('login')}
      </Button>
    </Form>
  );
};
