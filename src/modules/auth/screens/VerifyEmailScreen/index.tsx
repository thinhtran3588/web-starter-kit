import React, { useEffect } from 'react';
import { useImmer } from 'use-immer';
import { config } from '@app/config';
import { AuthLayout, Button, Link, Typography } from '@app/components';
import {
  withTranslation,
  showNotification,
  AuthUser,
  GET_CURRENT_USER_QUERY,
  WithTranslation,
  catchError,
  initApolloClient,
} from '@app/core';
import { authService, navigationService } from '@app/services';
import { useStyles } from './styles';

type Props = WithTranslation;

const Screen = (props: Props): JSX.Element => {
  /* --- variables & states - begin --- */
  const { t } = props;
  const [isBusy, setIsBusy] = useImmer<boolean>(false);
  const classes = useStyles();
  const [verificationEmailSent, setVerificationEmailSent] = useImmer(false);
  const [waitToResend, setWaitToResend] = useImmer(0);
  const [user, setUser] = useImmer<AuthUser | undefined>(undefined);
  /* --- variables & states - end --- */

  /* --- actions & events - begin --- */
  const checkEmailValidation = catchError(async (): Promise<void> => {
    const isEmailVerified = await authService.isEmailVerified();
    if (isEmailVerified) {
      navigationService.navigateTo({
        url: '/',
      });
    } else {
      showNotification({
        type: 'WARNING',
        message: t('emailNotVerified'),
      });
    }
  }, setIsBusy);

  const resendVerificationEmail = catchError(async (): Promise<void> => {
    await authService.resendVerificationEmail();
    showNotification({
      type: 'SUCCESS',
      message: t('verificationEmailResent'),
    });
    setVerificationEmailSent(() => true);
  }, setIsBusy);
  /* --- actions & events - end --- */

  /* --- effects - begin --- */
  useEffect(() => {
    let intervalId: NodeJS.Timeout | undefined;
    if (verificationEmailSent) {
      if (waitToResend === 0) {
        setWaitToResend(() => config.defaultWaitToResend - 1);
      }
      intervalId = setInterval(() => {
        setWaitToResend((value) => {
          const newWaitToSend = (value - 1 + config.defaultWaitToResend) % config.defaultWaitToResend;
          if (newWaitToSend === 0 && intervalId) {
            clearInterval(intervalId);
            intervalId = undefined;
            setVerificationEmailSent(() => false);
          }
          return newWaitToSend;
        });
      }, 1000);
    }
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [verificationEmailSent]);

  useEffect(() => {
    (async () => {
      const { data, errors } = await initApolloClient().query({
        query: GET_CURRENT_USER_QUERY,
      });
      if (errors || !data || !data.currentUser || !data.currentUser.id) {
        navigationService.navigateTo({
          url: '/login',
        });
        return;
      }
      setUser(() => data.currentUser);
    })();
  }, []);
  /* --- effects - end --- */

  return (
    <AuthLayout title={t('verifyEmail')}>
      <>
        <Typography variant='body2' color='textSecondary' component='p'>
          {t('verificationNotification', {
            email: user ? user.email : '',
          })}
        </Typography>
        <div className={classes.buttonContainer}>
          <Button
            disabled={isBusy}
            fullWidth
            variant='contained'
            color='primary'
            className={classes.button}
            onClick={checkEmailValidation}
          >
            {props.t('checkEmailValidation')}
          </Button>
          <Button
            disabled={isBusy || waitToResend !== 0}
            fullWidth
            variant='contained'
            color='primary'
            className={classes.button}
            onClick={resendVerificationEmail}
          >
            {props.t('resendVerificationEmail')}
            {waitToResend === 0 ? '' : `(${waitToResend})`}
          </Button>
          <Link href='/login' title={props.t('back')} showAsText className={classes.button}>
            <Button disabled={isBusy} variant='contained' color='default' fullWidth>
              {props.t('back')}
            </Button>
          </Link>
        </div>
      </>
    </AuthLayout>
  );
};

Screen.getInitialProps = async () => {
  return {
    namespacesRequired: ['common', 'verify_email'],
  };
};

export const VerifyEmailScreen = withTranslation('verify_email')(Screen);
