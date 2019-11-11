import React, { useState } from 'react';
import * as yup from 'yup';
import { AuthLayout, Link, Button, Form } from '@app/components';
import { WithTranslation, withTranslation, handleError, FieldInfo, showNotification } from '@app/core';
import { navigationService, authService } from '@app/services';
import { config } from '@app/config';
import { useStyles } from './styles';

type Props = WithTranslation;

interface FormData {
  email: string;
}

const initialValues: FormData = {
  email: '',
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
  });

  const onSubmit = async (input: FormData): Promise<void> => {
    try {
      setIsBusy(true);
      await authService.sendPasswordResetEmail(input.email);
      showNotification({
        type: 'SUCCESS',
        message: t('recoverPassword'),
      });
      setTimeout(() => {
        navigationService.navigateTo({
          url: '/login',
        });
      }, 2000);
    } catch (error) {
      handleError(
        error,
        {},
        {
          'auth/user-not-found': true,
        },
      );
      showNotification({
        type: 'SUCCESS',
        message: t('requestSent'),
      });
      setTimeout(() => {
        navigationService.navigateTo({
          url: '/login',
        });
      }, 2000);
    } finally {
      setIsBusy(false);
    }
  };

  return (
    <AuthLayout title={t('forgotPassword')}>
      <Form initialValues={initialValues} fields={fields} validationSchema={validationSchema} onSubmit={onSubmit}>
        <div className={classes.buttonContainer}>
          <Button
            disabled={isBusy}
            type='submit'
            fullWidth
            variant='contained'
            color='primary'
            className={classes.button}
          >
            {props.t('recoverPassword')}
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
    namespacesRequired: ['common', 'forgot_password'],
  };
};

export const ForgotPasswordScreen = withTranslation('forgot_password')(Screen);
