import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { config } from '@app/config';
import { AuthLayout, Button, Link, Typography } from '@app/components';
import {
  withTranslation,
  showNotification,
  handleError,
  AuthUser,
  GET_CURRENT_USER_QUERY,
  WithTranslation,
} from '@app/core';
import { authService, navigationService } from '@app/services';
import { useStyles } from './styles';

type Props = WithTranslation;

const Screen = (props: Props): JSX.Element => {
  const { t } = props;
  const [isBusy, setIsBusy] = useState<boolean>(false);
  const classes = useStyles();

  const checkEmailValidation = async (): Promise<void> => {
    try {
      setIsBusy(true);
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
    } catch (error) {
      handleError(error, {});
    } finally {
      setIsBusy(false);
    }
  };

  const [verificationEmailSent, setVerificationEmailSent] = useState(false);
  const [waitToResend, setWaitToResend] = useState(0);
  useEffect(() => {
    let intervalId: NodeJS.Timeout | undefined;
    if (verificationEmailSent) {
      if (waitToResend === 0) {
        setWaitToResend(config.defaultWaitToResend - 1);
      }
      intervalId = setInterval(() => {
        setWaitToResend((value) => {
          const newWaitToSend = (value - 1 + config.defaultWaitToResend) % config.defaultWaitToResend;
          if (newWaitToSend === 0 && intervalId) {
            clearInterval(intervalId);
            intervalId = undefined;
            setVerificationEmailSent(false);
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

  const resendVerificationEmail = async (): Promise<void> => {
    try {
      setIsBusy(true);
      await authService.resendVerificationEmail();
      showNotification({
        type: 'SUCCESS',
        message: t('verificationEmailResent'),
      });
      setVerificationEmailSent(true);
    } catch (error) {
      handleError(error, {});
    } finally {
      setIsBusy(false);
    }
  };

  const { data } = useQuery(GET_CURRENT_USER_QUERY);
  const user = data ? (data.currentUser as AuthUser) : undefined;

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
