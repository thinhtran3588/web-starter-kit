import React, { useState } from 'react';
import clsx from 'clsx';
import { AuthLayout, Link, LanguageSelection, Button } from '@app/components';
import { WithTranslation, withTranslation, handleError, LoginType, writeDataModel } from '@app/core';
import { navigationService, authService } from '@app/services';
import { useStyles } from './styles';
import { EmailLogin } from './components';

type Props = WithTranslation;

interface InputFormData {
  email: string;
  password: string;
}

const Screen = (props: Props): JSX.Element => {
  const { t } = props;
  const [isBusy, setIsBusy] = useState<boolean>(false);
  const [showingEmailLogin] = useState<boolean>(true);
  const classes = useStyles();

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
      <>
        {showingEmailLogin && <EmailLogin t={t} isBusy={isBusy} setIsBusy={setIsBusy} />}
        <div className={classes.buttonContainer}>
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
      </>
    </AuthLayout>
  );
};

Screen.getInitialProps = async () => {
  return {
    namespacesRequired: ['common', 'login'],
  };
};

export const LoginScreen = withTranslation('login')(Screen);
