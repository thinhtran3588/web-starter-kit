import React, { useState } from 'react';
import { AuthLayout, Form, Button, Link } from '@app/components';
import * as yup from 'yup';
import { withTranslation, FieldInfo, writeDataModel, showNotification, handleError } from '@app/core';
import { WithTranslation } from 'react-i18next';
import { config } from '@app/config';
import { authService, navigationService } from '@app/services';
import { useStyles } from './styles';

type Props = WithTranslation;

interface FormData {
  email: string;
  password: string;
  confirmPassword: string;
}

const initialValues: FormData = {
  email: '',
  password: '',
  confirmPassword: '',
};

const Screen = (props: Props): JSX.Element => {
  const { t } = props;
  const [isBusy, setIsBusy] = useState<boolean>(false);
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
    {
      name: 'confirmPassword',
      label: t('confirmPassword'),
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
      .matches(config.regex.password, t('invalidPassword')),
    confirmPassword: yup.string().when('password', {
      is: (password) => Boolean(password),
      then: yup
        .string()
        .required(props.t('pleaseConfirmPassword'))
        .oneOf([yup.ref('password')], t('confirmPasswordNotMatch')),
      otherwise: yup.string().required(
        t('common:requiredError', {
          field: t('confirmPassword'),
        }),
      ),
    }),
  });

  const onSubmit = async (input: FormData): Promise<void> => {
    try {
      setIsBusy(true);
      const currentUser = await authService.createUserWithEmailAndPassword(input.email, input.password);
      writeDataModel(currentUser, 'currentUser');
      showNotification({
        type: 'SUCCESS',
        message: t('registerCompleted'),
      });
      setTimeout(() => {
        navigationService.navigateTo({
          url: '/verifyEmail',
        });
      }, 2000);
    } catch (error) {
      handleError(error, {
        'auth/email-already-in-use': t('emailAlreadyInUse'),
      });
    } finally {
      setIsBusy(false);
    }
  };

  return (
    <AuthLayout title={t('register')}>
      <Form initialValues={initialValues} fields={fields} validationSchema={validationSchema} onSubmit={onSubmit}>
        <div className={classes.buttonContainer}>
          <Button
            disabled={isBusy}
            type='submit'
            variant='contained'
            color='primary'
            className={classes.button}
            fullWidth
          >
            {props.t('register')}
          </Button>
          <Link href='/login' title={props.t('back')} showAsText className={classes.button}>
            <Button disabled={isBusy} variant='contained' color='default' fullWidth>
              {props.t('back')}
            </Button>
          </Link>
        </div>
      </Form>
    </AuthLayout>
  );
};

Screen.getInitialProps = async () => {
  return {
    namespacesRequired: ['common', 'register'],
  };
};

export const RegisterScreen = withTranslation('register')(Screen);
