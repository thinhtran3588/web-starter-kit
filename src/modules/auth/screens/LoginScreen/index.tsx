import React from 'react';
import clsx from 'clsx';
import { AuthLayout, Link, LanguageSelection, Button } from '@app/components';
import { WithTranslation, withTranslation, LoginType, writeDataModel, catchError } from '@app/core';
import { navigationService, authService } from '@app/services';
import { useImmer } from 'use-immer';
import { useStyles } from './styles';
import { EmailLogin, PhoneNoLogin } from './components';

type Props = WithTranslation;

interface InputFormData {
  email: string;
  password: string;
}

const Screen = (props: Props): JSX.Element => {
  /* --- variables & states - begin --- */
  const { t } = props;
  const [isBusy, setIsBusy] = useImmer<boolean>(false);
  const [showingEmailLogin, setShowingEmailLogin] = useImmer<boolean>(true);
  const classes = useStyles();
  /* --- variables & states - end --- */

  /* --- actions & events - begin --- */
  const loginExternal = catchError(
    async (loginType: LoginType): Promise<void> => {
      const currentUser =
        loginType === 'FACEBOOK' ? await authService.loginFacebook() : await authService.loginGoogle();
      writeDataModel(currentUser, 'currentUser');
      navigationService.navigateTo({
        url: '/',
      });
    },
    setIsBusy,
    {},
    {
      'auth/user-cancelled': true,
      'auth/popup-closed-by-user': true,
    },
  );
  /* --- actions & events - end --- */

  return (
    <AuthLayout title={t('login')}>
      <>
        {showingEmailLogin && <EmailLogin t={t} isBusy={isBusy} setIsBusy={setIsBusy} />}
        {!showingEmailLogin && <PhoneNoLogin t={t} isBusy={isBusy} setIsBusy={setIsBusy} />}
        <div className={classes.buttonContainer}>
          <Button
            disabled={isBusy}
            variant='contained'
            color='primary'
            className={clsx(classes.button, classes.facebook)}
            onClick={() => loginExternal('FACEBOOK')}
          >
            {props.t('continueWithFacebook')}
          </Button>
          <Button
            disabled={isBusy}
            variant='contained'
            color='primary'
            className={clsx(classes.button, classes.google)}
            onClick={() => loginExternal('GOOGLE')}
          >
            {props.t('continueWithGoogle')}
          </Button>
          <Button
            disabled={isBusy}
            variant='contained'
            color='primary'
            className={classes.button}
            onClick={() => setShowingEmailLogin(() => !showingEmailLogin)}
          >
            {props.t(showingEmailLogin ? 'continueWithPhoneNo' : 'loginWithEmail')}
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
