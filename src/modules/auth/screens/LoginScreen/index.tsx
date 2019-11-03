import React, { useState } from 'react';
import * as yup from 'yup';
import clsx from 'clsx';
import { AuthLayout, Link, LanguageSelection, Form, Button } from '@app/components';
import { WithTranslation, withTranslation, handleError, LoginType, FieldInfo, writeDataModel } from '@app/core';
import { config } from '@app/config';
import { navigationService, authService } from '@app/services';
import { useStyles } from './styles';

type Props = WithTranslation;

interface InputFormData {
  email: string;
  password: string;
}

const initialValues: InputFormData = {
  email: '',
  password: '',
};

const Screen = (props: Props): JSX.Element => {
  const { t } = props;
  const [isBusy, setIsBusy] = useState<boolean>(false);
  const classes = useStyles();
  const fields: FieldInfo<InputFormData>[] = [
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
  const validationSchema = yup.object().shape<InputFormData>({
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
  });

  const onSubmit = async (input: InputFormData): Promise<void> => {
    try {
      setIsBusy(true);
      const currentUser = await authService.signInWithEmailAndPassword(input.email, input.password);
      writeDataModel(currentUser, 'currentUser');
      if (currentUser.emailVerified) {
        navigationService.navigateTo({
          url: '/',
        });
      } else {
        navigationService.navigateTo({
          url: '/emailVerification',
        });
      }
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

  const loginExternal = async (loginType: LoginType): Promise<void> => {
    try {
      setIsBusy(true);
      const currentUser =
        loginType === 'FACEBOOK' ? await authService.loginFacebook() : await authService.loginGoogle();
      writeDataModel(currentUser, 'currentUser');
      navigationService.navigateTo({
        url: '/',
      });
    } catch (error) {
      handleError(
        error,
        {},
        {
          'auth/user-cancelled': true,
          'auth/popup-closed-by-user': true,
        },
      );
    } finally {
      setIsBusy(false);
    }
  };

  return (
    <AuthLayout title={t('login')}>
      <Form initialValues={initialValues} fields={fields} validationSchema={validationSchema} onSubmit={onSubmit}>
        <div className={classes.buttonContainer}>
          <Button disabled={isBusy} type='submit' variant='contained' color='primary' className={classes.button}>
            {props.t('login')}
          </Button>
          <Button
            disabled={isBusy}
            variant='contained'
            color='primary'
            className={clsx(classes.button, classes.facebook)}
            onClick={() => loginExternal('FACEBOOK')}
          >
            {props.t('loginFacebook')}
          </Button>
          <Button
            disabled={isBusy}
            variant='contained'
            color='primary'
            className={clsx(classes.button, classes.google)}
            onClick={() => loginExternal('GOOGLE')}
          >
            {props.t('loginGoogle')}
          </Button>
          <Link href='/' title={props.t('backToHome')} showAsText className={classes.button}>
            <Button disabled={isBusy} variant='contained' color='default' className={classes.linkButton}>
              {props.t('backToHome')}
            </Button>
          </Link>
        </div>
        <div className={classes.bottomLinkContainer}>
          <Link href='/forgotPassword' title={props.t('forgotPassword')} className={classes.bottomLink}>
            {props.t('forgotPassword')}
          </Link>
          <Link href='/register' title={props.t('register')} className={classes.bottomLink}>
            {props.t('register')}
          </Link>
          <LanguageSelection useFab className={classes.languageSelection} />
        </div>
      </Form>
    </AuthLayout>
  );
};

Screen.getInitialProps = async () => {
  return {
    namespacesRequired: ['common', 'login'],
  };
};

export const LoginScreen = withTranslation('login')(Screen);
