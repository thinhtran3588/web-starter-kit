import React, { useEffect } from 'react';
import * as yup from 'yup';
import { useImmer } from 'use-immer';
import { Layout, Form } from '@app/components';
import {
  WithTranslation,
  withTranslation,
  FieldInfo,
  PickerDataItem,
  showNotification,
  getErrorMessage,
  initApolloClient,
  catchError,
  AuthProps,
} from '@app/core';
import { navigationService } from '@app/services';
import { config } from '@app/config';
import { withAuth } from '@app/hoc/WithAuth';
import { ChangePassword } from './components';
import { UPDATE_PROFILE_MUTATION, GET_PROFILE_QUERY } from './graphql';

type Props = WithTranslation & AuthProps;

interface FormData {
  username?: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  email?: string;
  phoneNo?: string;
  address?: string;
  dob?: string;
  gender?: string;
}

const Screen = (props: Props): JSX.Element => {
  /* --- variables & states - begin --- */
  const { t, authUser } = props;
  const [isBusy, setIsBusy] = useImmer<boolean>(false);
  const [openChangePassword, setOpenChangePassword] = useImmer<boolean>(false);
  const [usernameDisabled, setUsernameDisabled] = useImmer(false);
  const [profile, setProfile] = useImmer<FormData | undefined>(undefined);
  const [genders, setGenders] = useImmer<PickerDataItem<string>[]>([]);

  const validationSchema = yup.object().shape<FormData>({
    username: yup
      .string()
      .required(
        t('common:requiredError', {
          field: t('username'),
        }),
      )
      .matches(
        config.regex.username,
        t('common:invalidError', {
          field: t('username'),
        }),
      ),
    firstName: yup.string().required(
      t('common:requiredError', {
        field: t('firstName'),
      }),
    ),
    lastName: yup.string().required(
      t('common:requiredError', {
        field: t('lastName'),
      }),
    ),
    email: yup.string().matches(
      config.regex.email,
      t('common:invalidError', {
        field: t('email'),
      }),
    ),
  });
  /* --- variables & states - end --- */

  /* --- actions & events - begin --- */
  const onSubmit = catchError(async (input: FormData): Promise<void> => {
    const { errors } = await initApolloClient().mutate({
      variables: {
        id: authUser.id,
        input,
      },
      mutation: UPDATE_PROFILE_MUTATION,
    });
    if (errors) {
      showNotification({
        type: 'ERROR',
        message: getErrorMessage(errors, {
          AUTH_PHONE_NUMBER_ALREADY_EXISTS: t('common:uniqueError', {
            field: t('phoneNo'),
          }),
          INVALID_PAYLOAD_UNIQUE_USERNAME: t('common:uniqueError', {
            field: t('username'),
          }),
        }),
      });
      return;
    }
    if (input.username) {
      setUsernameDisabled(() => true);
    }
    showNotification({
      type: 'SUCCESS',
      message: t('common:dataSaved'),
    });
  }, setIsBusy);

  const openChangePasswordDialog = (): void => setOpenChangePassword(() => true);
  const closeChangePasswordDialog = (): void => setOpenChangePassword(() => false);

  const goBack = (): void => navigationService.goBack();
  /* --- actions & events - end --- */

  /* --- effects - begin --- */
  useEffect(() => {
    catchError(async () => {
      const { data, errors } = await initApolloClient().query({
        variables: {
          id: authUser.id,
        },
        query: GET_PROFILE_QUERY,
      });
      if (errors) {
        showNotification({
          type: 'ERROR',
          message: getErrorMessage(errors),
        });
        return;
      }
      setProfile(() => data.user);
      setGenders(() => [
        {
          value: '',
          label: t('common:none'),
        },
        ...(data ? (data.genders as PickerDataItem<string>[]) : []),
      ]);
    }, setIsBusy)();
  }, []);
  /* --- effects - end --- */

  /* --- renders - begin --- */
  const fields: FieldInfo<FormData>[] = [
    {
      name: 'username',
      label: t('username'),
      required: true,
      placeholder: t('usernameUpdateOnlyOne'),
      disabled: usernameDisabled || (profile && !!profile.username),
    },
    {
      name: 'firstName',
      label: t('firstName'),
      required: true,
    },
    {
      name: 'middleName',
      label: t('middleName'),
    },
    {
      name: 'lastName',
      label: t('lastName'),
      required: true,
    },
    {
      name: 'email',
      label: t('email'),
      disabled: authUser.loginType === 'EMAIL' || authUser.loginType === 'GOOGLE',
    },
    {
      name: 'phoneNo',
      label: t('phoneNo'),
      disabled: authUser.loginType === 'PHONE_NO',
    },
    {
      name: 'address',
      label: t('address'),
    },
    {
      name: 'dob',
      label: t('dob'),
      type: 'datepicker',
    },
    {
      name: 'gender',
      label: t('gender'),
      type: 'picker',
      pickerDataSources: genders,
    },
  ];
  /* --- renders - end --- */

  return (
    <Layout title={t('profile')}>
      {profile && (
        <Form
          initialValues={profile}
          fields={fields}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
          isBusy={isBusy}
          buttons={[
            {
              type: 'submit',
              title: t('common:save'),
            },
            {
              title: t('changePassword'),
              onClick: openChangePasswordDialog,
              hidden: authUser.loginType !== 'EMAIL',
            },
            {
              color: 'default',
              title: t('common:back'),
              onClick: goBack,
            },
          ]}
          lg={4}
          md={6}
        />
      )}
      {authUser.loginType === 'EMAIL' && (
        <ChangePassword
          t={t}
          isBusy={isBusy}
          setIsBusy={setIsBusy}
          open={openChangePassword}
          onClose={closeChangePasswordDialog}
        />
      )}
    </Layout>
  );
};

const ScreenBeforeTranslation = withAuth(Screen);

ScreenBeforeTranslation.getInitialProps = async () => {
  return {
    namespacesRequired: ['common', 'profile'],
  };
};

export const ProfileScreen = withTranslation('profile')(ScreenBeforeTranslation);
