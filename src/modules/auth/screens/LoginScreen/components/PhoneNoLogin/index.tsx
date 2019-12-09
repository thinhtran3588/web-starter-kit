import React, { useEffect } from 'react';
import * as yup from 'yup';
import { Formik } from 'formik';
import { auth } from 'firebase/app';
import { Form, Button } from '@app/components';
import {
  FieldInfo,
  writeDataModel,
  Country,
  PickerDataItem,
  showNotification,
  TFunction,
  catchError,
  initApolloClient,
  getErrorMessage,
} from '@app/core';
import { config } from '@app/config';
import { navigationService, authService } from '@app/services';
import { useImmer } from 'use-immer';
import { useStyles } from './styles';
import { GET_COUNTRIES_QUERY } from '../../graphql';

import('firebase/auth');

interface Props {
  t: TFunction;
  isBusy: boolean;
  setIsBusy: (f: (draft: boolean) => boolean | void) => void;
}

interface FormData {
  countryCode: string;
  phoneNo: string;
  verificationCode?: string;
}

const initialValues: FormData = {
  countryCode: config.defaultCountryCode,
  phoneNo: '',
  verificationCode: '',
};

export const PhoneNoLogin = (props: Props): JSX.Element => {
  /* --- variables & states - begin --- */
  const { t, isBusy, setIsBusy } = props;
  const classes = useStyles();
  const [showVerificationCode, setShowVerificationCode] = useImmer(false);
  const [verificationCodeSent, setVerificationCodeSent] = useImmer(false);
  const [waitToResend, setWaitToResend] = useImmer(0);
  const [confirmationResult, setConfirmationResult] = useImmer<auth.ConfirmationResult | undefined>(undefined);
  const [countries, setCountries] = useImmer<PickerDataItem<string>[]>([]);
  let form: Formik<FormData>;

  const fields: FieldInfo<FormData>[] = [
    {
      name: 'countryCode',
      label: t('countryCode'),
      required: true,
      type: 'picker',
      pickerDataSources: countries,
      disabled: showVerificationCode,
    },
    {
      name: 'phoneNo',
      label: t('phoneNo'),
      required: true,
      disabled: showVerificationCode,
    },
    {
      name: 'verificationCode',
      label: t('verificationCode'),
      required: true,
      hidden: !showVerificationCode,
    },
  ];
  const validationSchema = yup.object().shape<FormData>({
    countryCode: yup.string().required(
      t('common:requiredError', {
        field: t('countryCode'),
      }),
    ),
    phoneNo: yup.string().required(
      t('common:requiredError', {
        field: t('phoneNo'),
      }),
    ),
  });

  /* --- variables & states - end --- */

  /* --- actions & events - begin --- */
  const onSubmit = catchError(
    async (input: FormData): Promise<void> => {
      if (verificationCodeSent) {
        if (!input.verificationCode) {
          showNotification({
            type: 'ERROR',
            message: t('common:requiredError', {
              field: t('verificationCode'),
            }),
          });
        } else if (!confirmationResult) {
          showNotification({
            type: 'ERROR',
            message: t('requestConfirmationResult'),
          });
        } else {
          const currentUser = await authService.verifySmsCode(confirmationResult, input.verificationCode);
          writeDataModel(currentUser, 'currentUser');
          navigationService.navigateTo({
            url: '/',
          });
        }
        return;
      }

      const result = await authService.sendSmsVerification(`${input.countryCode}${input.phoneNo.toString()}`);
      setConfirmationResult(() => result);
      setVerificationCodeSent(() => true);
      setShowVerificationCode(() => true);
    },
    setIsBusy,
    {
      'auth/invalid-phone-number': t('common:invalidError', {
        field: t('phoneNo'),
      }),
      'auth/user-disabled': t('userDisabled'),
      'auth/invalid-verification-code': t('common:invalidError', {
        field: t('verificationCode'),
      }),
    },
  );
  /* --- actions & events - end --- */

  /* --- effects - begin --- */
  useEffect(() => {
    catchError(async () => {
      const { data, errors } = await initApolloClient().query({
        query: GET_COUNTRIES_QUERY,
      });
      if (errors) {
        showNotification({
          type: 'ERROR',
          message: getErrorMessage(errors),
        });
        return;
      }
      setCountries(() =>
        (data.authLookups.countries as Country[]).map((m) => ({
          value: m.dialCode,
          label: `${m.name}(${m.dialCode})`,
        })),
      );
    }, setIsBusy)();
  }, []);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any).recaptchaVerifier = new auth.RecaptchaVerifier('reCAPTCHA', {
      size: 'invisible',
      callback: form.submitForm,
    });
  }, []);

  useEffect(() => {
    let intervalId: NodeJS.Timeout | undefined;
    if (verificationCodeSent) {
      if (waitToResend === 0) {
        setWaitToResend(() => config.defaultWaitToResend - 1);
      }
      intervalId = setInterval(() => {
        setWaitToResend((value) => {
          const newWaitToSend = (value - 1 + config.defaultWaitToResend) % config.defaultWaitToResend;
          if (newWaitToSend === 0 && intervalId) {
            clearInterval(intervalId);
            intervalId = undefined;
            setVerificationCodeSent(() => false);
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
  }, [verificationCodeSent]);
  /* --- effects - end --- */

  return (
    <Form
      initialValues={initialValues}
      fields={fields}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      isBusy={isBusy}
      setForm={(ref) => {
        form = ref;
      }}
    >
      <Button disabled={isBusy} type='submit' fullWidth variant='contained' color='primary' className={classes.button}>
        {props.t(showVerificationCode ? 'login' : 'sendVerificationCode')}
      </Button>
      {showVerificationCode && (
        <Button
          disabled={isBusy || waitToResend !== 0}
          type='submit'
          fullWidth
          variant='contained'
          color='primary'
          className={classes.button}
        >
          {props.t('resendVerificationCode')}
          {waitToResend === 0 ? '' : `(${waitToResend})`}
        </Button>
      )}
      <div id='reCAPTCHA'></div>
    </Form>
  );
};
