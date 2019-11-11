import React, { useState, useEffect } from 'react';
import * as yup from 'yup';
import { TFunction } from 'next-i18next';
import { useQuery } from '@apollo/react-hooks';
import { auth } from 'firebase/app';
import { Form, Button } from '@app/components';
import {
  handleError,
  FieldInfo,
  writeDataModel,
  GET_COUNTRIES_QUERY,
  Country,
  PickerDataItem,
  showNotification,
} from '@app/core';
import { config } from '@app/config';
import { navigationService, authService } from '@app/services';
import { Formik } from 'formik';
import { useStyles } from './styles';

import('firebase/auth');

interface Props {
  t: TFunction;
  isBusy: boolean;
  setIsBusy: (isBusy: boolean) => void;
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
  const { t, isBusy, setIsBusy } = props;
  const classes = useStyles();
  const { data } = useQuery(GET_COUNTRIES_QUERY);
  let countries: PickerDataItem<string>[] = [];
  if (data && data.countries) {
    countries = (data.countries as Country[]).map((m) => ({
      value: m.dialCode,
      label: `${m.name}(${m.dialCode})`,
    }));
  }

  const [showVerificationCode, setShowVerificationCode] = useState(false);
  const [verificationCodeSent, setVerificationCodeSent] = useState(false);
  const [waitToResend, setWaitToResend] = useState(0);
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

  const [confirmationResult, setConfirmationResult] = useState<auth.ConfirmationResult | undefined>(undefined);
  const onSubmit = async (input: FormData): Promise<void> => {
    try {
      setIsBusy(true);
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

      setConfirmationResult(await authService.sendSmsVerification(`${input.countryCode}${input.phoneNo.toString()}`));
      setVerificationCodeSent(true);
      setShowVerificationCode(true);
    } catch (error) {
      handleError(error, {
        'auth/invalid-phone-number': t('common:invalidError', {
          field: t('phoneNo'),
        }),
        'auth/user-disabled': t('userDisabled'),
        'auth/invalid-verification-code': t('common:invalidError', {
          field: t('verificationCode'),
        }),
      });
    } finally {
      setIsBusy(false);
    }
  };

  let form: Formik<FormData>;
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
        setWaitToResend(config.defaultWaitToResend - 1);
      }
      intervalId = setInterval(() => {
        setWaitToResend((value) => {
          const newWaitToSend = (value - 1 + config.defaultWaitToResend) % config.defaultWaitToResend;
          if (newWaitToSend === 0 && intervalId) {
            clearInterval(intervalId);
            intervalId = undefined;
            setVerificationCodeSent(false);
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
  return (
    <Form
      initialValues={initialValues}
      fields={fields}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
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
